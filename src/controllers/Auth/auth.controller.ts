import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import generateToken from "../../helpers/jwt";

import EmployeeModel from "../../models/employee.model";
import { CustonRequestInterface } from "../../middleware/validateJWT";

// Autenticate employee
export const autenticateEmployee = async (req: Request, res: Response) => {
  const { login: email, password } = req.body;
  try {
    const employeeLogin = await EmployeeModel.findOne({ login: email });
    if (!employeeLogin) {
      return res.status(401).json({
        ok: false,
        msg: "Credenciales no validas",
      });
    }

    // Validar password
    const validatePassword = bcrypt.compareSync(
      password,
      employeeLogin.password
    );
    if (!validatePassword) {
      return res.status(401).json({
        ok: false,
        msg: "Usuario y contraseña incorrecto",
      });
    }
    // generate token
    const token = await generateToken(employeeLogin._id, employeeLogin.email);

    res.status(200).json({ ok: true, user: employeeLogin, token });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error,
      msg: "Pongase en contacto con el admin",
    });
  }
};

// Generate new token
export const newToken = async (req: CustonRequestInterface, res: Response) => {
  const id = req._id;
  if (typeof id === "undefined") {
    throw new Error("No existe id");
  }
  const user = await EmployeeModel.findById(id);
  // Generate token
  const token = await generateToken(id.toString());

  try {
    res.json({
      ok: true,
      token,
      user,
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      error,
      msg: "Comuniquese con el administrador",
    });
  }
};

// Renew token
export const renewToken = async (
  req: CustonRequestInterface,
  res: Response
) => {
  const id = req._id;
  if (typeof id === "undefined") {
    throw new Error("No existe id");
  }
  // Get user
  const employee = await EmployeeModel.findById(id);
  // Generate token
  const token = await generateToken(id.toString());
  try {
    res.json({
      ok: true,
      token,
      employee,
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      error,
      msg: "Comuniquese con el administrador",
    });
  }
};

//  change password
export const changePassword = async (
  req: CustonRequestInterface,
  res: Response
) => {
  const id = req._id;
  if (typeof id === "undefined") {
    throw new Error("No existe id");
  }
  const { password, newPassword } = req.body;
  const employee = await EmployeeModel.findById(id);
  // Validate password
  const validatePassword = bcrypt.compareSync(password, employee.password);
  if (!validatePassword) {
    return res.status(401).json({
      ok: false,
      msg: "Contraseña incorrecta",
    });
  }
  // Encrypt password
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(newPassword, salt);
  try {
    await EmployeeModel.findByIdAndUpdate(id, { password: passwordHash });
    res.json({
      ok: true,
      msg: "Contraseña actualizada",
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      error,
      msg: "Comuniquese con el administrador",
    });
  }
};

// Forgot password
export const forgotMyPassword = async (req: Request, res: Response) => {
  const { login, documentNumber } = req.body;

  try {
    const employee = await EmployeeModel.findOne({
      login: login,
      "user.documentNumber": documentNumber,
    });

    if (!employee) {
      return res.status(401).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }
    // generate token
    const token = await generateToken(
      employee._id,
      employee.documentNumber,
      process.env.FORGOT_PASSWORD_EXPIRE_IN,
      process.env.FORGOT_PASSWORD_SECRET_WORD
    );
    res.json({
      ok: true,
      token,
      employee,
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      error,
      msg: "Comuniquese con el administrador",
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { newPassword } = req.body;
  const id = req.params.id;
  // Encrypt password
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(newPassword, salt);
  try {
    await EmployeeModel.findByIdAndUpdate(id, { password: passwordHash });
    res.json({
      ok: true,
      msg: "Contraseña actualizada",
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      error,
      msg: "Comuniquese con el administrador",
    });
  }
};
