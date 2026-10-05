import { pool } from "../../src/config/Database.js";
import { usuarioArray } from "../fixtures/usuario.js";

export const resetUsuarios = async () => { 
    await pool.execute("DELETE FROM `usuarios` WHERE UsuarioId != 1")
    await pool.execute("ALTER TABLE `usuarios` AUTO_INCREMENT = 2");
    await pool.execute("INSERT INTO `usuarios`(`Usuario`, `Password`, `Estado`) VALUES (?, ?, ?)", usuarioArray);
}