import supertest from "supertest";
import { app } from "../../src/app.js";
import { resetCitas } from "../helpers/resetCitas.js";
import { closeConnection } from "../helpers/closeConnection.js";
import { citaJson } from "../fixtures/cita.js";

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
});