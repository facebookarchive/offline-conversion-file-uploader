#!/bin/bash
printenv | sed 's/^\(.*\)$/export \1/g' > /opt/ocfu/project_env.sh
cat > /opt/ocfu/cron-offline-data.txt <<EOF
$ENV_CRON_JOB /bin/bash /opt/ocfu/upload-script.sh >>/data/logs/upload.log 2>&1
EOF
crontab /opt/ocfu/cron-offline-data.txt
service cron start
tailf /dev/null
