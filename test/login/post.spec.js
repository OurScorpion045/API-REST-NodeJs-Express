import supertest from 'supertest';
import { app } from '../../src/app.js';
import { usuarioJWTCorrect, usuarioJWTIncorrect, usuarioJWTInvalid } from '../fixtures/usuario';
import { closeConnection } from '../helpers/closeConnection.js'; 
import { resetUsuarios } from '../helpers/resetUsuarios.js';

beforeEach(resetUsuarios);
afterAll(closeConnection);

const request = supertest(app);

describe('POST /login', () => {

    test('Should return a 201 status code and the new JWT', async () => {
        const response = await request.post('/login').send(usuarioJWTCorrect);
        expect(response.statusCode).toBe(201);
        expect(response.type).toMatch(/json/);
        expect(response.body).toHaveProperty("token");
        expect(typeof response.body.token).toBe("string");
    })

    test('Should return a 401 status code and a JSON message which says "Credenciales incorrectas"', async () => {
        const response = await request.post('/login').send(usuarioJWTIncorrect);
        expect(response.statusCode).toBe(401);
        expect(response.type).toMatch(/json/);
        expect(response.body.error).toBe("Credenciales incorrectas");
    })

    test('Should return a 401 status code and a JSON message which says "Credenciales invalidas"', async () => {
        const response = await request.post('/login').send(usuarioJWTInvalid);
        expect(response.statusCode).toBe(401);
        expect(response.type).toMatch(/json/);
        expect(response.body.error).toBe("Credenciales invalidas");
    })
});