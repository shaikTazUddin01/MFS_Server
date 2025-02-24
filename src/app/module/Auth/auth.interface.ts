export interface IAuth {
  id?: string;
  name: string;
  email: string;
  password: string;
  image: string;
  role: "USER" | "ADMIN";
}

export interface IDecodedUser {
  userId: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
  iat: number;
  exp: number;
}

export enum TUser_Role {
  USER = "USER",
  ADMIN = "ADMIN",
}