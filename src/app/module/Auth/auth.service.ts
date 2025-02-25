import { AppError } from "../../error/AppError";
import { IAuth } from "./auth.interface";
import { Auth } from "./auth.model";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config";

// create new user
const createUserInFoDB = async (data: IAuth) => {
  const isUserExists = await Auth.findOne({ email: data?.email });
  if (isUserExists) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "This user already exists.try with another E-mail"
    );
  }

  let balance;
  if (data?.accountType === "User") {
    balance = 40;
  }
  if (data?.accountType === "Agent") {
    balance = 100000;
  }

  data.role = data?.accountType;
  data.balance = balance;
  const res = await Auth.create(data);
  return res;
};

// get user
const getUser = async (role?: string) => {
  const filter = role ? { role } : {};
  const res = await Auth.find(filter);
  return res;
};
// get single user
const getSingleUser = async (id: string) => {
  const res = await Auth.findById(id);
  return res;
};

// login user
const loginUser = async (data: Partial<IAuth>) => {
  const isUserExists = await Auth.findOne({ email: data?.email });
  if (!isUserExists) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "You don't have any account,Registration now"
    );
  }

  const isPassMatch = await bcrypt.compare(
    data?.password as string,
    isUserExists?.password
  );

  if (!isPassMatch) {
    throw new AppError(StatusCodes.NOT_FOUND, "Wrong password");
  }
  const userInfo = {
    userId: isUserExists?._id,
    name: isUserExists?.name,
    email: isUserExists?.email,
    role: isUserExists?.role,
    nid: isUserExists?.nid,
  };
  const token = jwt.sign(userInfo, config.assessToken as string, {
    expiresIn: config?.assessTokenExpireIn,
  });
  return token;
};

export const authService = {
  createUserInFoDB,
  loginUser,
  getUser,
  getSingleUser,
};
