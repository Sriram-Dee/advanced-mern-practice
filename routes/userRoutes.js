import express from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/userControllers.js";
import verifyToken from "../middleware/verifyJWT.js";
import { verifyRoles } from "../middleware/verifyRoles.js";

const router = express.Router();

router.post("/", verifyToken, verifyRoles("admin", "editor"), createUser);

router.get("/", verifyToken, verifyRoles("admin", "user", "editor"), getUsers);

router.get("/:id", getUser);

router.put("/:id", verifyToken, verifyRoles("admin", "editor"),updateUser);

router.delete("/:id", verifyToken, verifyRoles("admin"), deleteUser);


export default router;