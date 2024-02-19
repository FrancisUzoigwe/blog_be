import { Document, model, Schema, Types } from "mongoose";

interface iUser {
  image: string;
  imageID: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  verified: boolean;
  password: string;
  address: string;
  bio: string;
  post?: {}[];
}

interface iUserData extends iUser, Document {}

const userModel = new Schema<iUserData>(
  {
    image: { type: String },
    imageID: { type: String },
    verified: { type: Boolean, default: false },
    name: { type: String, unique: true },
    bio: { type: String },
    lastName: { type: String },
    firstName: { type: String },
    email: { type: String, toLowerCase: true, trim: true },
    phoneNumber: { type: String },
    password: { type: String },
    address: { type: String },
    post: [{ type: Types.ObjectId, ref: "posts" }],
  },
  { timestamps: true }
);

export default model<iUserData>("user", userModel);
