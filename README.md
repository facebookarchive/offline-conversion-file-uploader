# Offline Conversion Automated Uploader
Offline Conversion Automated Uploader is a command line tool that helps Facebook advertisers and marketing partners upload offline transactions and Custom Audience to the [Facebook marketing API](https://developers.facebook.com/docs/marketing-api/offline-conversions) without building their own application for API Integration.

## Why use this tool?
* Building API integration will require engineering resources. Typically, an engineer without experience working with our Facebook marketing API will need about 3 weeks for development and testing.
* In order to achieve the best possible match between your customers and Facebook users, the data needs to be normalized and hashed correctly. MDFU tool uses the libraries written by Facebook to ensure the best possible match rate.
* For any issues with this tool, you will get support from Facebook.
* This tool will be updated periodically to support more features.

## How to use

- **Offline Events**: Please see [this guide](https://github.com/facebookincubator/offline-conversion-file-uploader/tree/master/offline-events/README.md) for upload instructions
- **Custom Audiences**: Please see [this guide](https://github.com/facebookincubator/offline-conversion-file-uploader/tree/master/custom-audience/README.md) for upload instructions.

## FAQ:

### Q: There's another tool called MDFU, which one should I use?

We previously built a tool named [MDFU](https://github.com/facebookincubator/marketing-data-file-uploader) with similar functionality.
Use this tool whenever possible, the MDFU will be deprecated soon. This tool provides the following additional functionality:

* It generates a report to help troubleshooting issues with your data file.
* It is more robust, because it uses the battle-proven uploader core that is used in the web version.
* It supports separating upload and preprocessing into two steps, so you can verify that data is hashed properly before sending to Facebook.
* It supports a validate command which does a dry-run on some sample rows of your data file, so you have a chance to fix the issue before sending them to Facebook. (For offline events upload only)
* It supports resuming, so you can upload same file again without causing duplications. (For offline events upload only)

### Q: My company has firewall which will block API calls to Facebook. What are my options?

- Whitelist Facebook IP's: Contact your security team to whitelist IP addresses returned by this command:

  ```
  whois -h whois.radb.net -- '-i origin AS32934' | grep ^route
  ```

  For more information, please refer to [this guide](https://developers.facebook.com/docs/sharing/webmasters/crawler) which explains whitelisting for Facebook crawlers, but the same set of IP's are used for API servers.

- Request your security team to create DMZ where outbound HTTP request is allowed.

### Q: How this tool works?

This is a node.js application that will go through following steps to upload your offline conversions to Facebook's marketing API. Here is how the tool uploads data:

1. Read configurations.
2. Read input file in stream.
3. For each line read, columns are normalized and hashed for upload.
4. Collect normalized and hashed data into batches.
5. POST each batch to the API endpoint.

## License
Facebook Offline Conversion Automated Uploader is BSD-licensed. We also provide an additional patent grant.
