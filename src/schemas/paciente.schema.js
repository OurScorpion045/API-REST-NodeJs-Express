import z from "zod";

export const pacienteSchema = z.object({
    DNI: z.string(),
    Nombre: z.string().min(3),
    Direccion: z.string(),
    CodigoPostal: z.string(),
    Telefono: z.string().regex(/^\d{10}$/),
    Genero: z.enum(["H", "M"]),
    FechaNacimiento: z.iso.date(),
    Correo: z.email()
});