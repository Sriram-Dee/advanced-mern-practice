import express from "express";
const router = express.Router()
import {createPost, deletePost, getAllPosts, getPost, updatePost} from "../controllers/postController.js"
import verifyToken from "../middleware/verifyJWT.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
import verifyPostOwner from "../middleware/VerifyPostOwner.js";
import { validateCreatePost } from "../validators/postValidator.js";
import { validate } from "../middleware/validate.js";

router.post("/", verifyToken, validateCreatePost, validate ,verifyRoles("admin", "editor", "user"), createPost);
router.get("/", getAllPosts);
//get post by id
router.get("/:id", getPost);
//update post by id
router.put("/:id", verifyToken, verifyPostOwner, updatePost);
router.delete("/:id", verifyToken, verifyPostOwner, deletePost);

export default router.use(express.json());
