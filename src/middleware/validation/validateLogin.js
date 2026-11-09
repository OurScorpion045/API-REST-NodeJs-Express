import { z } from "zod"
import { ValidationError } from "../../errors/ValidationError.js";

const loginSchema = z.object({
    Usuario: z.string().email(),
    Password: z.string().min(6)
})

export const validateLogin = (req, res, next) => {
    const validate = loginSchema.safeParse(req.body);

    if (!validate.success) {
        throw new ValidationError("Credenciales invalidas");
    }

    next();
}