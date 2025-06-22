import mongoose, { Schema, model, models, Document } from "mongoose";
import { UserType } from "../types/index"; 

// Extend Mongoose Document with your UserType
type IUser = UserType & Document;

const userSchema = new Schema<IUser>(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phonenumber: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

const User = models.User || model<IUser>("User", userSchema);
export default User;
