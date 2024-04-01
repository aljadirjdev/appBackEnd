import { Request, Response } from "express";
import EmployeeModel from "../models/employee.model";

import bcrypt from "bcryptjs";

// Obtiene todos los empleados
export const getAllEmployees = async (req: Request, res: Response) => {
  console.log(res);
  try {
    const employees = await EmployeeModel.find();
    res.status(200).json({
      ok: true,
      employees,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al obtener los empleados",
    });
  }
};
//  Crea un nuevo empleado
export const createEmployee = async (req: Request, res: Response) => {
  const { body } = req;
  const { login, password } = body;
  const { documentNumber } = body.user;

  // Validar si el login ya existe
  try {
    const employeeLoging = await EmployeeModel.findOne({
      login: login,
    });
    const employeeDocumentNumber = await EmployeeModel.findOne({
      "user.documentNumber": documentNumber,
    });

    if (employeeLoging) {
      return res.status(400).json({
        ok: false,
        msg: `El empleado con login ${login} ya existe`,
      });
    } else if (employeeDocumentNumber) {
      // Si el email ya existe
      return res.status(400).json({
        ok: false,
        msg: `El empleado con documento: ${documentNumber}, ya existe`,
      });
    }

    const newEmployee = new EmployeeModel(body);
    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync(10);
    newEmployee.password = bcrypt.hashSync(password, salt);
    const createdEmployee = await newEmployee.save();
    res.status(200).json({
      ok: true,
      msg: "Empleado creado",
      employee: createdEmployee,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al crear el empleado",
    });
  }
};
// Obtiene un empleado
export const getOneEmployee = async (req: Request, resp: Response) => {
  const { id } = req.params;
  try {
    const employee = await EmployeeModel.findById(id);
    resp.status(200).json({
      ok: true,
      employee,
    });
  } catch (error) {
    resp.status(400).json({
      ok: false,
      msg: "Error al obtener el empleado",
    });
  }
};
// Actualiza un empleado
export const updateEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(id, body);
    res.status(200).json({
      ok: true,
      employee: updatedEmployee,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al actualizar el empleado",
    });
  }
};
// Elimina un empleado
export const deleteEmployee = async (req: Request, resp: Response) => {
  try {
    const id = req.params.id;
    const employee = await EmployeeModel.findByIdAndDelete(id);
    resp.json({
      ok: true,
      employee,
    });
  } catch (error) {
    resp.status(400).json({
      ok: false,
      msg: "Error al eliminar el empleado",
    });
  }
};
// Cambia de estado el empleado True/False
export const changeStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json({
      ok: true,
      employee: updatedEmployee,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al cambiar el estado del empleado",
    });
  }
};
