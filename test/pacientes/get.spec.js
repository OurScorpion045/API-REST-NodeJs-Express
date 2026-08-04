import supertest from "supertest";
import { app } from "../../src/app.js";
import { resetDatabase } from "../helpers/resetDatabase.js";
import { closeConnection } from "../helpers/closeConnection.js";

beforeEach(resetDatabase);
afterAll(closeConnection);

const request = supertest(app);

describe('GET /pacientes', () => {

    test('Should respond with a 200 status code and the JSON patients data', async () => {
        const response = await request.get('/pacientes');
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Should respond with a 200 status code and the JSON patient data register by the id', async() => {
        const response = await request.get('/pacientes/1');
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });
});