import { ObjectId } from "mongoose";
import ContactInformationInterface from "./ContactInformationInterface";

interface UserInterface {
  name: string;
  email: string;
  typeOfDocument: string;
  documentNumber: string;
  role: Object;
  contactInformation: ContactInformationInterface;
}
export default UserInterface;
