"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controller/postController");
const userController_1 = require("../controller/userController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)().single("postImage");
const router = express_1.default.Router();
router.route("/:userID/create-post").post(upload, postController_1.createPost);
router.route("/get-all-posts").get(postController_1.getAllPosts);
router.route("/:postID/delete-post").delete(postController_1.deletePosts);
router.route("/:postID/update-post-details").patch(postController_1.updatePostDetail);
router.route("/:postID/update-post-image").patch(upload, userController_1.updateImage);
router.route("/:postID/get-one-post").get(postController_1.getOnePost);
exports.default = router;
