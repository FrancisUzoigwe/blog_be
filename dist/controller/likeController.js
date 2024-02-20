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
exports.unlikePost = exports.likePost = void 0;
const postModel_1 = __importDefault(require("../model/postModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postID } = req.params;
        const { userID } = req.params;
        const post = yield postModel_1.default.findById(postID);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        const user = yield userModel_1.default.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        else {
            console.log("User successfully found...");
        }
        if (post.like.includes(userID)) {
            return res
                .status(400)
                .json({ message: "You have already liked this post" });
        }
        else {
            post.like.push(userID);
            post.save();
            console.log("Posted liked successfully...");
        }
        return res.status(200).json({ message: "Post liked successfully" });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error occurred while liking post",
            error: error.message,
        });
    }
});
exports.likePost = likePost;
const unlikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postID } = req.params;
        const { userID } = req.params;
        const post = yield postModel_1.default.findById(postID);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        const user = yield userModel_1.default.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!post.like.includes(userID)) {
            return res.status(400).json({ message: "You have not liked this post" });
        }
        post.like.pull(userID);
        post.save();
        return res.status(200).json({ message: "Post unliked successfully" });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error occurred while unliking post",
            error: error.message,
        });
    }
});
exports.unlikePost = unlikePost;
