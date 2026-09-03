import { ValidationError } from "../../errors/ValidationError.js";
import { pacienteSchema } from "../../schemas/paciente.schema.js";

export const validatePaciente = (req, res, next) => {
    const validate = pacienteSchema.safeParse(req.body);

    if (!validate.success) {
        throw new ValidationError("Datos inválidos");
    }

    next();
};