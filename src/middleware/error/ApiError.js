class ApiError {

    constructor(code, message) {
        this.statusError = code;
        this.message = message;
    }

    static badRequest(msg) {
        return new ApiError(400, msg);
    }

    static notFoundRequest(msg) {
        return new ApiError(404, msg);
    }

    static internalError(msg) {
        return new ApiError(500, msg);
    }
}