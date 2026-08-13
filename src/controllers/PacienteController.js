import { PacienteModel } from "../models/PacienteModel.js";

export class PacienteController {

    static async getAll(req, res) {
        try {
            let results = await PacienteModel.getAll();
            res.json(results);
        } catch (err) {
            res.status(500).json({"message": "Error al seleccionar pacientes"});
            console.error(err);
        }

    }

    static async getById(req, res) {
        try {
            let data = [req.params.id];
            let results = await PacienteModel.getById(data);
            res.json(results);
        } catch (err) {
            res.status(500).json({"message": "Error al seleccionar paciente"});
            console.error(err);
        }
    }

    static async insert(req, res) {
        try {
            let data = [
                req.body.DNI,
                req.body.Nombre,
                req.body.Direccion,
                req.body.CodigoPostal,
                req.body.Telefono,
                req.body.Genero,
                req.body.FechaNacimiento,
                req.body.Correo
            ]
            let results = await PacienteModel.insert(data);
            if (req.body.DNI == null || req.body.Nombre == null || req.body.Direccion == null || req.body.CodigoPostal == null || req.body.Telefono == null || req.body.Genero == null || req.body.FechaNacimiento == null || req.body.Correo == null) {
                res.status(400).json({"message": "Paciente no encontrado"});
            } else if (results.affectedRows > 0) {
                res.status(201).json({"message": "Paciente insertado correctamente"});
            } else {
                throw new Error(err);
            }
        } catch (err) {
            res.status(500).json({"message": "Error al insertar paciente"});
            console.error(err);
        }
    }

    static async update(req, res) {
        try {
            let data = [
                req.body.DNI,
                req.body.Nombre,
                req.body.Direccion,
                req.body.CodigoPostal,
                req.body.Telefono,
                req.body.Genero,
                req.body.FechaNacimiento,
                req.body.Correo,
                req.params.id
            ]
            let results = await PacienteModel.update(data);
            if (req.body.DNI == null || req.body.Nombre == null || req.body.Direccion == null || req.body.CodigoPostal == null || req.body.Telefono == null || req.body.Genero == null || req.body.FechaNacimiento == null || req.body.Correo == null) {
                res.status(400).json({"message": "Paciente no encontrado"});
            } else if (results.affectedRows == 0) {
                res.status(404).json({"message": "Paciente no encontrado"});
            } else if (results.affectedRows > 0) {
                res.status(200).json({"message": "Paciente actualizado correctamente"});
            } else {
                throw new Error(err);
            }
        } catch (err) {
            res.status(500).json({"message": "Error al actualizar paciente"});
            console.error(err);
        }
    }

    static async delete(req, res) {
        try {
            let data = [req.params.id];
            let results = await PacienteModel.delete(data);
            if (results.affectedRows == 0) {
                res.status(404).json({"message": "Paciente no encontrado"});
            } else if (results.affectedRows > 0) {
                res.status(204).send();
            } else {
                throw new Error(err);
            }
        } catch (err) {
            res.status(500).json({"message": "Error al eliminar paciente"});
            console.error(err);
        }
    }
}