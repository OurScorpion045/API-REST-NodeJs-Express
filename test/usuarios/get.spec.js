import supertest from "supertest";
import { app } from "../../src/app.js";
import { resetUsuarios } from "../helpers/resetUsuarios.js";
import { closeConnection } from "../helpers/closeConnection.js";

const request = supertest(app);

beforeEach(resetUsuarios);

afterAll(closeConnection);

describe("GET /usuarios/:id", () => {

    test('Should return a 200 status code and an array of the usuarios in JSON format', async () => {
        const response = await request.get("/usuarios/");
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('Should return a 200 status code and the user data in JSON format', async () => {
        const response = await request.get("/usuarios/1");
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(Array.isArray(response.body)).toBe(true);
    })
})