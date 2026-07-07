import PostModel from "../models/PostSchema.js";
import UserModel from "../models/UserSchema.js";
import { getNextSequence } from "../utils/generateSequence.js";

const createPost = async (req, res) => {
  console.log("Create post called", req.user);
  try {
    const { title, body } = req.body;
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const nextNumber = await getNextSequence("post");
    console.log(nextNumber);

    const id = `PST-${nextNumber.toString().padStart(6, "0")}`;
    const post = await PostModel.create({
      userId: user._id,
      id,
      title,
      body,
    });

    user.posts.push(post._id);
    await user.save();

    res.status(201).json({ message: "Post created successfully", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const query = req.query.search || "";
  const filter = query
    ? {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { body: { $regex: query, $options: "i" } },
        ],
      }
    : {};
  try {
    const skip = (page - 1) * limit;
    const posts = await PostModel.find(filter).skip(skip).limit(limit);
    const totalPosts = await PostModel.countDocuments(filter);
    res.status(200).json({
      posts,
      page,
      limit,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPost = async (req, res) => {
  try {
    console.log("Getting post with id:", req.params.id);
    const post = await PostModel.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, body } = req.body;

    // ================= This part has been moved to VerifyOwner Middleware =================
    // const post = await PostModel.findById(
    //   req.params.id
    // );
    // if (!post) return res.status(404).json({ message: "Post not found" });

    // const isOwner = post.userId.toString() === req.user.id;
    // const isAdmin = req.user.role === "admin";

    // if (!isOwner && !isAdmin) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    // ==================================================================
    req.post.title = title;
    req.post.body = body;
    await req.post.save();

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    // ================= This part has been moved to VerifyOwner Middleware =================

    // const post = await PostModel.findById(req.params.id);

    // if (!post) return res.status(404).json({ message: "Post not found" });

    // const isOwner = post.userId.toString() === req.user.id;
    // const isAdmin = req.user.role === "admin";

    // if (!isOwner && !isAdmin) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    // ===============================================================
    console.log(req.post);

    await UserModel.findByIdAndUpdate(req.post.userId, {
      $pull: { posts: req.post._id },
    });

    await req.post.deleteOne();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createPost, getAllPosts, getPost, updatePost, deletePost };
