import { UsuarioController } from "../controllers/UsuarioController.js";
import { validateUsuario } from "../middleware/validation/validateUsuario.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import express from "express";

export const usuarioRouter = express.Router();

usuarioRouter.post("/login", async (req, res) => {
    await UsuarioController.login(req, res);
})

usuarioRouter.get("/usuarios", authMiddleware, async (req, res) => {
    await UsuarioController.getAll(req, res);
});

usuarioRouter.get("/usuarios/:id", authMiddleware, async (req, res) => {
    await UsuarioController.getById(req, res);
});

usuarioRouter.post("/usuarios", authMiddleware, validateUsuario, async (req, res) => {
    await UsuarioController.insert(req, res);
});

usuarioRouter.put("/usuarios/:id", authMiddleware, validateUsuario, async (req, res) => {
    await UsuarioController.update(req, res);
});

usuarioRouter.delete("/usuarios/:id", authMiddleware, async (req, res) => {
    await UsuarioController.delete(req, res);
});