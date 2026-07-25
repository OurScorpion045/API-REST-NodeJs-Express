import supertest from "supertest";
import { app } from "../../index.js";

describe('GET /pacientes', () => {

    test('Should respoind with a 200 status code', async () => {
        const response = await supertest(app).get('/pacientes').send()
        console.log(response);
    });
})