import { model, models, Schema, Types } from "mongoose";

export interface IAccount {
  userId: Types.ObjectId; // reference to User model
  name: string;
  image?: string;
  password?: string;
  provider: string; // e.g. "google", "github"
  providerAccountId: string; // unique ID from provider
}

const AccountSchema = new Schema<IAccount>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
    },
    provider: {
      type: String,
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Account = models?.account || model<IAccount>("Account", AccountSchema);

export default Account;
