import { PacienteController } from "../controllers/PacienteController.js";
import express from "express";
import { validatePaciente } from "../middleware/validation/validatePaciente.js";

export const pacientesRouter = express.Router();

pacientesRouter.get("/pacientes", async (req, res) => {
    await PacienteController.getAll(req, res);
});

pacientesRouter.get("/pacientes/:id", async (req, res) => {
    await PacienteController.getById(req, res);
});

pacientesRouter.post("/pacientes", validatePaciente, async (req, res) => {
    await PacienteController.insert(req, res);
});

pacientesRouter.put("/pacientes/:id", validatePaciente, async (req, res) => {
    await PacienteController.update(req, res);
});

pacientesRouter.delete("/pacientes/:id", async (req, res) => {
    await PacienteController.delete(req, res);
});