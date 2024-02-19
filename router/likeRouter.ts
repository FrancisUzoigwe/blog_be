import express from "express";
import { likePost, unlikePost } from "../controller/likeController";

const router = express.Router();
router.route("/:userID/:postID/like-post").post(likePost);
router.route("/:userID/:postID/unlike-post").post(unlikePost);

export default router;
