import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/UserSchema.js";
import { getNextSequence } from "../utils/generateSequence.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const nextNumber = await getNextSequence("userId");

    const id = `USR${nextNumber.toString().padStart(6, "0")}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      id,
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Registration Successful",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      //fake password comparison to match the timing s that hacker can't find email is not exist
      const fake = await bcrypt.compare(password, "fakepassword");
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;

    await user.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      user: {
        _id: user._id,
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "Login Successful",
      accessToken,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const refreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log("Req.cookies:", cookies);
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });
  const refreshToken = cookies.jwt;

  const user = await UserModel.findOne({ refreshToken });
  if (!user) return res.status(403).json({ message: "Forbidden" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (decoded.id !== user._id.toString())
      return res.status(403).json({ message: "Invalid token" });

    const accessToken = generateAccessToken(user);
    return res.status(200).json({
      user: {
        _id: user._id,
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });
  } catch (err) {
    if (err.name === "TokenExpiredError")
      return res.status(401).json({ message: "Token expired" });

    console.log(err);

    return res.status(403).json({ message: "Invalid token" });
  }
};

export const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  const user = await UserModel.findOne({ refreshToken });

  if (!user) return res.sendStatus(204);
  user.refreshToken = "";
  await user.save();
  res.clearCookie("jwt", { httpOnly: true, sameSite: "Strict", secure: false });
  res.status(200).json({ message: "Logged out successfully" });
};
