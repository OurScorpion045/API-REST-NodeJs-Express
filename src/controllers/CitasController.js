import { CitasModel } from "../models/CitasModel.js";
import { NotFoundError } from "../errors/NotFoundError.js";

export class CitasController {

    static async getAll(req, res) {
        const results = await CitasModel.getAll();
        res.status(200).json(results);
    }

    static async getById(req, res) {
        const data = [req.params.id];
        const results = await CitasModel.getById(data);

        if (results.length == 0) {
            throw new NotFoundError("Cita no encontrada");
        }
        res.status(200).json(results);
    }

    static async insert(req, res) {
        const data = [
            req.body.PacienteId,
            req.body.Fecha,
            req.body.HoraInicio,
            req.body.HoraFin,
            req.body.Estado,
            req.body.Motivo
        ];
        const results = await CitasModel.insert(data);
        
        if (results.affectedRows <= 0) {
            throw new AppError("Error al insertar cita", 500);
        }

        return res.status(201).json({"message": "Cita insertada correctamente"});

    }

    static async update(req, res) {
        const data = [
            req.body.PacienteId,
            req.body.Fecha,
            req.body.HoraInicio,
            req.body.HoraFin,
            req.body.Estado,
            req.body.Motivo,
            req.params.id
        ];
        const results = await CitasModel.update(data);
        
        if (results.affectedRows == 0) {
            throw new NotFoundError("Cita no encontrada");
        }
        
        return res.status(200).json({"message": "Cita actualizada correctamente"});
    }

    static async delete(req, res) {
        const data = [req.params.id];
        const results = await CitasModel.delete(data);

        if (results.affectedRows == 0) {
            throw new NotFoundError("Cita no encontrada");
        } 
        
        res.status(204).send();
    }
}