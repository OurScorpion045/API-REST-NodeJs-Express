import supertest from "supertest";
import { app } from "../../src/app.js";
import { resetCitas } from "../helpers/resetCitas.js";
import { resetPacientes } from "../helpers/resetPacientes.js";
import { closeConnection } from "../helpers/closeConnection.js";
import { createToken } from "../helpers/createToken.js";

const request = supertest(app);

beforeEach(async () => {
    await resetCitas();
    await resetPacientes();
});
afterAll(closeConnection);

describe("DELETE /citas/:id", () => {

    test('Should return a 204 status code and a json message which says "Cita eliminada correctamente"', async () => {
        const token = await createToken("test@gmail.com", "123456");
        const response = await request.delete('/citas/1').set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(204);
        expect(response.body.message).toBe();
    });

    test('Should return a 404 status code and a JSON format message which says "Cita no encontrada"', async () => {
        const token = await createToken("test@gmail.com", "123456");
        const response = await request.delete('/citas/999').set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe("Cita no encontrada");
        expect(response.type).toMatch(/json/);
    })

    test('Should return a 401 status code and a JSON format message which says "Error en el token" when token is not provided', async () => {
        const response = await request.delete("/citas/1");
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Error en el token");
        expect(response.type).toMatch(/json/);
    })

    test('Should return a 401 status code and a JSON format message which says "Token invalido o expirado" when token is expired or modified', async () => {
        const token = "modified_or_expired_token";
        const response = await request.delete("/citas/1").set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Token invalido o expirado");
        expect(response.type).toMatch(/json/);
    })
});