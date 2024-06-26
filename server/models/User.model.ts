import mongoose from "mongoose";

const schema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      requied: true,
    },
    email: {
      type: String,
      requied: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", schema);