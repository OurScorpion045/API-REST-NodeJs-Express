import supertest from "supertest";
import { app } from "../../src/app.js";
import { resetUsuarios } from "../helpers/resetUsuarios.js";
import { closeConnection } from "../helpers/closeConnection.js";

const request = supertest(app);

beforeEach(resetUsuarios);

afterAll(closeConnection)

describe("DELETE /usuarios/:id", () => {

    test("Should return with a 200 status code and a message in JSON format which says 'Usuario eliminado correctamente'", async () => {
        const response = await request.delete('/usuarios/1');
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(response.body.message).toBe("Usuario eliminado correctamente");
    });
});