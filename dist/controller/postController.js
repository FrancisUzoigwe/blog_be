"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnePost = exports.updatePostImage = exports.updatePostDetail = exports.deletePosts = exports.getAllPosts = exports.createPost = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const postModel_1 = __importDefault(require("../model/postModel"));
const streamifier_1 = require("../config/streamifier");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { title, content } = req.body;
        const { secure_url, public_id } = yield (0, streamifier_1.streamUpload)(req);
        const user = yield userModel_1.default.findById(userID);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        const post = yield postModel_1.default.create({
            title,
            content,
            postImage: secure_url,
            postImageID: public_id,
        });
        user.post = user.post || [];
        user.post.push(post === null || post === void 0 ? void 0 : post._id);
        user.save();
        return res.status(201).json({
            message: "Post created successfully",
        });
    }
    catch (error) {
        return res.status(403).json({
            message: "Error occurred while creating post",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.createPost = createPost;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield postModel_1.default.find().sort({ createdAt: -1 });
        return res.status(200).json({
            message: `Viewing ${posts.length} posts in database`,
            data: posts,
        });
    }
    catch (error) {
        return res.status(403).json({
            message: "Error occured while getting all posts",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.getAllPosts = getAllPosts;
const deletePosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postID } = req.params;
        const posts = yield postModel_1.default.findByIdAndDelete(postID);
        return res.status(201).json({
            message: "Post deleted successfully",
            data: posts,
        });
    }
    catch (error) {
        return res.status(403).json({
            message: "Error occured while deleting posts",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.deletePosts = deletePosts;
const updatePostDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postID } = req.params;
        const { title, content } = req.body;
        const post = yield postModel_1.default.findByIdAndUpdate(postID, { title, content }, { new: true });
        return res.status(201).json({
            message: "Updated successfully",
            data: post,
        });
    }
    catch (error) {
        return res.status(403).json({
            message: "Error updating posts",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.updatePostDetail = updatePostDetail;
const updatePostImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postID } = req.params;
        const post = yield postModel_1.default.findById(postID);
        if (post) {
            const { secure_url, public_id } = yield (0, streamifier_1.streamUpload)(req);
            const update = yield postModel_1.default.findByIdAndUpdate(postID, { postImage: secure_url, postImageID: public_id }, { new: true });
        }
        return res.status(201).json({
            message: "Image updated successfully",
        });
    }
    catch (error) {
        return res.status(403).json({
            message: "Error updating post image",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.updatePostImage = updatePostImage;
const getOnePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postID } = req.params;
        const post = yield postModel_1.default.findById(postID);
        return res.status(200).json({
            message: "Successfully retrieved post",
            data: post,
        });
    }
    catch (error) {
        return res.status(403).json({
            message: "Error occured while getting post",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.getOnePost = getOnePost;
