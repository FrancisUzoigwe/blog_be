"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postModel = new mongoose_1.Schema({
    title: { type: String },
    content: { type: String },
    postImage: { type: String },
    postImageID: { type: String },
    like: [{ type: mongoose_1.Types.ObjectId, ref: "like" }],
    author: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "user",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("posts", postModel);
