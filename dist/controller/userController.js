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
exports.getOneAccount = exports.getAllAccount = exports.deleteAccount = exports.updateImage = exports.updateProfile = exports.signinUser = exports.verifyAccount = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const email_1 = require("../config/email");
const streamifier_1 = require("../config/streamifier");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const user = yield userModel_1.default.create({ name, email, password: hashed });
        (0, email_1.sendEmail)(user);
        return res.status(201).json({
            message: "Success....",
            data: user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.registerUser = registerUser;
const verifyAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if ((user === null || user === void 0 ? void 0 : user.verified) === false) {
            const realuser = yield userModel_1.default.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user._id, {
                verified: true,
                new: true,
            });
            return res.status(200).json({
                message: "Successfully verified",
                data: realuser,
            });
        }
        else {
            return res.status(403).json({
                message: "Error occured",
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.verifyAccount = verifyAccount;
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if ((user === null || user === void 0 ? void 0 : user.verified) === true) {
            const checked = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
            if (checked) {
                return res.status(200).json({
                    message: "Successfully signed in",
                    data: user,
                });
            }
            else {
                return res.status(400).json({
                    message: "Invalid password",
                });
            }
        }
        else {
            return res.status(403).json({
                message: "User not verified",
            });
        }
    }
    catch (error) { }
});
exports.signinUser = signinUser;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { firstName, lastName, phoneNumber, address } = req.body;
        const user = yield userModel_1.default.findById(userID);
        if ((user === null || user === void 0 ? void 0 : user.verified) === true) {
            const details = yield userModel_1.default.findByIdAndUpdate(userID, { firstName, lastName, phoneNumber, address }, {
                new: true,
            });
            return res.status(201).json({
                message: "Account updated successfully",
                data: details,
            });
        }
        else {
            return res.status(403).json({
                message: "User not verified",
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "Error updating profile",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.updateProfile = updateProfile;
const updateImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if ((user === null || user === void 0 ? void 0 : user.verified) === true) {
            const { secure_url, public_id } = yield (0, streamifier_1.streamUpload)(req);
            const updatedUser = yield userModel_1.default.findByIdAndUpdate(userID, { image: secure_url, imageID: public_id }, { new: true });
        }
        return res.status(201).json({
            message: "Image updated successfully",
        });
    }
    catch (error) {
        return res.status(403).json({
            message: "Error updating image",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.updateImage = updateImage;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findByIdAndDelete(userID);
        return res.status(201).json({
            message: "Account deleted",
        });
    }
    catch (error) {
        return res.status(403).json({
            message: "Error occured while deleting account",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.deleteAccount = deleteAccount;
const getAllAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find().sort({ createdAt: -1 });
        return res.status(200).json({
            message: `Viewing ${users === null || users === void 0 ? void 0 : users.length} user(s) in the database`,
            data: users,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured while getting all accounts",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.getAllAccount = getAllAccount;
const getOneAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        return res.status(200).json({
            message: `${user === null || user === void 0 ? void 0 : user.name}'s Account details `,
            data: user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured while getting one user account",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.getOneAccount = getOneAccount;
