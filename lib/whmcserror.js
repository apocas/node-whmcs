class WhmcsError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.stack = (new Error()).stack;
  }

  setHttpCode(httpCode) {
    this.httpCode = httpCode;
  }
}

module.exports = WhmcsError;