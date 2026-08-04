import { pool } from "../../src/config/Database.js"

export const resetDatabase = async () => {
    await pool.execute("DELETE FROM `pacientes`");
    await pool.execute("ALTER TABLE `pacientes` AUTO_INCREMENT = 1");
    await pool.execute("INSERT INTO `pacientes`(`DNI`, `Nombre`, `Direccion`, `CodigoPostal`, `Telefono`, `Genero`, `FechaNacimiento`, `Correo`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", ["F000000012", "Jon Doe", "Calle de pruebas 1", "20001", "1234567890", "H", "2001-01-01", "Paciente01@gmail.com"]);
}