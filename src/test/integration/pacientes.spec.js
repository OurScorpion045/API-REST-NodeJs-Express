import supertest from "supertest";
import { app } from "../../app.js"

describe('GET /pacientes', () => {

    test('Should respond with a 200 status code and the JSON patients data', async () => {
        const response = await supertest(app).get('/pacientes').send()
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('Should respond with a 200 status code and the JSON patient data register by the id', async() => {
        const response = await supertest(app).get('/pacientes/:id').send()
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe('POST /pacientes', () => {
    
    test('Should respond with a 200 status code and a message in JSON about the patient was inserted correctly', async() => {
        const response = await supertest(app).post('/pacientes').send()
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe('PUT /pacientes/:id', () => {

    test('Should respond with a 200 status code and a message in JSON about the patient was updated correctly', async() => {
        const response = await supertest(app).put('/pacientes/:id').send()
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe('DELETE /pacientes/:id', () => {

    test('Should respond with a 200 status code and a message in JSON about the patient was deleted correctly', async() => {
        const response = await supertest(app).delete('/pacientes/:id').send()
        expect(response.statusCode).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(Array.isArray(response.body)).toBe(true);
    })
})