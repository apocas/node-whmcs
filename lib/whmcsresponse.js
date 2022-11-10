class WhmcsResponse {
  #headers = null;
  #httpStatus = null;
  #body = null;

  constructor(body, httpStatus, headers) {
    if (body == undefined || !body.constructor || body.constructor != ({}).constructor) {
      throw new Error('Invalid response body');
    }
    this.#body = body;
    this.#httpStatus = httpStatus;
    this.#headers = headers;
  }

  getHttpStatus() {
    return this.#httpStatus;
  }

  getHeaders() {
    return this.#headers;
  }

  get(key) {
    return this.#body[key];
  }

  getBody() {
    return this.#body;
  }
}

module.exports = WhmcsResponse;