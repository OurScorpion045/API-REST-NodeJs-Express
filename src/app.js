import express from "express";
import { pacientesRouter } from "./routes/PacienteRoute.js";
import { citasRouter } from "./routes/CitasRoute.js";
import { usuarioRouter } from "./routes/UsuarioRoute.js";
import { errorHandler } from "./middleware/errorHandler.js";
import fs from "node:fs";
import YAML from "yaml";

const file = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file);

export const app = express();
app.use(express.json());
app.use(pacientesRouter);
app.use(citasRouter);
app.use(usuarioRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use(errorHandler);

