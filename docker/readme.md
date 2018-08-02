## Install Docker
Refer to Docker documentation to install Docker Engine on your machine.
https://docs.docker.com/install/

## Build MDFU Image
Run script build-image.sh to build MDFU docker images locally.

## Configure MDFU docker
Configure file uploader in config.json as in https://github.com/facebookincubator/offline-conversion-file-uploader

## Run MDFU docker
Specify data directory where config.json and data file are placed in config.sh

Run script run-ocfu.sh to run the docker image from either local or remote repo.
