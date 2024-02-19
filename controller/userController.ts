import { Request, Response } from "express";
import userModel from "../model/userModel";
import bcrypt from "bcrypt";
import { sendMail } from "../config/email";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await userModel.create({ userName, email, password: hashed });
    sendMail(user);
    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured",
      data: error?.message,
    });
  }
};
