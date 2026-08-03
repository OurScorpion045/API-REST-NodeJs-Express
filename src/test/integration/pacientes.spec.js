import supertest from "supertest";
import { app } from "../../app.js"
import { pool } from "../../config/Database.js";

beforeAll(async () => {
    await pool.execute("DELETE FROM `pacientes`");
    await pool.execute("ALTER TABLE `pacientes` AUTO_INCREMENT = 1");
    await pool.execute("INSERT INTO `pacientes`(`DNI`, `Nombre`, `Direccion`, `CodigoPostal`, `Telefono`, `Genero`, `FechaNacimiento`, `Correo`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", ["F000000012", "Jon Doe", "Calle de pruebas 1", "20001", "1234567890", "H", "2001-01-01", "Paciente01@gmail.com"]);
})

afterAll(async () => {
    await pool.end();
});

const request = supertest(app);

describe('POST /pacientes', () => {
    
    test('Should respond with a 200 status code and a message in JSON about the patient was inserted correctly', async() => {
        const response = await request.post('/pacientes').send({
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
        expect(response.type).toBe(/json/);
        expect(response.body.message).toBe("Paciente insertado correctamente");
    });
});

describe('GET /pacientes', () => {

    test('Should respond with a 200 status code and the JSON patients data', async () => {
        const response = await request.get('/pacientes');
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Should respond with a 200 status code and the JSON patient data register by the id', async() => {
        const response = await request.get('/pacientes/1');
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });
});

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

describe(`DELETE /pacientes/:id`, () => {

    test('Should respond with a 200 status code and a message in JSON about the patient was deleted correctly', async() => {
        const response = await request.delete('/pacientes/1').send()
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(response.body.message).toBe("Paciente eliminado correctamente");
    });
});