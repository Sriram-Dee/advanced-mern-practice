import jwt from "jsonwebtoken";
import UserModel from "../models/UserSchema.js";

export const verifyToken = async (req, res, next) => {
    try {
    let token = req.header("Authorization");

    if (!token) {
        return res.status(403).send("Access Denied");
    }
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    const user = await UserModel.findById(verified.id);
    if (!user) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    req.user = user;
    next();
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    },
  );
};

export const generateRefreshToken = ({_id}) => {
    return jwt.sign({ id: _id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
