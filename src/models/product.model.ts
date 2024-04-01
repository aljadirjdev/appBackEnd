import { Model, Schema, model } from "mongoose";
import ProductInterface from "../Interfaces/Store/ProductInterface";

const ProductSchema = new Schema<ProductInterface>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: { type: Boolean, required: true, default: true },
    detail: { type: Object, required: true },
    maker: { type: Object, required: true },
    reviews: { type: Array },
    employee: { type: Schema.Types.ObjectId, ref: "employees" },
  },
  { timestamps: true }
);
const ProductModel: Model<any> = model<ProductInterface>(
  "products",
  ProductSchema
);
export default ProductModel;
