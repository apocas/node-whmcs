class WhmcsError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
  }

  setHttpCode(httpCode) {
    this.httpCode = httpCode;
  }
}

module.exports = WhmcsError;