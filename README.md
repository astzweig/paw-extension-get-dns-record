# Get DNS Record Dynamic Value (Paw Extension)

A [Paw Extension](https://paw.cloud/docs/extensions/index) to get DNS record values of a user specified domain. It uses [nslookup.io](https://nslookup.io) to get the DNS records.

## Installation
While we are waiting for this extension to be added to the official [Extension list](https://paw.cloud/extensions/), this extension can be installed manually

### Manual installation
Find out where your _Extensions Directory_ is by going to the app `Preferences ‣ Extensions`. There you should see your path:

<img srcset="https://cdn-docs-images.paw.cloud/open-extensions-dir-7cbbad49a4193ba04b2c60d5796ce9e7.png 1x,https://cdn-docs-images.paw.cloud/open-extensions-dir-d5da15ecb5c1e42a3ddb020fe4e06af2-@2x.png 2x" src="https://cdn-docs-images.paw.cloud/open-extensions-dir-7cbbad49a4193ba04b2c60d5796ce9e7.png">

Open up `Terminal` and type in:

```bash
$ cd <path to your extensions folder>
$ git clone https://github.com/astzweig/paw-extension-get-dns-record.git ./com.astzweig.GetDNSRecord
```
