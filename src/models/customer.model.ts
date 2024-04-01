import { Model, Schema, model } from "mongoose";
import CustomerInterface from "../Interfaces/CustomerInterface";
const CustomerSchema = new Schema<CustomerInterface>(
  {
    user: { type: Object },
    typeOfCompany: { type: String, required: true },
    nameCompany: { type: String, required: true },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
const CustomerModel: Model<any> = model("customers", CustomerSchema);

export default CustomerModel;
