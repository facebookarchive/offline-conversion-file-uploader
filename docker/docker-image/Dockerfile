# Basics
FROM node:9.11.1

# Default value for env varibales
ENV ENV_CONFIG_FILE 'config.json'
ENV ENV_DATA_FILE 'example_events_file.csv'
ENV ENV_CRON_JOB '* * * * *'

# Initialize
RUN apt-get -y update && apt-get install -y \
		git \
		cron \
		vim \
 && rm -rf /var/lib/apt/lists/* \
 && mkdir -p /data/logs

# Install OCFU
ADD run.sh /opt/ocfu/run.sh
ADD upload-script.sh /opt/ocfu/upload-script.sh

RUN cd /opt \
 && chmod +x ocfu/run.sh \
 && git clone https://github.com/facebookincubator/offline-conversion-file-uploader.git \
 && cd offline-conversion-file-uploader \
 && npm install \
 && npm run compile

# Run startup script
CMD /opt/ocfu/run.sh
