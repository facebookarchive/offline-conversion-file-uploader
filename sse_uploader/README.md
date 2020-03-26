# Server-Side Events Uploader
Server-Side Events Uploader is a command line tool that helps Facebook advertisers and marketing partners upload events using the [Server-Side Events API](https://developers.facebook.com/docs/marketing-api/facebook-pixel/server-side-api) without building their own integration.

## Install
Make sure git and node are installed and are up-to-date on your machine, then run:

```
git clone https://github.com/facebookincubator/offline-conversion-file-uploader
cd offline-conversion-file-uploader/sse_uploader
npm install
npm run build
```

## Run
Use the `upload` command to read events from the input file (default: events.csv) using the given configuration (default: config.json) and send those events via Server-Side events API.

Use the `validate` command to read events from the input file and print all possible errors in your data before sending them through the API.

```
node lib/cli.js <COMMAND> [--config <PATH_TO_CONFIG>] [--input <PATH_TO_INPUT_CSV>] [--test-mode]
```

The input CSV separator should be `,`. 

### Configuration options
Here is a list of all options we support in the configuration file.

| Option      | Description | Default | Example |
| ----------- | ----------- | ------- | ----------- |
| accessToken | Access token required to make API calls to Facebook server. *Required*.| *No default* | `"EAAC...T4ZD"` |
| appId | The ID of your Facebook App. It needs to be whitelisted to send Server-Side Events. *Required*. | *No default* | `"987654321"` |
| pixelId | The ID of the Facebook Pixel associated with your app. *Required*.| *No default* | `"486822841454810"` |
| testId | The Test ID to be used in case you want to use the [Test Events tool](https://www.facebook.com/business/help/1624255387706033) in Events Manager. *Required* when uploading with the `--test-mode` flag. | *No default* | `"TEST3141"` |
| batchSize | Configures how many events are sent to Facebook server in one API call. Ranges from 1 to 1000. Lower the number if network is slow or unstable. | `1000` | `500` |

## Input CSV file
Supported columns in the input CSV file. See the [Server-Side Events API Parameters documentation](https://developers.facebook.com/docs/marketing-api/facebook-pixel/server-side-api/parameters) for more information. See the provided `events.csv` file as an example.

All column names should be in lowercase, with no spaces.

### Event parameters

| Name      | Description | Example |
| ----------- | ----------- | ------- |
| event_name | A Facebook pixel Standard Event or Custom Event name. *Required*. | `Purchase` |
| event_time | A Unix timestamp in seconds indicating when the actual event occurred. *Required* | `1571681746` |
| event_source_url | The browser URL where the event happened. | `www.yourpage.com/checkout` |
| event_id | This ID can be any string chosen by the advertiser. It is used by Facebook to deduplicate the same event sent from both server and browser. | `purchase_123` |

### User parameters
Identifiers Facebook can use for targeted attribution. You *should not* hash user data. This script will do it for you.

| Name      | Description | Example |
| ----------- | ----------- | ------- | 
| user.email | An email address. | `johnsmith@example.com` |
| user.phone | A phone number. Include only digits with country code, area code, and number. | `16505551212 ` |
| user.gender | Gender, in lowercase. Either 'f' or 'm'. | `f` | 
| user.first_name | A first name in lowercase. | `joe` |
| user.city | A city in lower-case without spaces or punctuation. | `menlopark` | 

### Custom parameters 
Use these parameters to send additional data we can use for ads delivery optimization.

| Name | Description | Example |
| ----------- | ----------- | ------- |
| custom.value | A numeric value associated with this event. This could be a monetary value or a value in some other metric. | `142.54 ` | 
| custom.currency | The currency for the value specified, if applicable. Currency must be a valid [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217?fbclid=IwAR2MiY7PlfS6aSCczvsgg_Yo9znWzKnwvjEPdSLK3Z2gES--1lb_Rj1K8DY) three digit currency code. | `USD` | 
| custom.content_name | The name of the page or product associated with the event. | `lettuce` |
| custom.content_category | The category of the content associated with the event. | `grocery` | 
| custom.order_id | The order ID for this transaction. | `order_1234`
| custom.predicted_ltv | The predicted lifetime value of a conversion event. | `432.12` | 


