import z from "zod";

export const usuarioSchema = z.object({
    Usuario: z.email(),
    Password: z.string().min(6),
    Estado: z.enum(["Inactivo", "Activo"])
});