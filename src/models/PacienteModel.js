import { pool } from "../config/Database.js";

export class PacienteModel {

    static async getAll() {
        const sql = "SELECT * FROM `pacientes` ORDER BY `PacienteId` DESC";
        const [rows, fields] = await pool.execute(sql);
        return rows;
    }

    static async getById(pacienteData) {
        const sql = "SELECT * FROM `pacientes` WHERE `PacienteId` = ? LIMIT 1";
        const [rows, fields] = await pool.execute(sql, pacienteData);
        return rows;
    }

    static async insert(pacienteData) {
        const sql = "INSERT INTO `pacientes`()"
    }
}