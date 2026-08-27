import { usuarioSchema } from "../../schemas/usuario.schema.js";

export const validateUsuario = (req, res, next) => {
    const validate = usuarioSchema.safeParse(req.body);

    if (!validate.success) {
        return res.status(400).json({
            error: "Datos invalidos",
            details: validate.error.issues
        });
    }

    next();
}