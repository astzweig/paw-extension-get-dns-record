const API = require("./NSLookupIO/API.js")

class GetDNSRecord {
  static identifier = "com.astzweig.GetDNSRecord"
  static title = "Get DNS record"
  static inputs = [
    InputField("domain", "Domain to lookup", "String"),
    InputField("recordType", "DNS record type to lookup", "Select", {
      "choices": {
        "a": "A",
        "aaaa": "AAAA",
        "cname": "CNAME",
        "txt": "TXT",
        "ns": "NS",
        "mx": "MX",
        "soa": "SOA"
      }
    })
  ]

  title(context) {
      return `Get value of DNS record of ${this.domain}`;
  }

  text(context) {
      return this.value;
  }

  evaluate(context) {
    try {
      this.#validateInputValues()
    } catch(errorMessage) {
      return errorMessage
    }

    try {
      let records = this.#getDNSRecordsFromAPI()
      this.value = records.getValueForRecordType(this.recordType)
    } catch(errorMessage) {
      console.error(errorMessage)
      return `Could not get IP address of ${this.domain}`
    }
    return this.value;
  }

  #validateInputValues() {
    this.#checkDomain()
    this.#checkRecordType()
  }

   #checkDomain() {
    const parts = this.domain.split('.')
    if (parts.length < 2) throw `${this.domain} has no top level domain`
    if (parts[1].length < 2) throw `Top level domain of ${this.domain} is too short`
  }

  #checkRecordType() {
    if (!this.recordType) throw `Please select a record type to retrieve for ${this.domain}`
  }

  #getDNSRecordsFromAPI() {
    let api = new API(this.domain)
    api.sendRequest()
    return api
  }
}

module.exports = GetDNSRecord
