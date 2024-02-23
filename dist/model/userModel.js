"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    image: { type: String },
    imageID: { type: String },
    verified: { type: Boolean, default: false },
    name: { type: String },
    bio: { type: String },
    lastName: { type: String },
    firstName: { type: String },
    email: { type: String, toLowerCase: true, trim: true },
    phoneNumber: { type: String },
    password: { type: String },
    address: { type: String },
    post: [{ type: mongoose_1.Types.ObjectId, ref: "posts" }],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("user", userModel);
