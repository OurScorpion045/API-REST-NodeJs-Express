import { jest, describe, test, expect} from "@jest/globals"
import { errorHandler } from "../../src/middleware/errorHandler"

describe("errorHandler", () => {

    test("Should respond with a 500 status code and a JSON format message which says 'Internal Server Error'", () => {

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error("Error de servidor");

        errorHandler(error,{},res, jest.fn());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: "Internal Server Error"
        });
    })
})