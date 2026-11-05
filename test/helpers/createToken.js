import supertest from "supertest";
import { app } from "../../src/app.js";

export const createToken = async (user, password) => {
    const request = supertest(app);
    const response = await request.post("/login").send(
        {
            Usuario: user,
            Password: password
        }
    )

    let token = response.body.token;
    return token;
}