import { Request, Response } from "express";
import CustomerModel from "../models/customer.model";
// Obtiene todos los clientes
export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await CustomerModel.find();
    res.json({
      ok: true,
      customers,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al traer los usuarios",
    });
  }
};
// Crea un nuevo cliente
export const createCustomer = async (req: Request, res: Response) => {
  try {
    // Obtener el body de la petición
    const { body } = req;
    const { email, documentNumber } = body.user;
    console.log(documentNumber);

    // Validar si el email ya existe
    const customerEmail = await CustomerModel.findOne({
      "user.email": email,
    });
    //
    const customerDocumentNumber = await CustomerModel.findOne({
      "user.documentNumber": documentNumber,
    });
    if (customerEmail) {
      // Si el email ya existe
      return res.status(400).json({
        ok: false,
        msg: `El cliente con email: ${email}, ya existe`,
      });
    }
    //  Si el documento ya existe
    else if (customerDocumentNumber) {
      return res.status(400).json({
        ok: false,
        msg: `El cliente con documento: ${documentNumber}, ya existe`,
      });
    }
    // Crear el nuevo cliente
    const newCustomer = new CustomerModel(body);
    const createdCustomer = await newCustomer.save();
    res.status(200).json({
      ok: true,
      msg: "Usuario creado",
      customer: createdCustomer,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al crear el usuario",
    });
  }
};
// Obtiene un cliente
export const getOneCustomer = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log(id);
    const customer = await CustomerModel.findById(id);
    res.json({
      ok: true,
      customer,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al obtener el usuario",
    });
  }
};

// Actualiza un cliente
export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { body } = req;
    const customerUpdate = await CustomerModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    res.json({
      ok: true,
      customer: customerUpdate,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al actualizar el usuarios",
    });
  }
};
// Cambia de estado el usuario True/False
export const changeStatusCustomer = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const userUpdateStatus = await CustomerModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json({
      ok: true,
      user: userUpdateStatus,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al cambiar el estado del usuarios",
    });
  }
};
// Elimina un cliente
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await CustomerModel.findByIdAndDelete(id);
    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al eliminar el usuario",
    });
  }
};
