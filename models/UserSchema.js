import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    refreshToken: {
      type: String,
      default: "",
    },
    posts: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true },
);

const UserModel = mongoose.model("User", User);

export default UserModel;