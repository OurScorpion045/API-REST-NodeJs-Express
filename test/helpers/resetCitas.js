import { pool } from "../../src/config/Database.js";
import { citaArray } from "../fixtures/cita.js";

export const resetCitas = async () => {
    await pool.execute("DELETE FROM `citas`");
    await pool.execute("ALTER TABLE `citas` AUTO_INCREMENT = 1");
    await pool.execute("INSERT INTO `citas`(`PacienteId`, `Fecha`, `HoraInicio`, `HoraFin`, `Estado`, `Motivo`) VALUES (?, ?, ?, ?, ?, ?)", citaArray);
}