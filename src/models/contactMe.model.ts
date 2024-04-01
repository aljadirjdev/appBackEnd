import { Schema, model } from "mongoose";

const ContactMeSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    oportunity: { type: Schema.Types.ObjectId, ref: "opportunityManagements" },
  },
  {
    timestamps: true,
  }
);
const ContactMeModel = model("contactMe", ContactMeSchema);
export default ContactMeModel;
