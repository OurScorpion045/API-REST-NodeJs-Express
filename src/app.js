import express from "express";
import { pacientesRouter } from "./routes/PacienteRoute.js";
import { citasRouter } from "./routes/CitasRoute.js";
import { usuarioRouter } from "./routes/UsuarioRoute.js";

export const app = express();
app.use(express.json());
app.use(pacientesRouter);
app.use(citasRouter);
app.use(usuarioRouter);

