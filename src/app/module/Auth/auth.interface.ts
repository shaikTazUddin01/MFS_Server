export interface IAuth {
  id?: string;
  name: string;
  email: string;
  number: number;
  password: string;
  accountType: "User"|"Agent"|"Admin";
  role: "User" | "Admin"|"Agent";
  nid: string;
  balance:number |undefined;
  income?:number;
  accountStatus?:"Pending"|"Active"|"Block"|"Verified"|"Reject";
}

export interface IDecodedUser {
  userId: string;
  email: string;
  number: number;
  name: string;
  role: "User" | "Admin"|"Agent";
  nid: string;
  iat: number;
  exp: number;
  balance:number;
}

export enum TUser_Role {
  USER = "USER",
  ADMIN = "ADMIN",
  Agent = "Agent",
}