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

    if (usuarios.includes(req.body.Usuario) && req.method == 'POST') {
        throw new ConflictError("Un usuario ya existe con esa direccion de correo electronico");
    }

    if (req.method == 'PUT') {
        const [userActual] = await pool.execute(`SELECT Usuario FROM usuarios WHERE UsuarioId = ?`, [req.params.id])
        
        if (usuarios.includes(req.body.Usuario) && userActual[0]?.Usuario != req.body.Usuario) {
            throw new ConflictError("Un usuario ya existe con esa direccion de correo electronico")
        }
    }

    next();
}