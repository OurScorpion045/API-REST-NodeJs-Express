import supertest from "supertest";
import { app } from "../../src/app.js";
import { resetCitas } from "../helpers/resetCitas.js";
import { closeConnection } from "../helpers/closeConnection.js";

const request = supertest(app);

beforeEach(resetCitas);

afterAll(closeConnection);

describe("DELETE /citas/:id", () => {

    test('Should return a 204 status code and a json message which says "Cita eliminada correctamente"', async () => {
        const response = await request.delete('/citas/1');
        expect(response.statusCode).toBe(204);
        expect(response.body.message).toBe();
    });

    test('Should return a 404 status code and a JSON format message which says "Cita no encontrada"', async () => {
        const response = await request.delete('/citas/999');
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Cita no encontrada");
        expect(response.type).toMatch(/json/);
    })
});