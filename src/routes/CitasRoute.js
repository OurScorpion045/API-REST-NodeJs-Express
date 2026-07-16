import { CitasController } from "../controllers/CitasController.js";
import express from "express";

export const citasRouter = express.Router();

citasRouter.get("/citas", async (req, res) => {
    await CitasController.getAll(req, res);
});

citasRouter.get("/citas/:id", async (req, res) => {
    await CitasController.getById(req, res);
});

citasRouter.post("/citas", async (req, res) => {
    await CitasController.insert(req, res);
});

citasRouter.put("/citas/:id", async (req, res) => {
    await CitasController.update(req, res);
});

citasRouter.delete("/citas/:id", async (req, res) => {
    await CitasController.delete(req, res);
});