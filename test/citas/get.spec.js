import supertest from "supertest";
import { app } from "../../src/app.js";
import { citaJson } from "../fixtures/cita.js";
import { resetCitas } from "../helpers/resetCitas.js";
import { closeConnection } from "../helpers/closeConnection.js";

beforeEach(resetCitas);

afterAll(closeConnection);

const request = supertest(app);

describe("GET /citas", () => {

    test("Should responde with a status code 200 and the array of the citas written in a json format", async () => {
        const response = await request.get("/citas");
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("Should respond with a status code 200 and the cita's information written in json format according the id", async () => {
        const response = await request.get("/citas/1");
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("Should respond with a status code 404 and a JSON message which says 'Cita no encontrada'", async () => {
        const response = await request.get("/citas/999");
        expect(response.statusCode).toBe(404);
        expect(response.type).toMatch(/json/);
        expect(response.body.message).toBe("Cita no encontrada");
    });
});