import { AppError } from "../errors/AppError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import { UsuarioModel } from "../models/UsuarioModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UsuarioController {

    static async getAll(req, res) {
        const results = await UsuarioModel.getAll();
        res.status(200).json(results);
    }

    static async getById(req, res) {
        const data = [req.params.id];
        const results = await UsuarioModel.getById(data);

        if (results.length == 0) {
            throw new NotFoundError("Usuario no encontrado");
        }
        
        res.status(200).json(results);
    }

    static async login(req, res) {
        const data = [req.body.Usuario];
        const results = await UsuarioModel.getByUsername(data);

        if (results.length === 0) {
            throw new UnauthorizedError("Credenciales invalidas");
        }
        
        const usuario = results[0];

        const validatePassword = await bcrypt.compare(
            req.body.Password,
            usuario.Password
        );

        if (!validatePassword) {
            throw new UnauthorizedError("Credenciales invalidas");
        }

        const token = jwt.sign(
            {
                UsuarioId: usuario.UsuarioId,
                Usuario: usuario.Usuario
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        res.status(200).json({
            token
        });
    }

    static async insert(req, res) {
        const hashPassword = await bcrypt.hash(req.body.Password, 10);

        const data = [
            req.body.Usuario,
            hashPassword,
            req.body.Estado
        ];

        const results = await UsuarioModel.insert(data);
        
        if (results.affectedRows == 0) {
            throw new AppError("Error al insertar Usuario", 500);
        }

        return res.status(201).json({"message": "Usuario insertado correctamente"});

    }

    static async update(req, res) {
        const hashPassword = await bcrypt.hash(req.body.Password, 10);
        const data = [
            req.body.Usuario,
            hashPassword,
            req.body.Estado,
            req.params.id
        ];

        const results = await UsuarioModel.update(data);
        
        if (results.affectedRows == 0) {
            throw new NotFoundError("Usuario no encontrado");
        }
        
        return res.status(200).json({"message": "Usuario actualizado correctamente"});
    }

    static async delete(req, res) {
        const data = [req.params.id];
        const results = await UsuarioModel.delete(data);

        if (results.affectedRows == 0) {
            throw new NotFoundError("Usuario no encontrado");
        }

        return res.status(204).send();
    }
}