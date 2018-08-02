#!/bin/bash
set -x
# Get configuration from config.sh
source config.sh

# Create logs folder
mkdir -p $DATA_DIR/logs

# Pull file uploader docker image from docker hub
docker pull facebookincubator/offline-conversions-file-uploader

# Run file uploader image with parameters from config file
docker run -d --name offline-conversions-file-uploader \
	-e ENV_CONFIG_FILE="$CONFIG_FILE" \
	-e ENV_DATA_FILE="$DATA_FILE" \
	-e ENV_CRON_JOB="$CRON_JOB" \
	-v $DATA_DIR:/data \
	facebookincubator/offline-conversions-file-uploader
