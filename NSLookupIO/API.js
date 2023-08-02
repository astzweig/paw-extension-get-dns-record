const DataView = require("NSLookupIO/ResponseDataView.js")

const NSLookupIOAPI = function(domain) {
  this.domain = domain
  this.data = undefined

  this.sendRequest = function() {
    const httpRequest = new NetworkHTTPRequest()
    httpRequest.setRequestHeader("Content-Type", "application/json")
    httpRequest.requestUrl = "https://www.nslookup.io/api/v1/records"
    httpRequest.requestMethod = "POST"
    httpRequest.requestBody = `{"domain": "${this.domain}", "dnsServer": "cloudflare"}`
    console.log("Sending request with data", httpRequest.requestBody)
    httpRequest.requestTimeout = 3600000
    httpRequest.send()

    if (httpRequest.responseStatusCode != 200) {
      throw `nslookup.io did not answer successfully. Status code was ${httpRequest.responseStatusCode}`
    }

    console.log("Got response from nslookup.io", httpRequest.responseBody)
    this.parseResponseToJSON(httpRequest.responseBody)
  }

  this.parseResponseToJSON = function(response) {
    const json = JSON.parse(response)
    if (!json.records) {
      throw `No DNS records found`
    }
    this.data = json.records
  }

  this.getValueForRecordType = function(recordType) {
    let data = new DataView(this.data, recordType)
    data.getRecordPayload()
      .getResponseForRecord()
      .getFirstAnswerOfResponse()
      .getPayloadOfAnswer()
      .getValueOfPayload()
    return data.dataView
  }
}

module.exports = NSLookupIOAPI
