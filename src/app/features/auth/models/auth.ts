export interface IAuth {
  accessToken: string,
  user:{
    id: number,
    email: string,
    pseudo: string,
    role: UserRole,
  }
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  CONTRIBUTOR = 'CONTRIBUTOR'
}

