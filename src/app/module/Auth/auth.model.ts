import { model, Schema } from "mongoose";
import { IAuth } from "./auth.interface";
import { config } from "../../config";
import bcrypt from "bcrypt"
const authSchema = new Schema<IAuth>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  role: { type: String, enum: ["USER", "ADMIN"], required: true },
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
