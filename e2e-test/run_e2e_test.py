# python3 run_e2e_test.py <OPTIONAL_TEST_CASE_NAME>
#
# To run all tests:
#   python3 run_e2e_test.py
# To run case 3-2:
#   python3 run_e2e_test.py 3-2
# To run case 3-*
#   python3 run_e2e_test.py 3-

import subprocess
import os
import sys

cmd_logs = []


def dumpAndClearLogs(case_id):
    lines = []
    for cmd_log in cmd_logs:
        lines.append('Command: ' + ' '.join(cmd_log['cmd']))
        lines.append('Result: ' + cmd_log['result'])
        if cmd_log['result'] != 'unknown-error':
            lines.append('Return Code: ' + str(cmd_log['retcode']))
            if len(cmd_log['stdout']):
                lines.append('Stdout:')
                lines.extend(map(
                    lambda l: '\t' + l,
                    cmd_log['stdout'].decode('utf8').split('\n'),
                ))
            else:
                lines.append('Stdout: empty')
            if len(cmd_log['stderr']):
                lines.append('Stderr:')
                lines.extend(map(
                    lambda l: '\t' + l,
                    cmd_log['stderr'].decode('utf8').split('\n'),
                ))
            else:
                lines.append('Stderr: empty')
        lines.append('')
    log_path = case_id + '.log'
    with open(log_path, 'w') as f:
        f.writelines(map(lambda l: l + '\n', lines))
    cmd_logs.clear()
    print('\tLog dumped to:', log_path)


def run(cmd, stdin=subprocess.PIPE):
    try:
        result = subprocess.run(
            cmd,
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            stdin=stdin,
        )
        cmd_logs.append({
            'cmd': cmd,
            'result': 'success',
            'retcode': result.returncode,
            'stdout': result.stdout,
            'stderr': result.stderr,

        })
        return result
    except subprocess.CalledProcessError as e:
        cmd_logs.append({
            'cmd': cmd,
            'result': 'fail',
            'retcode': e.returncode,
            'stdout': e.stdout,
            'stderr': e.stderr,
        })
        raise e
    else:
        cmd_logs.append({
            'cmd': cmd,
            'result': 'unknown-error',
        })
        raise


def runNodeCLI(command, params, expect_fail):
    cmd = ['node', 'lib/cli.js', command]
    for k, v in params.items():
        cmd.append('--' + k)
        if v is not True:
            cmd.append(v)
    try:
        run(cmd)
        if expect_fail:
            raise Exception('Expected command to fail but it did not.')
    except BaseException as e:
        if not expect_fail:
            raise e


def sortFile(path):
    # Due to parallel nature for uploader, the exact order of APIs will be
    # different every time. We sort the API log and compare.
    with open(path, 'r') as f:
        run(['sort', '-o', path], f)


def cmpFile(actual, expected):
    run(['diff', '--strip-trailing-cr', actual, expected])


def runTest(case_id, test):
    print('Testing ' + case_id + ':', test['description'])
    try:
        for actual, _ in test['compares']:
            run(['rm', '-f', actual])
        for cmd in test['commands']:
            runNodeCLI(
                cmd['command'],
                cmd['params'],
                cmd.get('expect_fail', False),
            )
        for path in test['sorts']:
            sortFile(path)
        for actual, expected in test['compares']:
            cmpFile(actual, expected)
        print('\tPASS')
        result = True
    except Exception as e:
        print('\tFAIL:', e)
        result = False
    dumpAndClearLogs(case_id)
    return result


upload_preprocessed_cmd = {
    'command': 'upload-preprocessed',
    'params': {
        'inputFilePath': 'preprocess-output.csv',
        'accessToken': '<ACCESS_TOKEN_TEST>',
        'dataSetID': '111111111',
        'uploadID': '222222222',
        'e2eTestConfigFilePath':
            'e2e-test/shared/e2e-cfg-upload.json',
        'reportOutputPath': 'upload-report.txt',
        'batchSize': '10',
    },
}

