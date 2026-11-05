import { AppError } from "./AppError.js";

export class TooManyRequest extends AppError {
    
    constructor(message) {
        super(message, 429);
    }
}