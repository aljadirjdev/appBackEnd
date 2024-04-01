import { Model, Schema, model } from "mongoose";
import EmployeeInterface from "../Interfaces/EmployeeInterface";

const EmployeeSchema = new Schema<EmployeeInterface>(
  {
    user: { type: Object },
    login: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: Boolean, default: true },
    // administrator profile, commercial profile, auditor profile
    profile: { type: [Object], required: true }, // Fix: Changed type to SchemaTypeOptions<Object, EmployeeInterface>[]
  },
  {
    timestamps: true,
  }
);
const EmployeeModel: Model<any> = model("employees", EmployeeSchema);
export default EmployeeModel;
