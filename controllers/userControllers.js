import UserModel from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import { getNextSequence } from "../utils/generateSequence.js";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log();

  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const userExists = await UserModel.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already exists" });

    const nextNumber = await getNextSequence("user");
    const userId = `USR-${nextNumber.toString().padStart(6, "0")}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      id: userId,
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password -refreshToken");

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ id: req.params.id })
      .select("-password -refreshToken")
      .populate("posts");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * UPDATE USER
 */
export const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await UserModel.findOneAndUpdate(
      { id: req.params.id },
      {
        name,
        email,
      },
      {
        new: true,
      },
    ).select("-password -refreshToken");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * DELETE USER
 */
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserModel.findOneAndDelete({
      id: req.params.id,
    });

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};