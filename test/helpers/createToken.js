import supertest from "supertest";
import { app } from "../../src/app.js";

const request = supertest(app);

export const createToken = async () => {
    const response = await request.post("/login").send(
        {
            Usuario: 'test@gmail.com',
            Password: '123456'
        }
    )

    let token = response.body.token;
    console.log(token);
    return token;
}