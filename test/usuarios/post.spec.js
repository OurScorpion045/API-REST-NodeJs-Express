import supertest from "supertest";
import { app } from "../../src/app.js";
import { resetUsuarios } from "../helpers/resetUsuarios.js";
import { closeConnection } from "../helpers/closeConnection.js";
import { usuarioJson } from "../fixtures/usuario.js";

const request = supertest(app);

beforeEach(resetUsuarios);

afterAll(closeConnection);

describe("POST /usuarios/", () => {

    test("Should return a 201 status code and a json message which says 'Usuario insertado correctamente'", async () => {
        const response = await request.post("/usuarios").send(usuarioJson);
        expect(response.statusCode).toBe(201);
        expect(response.type).toMatch(/json/);
        expect(response.body.message).toBe("Usuario insertado correctamente");
    })
})