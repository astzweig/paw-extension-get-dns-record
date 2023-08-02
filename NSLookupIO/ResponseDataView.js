const ResponseDataView = function(response, recordType) {
  this.recordType = recordType
  this.dataView = response

  this.getRecordPayload = function() {
    if (!this.dataView[this.recordType]) {
      throw `No ${this.recordType} record`
    }
    this.dataView = this.dataView[recordType]
    return this
  }

  this.getResponseForRecord = function() {
    if (!this.dataView.response) {
      throw `No answers for ${this.recordType} record`
    }
    this.dataView = this.dataView.response
    return this
  }

  this.getFirstAnswerOfResponse = function() {
    if (this.dataView.rCode != "NOERROR") {
      throw `Answers for ${this.recordType} record have errors`
    }

    if (!this.dataView.answer ||
         this.dataView.answer.constructor != Array ||
         this.dataView.answer.length < 1) {
      throw `Answers for ${this.recordType} record are empty`
    }
    this.dataView = this.dataView.answer[0]
    return this
  }

  this.getPayloadOfAnswer = function() {
    if (!this.dataView.record) {
      throw `First answer for ${this.recordType} record has no payload`
    }
    this.dataView = this.dataView.record
    return this
  }

  this.getValueOfPayload = function() {
    if (!this.dataView.raw) {
      throw `First answer for ${this.recordType} record has no value`
    }
    this.dataView = this.dataView.raw
    return this
  }
}

module.exports = ResponseDataView
