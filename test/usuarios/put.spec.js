import supertest from "supertest";
import { app } from "../../src/app.js";
import { resetUsuarios } from "../helpers/resetUsuarios.js";
import { closeConnection } from "../helpers/closeConnection.js";
import { usuarioJsonUpdate } from "../fixtures/usuario";

const request = supertest(app);

beforeEach(resetUsuarios);

afterAll(closeConnection);

describe("PUT /usuarios/:id", () => {

    test("Should return a 200 status code and a message in JSON format which says 'Usuario actualizado correctamente'", async () => {
        const response = await request.put("/usuarios/1").send(usuarioJsonUpdate);
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(response.body.message).toBe("Usuario actualizado correctamente");
    });
});