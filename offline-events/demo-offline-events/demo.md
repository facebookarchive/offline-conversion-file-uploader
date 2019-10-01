# Get Prepared

Fill the placeholder in the following script and then execute. The script installs and compiles the tool, and set the necessary parameter (data set ID and access token) for demo.

```
npm install
npm run compile
cd demo-offline-events; unzip test-event-files.zip; cd ..
export data_set_id='YOUR_DATA_SET_ID_HERE'
export access_token='YOUR_ACCESS_TOKEN_HERE'
export api_version=v4.0
```

# Run Demos

## Upload

### 1. Upload small file with legacy upload tag prefix

```
node lib/cli.js upload \
  --configFilePath demo-offline-events/config-test-upload.json \
  --inputFilePath demo-offline-events/test-events.csv \
  --accessToken $access_token \
  --apiVersion $api_version \
  --dataSetID $data_set_id
```

### 2. Upload large file
You can kill the script at anytime and restart it.
The script will guarantee that each row is uploaded once and only once.

```
node lib/cli.js upload \
  --configFilePath demo-offline-events/config-test-upload-1m.json \
  --inputFilePath demo-offline-events/test-events-1m.csv \
  --accessToken $access_token \
  --apiVersion $api_version \
  --dataSetID $data_set_id
```

### 3. Upload dirty file
The uploader script can handle all kinds of dirty input.

```
node lib/cli.js upload \
  --configFilePath demo-offline-events/config-test-upload-dirty.json \
  --inputFilePath demo-offline-events/test-events-dirty.csv \
  --accessToken $access_token \
  --apiVersion $api_version \
  --dataSetID $data_set_id
```

## Validate

### 1. Validate large file without formatting error.

```
node lib/cli.js validate \
  --configFilePath demo-offline-events/config-test-validate-1m.json \
  --inputFilePath demo-offline-events/test-events-1m.csv \
  --accessToken $access_token \
  --apiVersion $api_version \
  --dataSetID $data_set_id
```

### 2. Validate dirty file.

```
node lib/cli.js validate \
  --configFilePath demo-offline-events/config-test-validate-dirty.json \
  --inputFilePath demo-offline-events/test-events-dirty.csv \
  --accessToken $access_token \
  --apiVersion $api_version \
  --dataSetID $data_set_id
```

## Preprocess and then upload

### 1. Small file

```
node lib/cli.js preprocess \
  --configFilePath demo-offline-events/config-test-preprocess.json \
  --inputFilePath demo-offline-events/test-events.csv \
  --preprocessOutputPath preprocessed-events.csv \
  --reportOutputPath preprocess-report.txt \
&& node lib/cli.js upload-preprocessed \
  --inputFilePath preprocessed-events.csv \
  --accessToken $access_token \
  --apiVersion $api_version \
  --dataSetID $data_set_id \
  --reportOutputPath upload-report.txt
```

### 2. Large file

```
node lib/cli.js preprocess \
  --configFilePath demo-offline-events/config-test-preprocess-1m.json \
  --inputFilePath demo-offline-events/test-events-1m.csv \
  --preprocessOutputPath preprocessed-events-1m.csv \
  --reportOutputPath preprocess-report.txt \
&& node lib/cli.js upload-preprocessed \
  --inputFilePath preprocessed-events-1m.csv \
  --accessToken $access_token \
  --apiVersion $api_version \
  --dataSetID $data_set_id \
  --reportOutputPath upload-report.txt
```

### 3. Dirty file

```
node lib/cli.js preprocess \
  --configFilePath demo-offline-events/config-test-preprocess-dirty.json \
  --inputFilePath demo-offline-events/test-events-dirty.csv \
  --preprocessOutputPath preprocessed-events-dirty.csv \
  --reportOutputPath preprocess-report.txt \
&& node lib/cli.js upload-preprocessed \
  --inputFilePath preprocessed-events-dirty.csv \
  --accessToken $access_token \
  --apiVersion $api_version \
  --dataSetID $data_set_id \
  --reportOutputPath upload-report.txt
```
