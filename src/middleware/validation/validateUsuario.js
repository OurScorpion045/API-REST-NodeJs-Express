import { pool } from "../../config/Database.js";
import { ValidationError } from "../../errors/ValidationError.js";
import { usuarioSchema } from "../../schemas/usuario.schema.js";
import { ConflictError } from "../../errors/ConflictError.js";

export const validateUsuario = async (req, res, next) => {
    const validate = usuarioSchema.safeParse(req.body);

    if (!validate.success) {
        throw new ValidationError("Datos inválidos");
    }

    const correos = await pool.query("SELECT Usuario FROM usuarios");
    const usuarios = correos[0].map(usuario => usuario.Usuario);

    if (usuarios.includes(req.body.Usuario)) {
        throw new ConflictError("Un usuario ya existente con esa direccion de correo electronico");
    }

    next();
}