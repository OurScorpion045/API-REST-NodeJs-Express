import { pool } from "../../src/config/Database.js";

export const closeConnection = async () => {
    await pool.end();
}