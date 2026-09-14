import express from "express";
import { pacientesRouter } from "./routes/PacienteRoute.js";
import { citasRouter } from "./routes/CitasRoute.js";
import { usuarioRouter } from "./routes/UsuarioRoute.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { createToken } from "../test/helpers/createToken.js";

export const app = express();
app.use(express.json());
app.use(pacientesRouter);
app.use(citasRouter);
app.use(usuarioRouter);

app.post("/test-token", async (req, res) => {
    let token = await createToken();

    res.json({
        token: `${token}`
    });
})

app.use(errorHandler);

