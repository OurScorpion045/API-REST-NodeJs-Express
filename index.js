import express from "express";
import dotenv from "dotenv";
import { pacientesRouter } from "./src/routes/PacienteRoute.js";
import { citasRouter } from "./src/routes/CitasRoute.js";
import { usuarioRouter } from "./src/routes/UsuarioRoute.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(pacientesRouter);
app.use(citasRouter);
app.use(usuarioRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});