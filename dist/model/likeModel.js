"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const likeModel = new mongoose_1.Schema({
    user: [{ type: mongoose_1.Types.ObjectId, ref: "post" }],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("like", likeModel);
