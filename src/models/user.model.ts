import { Model, Schema, model } from "mongoose";
import UserInterface from "../Interfaces/UserInterface";

const UserSchema = new Schema<UserInterface>({
  name: { type: String },
  email: { type: String, required: true },
  typeOfDocument: { type: String, required: true },
  documentNumber: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "employee", "customer"],
    default: "customer",
  },
  contactInformation: { type: Object, required: true },
});
const UserModel: Model<any> = model("users", UserSchema);
export default UserModel;
