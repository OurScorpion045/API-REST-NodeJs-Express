import supertest from "supertest";
import { app } from "../../src/app.js";
import { resetPacientes } from "../helpers/resetPacientes.js";
import { closeConnection } from "../helpers/closeConnection.js";
import { createToken } from "../helpers/createToken.js";

const request = supertest(app);

beforeEach(async () => {
    await resetPacientes();
});

afterAll(closeConnection);

describe(`DELETE /pacientes/:id`, () => {

    test('Should respond with a 204 status code and a message in JSON about the patient was deleted correctly', async() => {
        const token = await createToken("test@gmail.com", "123456");
        const response = await request.delete('/pacientes/1').set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(204);
        expect(response.body.message).toBe();
    });

    test('Should respond with a 404 status code and a message in JSON format which says "Paciente no encontrado"', async() => {
        const token = await createToken("test@gmail.com", "123456");
        const response = await request.delete('/pacientes/999').set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe("Paciente no encontrado");
    });

        test('Should return a 401 status code and a JSON format message which says "Error en el token" when token is not provided', async () => {
        const response = await request.delete("/pacientes/1");
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Error en el token");
        expect(response.type).toMatch(/json/);
    })

    test('Should return a 401 status code and a JSON format message which says "Token invalido o expirado" when token is expired or modified', async () => {
        const token = "modified_or_expired_token";
        const response = await request.delete("/pacientes/1").set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Token invalido o expirado");
        expect(response.type).toMatch(/json/);

    })
});