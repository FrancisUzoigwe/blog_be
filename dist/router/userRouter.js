"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)().single("image");
const router = express_1.default.Router();
router.route("/register").post(userController_1.registerUser);
router.route("/:userID/verify-account").patch(userController_1.verifyAccount);
router.route("/signin").post(userController_1.signinUser);
router.route("/:userID/update-profile").patch(userController_1.updateProfile);
router.route("/:userID/update-image").patch(upload, userController_1.updateImage);
router.route("/:userID/delete-account").delete(userController_1.deleteAccount);
router.route("/view-all-account").get(userController_1.getAllAccount);
router.route("/:userID/view-one-account").get(userController_1.getOneAccount);
exports.default = router;
