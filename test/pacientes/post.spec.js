import supertest from "supertest";
import { app } from "../../src/app.js";
import { resetDatabase } from "../helpers/resetDatabase.js";
import { closeConnection } from "../helpers/closeConnection.js";
import { paciente } from "../fixtures/paciente.js";

beforeEach(resetDatabase);

afterAll(closeConnection);

const request = supertest(app);

describe('POST /pacientes', () => {
    
    test('Should respond with a 200 status code and a message in JSON about the patient was inserted correctly', async() => {
        const response = await request.post('/pacientes').send(paciente);
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(response.body.message).toBe("Paciente insertado correctamente");
    });
});