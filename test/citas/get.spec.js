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

describe("GET /citas", () => {

    test("Should responde with a status code 200 and the array of the citas written in a json format", async () => {
        const token = await createToken("test@gmail.com", "123456");
        const response = await request.get("/citas").set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Should return a 401 status code and a JSON format message which says "Error en el token" when token is not provided', async () => {
        const response = await request.get("/citas/");
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Error en el token");
        expect(response.type).toMatch(/json/);
    })

    test('Should return a 401 status code and a JSON format message which says "Token invalido o expirado" when token is expired or modified', async () => {
        const token = "modified_or_expired_token";
        const response = await request.get("/citas/").set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Token invalido o expirado");
        expect(response.type).toMatch(/json/);

    })

});

describe("GET /citas/:id", () => {
    test("Should respond with a status code 200 and the cita's information written in json format according the id", async () => {
        const token = await createToken("test@gmail.com", "123456");
        const response = await request.get("/citas/1").set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
    });

    test("Should respond with a status code 404 and a JSON message which says 'Cita no encontrada'", async () => {
        const token = await createToken("test@gmail.com", "123456");
        const response = await request.get("/citas/999").set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(404);
        expect(response.type).toMatch(/json/);
        expect(response.body.error).toBe("Cita no encontrada");
    });

    test('Should return a 401 status code and a JSON format message which says "Error en el token" when token is not provided', async () => {
        const response = await request.get("/citas/1");
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Error en el token");
        expect(response.type).toMatch(/json/);
    })

    test('Should return a 401 status code and a JSON format message which says "Token invalido o expirado" when token is expired or modified', async () => {
        const token = "modified_or_expired_token";
        const response = await request.get("/citas/1").set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Token invalido o expirado");
        expect(response.type).toMatch(/json/);

    })
})