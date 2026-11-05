import { PacienteController } from "../controllers/PacienteController.js";
import express from "express";
import { validatePaciente } from "../middleware/validation/validatePaciente.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizationMiddleware } from "../middleware/authorizationMiddleware.js";

export const pacientesRouter = express.Router();

pacientesRouter.get("/pacientes", authMiddleware, authorizationMiddleware("USER", "ADMIN"), async (req, res) => {
    await PacienteController.getAll(req, res);
});

pacientesRouter.get("/pacientes/:id", authMiddleware, authorizationMiddleware("USER", "ADMIN"), async (req, res) => {
    await PacienteController.getById(req, res);
});

pacientesRouter.post("/pacientes", authMiddleware, authorizationMiddleware("USER", "ADMIN"), validatePaciente, async (req, res) => {
    await PacienteController.insert(req, res);
});

pacientesRouter.put("/pacientes/:id", authMiddleware, authorizationMiddleware("USER", "ADMIN"), validatePaciente, async (req, res) => {
    await PacienteController.update(req, res);
});

pacientesRouter.delete("/pacientes/:id", authMiddleware, authorizationMiddleware("USER", "ADMIN"), async (req, res) => {
    await PacienteController.delete(req, res);
});