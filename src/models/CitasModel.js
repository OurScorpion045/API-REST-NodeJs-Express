import { pool } from "../config/Database.js";

export class CitasModel {

    static async getAll() {
        const sql = "SELECT * FROM `citas` ORDER BY `CitaId` DESC";
        const [rows, fields] = await pool.execute(sql);
        return rows;
    }

    static async getById(citasData) {
        const sql = "SELECT * FROM `citas` WHERE `CitaId` LIMIT 1";
        const [rows, fields] = await pool.execute(sql, citasData);
        return rows;
    }

    static async insert(citasData) {
        const sql = "INSERT INTO `citas`(`PacienteId`, `Fecha`, `HoraInicio`, `HoraFin`, `Estado`, `Motivo`) VALUES (?, ?, ?, ?, ?, ?)";
        const [rows, fields] = await pool.execute(sql, citasData);
        return rows;
    }

    static async update(citasData) {
        const sql = "UPDATE `citas` SET `PacienteId` = ?, `Fecha` = ?, `HoraInicio` = ?, `HoraFin` = ?, `Estado` = ?, `Motivo` = ? WHERE `CitaId` = ?";
        const [rows, fields] = await pool.execute(sql, citasData);
        return rows;
    }

    static async delete(citasData) {
        const sql = "DELETE FROM `citas` WHERE `CitaId` = ?";
        const [rows, fields] = await pool.execute(sql, citasData);
        return rows;
    }
}