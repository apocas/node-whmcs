class WhmcsError extends Error {
  constructor(message) {
    super(message);
    this.name = "WhmcsError";
    this.stack = (new Error()).stack;
  }

  setHttpCode(httpCode) {
    this.httpCode = httpCode;
  }
}

module.exports = WhmcsError;