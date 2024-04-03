import mongoose from "mongoose";
import { User } from "./user.models.js";
const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Account = mongoose.model("Account", accountSchema);