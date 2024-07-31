export interface IAuth {
  id: number,
  email: string,
  pseudo: string,
  role: UserRole,
  accessToken: string
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  CONTRIBUTOR = 'CONTRIBUTOR'
}

