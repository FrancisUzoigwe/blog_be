import { Document, model, Schema, Types } from "mongoose";

interface iUser {
  image?: any;
  imageID?: any;
  firstName?: any;
  lastName?: any;
  userName?: any;
  verified?: boolean;
  emailAddress?: any;
  password?: any;
  posts?: {}[];
}

interface iUserData extends iUser, Document {}
const userModel = new Schema<iUserData>(
  {
    image: { type: String },
    imageID: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    verified: { type: Boolean, default: false },
    userName: { type: String },
    password: { type: String, toLowerCase: true, trim: true },
    emailAddress: { type: String },
    posts: [{ type: Types.ObjectId, ref: "blog" }],
  },
  { timestamps: true }
);

export default model<iUserData>("user", userModel);
