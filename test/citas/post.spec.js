import supertest from "supertest";
import { app } from "../../src/app.js";
import { resetCitas } from "../helpers/resetCitas.js";
import { closeConnection } from "../helpers/closeConnection.js";
import { citaJson, citaJsonEmpty } from "../fixtures/cita.js";

const request = supertest(app);

beforeEach(resetCitas);

afterAll(closeConnection);

describe("POST /citas", () => {

    test("Should return a 201 status code and a json message which says 'cita insertada correctamente'", async () => {
        const response = await request.post("/citas").send(citaJson);
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("Cita insertada correctamente");
        expect(response.type).toMatch(/json/);
    });

    test("Should return a 400 status code and a JSON message which says 'Campos obligatorios vacios'", async () => {
        const response = await request.post("/citas").send(citaJsonEmpty);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Campos obligatorios vacios");
        expect(response.type).toMatch(/json/);
    });
});