import { ObjectId, Types } from "mongoose";
import ReviewsInterface from "./ReviewInterface";

interface ProductInterface {
  name: string;
  price: number;
  description: string;
  stock: number;
  image: string;
  category: string;
  quantity: number;
  detail: Object;
  maker: Object;
  employee?: Types.ObjectId;
  status: boolean;
  reviews?: ReviewsInterface;
}
export default ProductInterface;
