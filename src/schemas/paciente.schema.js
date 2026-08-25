import z from "zod";

export const pacienteSchema = z.object({
    DNI: z.string(),
    Nombre: z.string().min(3),
    Direccion: z.string(),
    CodigoPostal: z.string(),
    Telefono: z.string().min(9),
    Genero: z.enum(["H", "M"]),
    FechaNacimiento: z.string().min(8),
    Correo: z.email()
});