import { UsuarioController } from "../controllers/UsuarioController.js";
import express from "express";

export const usuarioRouter = express.Router();

usuarioRouter.get("/usuarios", async (req, res) => {
    await UsuarioController.getAll(req, res);
});

usuarioRouter.get("/usuarios/:id", async (req, res) => {
    await UsuarioController.getById(req, res);
});

usuarioRouter.post("/usuarios", async (req, res) => {
    await UsuarioController.insert(req, res);
});

usuarioRouter.put("/usuarios/:id", async (req, res) => {
    await UsuarioController.update(req, res);
});

usuarioRouter.delete("/usuarios/:id", async (req, res) => {
    await UsuarioController.delete(req, res);
});