import { PacienteController } from "../controllers/PacienteController.js";
import { express } from "express";

export const router = express.Router();

router.get("/pacientes", (req, res) => {
    await PacienteController.getAll();
});

router.get("/pacientes/:id", (req, res) => {
    await PacienteController.getById(req, res);
});

router.post("/pacientes", (req, res) => {
    await PacienteController.insert(req, res);
});

router.put("/pacientes/:id", (req, res) => {
    await PacienteController.update(req, res);
});

router.delete("/pacientes/:id", (req, res) => {
    await PacienteController.delete(req, res);
});