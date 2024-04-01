import PermissionInterface from "./PermissionInterface";
//  The RoleInterface is an interface that defines the structure of a role object.
interface RoleInterface {
  _id: string;
  name: string;
  description: string;
  permissions: PermissionInterface[];
}
export default RoleInterface;

