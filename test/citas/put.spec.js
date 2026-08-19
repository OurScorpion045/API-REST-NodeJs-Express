import supertest from "supertest";
import { app } from "../../src/app.js";
import { resetCitas } from "../helpers/resetCitas.js";
import { closeConnection } from "../helpers/closeConnection.js";
import { citaJsonUpdate, citaJsonEmpty } from "../fixtures/cita.js";

const request = supertest(app);

beforeEach(resetCitas);

afterAll(closeConnection);

describe("PUT /citas/:id", () => {

    test('Should return a 200 status code and a json message which says "Cita actualizada correctamente"', async () => {
        const response = await request.put("/citas/1").send(citaJsonUpdate);
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(response.body.message).toBe("Cita actualizada correctamente");
    });

    test('should return a 400 status code and a JSON format message which says "Campos obligatorios vacios"', async () => {
        const response = await request.put("/citas/1").send(citaJsonEmpty);
        expect(response.statusCode).toBe(400);
        expect(response.type).toMatch(/json/);
        expect(response.body.message).toBe("Campos obligatorios vacios");
    });

    test('should return a 404 status code and a JSON format message which says "Cita no encontrada"', async () => {
        const response = await request.put("/citas/999").send(citaJsonUpdate);
        expect(response.statusCode).toBe(404);
        expect(response.type).toMatch(/json/);
        expect(response.body.message).toBe("Cita no encontrada");
    })
});