import { model, models, Schema } from "mongoose";

export interface IUser {
  name: string;
  userName: string;
  email: string;
  bio?: string;
  image: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    portfolio: {
      type: String,
    },
    reputation: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt fields
);

const User = models?.User || model<IUser>("User", UserSchema); // checks if model already exists to prevent recompilation errors in development

export default User;
