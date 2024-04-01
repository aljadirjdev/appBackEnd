import RoleInterface from "./RoleInterface";
//  The ProfileInterface is an interface that defines the structure of a profile object.
interface ProfileInterface {
  // profiles ej: admin, user, customer, etc
  id: string;
  name: string;
  description: string;
  roles: RoleInterface[];
}
export default ProfileInterface;
