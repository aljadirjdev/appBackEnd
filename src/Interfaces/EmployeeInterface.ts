import UserInterface from "./UserInterface";
interface EmployeeInterface {
  user: UserInterface;
  login: string;
  password: string;
  profile: Object;
  status: Boolean;
}
export default EmployeeInterface;
