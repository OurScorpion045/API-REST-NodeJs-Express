import { json } from "express";
import { UsuarioModel } from "../models/UsuarioModel.js";
import bcrypt from "bcrypt";

export class UsuarioController {

    static async getAll(req, res) {
        try {
            const results = await UsuarioModel.getAll();
            res.status(200).json(results);
        } catch (err) {
            res.status(500).json({"message": "Error al seleccionar usuarios"});
            console.error(err);
        }
    }

    static async getById(req, res) {
        try {
            const data = [req.params.id];
            const results = await UsuarioModel.getById(data);

            if (JSON.stringify(results) === "[]") {
                res.status(404).json({"message": "Usuario no encontrado"});
            } else {
                res.status(200).json(results);
            }
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
            if (req.body.Usuario == '' || hashPassword == '' || req.body.Estado == '') {
                res.status(400).json({"message": "Campos obligatorios vacios"});
            }
            
            const results = await UsuarioModel.insert(data);
            
            if (results.affectedRows > 0) {
                res.status(201).json({"message": "Usuario insertado correctamente"});
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
            if (req.body.Usuario == '' || hashPassword == '' || req.body.Estado == '') {
                res.status(400).json({"message": "Campos obligatorios vacios"});
            } 
            
            const results = await UsuarioModel.update(data);
            
            if (results.affectedRows == 0) {
                res.status(404).json({"message": "Usuario no encontrado"});
            } else if (results.affectedRows > 0) {
                res.status(200).json({"message": "Usuario actualizado correctamente"});
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
            if (results.affectedRows == 0) {
                res.status(404).json({"message": "Usuario no encontrado"});
            }
            else if (results.affectedRows > 0) {
                res.status(204).send();
            }
        } catch (err) {
            res.status(500).json({"message": "Error al eliminar usuario"});
            console.error(err);
        }
    }
}