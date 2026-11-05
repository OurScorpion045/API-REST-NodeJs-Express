import { AppError } from "../errors/AppError.js";

export const errorHandler = (err, req, res, next) => {
    console.error(err);

    let statusCode;
    let message;

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    } else {
        statusCode = 500;
        message = "Internal Server Error";
    }

    res.status(statusCode).json({
        error: message
    });
};