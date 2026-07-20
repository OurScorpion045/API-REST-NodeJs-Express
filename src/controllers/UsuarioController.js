import { UsuarioModel } from "../models/UsuarioModel.js";
import bcrypt from "bcrypt";

export class UsuarioController {

    static async getAll(req, res) {
        try {
            const results = await UsuarioModel.getAll();
            res.json(results);
        } catch (err) {
            res.status(500).json({"message": "Error al seleccionar usuarios"});
            console.error(err);
        }
    }

    static async getById(req, res) {
        try {
            const data = [req.params.id];
            const results = await UsuarioModel.getById(data);
            res.json(results);
        } catch (err) {
            res.status(500).json({"message": "Error al seleccionar usuario"});
            console.error(err);
        }
    }

    static async insert(req, res) {
        try {
            const hashPassword = await bcrypt.hash(req.body.Password, 10);
            const data = [
                req.body.Usuario,
                hashPassword,
                req.body.Estado
            ];
            const results = await UsuarioModel.insert(data);
            if (results.affectedRows > 0) {
                res.json({"message": "Usuario insertado correctamente"});
            } else {
                throw new Error(err);
            }
        } catch (err) {
            res.status(500).json({"message": "Error al insertar usuario"});
            console.error(err);
        }
    }

    static async update(req, res) {
        try {
            const hashPassword = await bcrypt.hash(req.body.Password, 10);
            const data = [
                req.body.Usuario,
                hashPassword,
                req.body.Estado,
                req.params.id
            ];
            const results = await UsuarioModel.update(data);    
            if (results.affectedRows > 0) {
                res.json({"message": "Usuario actualizado correctamente"});
            } else {
                throw new Error(err);
            }
        } catch (err) {
            res.status(500).json({"message": "Error al actualizar usuario"});
            console.error(err);
        }
    }

    static async delete(req, res) {
        try {
            const data = [req.params.id];
            const results = await UsuarioModel.delete(data);
            if (results.affectedRows > 0) {
                res.json({"message": "Usuario eliminado correctamente"});
            } else {
                throw new Error(err);
            }
        } catch (err) {
            res.status(500).json({"message": "Error al eliminar usuario"});
            console.error(err);
        }
    }
}