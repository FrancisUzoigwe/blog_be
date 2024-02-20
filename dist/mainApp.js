"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const postRouter_1 = __importDefault(require("./router/postRouter"));
const likeRouter_1 = __importDefault(require("./router/likeRouter"));
const mainApp = (app) => {
    app.use((0, express_1.json)());
    app.use((0, cors_1.default)({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "PATCH"],
    }));
    app.use((0, morgan_1.default)("dev"));
    app.get("/", (req, res) => {
        try {
            return res.status(200).json({
                message: "Success....",
            });
        }
        catch (error) {
            return res.status(400).json({
                message: "Error ....",
                data: error === null || error === void 0 ? void 0 : error.message,
            });
        }
    });
    app.use("/api", userRouter_1.default);
    app.use("/api", postRouter_1.default);
    app.use("/api", likeRouter_1.default);
};
exports.mainApp = mainApp;
