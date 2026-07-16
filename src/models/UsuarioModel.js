import { pool } from "../config/Database.js";

export class UsuarioModel {

    static async getAll() {
        const sql = "SELECT * FROM `usuarios` ORDER BY `UsuarioId` DESC";
        const [rows, fields] = await pool.execute(sql);
        return rows;
    }

    static async getById(usuarioData) {
        const sql = "SELECT * FROM `usuarios` WHERE `UsuarioId` = ? LIMIT 1";
        const [rows, fields] = await pool.execute(sql, usuarioData);
        return rows;
    }

    static async insert(usuarioData) {
        const sql = "INSERT INTO `usuarios`(`Usuario`, `Password`, `Estado`) VALUES (?, ?, ?)";
        const [rows, fields] = await pool.execute(sql, usuarioData);
        return rows;
    }

    static async update(usuarioData) {
        const sql = "UPDATE `usuarios` SET `Usuario` = ?, `Password` = ?, `Estado` = ? WHERE `UsuarioId` = ?";
        const [rows, fields] = await pool.execute(sql, usuarioData);
        return rows;
    }

    static async delete(usuarioData) {
        const sql = "DELETE FROM `usuarios` WHERE `UsuarioId` = ?";
        const [rows, fields] = await pool.execute(sql, usuarioData);
        return rows;
    }
}