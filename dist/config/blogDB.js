"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const url = "mongodb://127.0.0.1:27017/blogDB";
const blogDB = () => {
    mongoose_1.default.connect(url).then(() => {
        console.log("Spinning.....");
    });
};
exports.blogDB = blogDB;
