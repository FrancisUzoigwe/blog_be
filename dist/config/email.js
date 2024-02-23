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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const client_id = "172413036255-qdhvp5rcl2ig1ibnb9jbmp49p6rksbjg.apps.googleusercontent.com";
const client_secret = "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";
const client_refresh = "1//04Tz6MUlHfPXsCgYIARAAGAQSNwF-L9IrI_Bm_YjJXVFYfdGzRJj3TTvewcmqxuV__3TtQ1_oXUyrjPnMOCvd2GQ_zM4lkQf8Ixg";
const google_url = "https://developers.google.com/oauthplayground";
const oAuth = new googleapis_1.google.auth.OAuth2(client_id, client_secret, google_url);
oAuth.setCredentials({ access_token: client_refresh });
const sendEmail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAccess = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "kossyuzoigwe@gmail.com",
                clientId: client_id,
                clientSecret: client_secret,
                refreshToken: client_refresh,
                accessToken: getAccess,
            },
        });
        const token = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user._id, token: user === null || user === void 0 ? void 0 : user.token }, "code");
        const readFile = path_1.default.join(__dirname, "../views/index.ejs");
        const data = yield ejs_1.default.renderFile(readFile, {
            name: user.name,
            email: user.email,
            token: user.token,
            url: `https://techify-io.web.app/api/${user === null || user === void 0 ? void 0 : user._id}/verify-account`,
        });
        const mailer = {
            from: "Techify <kossyuzoigwe@gmail.com>",
            to: user.email,
            subject: "Account Verification",
            html: data,
        };
        yield transport.sendMail(mailer).then(() => {
            console.log(`Sent to ${user.name}`);
        });
    }
    catch (error) {
        console.log("Error: ", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.sendEmail = sendEmail;
