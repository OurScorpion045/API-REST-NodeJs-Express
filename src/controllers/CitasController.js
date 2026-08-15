import { CitasModel } from "../models/CitasModel.js";

export class CitasController {

    static async getAll(req, res) {
        try {
            const results = await CitasModel.getAll();
            res.status(200).json(results);
        } catch (err) {
            res.status(500).json({"message": "Error al seleccionar citas"});
            console.error(err);
        }
    }

    static async getById(req, res) {
        try {
            const data = [req.params.id];
            const results = await CitasModel.getById(data);
            if (JSON.stringify(results) === "[]") {
                res.status(404).json({"message": "Cita no encontrada"});
            } else {
                res.status(200).json(results);
            }
        } catch (err) {
            res.status(500).json({"message": "Error al seleccionar cita"});
            console.error(err);
        }
    }

    static async insert(req, res) {
        try {
            const data = [
                req.body.PacienteId,
                req.body.Fecha,
                req.body.HoraInicio,
                req.body.HoraFin,
                req.body.Estado,
                req.body.Motivo
            ];
            if (req.body.PacienteId == '' || req.body.Fecha == '' || req.body.HoraInicio == '' || req.body.HoraFin == '' || req.body.Estado == '' || req.body.Motivo == '') {
                res.status(400).json({"message": "Campos obligatorios vacios"});
            }
            
            const results = await CitasModel.insert(data);
            
            if (results.affectedRows > 0) {
                res.status(201).json({"message": "Cita insertada correctamente"});
            }
        } catch (err) {
            res.status(500).json({"message": "Error al insertar cita"});
            console.error(err);
        }
    }

    static async update(req, res) {
        try {
            const data = [
                req.body.PacienteId,
                req.body.Fecha,
                req.body.HoraInicio,
                req.body.HoraFin,
                req.body.Estado,
                req.body.Motivo,
                req.params.id
            ];
            if (req.body.PacienteId == '' || req.body.Fecha == '' || req.body.HoraInicio == '' || req.body.HoraFin == '' || req.body.Estado == '' || req.body.Motivo == '') {
                res.status(400).json({"message": "Campos obligatorios vacios"});
            } 
            
            const results = await CitasModel.update(data);
            
            if (results.affectedRows == 0) {
                res.status(404).json({"message": "Cita no encontrada"});
            } else if (results.affectedRows > 0) {
                res.status(200).json({"message": "Cita actualizada correctamente"});
            }
        } catch (err) {
            res.status(500).json({"message": "Error al actualizar cita"});
            console.error(err);
        }
    }

    static async delete(req, res) {
        try {
            const data = [req.params.id];
            const results = await CitasModel.delete(data);
            if (results.affectedRows == 0) {
                res.status(404).json({"message": "Cita no encontrada"});
            } else if (results.affectedRows > 0) {
                res.status(204).send();
            }
        } catch (err) {
            res.status(500).json({"message": "Error al eliminar cita"});
            console.error(err);
        }
    }
}