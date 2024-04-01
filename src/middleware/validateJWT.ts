import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");

// Interface for request
export interface CustonRequestInterface extends Request {
  _id?: number;
}
//  Validate JWT
const validateJWT = (
  req: CustonRequestInterface,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");
  console.log(token);
  // Validate token
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la peticion",
    });
  }
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req._id = _id;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token",
    });
  }
};
export default validateJWT;

export const generateJWT = (id: number, login: string = "") => {
  return new Promise((resolve, reject) => {
    const payload = { id, login };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRE_IN,
      (err: any, token: any) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }
        resolve(token);
      }
    );
  });
};
