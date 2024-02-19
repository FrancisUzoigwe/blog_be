import express from "express";
import {
  createPost,
  deletePosts,
  getAllPosts,
  getOnePost,
  updatePostDetail,
} from "../controller/postController";
import { updateImage } from "../controller/userController";
import multer from "multer";

const upload = multer().single("postImage");
const router = express.Router();
router.route("/:userID/create-post").post(upload, createPost);
router.route("/get-all-posts").get(getAllPosts);
router.route("/:postID/delete-post").delete(deletePosts);
router.route("/:postID/update-post-details").patch(updatePostDetail);
router.route("/:postID/update-post-image").patch(upload, updateImage);
router.route("/:postID/get-one-post").get(getOnePost);
export default router;
