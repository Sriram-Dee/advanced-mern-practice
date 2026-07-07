import { body } from "express-validator";

export const validateCreatePost = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("body").trim().notEmpty().withMessage("Body is required"),
];
