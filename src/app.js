import express from "express";
import { pacientesRouter } from "./routes/PacienteRoute.js";
import { citasRouter } from "./routes/CitasRoute.js";
import { usuarioRouter } from "./routes/UsuarioRoute.js";
import { errorHandler } from "./middleware/errorHandler.js";
import fs from "node:fs";
import YAML from "yaml";
import swaggerUI from "swagger-ui-express"
import helmet from "helmet";

const file = fs.readFileSync('./src/swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file);

export const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(express.json({ limit: '100kb' }));
app.use(pacientesRouter);
app.use(citasRouter);
app.use(usuarioRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use(errorHandler);

