class ControllerResponse {
    constructor(message, data, error, status) {
        this.message = message;
        this.data = data;
        this.error = error;
        this.status = status;
    }

    static success(message, data) {
        return new ControllerResponse(message, data, null, 200);
    }

    static notFound(message, data) {
        return new ControllerResponse(message, data, null, 404);
    }

    static notAuthorized(message, data) {
        return new ControllerResponse(message, data, null, 401);
    }

    static conflict(message, data) {
        return new ControllerResponse(message, data, null, 409);
    }

    static badRequest(message, error) {
        return new ControllerResponse(message, null, error, 400);
    }

    static error(message, error) {
        return new ControllerResponse(message, null, error, 500);
    }
}

export default ControllerResponse
