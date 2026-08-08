import supertest from "supertest";
import { app } from "../../src/app.js";
import { resetCitas } from "../helpers/resetCitas.js";
import { closeConnection } from "../helpers/closeConnection.js";

const request = supertest(app);

beforeEach(resetCitas);

afterAll(closeConnection);

describe("DELETE /citas/:id", () => {

    test('Should return a 200 status code and a json message which says "Cita eliminada correctamente"', async () => {
        const response = await request.delete('/citas/1');
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(response.body.message).toBe("Cita eliminada correctamente");
    });
});