import nodemailer from "nodemailer";
import { google } from "googleapis";
import jwt from "jsonwebtoken";
import path from "path";
import ejs from "ejs";

const client_id =
  "172413036255-qdhvp5rcl2ig1ibnb9jbmp49p6rksbjg.apps.googleusercontent.com";
const client_secret = "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";
const client_refresh =
  "1//04Tz6MUlHfPXsCgYIARAAGAQSNwF-L9IrI_Bm_YjJXVFYfdGzRJj3TTvewcmqxuV__3TtQ1_oXUyrjPnMOCvd2GQ_zM4lkQf8Ixg";
const google_url = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(client_id, client_secret, google_url);
oAuth.setCredentials({ access_token: client_refresh });

export const sendEmail: any = async (user: any) => {
  try {
    const getAccess: any = (await oAuth.getAccessToken()).token;

    const transport: any = nodemailer.createTransport({
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

    const token = jwt.sign({ id: user?._id, token: user?.token }, "code");
    const readFile: any = path.join(__dirname, "../views/index.ejs");

    const data: any = await ejs.renderFile(readFile, {
      name: user.name,
      email: user.email,
      token: user.token,
      url: `http://localhost:5173/api/${user?._id}/verify-account`,
    });

    const mailer: any = {
      from: "Techify <kossyuzoigwe@gmail.com>",
      to: user.email,
      subject: "Account Verification",
      html: data,
    };

    await transport.sendMail(mailer).then(() => {
      console.log(`Sent to ${user.name}`);
    });
  } catch (error: any) {
    console.log("Error: ", error?.message);
  }
};
