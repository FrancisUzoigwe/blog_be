import { Document, model, Schema, Types } from "mongoose";
interface iUser {
  image?: any;
  imageID?: any;
  userName?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  verified?: boolean;
  phoneNumber?: string;
  posts: {}[];
}

interface iUserData extends iUser, Document {}

const userModel = new Schema<iUserData>({
  image: { type: String },
  imageID: { type: String },
  userName: { type: String },
  lastName: { type: String },
  firstName: { type: String },
  password: { type: String },
  phoneNumber: { type: String },
  verified: { type: Boolean, default: false },
  posts: [
    {
      type: Types.ObjectId,
      ref: "blog",
    },
  ],
});

export default model<iUserData>("user", userModel);
