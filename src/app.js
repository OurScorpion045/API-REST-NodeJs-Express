import express from "express";
import { pacientesRouter } from "./routes/PacienteRoute.js";
import { citasRouter } from "./routes/CitasRoute.js";
import { usuarioRouter } from "./routes/UsuarioRoute.js";
import { errorHandler } from "./middleware/errorHandler.js";
import fs from "node:fs";
import YAML from "yaml";
import swaggerUI from "swagger-ui-express"
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from 'express-rate-limit';
import { TooManyRequest } from "./errors/TooManyRequest.js";

const file = fs.readFileSync('./src/swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file);

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 1000,
    handler: (req, res, next) => {
        next(new TooManyRequest("Too many requests"));
    },
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56
})

export const app = express();

app.use(limiter);
app.disable('x-powered-by');
app.use(cors({origin: "http://localhost:5173"}));
app.use(helmet());
app.use(express.json({ limit: '100kb' }));
app.use(pacientesRouter);
app.use(citasRouter);
app.use(usuarioRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use(errorHandler);

