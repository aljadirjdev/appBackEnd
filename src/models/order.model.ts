import { Model, Schema, model } from "mongoose";
import OrderInterface from "../Interfaces/Store/OrderInterface";

const OrderSchema = new Schema<OrderInterface>(
  {
    serialNumber: {
      type: Number,
      $inc: { serialNumber: 1 },
      orderStatus: { type: String, required: true },
      orderSubTotal: { type: Number, required: true },
      orderTotal: { type: Number, required: true },
      orderItems: { type: Schema.Types.ObjectId, ref: "orderItems" },
      employee: { type: Schema.Types.ObjectId, ref: "employees" },
      customer: { type: Schema.Types.ObjectId, ref: "customers" },
      orderCreationDate: { type: Date },
    },
  }, // Move the opening curly brace to a new line

  {
    timestamps: true,
  }
);

const OrderModel: Model<any> = model("orders", OrderSchema);

export default OrderModel;
