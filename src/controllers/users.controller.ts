// Create a new user

import { Request, Response } from "express";
import UserModel from "../models/user.model";
import UserInterface from "../Interfaces/UserInterface";

// This function receives the request and response objects from Express
export const createUser = async (req: Request, res: Response) => {
  console.log(req);
  const { body } = req;
  try {
    const newUser = new UserModel<UserInterface>(body);
    const createdUser = await newUser.save();
    res.status(200).json({
      ok: true,
      msg: "Usuario creado",
      user: createdUser,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al crear el usuario",
    });
  }
};
export default createUser;
