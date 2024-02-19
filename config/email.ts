import nodemailer from "nodemailer";
import { google } from "googleapis";
import ejs from "ejs";
import path from "path";
import jwt from "jsonwebtoken";
const google_id =
  "172413036255-qdhvp5rcl2ig1ibnb9jbmp49p6rksbjg.apps.googleusercontent.com";

const google_secret = "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";

const google_refresh =
  "1//04Tz6MUlHfPXsCgYIARAAGAQSNwF-L9IrI_Bm_YjJXVFYfdGzRJj3TTvewcmqxuV__3TtQ1_oXUyrjPnMOCvd2GQ_zM4lkQf8Ixg";

const google_url = "https://developers.google.com/oauthplayground";

const oauth = new google.auth.OAuth2(google_id, google_url, google_secret);
oauth.setCredentials({ refresh_token: google_refresh });

export const sendMail = async (user: any) => {
  try {
    const getAccess: any = (await oauth.getAccessToken()).token;

    const transport: any = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "oauth2",
        user: "kossyuzoigwe@gmail.com",
        clientId: google_id,
        clientSecret: google_secret,
        refreshToken: google_refresh,
        accessToken: getAccess,
      },
    });

    const token = jwt.sign({ id: user?._id, token: user?.token }, "code");
    const readFile: any = path.join(__dirname, "../views/index.ejs");

    const data = await ejs.renderFile(readFile, {
      userName: user?.userName,
      email: user?.email,
      token: user?.token,
      url: `https://5173/accounts/${user?._id}/${token}`,
    });

    const mailer: any = {
      from: "Techify <kossyuzoigwe@gmail.com>",
      to: user?.email,
      subject: "Techify Verification",
      html: data,
    };

    await transport.sendMail(mailer).then(() => {
      console.log("Hello");
    });
  } catch (error: any) {
    console.log(error);
  }
};
