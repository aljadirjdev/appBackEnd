import { ObjectId } from "mongoose";

interface OrderInterface {
  serialNumber: number;
  orderStatus: string;
  orderSubTotal: number;
  orderTotal: number;
  orderItems: ObjectId;
  customer: ObjectId;
  employee: ObjectId;
  orderCreationDate: Date;
}
export default OrderInterface;
