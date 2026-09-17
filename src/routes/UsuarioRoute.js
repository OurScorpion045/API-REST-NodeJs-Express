import { UsuarioController } from "../controllers/UsuarioController.js";
import { validateUsuario } from "../middleware/validation/validateUsuario.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizationMiddleware } from "../middleware/authorizationMiddleware.js"
import express from "express";

export const usuarioRouter = express.Router();

usuarioRouter.post("/login", async (req, res) => {
    await UsuarioController.login(req, res);
})

usuarioRouter.get("/usuarios", authMiddleware, authorizationMiddleware("ADMIN"), async (req, res) => {
    await UsuarioController.getAll(req, res);
});

usuarioRouter.get("/usuarios/:id", authMiddleware, authorizationMiddleware("ADMIN"), async (req, res) => {
    await UsuarioController.getById(req, res);
});

usuarioRouter.post("/usuarios", authMiddleware, authorizationMiddleware("ADMIN"), validateUsuario, async (req, res) => {
    await UsuarioController.insert(req, res);
});

usuarioRouter.put("/usuarios/:id", authMiddleware, authorizationMiddleware("ADMIN"), validateUsuario, async (req, res) => {
    await UsuarioController.update(req, res);
});

usuarioRouter.delete("/usuarios/:id", authMiddleware, authorizationMiddleware("ADMIN"), async (req, res) => {
    await UsuarioController.delete(req, res);
});