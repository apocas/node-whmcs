class WhmcsError extends Error {
  #httpStatus = null;
  #headers = null;
  #message = null;

  constructor(message, httpStatus, headers) {
    super(message);
    this.name = "WhmcsError";
    this.stack = (new Error()).stack;
    this.#message = message;
    this.#httpStatus = httpStatus;
    this.#headers = headers;
  }

  getMessage() {
    return this.#message;
  }
  
  getHttpStatus() {
    return this.#httpStatus;
  }

  getHeaders() {
    return this.#headers;
  }
}

module.exports = WhmcsError;