tests = {
    'case-1-1': {
        'description': 'Upload data with simple fields',
        'commands': [
            {
                'command': 'upload',
                'params': {
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'dataSetID': '111111111',
                    'inputFilePath': 'e2e-test/shared/simple.csv',
                    'configFilePath': 'e2e-test/case-1-1/cfg.json',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-upload.json',
                },
            },
        ],
        'sorts': ['api.log'],
        'compares': [
            ('api.log', 'e2e-test/case-1-1/api.log'),
            ('report.txt', 'e2e-test/case-1-1/report.txt'),
        ],
    },
    'case-1-2': {
        'description': 'Upload data with a lot of fields',
        'commands': [
            {
                'command': 'upload',
                'params': {
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'dataSetID': '111111111',
                    'inputFilePath': 'e2e-test/shared/rich.csv',
                    'configFilePath': 'e2e-test/case-1-2/cfg.json',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-upload.json',
                },
            },
        ],
        'sorts': ['api.log'],
        'compares': [
            ('api.log', 'e2e-test/case-1-2/api.log'),
            ('report.txt', 'e2e-test/case-1-2/report.txt'),
        ],
    },
    'case-1-3': {
        'description': 'Upload data with preset event name and currency',
        'commands': [
            {
                'command': 'upload',
                'params': {
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'dataSetID': '111111111',
                    'inputFilePath': 'e2e-test/shared/preset.csv',
                    'configFilePath': 'e2e-test/case-1-3/cfg.json',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-upload.json',
                },
            },
        ],
        'sorts': ['api.log'],
        'compares': [
            ('api.log', 'e2e-test/case-1-3/api.log'),
            ('report.txt', 'e2e-test/case-1-3/report.txt'),
        ],
    },
    'case-1-4': {
        'description': 'Upload dirty data (forcefully upload)',
        'commands': [
            {
                'command': 'upload',
                'params': {
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'dataSetID': '111111111',
                    'inputFilePath': 'e2e-test/shared/dirty.csv',
                    'configFilePath': 'e2e-test/case-1-4/cfg.json',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-upload.json',
                },
            },
        ],
        'sorts': ['api.log'],
        'compares': [
            ('api.log', 'e2e-test/case-1-4/api.log'),
            ('report.txt', 'e2e-test/case-1-4/report.txt'),
        ],
    },
    'case-1-5': {
        'description': 'Upload dirty data (should abort)',
        'commands': [
            {
                'command': 'upload',
                'params': {
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'dataSetID': '111111111',
                    'inputFilePath': 'e2e-test/shared/dirty.csv',
                    'configFilePath': 'e2e-test/case-1-5/cfg.json',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-upload.json',
                },
                'expect_fail': True,
            },
        ],
        'sorts': [],
        'compares': [
            ('report.txt', 'e2e-test/case-1-5/report.txt'),
        ],
    },
    'case-1-6': {
        # Row [0, 200) and [500, 700) already uploaded.
        'description': 'Resume upload',
        'commands': [
            {
                'command': 'upload',
                'params': {
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'dataSetID': '111111111',
                    'inputFilePath': 'e2e-test/shared/simple.csv',
                    'configFilePath': 'e2e-test/case-1-6/cfg.json',
                    'e2eTestConfigFilePath': 'e2e-test/case-1-6/e2e-cfg.json',
                },
            },
        ],
        'sorts': ['api.log'],
        'compares': [
            ('api.log', 'e2e-test/case-1-6/api.log'),
            ('report.txt', 'e2e-test/case-1-6/report.txt'),
        ],
    },
    'case-2-1': {
        'description': 'Validate good simple data',
        'commands': [
            {
                'command': 'validate',
                'params': {
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'dataSetID': '111111111',
                    'inputFilePath': 'e2e-test/shared/simple.csv',
                    'configFilePath': 'e2e-test/case-2-1/cfg.json',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-validate.json',
                },
            },
        ],
        'sorts': [],
        'compares': [
            ('api.log', 'e2e-test/case-2-1/api.log'),
            ('report.txt', 'e2e-test/case-2-1/report.txt'),
        ],
    },
    'case-2-2': {
        'description': 'Validate good rich data',
        'commands': [
            {
                'command': 'validate',
                'params': {
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'dataSetID': '111111111',
                    'inputFilePath': 'e2e-test/shared/rich.csv',
                    'configFilePath': 'e2e-test/case-2-2/cfg.json',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-validate.json',
                },
            },
        ],
        'sorts': [],
        'compares': [
            ('api.log', 'e2e-test/case-2-2/api.log'),
            ('report.txt', 'e2e-test/case-2-2/report.txt'),
        ],
    },
    'case-2-3': {
        'description': 'Validate data with preset values',
        'commands': [
            {
                'command': 'validate',
                'params': {
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'dataSetID': '111111111',
                    'inputFilePath': 'e2e-test/shared/preset.csv',
                    'configFilePath': 'e2e-test/case-2-3/cfg.json',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-validate.json',
                },
            },
        ],
        'sorts': [],
        'compares': [
            ('api.log', 'e2e-test/case-2-3/api.log'),
            ('report.txt', 'e2e-test/case-2-3/report.txt'),
        ],
    },
    'case-2-4': {
        'description': 'Validate data with dirty data and issues',
        'commands': [
            {
                'command': 'validate',
                'params': {
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'dataSetID': '111111111',
                    'inputFilePath': 'e2e-test/shared/dirty.csv',
                    'configFilePath': 'e2e-test/case-2-4/cfg.json',
                    'e2eTestConfigFilePath': 'e2e-test/case-2-4/e2e-cfg.json',
                },
            },
        ],
        'sorts': [],
        'compares': [
            ('api.log', 'e2e-test/case-2-4/api.log'),
            ('report.txt', 'e2e-test/case-2-4/report.txt'),
        ],
    },
    'case-3-1': {
        'description': 'Preprocess and upload simple data',
        'commands': [
            {
                'command': 'preprocess',
                'params': {
                    'inputFilePath': 'e2e-test/shared/simple.csv',
                    'configFilePath': 'e2e-test/case-3-1/cfg.json',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-dummy.json',
                    'reportOutputPath': 'preprocess-report.txt',
                },
            },
            upload_preprocessed_cmd,
        ],
        'sorts': ['api.log'],
        'compares': [
            (
                'preprocess-report.txt',
                'e2e-test/case-3-1/preprocess-report.txt',
            ),
            (
                'preprocess-output.csv',
                'e2e-test/case-3-1/preprocess-output.csv',
            ),
            (
                'upload-report.txt',
                'e2e-test/case-3-1/upload-report.txt',
            ),
            (
                'api.log',
                # Should be same to case-1-1 which uploads directly.
                'e2e-test/case-1-1/api.log',
            ),
        ],
    },
    'case-3-2': {
        'description': 'Preprocess and upload rich data',
        'commands': [
            {
                'command': 'preprocess',
                'params': {
                    'inputFilePath': 'e2e-test/shared/rich.csv',
                    'configFilePath': 'e2e-test/case-3-2/cfg.json',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-dummy.json',
                    'reportOutputPath': 'preprocess-report.txt',
                },
            },
            upload_preprocessed_cmd,
        ],
        'sorts': ['api.log'],
        'compares': [
            (
                'preprocess-report.txt',
                'e2e-test/case-3-2/preprocess-report.txt',
            ),
            (
                'preprocess-output.csv',
                'e2e-test/case-3-2/preprocess-output.csv',
            ),
            (
                'upload-report.txt',
                'e2e-test/case-3-2/upload-report.txt',
            ),
            (
                'api.log',
                # Should be same to case-1-2 which uploads directly.
                'e2e-test/case-1-2/api.log',
            ),
        ],
    },
    'case-3-3': {
        'description': 'Preprocess and upload data with preset values',
        'commands': [
            {
                'command': 'preprocess',
                'params': {
                    'inputFilePath': 'e2e-test/shared/preset.csv',
                    'configFilePath': 'e2e-test/case-3-3/cfg.json',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-dummy.json',
                    'reportOutputPath': 'preprocess-report.txt',
                },
            },
            upload_preprocessed_cmd,
        ],
        'sorts': ['api.log'],
        'compares': [
            (
                'preprocess-report.txt',
                'e2e-test/case-3-3/preprocess-report.txt',
            ),
            (
                'preprocess-output.csv',
                'e2e-test/case-3-3/preprocess-output.csv',
            ),
            (
                'upload-report.txt',
                'e2e-test/case-3-3/upload-report.txt',
            ),
            (
                'api.log',
                # Should be same to case-1-3 which uploads directly.
                'e2e-test/case-1-3/api.log',
            ),
        ],
    },
    'case-3-4': {
        'description': 'Preprocess and upload dirty data (forcefully)',
        'commands': [
            {
                'command': 'preprocess',
                'params': {
                    'inputFilePath': 'e2e-test/shared/dirty.csv',
                    'configFilePath': 'e2e-test/case-3-4/cfg.json',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-dummy.json',
                    'reportOutputPath': 'preprocess-report.txt',
                },
            },
            {
                'command': 'upload-preprocessed',
                'params': {
                    'inputFilePath': 'preprocess-output.csv',
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'dataSetID': '111111111',
                    'uploadID': '222222222',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-upload.json',
                    'reportOutputPath': 'upload-report.txt',
                    # Set batch size to 1 so each api call will have exactly
                    # one event. Otherwise we can't compare the api log with
                    # case 1-4, due to the fact that we drop some rows from
                    # batch when uploading directly, so each batch may contain
                    # less than N events, while preprocessed events already
                    # excludes invalid events, so each batch here will have
                    # exactly N events.
                    'batchSize': '1',
                },
            },
        ],
        'sorts': ['api.log'],
        'compares': [
            (
                'preprocess-report.txt',
                'e2e-test/case-3-4/preprocess-report.txt',
            ),
            (
                'preprocess-output.csv',
                'e2e-test/case-3-4/preprocess-output.csv',
            ),
            (
                'upload-report.txt',
                'e2e-test/case-3-4/upload-report.txt',
            ),
            (
                'api.log',
                # Should be same to case-1-4 which uploads directly.
                'e2e-test/case-1-4/api.log',
            ),
        ],
    },
    'case-3-5': {
        'description': 'Preprocess and upload dirty data (aborted)',
        'commands': [
            {
                'command': 'preprocess',
                'params': {
                    'inputFilePath': 'e2e-test/shared/dirty.csv',
                    'configFilePath': 'e2e-test/case-3-5/cfg.json',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-dummy.json',
                    'reportOutputPath': 'preprocess-report.txt',
                },
                'expect_fail': True,
            },
        ],
        'sorts': [],
        'compares': [
            (
                'preprocess-report.txt',
                'e2e-test/case-3-5/preprocess-report.txt',
            ),
        ],
    },
    'case-3-6': {
        'description': 'Preprocess and upload dirty data (aborted)',
        'commands': [
            {
                'command': 'upload-preprocessed',
                'params': {
                    'inputFilePath': 'e2e-test/case-3-6/preprocess-output.csv',
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'dataSetID': '111111111',
                    'uploadID': '222222222',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-dummy.json',
                    'batchSize': '10',
                },
                'expect_fail': True,
            },
        ],
        'sorts': [],
        'compares': [
            ('report.txt', 'e2e-test/case-3-6/report.txt'),
        ],
    },
    'case-3-7': {
        # Row [0, 200) and [500, 700) already uploaded.
        'description': 'Resume upload-preprocessed',
        'commands': [
            {
                'command': 'upload-preprocessed',
                'params': {
                    'inputFilePath': 'e2e-test/case-3-1/preprocess-output.csv',
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'dataSetID': '111111111',
                    'e2eTestConfigFilePath': 'e2e-test/case-3-7/e2e-cfg.json',
                    'skipRowsAlreadyUploaded': True,
                    'batchSize': '10',
                },
            },
        ],
        'sorts': ['api.log'],
        'compares': [
            (
                'report.txt',
                'e2e-test/case-3-7/report.txt',
            ),
            (
                'api.log',
                # Will not be same to case-1-6 due to different ranges.
                'e2e-test/case-3-7/api.log',
            ),
        ],
    },
    'case-4-1': {
        'description': 'Upload to custom audience (email PII)',
        'commands': [
            {
                'command': 'upload-audience',
                'params': {
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'customAudienceID': '111111111',
                    'inputFilePath': 'e2e-test/shared/ca-simple.csv',
                    'configFilePath': 'e2e-test/case-4-1/cfg.json',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-ca-upload.json',
                },
            },
        ],
        'sorts': ['api.log'],
        'compares': [
            ('report.txt', 'e2e-test/case-4-1/report.txt'),
            ('api.log', 'e2e-test/case-4-1/api.log'),
        ],
    },
    'case-4-2': {
        'description': 'Upload to custom audience (rich PII)',
        'commands': [
            {
                'command': 'upload-audience',
                'params': {
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'customAudienceID': '111111111',
                    'inputFilePath': 'e2e-test/shared/ca-rich.csv',
                    'configFilePath': 'e2e-test/case-4-2/cfg.json',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-ca-upload.json',
                },
            },
        ],
        'sorts': ['api.log'],
        'compares': [
            ('report.txt', 'e2e-test/case-4-2/report.txt'),
            ('api.log', 'e2e-test/case-4-2/api.log'),
        ],
    },
    'case-4-3': {
        'description': 'Upload to custom audience (rich PII, dirty data)',
        'commands': [
            {
                'command': 'upload-audience',
                'params': {
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'customAudienceID': '111111111',
                    'inputFilePath': 'e2e-test/shared/ca-dirty.csv',
                    'configFilePath': 'e2e-test/case-4-3/cfg.json',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-ca-upload.json',
                },
                'expect_fail': True,
            },
        ],
        'sorts': [],
        'compares': [
            ('report.txt', 'e2e-test/case-4-3/report.txt'),
        ],
    },
    'case-4-4': {
        'description': 'Upload and remove custom audience (email PII)',
        'commands': [
            {
                'command': 'upload-audience',
                'params': {
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'customAudienceID': '111111111',
                    'inputFilePath': 'e2e-test/shared/ca-simple.csv',
                    'configFilePath': 'e2e-test/case-4-4/cfg.json',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-ca-upload.json',
                    'removeUsers': True,
                },
            },
        ],
        'sorts': ['api.log'],
        'compares': [
            ('report.txt', 'e2e-test/case-4-4/report.txt'),
            ('api.log', 'e2e-test/case-4-4/api.log'),
        ],
    },
    'case-5-1': {
        'description': 'Upload to value-based custom audience (email PII)',
        'commands': [
            {
                'command': 'upload-audience',
                'params': {
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'customAudienceID': '111111111',
                    'inputFilePath': 'e2e-test/shared/ca-simple.csv',
                    'configFilePath': 'e2e-test/case-5-1/cfg.json',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-vbca-upload.json',
                },
            },
        ],
        'sorts': ['api.log'],
        'compares': [
            ('report.txt', 'e2e-test/case-5-1/report.txt'),
            ('api.log', 'e2e-test/case-5-1/api.log'),
        ],
    },
    'case-5-2': {
        'description': 'Upload to value-based custom audience (rich PII)',
        'commands': [
            {
                'command': 'upload-audience',
                'params': {
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'customAudienceID': '111111111',
                    'inputFilePath': 'e2e-test/shared/ca-rich.csv',
                    'configFilePath': 'e2e-test/case-5-2/cfg.json',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-vbca-upload.json',
                },
            },
        ],
        'sorts': ['api.log'],
        'compares': [
            ('report.txt', 'e2e-test/case-5-2/report.txt'),
            ('api.log', 'e2e-test/case-5-2/api.log'),
        ],
    },
    'case-5-3': {
        'description':
            'Upload to value-based custom audience (rich PII, dirty data)',
        'commands': [
            {
                'command': 'upload-audience',
                'params': {
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'customAudienceID': '111111111',
                    'inputFilePath': 'e2e-test/shared/ca-dirty.csv',
                    'configFilePath': 'e2e-test/case-5-3/cfg.json',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-vbca-upload.json',
                },
                'expect_fail': True,
            },
        ],
        'sorts': [],
        'compares': [
            ('report.txt', 'e2e-test/case-5-3/report.txt'),
        ],
    },
    'case-5-4': {
        'description': 'Remove user from value-based custom audience',
        'commands': [
            {
                'command': 'upload-audience',
                'params': {
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'customAudienceID': '111111111',
                    'inputFilePath': 'e2e-test/shared/ca-simple.csv',
                    'configFilePath': 'e2e-test/case-5-4/cfg.json',
                    'e2eTestConfigFilePath':
                        'e2e-test/shared/e2e-cfg-vbca-upload.json',
                    'removeUsers': True,
                },
            },
        ],
        'sorts': ['api.log'],
        'compares': [
            ('report.txt', 'e2e-test/case-5-4/report.txt'),
            ('api.log', 'e2e-test/case-5-4/api.log'),
        ],
    },
    'case-6-1': {
        'description': 'Create custom audience with customer_file_source ' \
            + 'and retention_days',
        'commands': [
            {
                'command': 'upload-audience',
                'params': {
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'adAccountID': '123456789',
                    'inputFilePath': 'e2e-test/shared/ca-simple.csv',
                    'configFilePath': 'e2e-test/case-6-1/cfg.json',
                    'e2eTestConfigFilePath': 'e2e-test/case-6-1/e2e-cfg.json',
                    'customerFileSource': 'USER_PROVIDED_ONLY',
                    'retentionDays': '90',
                },
            },
        ],
        'sorts': ['api.log'],
        'compares': [
            ('report.txt', 'e2e-test/case-6-1/report.txt'),
            ('api.log', 'e2e-test/case-6-1/api.log'),
        ],
    },
    'case-6-2': {
        'description':
            'Update customer_file_source and retention_days, then upload',
        'commands': [
            {
                'command': 'upload-audience',
                'params': {
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'customAudienceID': '111111111',
                    'inputFilePath': 'e2e-test/shared/ca-simple.csv',
                    'configFilePath': 'e2e-test/case-6-2/cfg.json',
                    'e2eTestConfigFilePath': 'e2e-test/case-6-2/e2e-cfg.json',
                    'customerFileSource': 'USER_PROVIDED_ONLY',
                    'retentionDays': '90',
                },
            },
        ],
        'sorts': ['api.log'],
        'compares': [
            ('report.txt', 'e2e-test/case-6-2/report.txt'),
            ('api.log', 'e2e-test/case-6-2/api.log'),
        ],
    },
    'case-6-3': {
        'description': 'Do not update custom audience if ' \
            + 'customer_file_source has not been changed',
        'commands': [
            {
                'command': 'upload-audience',
                'params': {
                    'accessToken': '<ACCESS_TOKEN_TEST>',
                    'customAudienceID': '111111111',
                    'inputFilePath': 'e2e-test/shared/ca-simple.csv',
                    'configFilePath': 'e2e-test/case-6-3/cfg.json',
                    'e2eTestConfigFilePath': 'e2e-test/case-6-3/e2e-cfg.json',
                    'customerFileSource': 'USER_PROVIDED_ONLY',
                    'retentionDays': '90',
                },
            },
        ],
        'sorts': ['api.log'],
        'compares': [
            ('report.txt', 'e2e-test/case-6-3/report.txt'),
            ('api.log', 'e2e-test/case-6-3/api.log'),
        ],
    },
}


if __name__ == '__main__':
    # chdir to the project root directory.
    os.chdir(os.path.join(os.path.dirname(os.path.realpath(__file__)), '..'))

    if len(sys.argv) > 1:
        tests_to_run = tuple(filter(
            lambda test: sys.argv[1] in test[0],
            tests.items(),
        ))
        if tests_to_run:
            print('Running all tests containing:', sys.argv[1])
        else:
            print('No tests containing:', sys.argv[1])
    else:
        tests_to_run = tests.items()

    num_passed = 0
    for (case_id, test) in tests_to_run:
        result = runTest(case_id, test)
        num_passed += int(result)
    if num_passed < len(tests_to_run):
        print('FAILED:', len(tests_to_run) - num_passed)
    else:
        print('ALL PASSED.')
