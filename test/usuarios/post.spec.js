import supertest from "supertest";
import { app } from "../../src/app.js";
import { resetUsuarios } from "../helpers/resetUsuarios.js";
import { closeConnection } from "../helpers/closeConnection.js";
import { usuarioJson, usuarioJsonEmpty, usuarioJsonRepeated } from "../fixtures/usuario.js";
import { createToken } from "../helpers/createToken.js";

const request = supertest(app);

beforeEach(async () => {
    await resetUsuarios();
});

afterAll(closeConnection);

describe("POST /usuarios/", () => {

    test("Should return a 201 status code and a json message which says 'Usuario insertado correctamente'", async () => {
        const token = await createToken("test@gmail.com", "123456");
        const response = await request.post("/usuarios").set('Authorization', `Bearer ${token}`).send(usuarioJson);
        expect(response.statusCode).toBe(201);
        expect(response.type).toMatch(/json/);
        expect(response.body.message).toBe("Usuario insertado correctamente");
    });

    test("Should return a 400 status code and a json message which says 'Campos obligatorios vacios'", async () => {
        const token = await createToken("test@gmail.com", "123456");
        const response = await request.post("/usuarios").set('Authorization', `Bearer ${token}`).send(usuarioJsonEmpty);
        expect(response.statusCode).toBe(400);
        expect(response.type).toMatch(/json/);
        expect(response.body.error).toBe("Datos inválidos");
    });

    test('Should return a 403 status code and a JSON format message which says "Acceso denegado"', async () => {
        const token = await createToken("usuario1@gmail.com", "usuario1");
        const response = await request.post("/usuarios/").set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(403);
        expect(response.body.error).toBe("Acceso denegado");
        expect(response.type).toMatch(/json/);
    });

    test('Should return a 401 status code and a JSON format message which says "Error en el token" when token is not provided', async () => {
        const response = await request.post("/usuarios/");
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Error en el token");
        expect(response.type).toMatch(/json/);
    })

    test('Should return a 401 status code and a JSON format message which says "Token invalido o expirado" when token is expired or modified', async () => {
        const token = "modified_or_expired_token";
        const response = await request.post("/usuarios/").set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Token invalido o expirado");
        expect(response.type).toMatch(/json/);

    })

    test('Should return a 409 status code and a JSON format message which says "Un usuario ya existe con esa direccion de correo electronico"', async () => {
        const token = await createToken("test@gmail.com", "123456");
        const response = await request.post("/usuarios/").set('Authorization', `Bearer ${token}`).send(usuarioJsonRepeated);
        expect(response.statusCode).toBe(409);
        expect(response.body.error).toBe("Un usuario ya existe con esa direccion de correo electronico");
        expect(response.type).toMatch(/json/);
    })
});