import { Document, model, Schema, Types } from "mongoose";

interface iUser {
  image?: string;
  imageID?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  blogs?: {}[];
}

interface iUserData extends iUser, Document {}

const userModel = new Schema<iUserData>({
  image: { type: String },
  imageID: { type: String },
  name: { type: String },
  lastName: { type: String },
  firstName: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  blogs: [{ type: Types.ObjectId, ref: "blogs" }],
});

export default model<iUserData>("user", userModel);
