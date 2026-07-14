import { PacienteController } from "../controllers/PacienteController.js";
import { express } from "express";

export const pacientesRouter = express.Router();

pacientesRouter.get("/pacientes", (req, res) => {
    await PacienteController.getAll();
});

pacientesRouter.get("/pacientes/:id", (req, res) => {
    await PacienteController.getById(req, res);
});

pacientesRouter.post("/pacientes", (req, res) => {
    await PacienteController.insert(req, res);
});

pacientesRouter.put("/pacientes/:id", (req, res) => {
    await PacienteController.update(req, res);
});

pacientesRouter.delete("/pacientes/:id", (req, res) => {
    await PacienteController.delete(req, res);
});