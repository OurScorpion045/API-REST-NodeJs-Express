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
            if (JSON.stringify(results) === '[]') {
                res.status(404).json({"message": "Paciente no encontrado"});
            } else {
                res.status(200).json(results);
            }
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
            if (req.body.DNI == '' || req.body.Nombre == '' || req.body.Direccion == '' || req.body.CodigoPostal == '' || req.body.Telefono == '' || req.body.Genero == '' || req.body.FechaNacimiento == '' || req.body.Correo == '') {
                res.status(400).json({"message": "Paciente no encontrado"});
            }

            let results = await PacienteModel.insert(data);
            
            if (results.affectedRows > 0) {
                res.status(201).json({"message": "Paciente insertado correctamente"});
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
            if (req.body.DNI == '' || req.body.Nombre == '' || req.body.Direccion == '' || req.body.CodigoPostal == '' || req.body.Telefono == '' || req.body.Genero == '' || req.body.FechaNacimiento == '' || req.body.Correo == '') {
                res.status(400).json({"message": "Campos obligatorios vacios"});
            } 
            
            let results = await PacienteModel.update(data);
            
            if (results.affectedRows == 0) {
                res.status(404).json({"message": "Paciente no encontrado"});
            } else if (results.affectedRows > 0) {
                res.status(200).json({"message": "Paciente actualizado correctamente"});
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
            }
        } catch (err) {
            res.status(500).json({"message": "Error al eliminar paciente"});
            console.error(err);
        }
    }
}