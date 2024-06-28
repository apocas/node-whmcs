class WhmcsError extends Error {
  #httpStatus = null;
  #headers = null;
  #message = null;

  constructor(message, httpStatus, headers) {
    super(message);
    this.name =  this.constructor.name;
    this.message = message;
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