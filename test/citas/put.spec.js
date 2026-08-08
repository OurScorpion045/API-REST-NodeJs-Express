import supertest from "supertest";
import { app } from "../../src/app.js";
import { resetCitas } from "../helpers/resetCitas.js";
import { closeConnection } from "../helpers/closeConnection.js";
import { citaJsonUpdate } from "../fixtures/cita.js";

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
});