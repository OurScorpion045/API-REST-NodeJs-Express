import { PacienteModel } from "../models/PacienteModel.js";

export class PacienteController {

    static async getAll(req, res) {
        try {
            let results = await PacienteModel.getAll();
            res.json(results);
        } catch (err) {
            res.json({"message": "Error al seleccionar pacientes"});
            console.error(err);
        }

    }

    static async getById(req, res) {
        try {
            let data = [req.params.id];
            let results = await PacienteModel.getById(data);
            res.json(results);
        } catch (err) {
            res.json({"message": "Error al seleccionar paciente"});
            console.error(err);
        }
    }

    static async insert(req, res) {
        try {
            let data = [
                req.params.DNI,
                req.params.Nombre,
                req.params.Direccion,
                req.params.CodigoPostal,
                req.params.Telefono,
                req.params.Genero,
                req.params.FechaNacimiento,
                req.params.Correo
            ]
            let results = await PacienteModel.insert(data);
            if (results.affectedRows > 0) {
                res.json({"message": "Paciente insertado correctamente"});
            } else {
                throw new Error(err);
            }
        } catch (err) {
            res.json({"message": "Error al insertar paciente"});
            console.error(err);
        }
    }

    static async update(req, res) {
        try {
            let data = [
                req.params.DNI,
                req.params.Nombre,
                req.params.Direccion,
                req.params.CodigoPostal,
                req.params.Telefono,
                req.params.Genero,
                req.params.FechaNacimiento,
                req.params.Correo,
                req.params.id
            ]
            let results = await PacienteModel.update(data);
            if (results.affectedRows > 0) {
                res.json({"message": "Paciente actualizado correctamente"});
            } else {
                throw new Error(err);
            }
        } catch (err) {
            res.json({"message": "Error al actualizar paciente"});
            console.error(err);
        }
    }

    static async delete(req, res) {
        try {
            let data = [req.params.id];
            let results = await PacienteModel.delete(data);
            if (results.affectedRows > 0) {
                res.json({"message": "Paciente eliminado correctamente"});
            } else {
                throw new Error(err);
            }
        } catch (err) {
            res.json({"message": "Error al eliminar paciente"});
            console.error(err);
        }
    }
}