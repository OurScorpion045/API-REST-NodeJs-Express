import { ForbiddenError } from "../errors/ForbiddenError.js";

export const authorizationMiddleware = (...rolesPermitidos) => {

    return (req, res, next) => {

        if (rolesPermitidos.includes(req.usuario.Rol)) {
            next();
        } else {
            throw new ForbiddenError("Acceso denegado");
        }
    }
}