import supertest from "supertest";
import { app } from "../../src/app.js";
import { resetCitas } from "../helpers/resetCitas.js";
import { resetPacientes } from "../helpers/resetPacientes.js";
import { closeConnection } from "../helpers/closeConnection.js";
import { citaJson, citaJsonEmpty } from "../fixtures/cita.js";
import { createToken } from "../helpers/createToken.js";

const request = supertest(app);

beforeEach(async () => {
    await resetCitas();
    await resetPacientes();
});
afterAll(closeConnection);

describe("POST /citas", () => {

    test("Should return a 201 status code and a json message which says 'cita insertada correctamente'", async () => {
        const token = await createToken("test@gmail.com", "123456");
        const response = await request.post("/citas").set('Authorization', `Bearer ${token}`).send(citaJson);
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("Cita insertada correctamente");
        expect(response.type).toMatch(/json/);
    });

    test("Should return a 400 status code and a JSON message which says 'Campos obligatorios vacios'", async () => {
        const token = await createToken("test@gmail.com", "123456");
        const response = await request.post("/citas").set('Authorization', `Bearer ${token}`).send(citaJsonEmpty);
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Datos inválidos");
        expect(response.type).toMatch(/json/);
    })

    test('Should return a 401 status code and a JSON format message which says "Error en el token" when token is not provided', async () => {
        const response = await request.post("/citas");
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Error en el token");
        expect(response.type).toMatch(/json/);
    })

    test('Should return a 401 status code and a JSON format message which says "Token invalido o expirado" when token is expired or modified', async () => {
        const token = "modified_or_expired_token";
        const response = await request.post("/citas").set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Token invalido o expirado");
        expect(response.type).toMatch(/json/);
    })
});