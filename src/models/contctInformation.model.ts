import { Schema } from "mongoose";

const ContactInformationSchema = new Schema(
  {
    phone: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export default ContactInformationSchema;
