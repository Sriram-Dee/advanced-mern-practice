import PostModel from "../models/PostSchema.js";

const verifyPostOwner = async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const isOwner = post.userId.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action" });
    }

    req.post = post;

    next();
  } catch (err) {
    console.log("Error in verifyPostOwner middleware: ", err);

    res.status(500).json({ message: err.message });
  }
};

export default verifyPostOwner;
