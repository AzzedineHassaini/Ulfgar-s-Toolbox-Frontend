import {UserRole} from "../../../shared/enums/userRole";

export interface IAuth {
  accessToken: string,
  user:{
    id: number,
    email: string,
    pseudo: string,
    role: UserRole,
  }
}


