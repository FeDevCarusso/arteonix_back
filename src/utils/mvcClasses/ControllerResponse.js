class ControllerResponse {
  constructor(message, data, error, status, done) {
    this.message = message;
    this.data = data;
    this.error = error;
    this.status = status;
    this.done = done;
  }

  static success(message, data, done) {
    return new ControllerResponse(message, data, null, 200, done);
  }

  static notFound(message, data, done) {
    return new ControllerResponse(message, data, null, 404, done);
  }

  static notAuthorized(message, data, done) {
    return new ControllerResponse(message, data, null, 401, done);
  }

  static conflict(message, data, done) {
    return new ControllerResponse(message, data, null, 409, done);
  }

  static badRequest(message, error, done) {
    return new ControllerResponse(message, null, error, 400, done);
  }

  static error(message, error, done) {
    return new ControllerResponse(message, null, error, 500, done);
  }
}

export default ControllerResponse;
