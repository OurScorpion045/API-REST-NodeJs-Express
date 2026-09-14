import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new UnauthorizedError("Error en el token");
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
        throw new UnauthorizedError("Error en el token");
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = payload;

        next();
    } catch (err) {
        throw new UnauthorizedError("Token invalido o expirado");
    }

}