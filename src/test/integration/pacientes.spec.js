import supertest from "supertest";
import { app } from "../../app.js"
import { pool } from "../../config/Database.js";


describe('POST /pacientes', () => {
    
    test('Should respond with a 200 status code and a message in JSON about the patient was inserted correctly', async() => {
        await pool.execute("DELETE FROM `pacientes`");
        await pool.execute("ALTER TABLE `pacientes` AUTO_INCREMENT = 1");
        const response = await supertest(app).post('/pacientes').send({
            DNI: "F000000012",
            Nombre: "Martin Lopez",
            Direccion: "Calle de pruebas",
            CodigoPostal: "20012",
            Telefono: "623281567",
            Genero: "H",
            FechaNacimiento: "1987-11-30",
            Correo: "Paciente@gmail.com"
        })
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
    });
});

describe(`PUT /pacientes/1`, () => {

    test('Should respond with a 200 status code and a message in JSON about the patient was updated correctly', async() => {
        const response = await supertest(app).put('/pacientes/1').send({
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
    });
});

describe('GET /pacientes', () => {

    test('Should respond with a 200 status code and the JSON patients data', async () => {
        const response = await supertest(app).get('/pacientes');
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('Should respond with a 200 status code and the JSON patient data register by the id', async() => {
        const response = await supertest(app).get('/pacientes/1');
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe(`DELETE /pacientes/1`, () => {

    test('Should respond with a 200 status code and a message in JSON about the patient was deleted correctly', async() => {
        const response = await supertest(app).delete('/pacientes/1').send()
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
    })
})