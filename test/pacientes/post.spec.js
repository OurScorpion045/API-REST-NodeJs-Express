import supertest from "supertest";
import { app } from "../../src/app.js";
import { resetPacientes } from "../helpers/resetPacientes.js";
import { closeConnection } from "../helpers/closeConnection.js";
import { paciente, pacienteEmpty } from "../fixtures/paciente.js";
import { createToken } from "../helpers/createToken.js";

const request = supertest(app);

beforeEach(async () => {
    await resetPacientes();
});

afterAll(closeConnection);

describe('POST /pacientes', () => {
    
    test('Should respond with a 201 status code and a message in JSON about the patient was inserted correctly', async() => {
        const token = await createToken("test@gmail.com", "123456");
        const response = await request.post('/pacientes').send(paciente).set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(201);
        expect(response.type).toMatch(/json/);
        expect(response.body.message).toBe("Paciente insertado correctamente");
    });

    test('Should respond with a 400 status code and a message in JSON which says "Datos invalidos"', async() => {
        const token = await createToken("test@gmail.com", "123456");
        const response = await request.post('/pacientes').send(pacienteEmpty).set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(400);
        expect(response.type).toMatch(/json/);
        expect(response.body.error).toBe("Datos inválidos");
    });

    test('Should return a 401 status code and a JSON format message which says "Error en el token" when token is not provided', async () => {
        const response = await request.post("/pacientes/");
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Error en el token");
        expect(response.type).toMatch(/json/);
    })

    test('Should return a 401 status code and a JSON format message which says "Token invalido o expirado" when token is expired or modified', async () => {
        const token = "modified_or_expired_token";
        const response = await request.post("/pacientes/").set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Token invalido o expirado");
        expect(response.type).toMatch(/json/);

    })
});
