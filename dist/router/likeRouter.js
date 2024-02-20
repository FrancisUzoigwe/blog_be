"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const likeController_1 = require("../controller/likeController");
const router = express_1.default.Router();
router.route("/:userID/:postID/like-post").post(likeController_1.likePost);
router.route("/:userID/:postID/unlike-post").post(likeController_1.unlikePost);
exports.default = router;
