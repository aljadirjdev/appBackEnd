import { Request, Response } from "express";
import { CustonRequestInterface } from "../middleware/validateJWT";
import ProductModel from "../models/product.model";

// Obtiene todos los productos
export const getAllProducts = async (req: Request, res: Response) => {
  // mostrar la ip de la persona que se conecta
  console.log(req.ip);
  try {
    const products = await ProductModel.find().populate({
      path: "employee",
      select: "user.name user.email role",
    });
    res.status(200).json({
      ok: true,
      products,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al obtener los productos",
    });
  }
};
// Crea un nuevo producto
export const createProduct = async (
  req: CustonRequestInterface,
  res: Response
) => {
  const { body } = req;
  const id = req._id;

  try {
    const newProduct = new ProductModel({ employee: id, ...body });
    const createdProduct = await newProduct.save();
    res.status(200).json({
      ok: true,
      msg: "Producto creado",
      product: createdProduct,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al crear el producto",
    });
  }
};
// Obtiene un producto
export const getOneProduct = async (req: Request, resp: Response) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    resp.status(200).json({
      ok: true,
      product,
    });
  } catch (error) {
    resp.status(400).json({
      ok: false,
      msg: "Error al obtener el producto",
    });
  }
};
// Actualiza un producto
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, body);
    res.status(200).json({
      ok: true,
      product: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al actualizar el producto",
    });
  }
};
// Elimina un producto
export const deleteProduct = async (req: Request, resp: Response) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findByIdAndDelete(id);
    resp.json({
      ok: true,
      product,
    });
  } catch (error) {
    resp.status(400).json({
      ok: false,
      msg: "Error al eliminar el producto",
    });
  }
};
// Cambia de estado el producto True/False
export const changeStatusProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json({
      ok: true,
      product: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al cambiar el estado del producto",
    });
  }
};
// Add review to product
export const addReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { review } = req.body;

  try {
    const { msg, punctuation } = review;
    if (!msg || !punctuation || punctuation < 1 || punctuation > 5) {
      return res.status(400).json({
        ok: false,
        msg: "La reseña debe tener un mensaje y una puntuación",
      });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { $push: { reviews: review } },
      { new: true }
    );
    res.status(200).json({
      ok: true,
      product: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al agregar la reseña",
    });
  }
};
