import z from "zod";

export const citaSchema = z.object({
    PacienteId: z.string(),
    Fecha: z.iso.date(),
    HoraInicio: z.string().min(8),
    HoraFin: z.string().min(8),
    Estado: z.enum(["Confirmada", "En espera"]),
    Motivo: z.string()
});