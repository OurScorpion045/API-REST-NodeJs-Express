import { CitasController } from "../controllers/CitasController.js";
import { validateCita } from "../middleware/validation/validateCita.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizationMiddleware } from "../middleware/authorizationMiddleware.js";
import express from "express";

export const citasRouter = express.Router();

citasRouter.get("/citas", authMiddleware, authorizationMiddleware("USER", "ADMIN"), async (req, res) => {
    await CitasController.getAll(req, res);
});

citasRouter.get("/citas/:id", authMiddleware, authorizationMiddleware("USER", "ADMIN"), async (req, res) => {
    await CitasController.getById(req, res);
});

citasRouter.post("/citas", authMiddleware, authorizationMiddleware("USER", "ADMIN"), validateCita, async (req, res) => {
    await CitasController.insert(req, res);
});

citasRouter.put("/citas/:id", authMiddleware, authorizationMiddleware("USER", "ADMIN"), validateCita, async (req, res) => {
    await CitasController.update(req, res);
});

citasRouter.delete("/citas/:id", authMiddleware, authorizationMiddleware("USER", "ADMIN"), async (req, res) => {
    await CitasController.delete(req, res);
});