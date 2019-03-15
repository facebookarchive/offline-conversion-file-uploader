# Custom Audience Upload

## Prerequisites
* Your custom audience file in CSV format. [Examples](https://github.com/facebookincubator/offline-conversion-file-uploader/blob/master/custom-audience/demo-audience/test-audience-files.zip)
* **Strongly recommended:** manually upload your offline events via [UI](https://business.facebook.com//ads/manage/audiences.php) to familiarize yourself with this product.
* System user access token. [Follow step 4 - 6 of this guide.](https://developers.facebook.com/docs/marketing-api/offline-conversions). Not required if you only use this tool to hash the data.

## How to use

### Install

Make sure git and node are installed and are up-to-date on your machine, then run:

```bash
git clone https://github.com/facebookincubator/offline-conversion-file-uploader
npm install
npm run compile
```

### Examples

Before uploading real data, you can create a test data set and upload some test data to familiarize yourself with this tool. Take a look at this [guide](https://github.com/facebookincubator/offline-conversion-file-uploader/blob/master/custom-audience/demo-audience/demo.md) and have a try.

### Run Command

```
node lib/cli.js upload-audience --configFilePath <PATH_TO_CONFIG> <...OTHER_PARAMS>
```

See the **Commands** section for details of each command. See the previous section for some sample commands.

### Schedule

Once you make sure an upload is made successfully, you can automate your upload by scheduling the command. We recommend to use **crontab** for POSIX systems, and use **Powershell** and **Task Scheduler** for Windows.

## Commands
|Command|Description|Options (Required options are in bold)|
|-------|-----------|--------------------------------------|
|upload-audience|Add or remove users to/from your custom audience.|**`accessToken`** **`configFilePath`** **`customFileSource`** **`inputFilePath`** **`mapping`** `adAccountID` `appIDs` `batchSize` `customAudienceID` `delimiter` `format` `header` `ignoreSampleErrors` `logging` `pageIDs` `removeUsers` `reportOutputPath`|

## Options
### How to Specify

Most options can be specified in both ways.

For example, if you want to specify `accessToken`, you can either do it by passing it directly to CLI command

``` bash
node lib/cli.js <COMMAND> --accessToken <YOUR_ACCESS_TOKEN> ...
```

or by setting it in the config JSON specified by `configFilePath`.

```json
{
    "accessToken": <YOUR_ACCESS_TOKEN>,
    ...
}
```

For boolean options like `ignoreSampleErrors`, when specifying in CLI, there is no need to explicitly set it to `true`

```bash
node lib/cli.js <COMMAND> --ignoreSampleErrors ...
```

### All Options

Here is a list of all options we support. See previous section for supports/required options supported/required.

| Option      | Description | Where to specify | Default | Example |
| ----------- | ----------- | --------------- | ------- | ----------- |
| accessToken | Access token required to make API calls to Facebook server. | CLI or Config JSON | *No default* | `"EAAC...T4ZD"` |
| ignoreSampleErrors | The command will be stopped if there are too many errors in first 1,000 rows when this options is not specified. Use this options to override the behavior and to forcefully continue execution. | CLI or Config JSON | `false` | `true` |
| inputFilePath | Path of input CSV. | CLI or Config JSON | *No default* | `"path/to/offline_data.csv"` |
| batchSize | Configures how many events are sent to Facebook server in one API call. Ranges from 1 to 2000. Lower the number if network is slow or unstable. | CLI or Config JSON | `2000` | `500` |
| delimiter | Delimiter of CSV file. | CLI or Config JSON | `","` | `"\t"` |
| header | Whether to mark the first row as header and skip it when uploading. | CLI or Config JSON | `false` | `true` |
| mapping | Defines what each column in the file is for. | Config JSON Only | *No default* |See the **mapping** section below.|
| format | Provide more information about the formatting of certain types of columns. | Config JSON Only | `{}` | See the **mapping** section below. |
| logging | Level of logging. See supported levels [here](https://www.npmjs.com/package/winston#logging-levels). | CLI or Config JSON | `"verbose"` | `"debug"` |
| reportOutputPath | Path of output report of each command. The report contains summary, issues and error samples. The file will be truncated if it already exists. | CLI or Config JSON | `"report.txt"` | `"upload-report.txt"` |
| adAccountID | ID of your ad account if you are creating a new audience with this upload. | CLI or Config JSON | *No default* | `"123456789"` |
| customAudienceID | ID of your custom audience if you are uploading to an existing audience. | CLI or Config JSON | *No default* | `"123456789"` |
| customFileSource | Describes how the customer information in your Custom Audience was originally collected. | CLI or Config JSON | `USER_PROVIDED_ONLY`, `PARTNER_PROVIDED_ONLY`, `BOTH_USER_AND_PARTNER_PROVIDED` | `"USER_PROVIDED_ONLY"` |
| removeUsers | Remove uploaded users from custom audience. | CLI or Config JSON | `false` | `true` |
| retentionDays | Number of days to keep the user in this cluster. You can use any value between 0 and 180 days. Defaults to forever if not specified, or specified to 0. | CLI or Config JSON | `0` | `90` |
| appIDs | A list of app IDs when appuid is mapped. | Config JSON Only | *No default* | `["123456789", "987654321"]` |
| pageIDs | A list of page IDs when pageuid is mapped. | Config JSON Only | *No default* | `["123456789", "987654321"]` |

### Mapping for Custom Audience

The `mapping` field is a dictionary that maps the index of a column to custom audience schema. Here is an example:

```json
"mapping": {
  "0": "match_keys.email",
  "1": "match_keys.phone",
  "2": "lookalike_value",
}
```

| Mapping          | Is Required | Description                                                  |
| ---------------- | ----------- | ------------------------------------------------------------ |
| match_keys.XXXXX  | Required.                                                    | The identifier info used to match people. XXXXX needs to be replaced with the match key type such as email, phone, etc. For list of available match key types, please see 'Key name' column in [this table](https://developers.facebook.com/docs/marketing-api/offline-conversions#match-keys). |
| lookalike_value  | Optional.   | The life-time value of a user. This is for value-based lookalike audience. We do not accept 0 and negative values. |

For `match_keys.dob` we support the following format:

- `MM/DD/YYYY` `MMDDYYYY` `MM-DD-YYYY`
- `DD/MM/YYYY` `DDMMYYYY` `DD-MM-YYYY`
- `YYYY/MM/DD` `YYYYMMDD` `YYYY-MM-DD`
- `MM/DD/YY` `MMDDYY` `MM-DD-YY`
- `DD/MM/YY` `DDMMYY` `DD-MM-YY`
- `YY/MM/DD` `YYMMDD` `YY-MM-DD`

### Note on Resuming

For custom audience upload, you can safely upload duplicated rows of a same user. So, we don't support resuming for custom audience upload.
