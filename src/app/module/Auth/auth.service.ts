import { AppError } from "../../error/AppError";
import { IAuth } from "./auth.interface";
import { Auth } from "./auth.model";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config";
// create new user
const createUserInFoDB = async (data: IAuth, profileImage: string) => {
  data.image = profileImage;
  const isUserExists = await Auth.findOne({ email: data?.email });
  if (isUserExists) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "This user already exists.try with another E-mail"
    );
  }

  data.role = "USER";
  const res = await Auth.create(data);
  return res;
};

// get user
const getUser = async () => {
  const res = await Auth.find();
  return res;
};

// get user
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
    userId:isUserExists?._id,
    name: isUserExists?.name,
    email: isUserExists?.email,
    role: isUserExists?.role,
    image: isUserExists?.image,
  };
  const token = jwt.sign(userInfo, config.assessToken as string, {
    expiresIn: config?.assessTokenExpireIn,
  });
  return token;
};
// Update user
const updateUser = async (data: Partial<IAuth>) => {
  // console.log("--->", data?.id);
  const isUserExists = await Auth.findOne({ _id: data?.id });
  if (!isUserExists) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "You don't have any account,Registration now"
    );
  }

  const res = await Auth.findByIdAndUpdate(
    data?.id,
    { role: data?.role },
    { new: true }
  );

  // console.log(res);

  return res;
};

export const authService = {
  createUserInFoDB,
  getUser,
  loginUser,
  updateUser,
};
