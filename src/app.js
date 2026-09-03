import express from "express";
import { pacientesRouter } from "./routes/PacienteRoute.js";
import { citasRouter } from "./routes/CitasRoute.js";
import { usuarioRouter } from "./routes/UsuarioRoute.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { AppError } from "./errors/AppError.js";
import { NotFoundError } from "./errors/NotFoundError.js";
import { ConflictError } from "./errors/ConflictError.js";
import { ValidationError } from "./errors/ValidationError.js";

export const app = express();
app.use(express.json());
app.use(pacientesRouter);
app.use(citasRouter);
app.use(usuarioRouter);

app.get("/error-test", async (req, res) => {
    throw new Error("Error ocasionado intencionalmente");
})

app.get("/prueba-errores", async (req, res) => {
    const notFound = new NotFoundError("No encontrado");
    const conflict = new ConflictError("Conflicto");
    const validation = new ValidationError("Datos invalidos");
    const normal = new Error("Error normal");

    console.log(notFound instanceof Error);
    console.log(conflict instanceof Error);
    console.log(validation instanceof Error);
    console.log(normal instanceof Error);

    res.status(200).json({
        message: "Fin de prueba"
    });
})

app.use(errorHandler);

