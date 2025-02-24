import { model, Schema } from "mongoose";
import { IAuth } from "./auth.interface";
import { config } from "../../config";
import bcrypt from "bcrypt"
const authSchema = new Schema<IAuth>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  number: { type: Number, required: true,unique:true },
  balance: { type: Number, required: true },
  password: { type: String, required: true },
  nid: { type: String, required: true, unique: true },
  role: { type: String, enum: ["User", "Admin",'Agent'], required: true },
  accountType: { type: String, enum: ["User",'Agent'], required: true },
});

authSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user?.password, Number(config.saltRounds));
  next();
});

authSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret?.password;
    return ret;
  },
});

export const Auth = model<IAuth>("User", authSchema);
