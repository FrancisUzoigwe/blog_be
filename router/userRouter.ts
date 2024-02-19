import express from "express";
import {
  deleteAccount,
  getAllAccount,
  getOneAccount,
  registerUser,
  signinUser,
  updateImage,
  updateProfile,
  verifyAccount,
} from "../controller/userController";

import multer from "multer";
const upload = multer().single("image");
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/:userID/:token/verify-account").patch(verifyAccount);
router.route("/signin").post(signinUser);
router.route("/:userID/update-profile").patch(updateProfile);
router.route("/:userID/update-image").patch(upload, updateImage);
router.route("/:userID/delete-account").delete(deleteAccount);
router.route("/view-all-account").get(getAllAccount);
router.route("/:userID/view-one-account").get(getOneAccount);

export default router;
