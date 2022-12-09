import { Request, Response } from "express";

import Post, { PostSchemaType } from "../db/models/post";

export async function getPosts(req: Request, res: Response) {
  try {
    const posts = await Post.find<PostSchemaType>();
    res.status(200).json({
      success: true,
      message: "Fetched all posts",
      data: {
        posts,
      },
    });
  } catch (error: unknown) {
    res.status(200).json({
      success: false,
      message: "Unable to fetch posts",
      error,
      data: null,
    });
  }
}

export async function getPost(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const post = await Post.findById<PostSchemaType>(id);
    res.status(200).json({
      success: true,
      message: "Fetched post by given id",
      data: {
        post,
      },
    });
  } catch (error: unknown) {
    res.status(200).json({
      success: false,
      message: "Unable to fetch post",
      error,
      data: null,
    });
  }
}

export async function createPost(req: Request, res: Response) {
  try {
    const { title, body } = req.body;
    const post = await Post.create({
      title,
      body,
    });
    res.status(200).json({
      success: true,
      message: "New post added",
      data: {
        post,
      },
    });
  } catch (error: unknown) {
    res.status(200).json({
      success: false,
      message: "Unable to create post",
      error,
      data: null,
    });
  }
}

export async function updatePost(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const { title, body } = req.body;
    const post = await Post.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          body,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Updated Post",
      data: {
        post,
      },
    });
  } catch (error: unknown) {
    res.status(200).json({
      success: false,
      message: "Unable to update post",
      error,
      data: null,
    });
  }
}

export async function deletePost(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const post = await Post.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Post deleted",
      data: {
        post,
      },
    });
  } catch (error: unknown) {
    res.status(200).json({
      success: false,
      message: "Unable to fetch post",
      error,
      data: null,
    });
  }
}
