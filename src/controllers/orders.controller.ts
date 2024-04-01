import { Request, Response } from "express";

import { CustonRequestInterface } from "../middleware/validateJWT";
import OrderModel from "../models/order.model";

// Obtiene todas las ordenes
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find().populate([
      {
        path: "employee",
        select: "user.name user.email role",
      },
      {
        path: "customer",
        select: "user.name user.email",
      },
    ]);
    res.status(200).json({
      ok: true,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al obtener las ordenes",
    });
  }
};
// Crea una nueva orden
export const createOrder = async (
  req: CustonRequestInterface,
  res: Response
) => {
  const { body } = req;
  const id = req._id;
  console.log(id);
  try {
    const order = new OrderModel({ employee: id, ...body });
    await order.save();

    res.status(201).json({
      ok: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al crear la orden",
    });
  }
};

// Obtiene una orden
export const getOneOrder = async (req: Request, resp: Response) => {
  const { id } = req.params;
  try {
    const order = await OrderModel.findById(id);
    resp.status(200).json({
      ok: true,
      order,
    });
  } catch (error) {
    resp.status(400).json({
      ok: false,
      msg: "Error al obtener la orden",
    });
  }
};
// Actualiza una orden
export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(id, body);
    res.status(200).json({
      ok: true,
      order: updatedOrder,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al actualizar la orden",
    });
  }
};
// Actualiza el estado de una orden
export const changeStatusOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const order = await OrderModel.findById(id);
    if (!order) {
      return res.status(404).json({
        ok: false,
        msg: "La orden no existe",
      });
    }
    order.status = !order.status;
    await order.save();
    res.status(200).json({
      ok: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al cambiar el estado de la orden",
    });
  }
};
// Elimina una orden
export const deleteOrder = async (req: Request, resp: Response) => {
  try {
    const id = req.params.id;
    const order = await OrderModel.findByIdAndDelete(id);
    resp.json({
      ok: true,
      order,
    });
  } catch (error) {
    resp.status(400).json({
      ok: false,
      msg: "Error al eliminar la orden",
    });
  }
};

// add product to order
export const addProductToOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const { orderItems } = body;
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { $push: { orderItems: orderItems } },
      { new: true }
    );
    res.status(200).json({
      ok: true,
      order: updatedOrder,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al agregar el producto a la orden",
    });
  }
};

export const addCustomerToOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const { customer } = body;
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { customer },
      { new: true }
    );
    res.status(200).json({
      ok: true,
      order: updatedOrder,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al agregar el cliente a la orden",
    });
  }
};

// funcion contador de tiempo en minutos con el reloj del sistema
export const timeCounter = async (req: Request, res: Response) => {
  let minutes = 0;
  let seconds = 0;
  let interval: any;
  interval = setInterval(() => {
    seconds++;
    if (seconds === 10) {
      minutes++;
      seconds = 0;
    }
    if (minutes === 1) {
      clearInterval(interval);
    }
    console.log(`${minutes}:${seconds}`);
  }, 1000);

  res.status(200).json({
    ok: true,
    msg: "Contador de tiempo",
  });
};
