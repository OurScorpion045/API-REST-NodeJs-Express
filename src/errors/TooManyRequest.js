import { AppError } from "./AppError";

export class TooManyRequest extends AppError {
    
    constructor(message) {
        super(message, 429);
    }
}