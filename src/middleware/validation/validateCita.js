import { pacienteSchema } from "../../schemas/paciente.schema.js";

export const validateCita = (req, res, next) => {
    const validate = pacienteSchema.safeParse(req.body);

    if (!validate.success) {
        return res.status(400).json({
            error: "Datos invalidos",
            details: validate.error.issues
        });
    }

    next();
}