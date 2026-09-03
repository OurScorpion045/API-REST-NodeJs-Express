import { ValidationError } from "../../errors/ValidationError.js";
import { citaSchema } from "../../schemas/citas.schema.js";

export const validateCita = (req, res, next) => {
    const validate = citaSchema.safeParse(req.body);

    if (!validate.success) {
        throw new ValidationError("Datos inválidos");
    };

    next();
}