import {UserRole} from "../../../shared/enums/userRole";

export interface User {
  id: number;
  email: string;
  pseudo: string;
  role: UserRole;
  image: string;
}
export interface IRoleUpdateForm {
  role: string
}
