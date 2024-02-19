import { Request, Response } from "express";
import userModel from "../model/userModel";
import bcrypt from "bcrypt";
import { sendEmail } from "../config/email";
import { streamUpload } from "../config/streamifier";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await userModel.create({ name, email, password: hashed });
    sendEmail(user);
    return res.status(201).json({
      message: "Success....",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured",
      data: error?.message,
    });
  }
};

export const verifyAccount = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user: any = await userModel.findById(userID);
    if (user?.verified === false) {
      const realuser = await userModel.findByIdAndUpdate(user?._id, {
        verified: true,
        new: true,
      });

      return res.status(200).json({
        message: "Successfully verified",
        data: realuser,
      });
    } else {
      return res.status(403).json({
        message: "Error occured",
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured",
      data: error?.message,
    });
  }
};

export const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: any = await userModel.findOne({ email });
    if (user?.verified === true) {
      const checked = await bcrypt.compare(password, user?.password!);
      if (checked) {
        return res.status(200).json({
          message: "Successfully signed in",
          data: user,
        });
      } else {
        return res.status(400).json({
          message: "Invalid password",
        });
      }
    } else {
      return res.status(403).json({
        message: "User not verified",
      });
    }
  } catch (error: any) {}
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { firstName, lastName, phoneNumber, address } = req.body;

    const user: any = await userModel.findById(userID);
    if (user?.verified === true) {
      const details = await userModel.findByIdAndUpdate(
        userID,
        { firstName, lastName, phoneNumber, address },
        {
          new: true,
        }
      );

      return res.status(201).json({
        message: "Account updated successfully",
        data: details,
      });
    } else {
      return res.status(403).json({
        message: "User not verified",
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: "Error updating profile",
      data: error?.message,
    });
  }
};

export const updateImage = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user: any = await userModel.findById(userID);
    if (user?.verified === true) {
      const { secure_url, public_id }: any = await streamUpload(req);

      const updatedUser = await userModel.findByIdAndUpdate(
        userID,
        { image: secure_url, imageID: public_id },
        { new: true }
      );
    }
    return res.status(201).json({
      message: "Image updated successfully",
    });
  } catch (error: any) {
    return res.status(403).json({
      message: "Error updating image",
      data: error?.message,
    });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findByIdAndDelete(userID);
    return res.status(201).json({
      message: "Account deleted",
    });
  } catch (error: any) {
    return res.status(403).json({
      message: "Error occured while deleting account",
      data: error?.message,
    });
  }
};

export const getAllAccount = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: `Viewing ${users?.length} user(s) in the database`,
      data: users,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured while getting all accounts",
      data: error?.message,
    });
  }
};

export const getOneAccount = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID);
    return res.status(200).json({
      message: `${user?.name}'s Account details `,
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured while getting one user account",
      data: error?.message,
    });
  }
};
