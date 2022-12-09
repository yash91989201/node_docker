import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post";
import auth from "../middleware/auth";

const router = express.Router();

// localhost:3000/posts/

router.get("/", getPosts);
router.post("/", auth, createPost);

router.get("/:id", getPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

export default router;
