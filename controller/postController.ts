import { Request, Response } from "express";
import userModel from "../model/userModel";
import postModel from "../model/postModel";
import { streamUpload } from "../config/streamifier";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { title, content } = req.body;
    const { secure_url, public_id }: any = await streamUpload(req);

    const user: any = await userModel.findById(userID);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const post: any = await postModel.create({
      author: userID,
      title,
      content,
      postImage: secure_url,
      postImageID: public_id,
    });

    user.post = user.post || [];
    user.post.push(post?._id);

    user.save();

    return res.status(201).json({
      message: "Post created successfully",
    });
  } catch (error: any) {
    return res.status(403).json({
      message: "Error occurred while creating post",
      data: error?.message,
    });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: `Viewing ${posts.length} posts in database`,
      data: posts,
    });
  } catch (error: any) {
    return res.status(403).json({
      message: "Error occured while getting all posts",
      data: error?.message,
    });
  }
};

export const deletePosts = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { postID } = req.body;

    const user: any = await userModel.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const post: any = await postModel.findById(postID);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== userID) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    post.deleteOne();

    user.post.pull(postID);
    user.save();

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error occurred while deleting post",
      error: error.message,
    });
  }
};

export const updatePostDetail = async (req: Request, res: Response) => {
  try {
    const { postID } = req.params;
    const { title, content } = req.body;
    const post = await postModel.findByIdAndUpdate(
      postID,
      { title, content },
      { new: true }
    );

    return res.status(201).json({
      message: "Updated successfully",
      data: post,
    });
  } catch (error: any) {
    return res.status(403).json({
      message: "Error updating posts",
      data: error?.message,
    });
  }
};

export const updatePostImage = async (req: Request, res: Response) => {
  try {
    const { postID } = req.params;
    const post = await postModel.findById(postID);
    if (post) {
      const { secure_url, public_id }: any = await streamUpload(req);
      const update = await postModel.findByIdAndUpdate(
        postID,
        { postImage: secure_url, postImageID: public_id },
        { new: true }
      );
    }

    return res.status(201).json({
      message: "Image updated successfully",
    });
  } catch (error: any) {
    return res.status(403).json({
      message: "Error updating post image",
      data: error?.message,
    });
  }
};

export const getOnePost = async (req: Request, res: Response) => {
  try {
    const { postID } = req.params;
    const post = await postModel.findById(postID);
    return res.status(200).json({
      message: "Successfully retrieved post",
      data: post,
    });
  } catch (error: any) {
    return res.status(403).json({
      message: "Error occured while getting post",
      data: error?.message,
    });
  }
};
