import { PacienteModel } from "../models/PacienteModel.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { AppError } from "../errors/AppError.js";

export class PacienteController {

    static async getAll(req, res) {
        let results = await PacienteModel.getAll();
        return res.json(results);
    }

    static async getById(req, res) {
        let data = [req.params.id];
        let results = await PacienteModel.getById(data);

        if (results.length == 0) {
            throw new NotFoundError("Paciente no encontrado");
        } else {
            return res.status(200).json(results);
        }
    }

    static async insert(req, res, next) {
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
        
        if (results.affectedRows == 0) {
            throw new AppError("Error al insertar paciente");
        }

        return res.status(201).json({"message": "Paciente insertado correctamente"});

    }

    static async update(req, res) {
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
        
        if (results.affectedRows == 0) {
            throw new NotFoundError("Paciente no encontrado");
        }
        
        return res.status(200).json({"message": "Paciente actualizado correctamente"});
    }

    static async delete(req, res) {
        let data = [req.params.id];
        let results = await PacienteModel.delete(data);

        if (results.affectedRows == 0) {
            throw new NotFoundError("Paciente no encontrado");
        }
        
        return res.status(204).send();
    }
}