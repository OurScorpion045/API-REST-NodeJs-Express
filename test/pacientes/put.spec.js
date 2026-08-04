import supertest from "supertest";
import { app } from "../../src/app.js";
import { resetDatabase } from "../helpers/resetDatabase.js";
import { closeConnection } from "../helpers/closeConnection.js";

beforeEach(resetDatabase);

afterAll(closeConnection);

const request = supertest(app);

describe(`PUT /pacientes/:id`, () => {

    test('Should respond with a 200 status code and a message in JSON about the patient was updated correctly', async() => {
        const response = await request.put('/pacientes/1').send({
            DNI: "F000000013",
            Nombre: "Martin Lopez",
            Direccion: "Calle de pruebas 12",
            CodigoPostal: "20012",
            Telefono: "623281567",
            Genero: "H",
            FechaNacimiento: "1987-11-30",
            Correo: "Paciente12@gmail.com"
        })
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(response.body.message).toBe("Paciente actualizado correctamente");
    });
});