import supertest from "supertest";
import { app } from "../../src/app.js";
import { resetPacientes } from "../helpers/resetPacientes.js";
import { closeConnection } from "../helpers/closeConnection.js";

beforeEach(resetPacientes);

afterAll(closeConnection);

const request = supertest(app);

describe(`DELETE /pacientes/:id`, () => {

    test('Should respond with a 200 status code and a message in JSON about the patient was deleted correctly', async() => {
        const response = await request.delete('/pacientes/1').send()
        expect(response.statusCode).toBe(204);
        expect(response.body.message).toBe();
    });
});