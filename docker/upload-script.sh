#!/bin/bash
set -x

export PATH=$PATH:/usr/local/bin
source /opt/ocfu/project_env.sh

WORKING_DIR='/opt/offline-conversion-file-uploader'
DATA_DIR='/data'
config_file_path=$DATA_DIR/$ENV_CONFIG_FILE
input_file_path=$DATA_DIR/$ENV_DATA_FILE

cd $WORKING_DIR
if [ ! -f old_cksum ]; then
  echo "0123456789" > old_cksum
fi
echo `md5sum $input_file_path | awk '{ print $1 }'` > new_cksum

# Check and Update new version of ocfu
update_needed=`git pull | grep 'Already up-to-date'` 
if [ -z "$update_needed" ]; then
 npm install && \
 npm run compile
fi

# Add datestamp to data file and do checksum
datestamp=`date +"%Y_%m_%d"`
new_file_path="${input_file_path%.*}_$datestamp.${input_file_path#*.}"
cp $input_file_path $new_file_path

# Upload offlines data to FB
if [ ! -z "$(diff -q new_cksum old_cksum)" ]; then
  node lib/cli.js upload \
     --configFilePath $config_file_path \
     --inputFilePath $new_file_path
  # Save the new checksum
  echo `md5sum $new_file_path | awk '{ print $1 }'` > old_cksum
  # Remove the temp file
  rm $new_file_path
fi
