import supertest from "supertest";
import { app } from "../../src/app.js";
import { resetUsuarios } from "../helpers/resetUsuarios.js";
import { closeConnection } from "../helpers/closeConnection.js";
import { createToken } from "../helpers/createToken.js";

const request = supertest(app);

beforeEach(async () => {
    await resetUsuarios();
});


afterAll(closeConnection);

describe("GET /usuarios/", () => {

    test('Should return a 200 status code and an array of the usuarios in JSON format', async () => {
        const token = await createToken("test@gmail.com", "123456");
        const response = await request.get("/usuarios/").set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('Should return a 403 status code and a JSON format message which says "Acceso denegado"', async () => {
        const token = await createToken("usuario1@gmail.com", "usuario1");
        const response = await request.get("/usuarios/").set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(403);
        expect(response.body.error).toBe("Acceso denegado");
        expect(response.type).toMatch(/json/);
    });

    test('Should return a 401 status code and a JSON format message which says "Error en el token" when token is not provided', async () => {
        const response = await request.get("/usuarios/");
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Error en el token");
        expect(response.type).toMatch(/json/);
    })

    test('Should return a 401 status code and a JSON format message which says "Token invalido o expirado" when token is expired or modified', async () => {
        const token = "modified_or_expired_token";
        const response = await request.get("/usuarios/").set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Token invalido o expirado");
        expect(response.type).toMatch(/json/);

    })
});

describe("GET /usuarios/:id", () => {

    test('Should return a 200 status code and the user data in JSON format', async () => {
        const token = await createToken("test@gmail.com", "123456");
        const response = await request.get("/usuarios/2").set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('Should return a 404 status code and a JSON format message which says "Usuario no encontrado"', async () => {
        const token = await createToken("test@gmail.com", "123456");
        const response = await request.get("/usuarios/999").set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe("Usuario no encontrado");
        expect(response.type).toMatch(/json/);
    });

        test('Should return a 403 status code and a JSON format message which says "Acceso denegado"', async () => {
        const token = await createToken("usuario1@gmail.com", "usuario1");
        const response = await request.get("/usuarios/2").set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(403);
        expect(response.body.error).toBe("Acceso denegado");
        expect(response.type).toMatch(/json/);
    });

    test('Should return a 401 status code and a JSON format message which says "Error en el token" when token is not provided', async () => {
        const response = await request.get("/usuarios/2");
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Error en el token");
        expect(response.type).toMatch(/json/);
    })

    test('Should return a 401 status code and a JSON format message which says "Token invalido o expirado" when token is expired or modified', async () => {
        const token = "modified_or_expired_token";
        const response = await request.get("/usuarios/2").set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Token invalido o expirado");
        expect(response.type).toMatch(/json/);

    })
})