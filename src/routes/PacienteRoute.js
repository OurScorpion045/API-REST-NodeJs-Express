import { PacienteController } from "../controllers/PacienteController.js";
import express from "express";
import { validatePaciente } from "../middleware/validation/validatePaciente.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const pacientesRouter = express.Router();

pacientesRouter.get("/pacientes", authMiddleware, async (req, res) => {
    await PacienteController.getAll(req, res);
});

pacientesRouter.get("/pacientes/:id", authMiddleware, async (req, res) => {
    await PacienteController.getById(req, res);
});

pacientesRouter.post("/pacientes", authMiddleware, validatePaciente, async (req, res) => {
    await PacienteController.insert(req, res);
});

pacientesRouter.put("/pacientes/:id", authMiddleware, validatePaciente, async (req, res) => {
    await PacienteController.update(req, res);
});

pacientesRouter.delete("/pacientes/:id", authMiddleware, async (req, res) => {
    await PacienteController.delete(req, res);
});