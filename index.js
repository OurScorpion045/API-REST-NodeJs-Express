import express from "express";
import dotenv from "dotenv";
import { pacientesRouter } from "./src/routes/PacienteRoute.js";
import { citasRouter } from "./src/routes/CitasRoute.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(pacientesRouter);
app.use(citasRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})