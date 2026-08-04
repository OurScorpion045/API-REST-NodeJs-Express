import supertest from "supertest";
import { app } from "../../src/app.js";
import { resetDatabase } from "../helpers/resetDatabase.js";
import { closeConnection } from "../helpers/closeConnection.js";

beforeEach(resetDatabase);

afterAll(closeConnection);

const request = supertest(app);

describe(`DELETE /pacientes/:id`, () => {

    test('Should respond with a 200 status code and a message in JSON about the patient was deleted correctly', async() => {
        const response = await request.delete('/pacientes/1').send()
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(response.body.message).toBe("Paciente eliminado correctamente");
    });
});