import { Document, model, Schema, Types } from "mongoose";

interface iPost {
  title: string;
  content: string;
  author: {}[];
  postImage: string;
  postImageID: string;
  like: {}[];
}

interface iPostData extends iPost, Document {}
const postModel = new Schema<iPostData>(
  {
    title: { type: String },
    content: { type: String },
    postImage: { type: String },
    postImageID: { type: String },
    like: [{ type: Types.ObjectId, ref: "like" }],
    author: [
      {
        type: Types.ObjectId,
        ref: "user",
      },
    ],
  },

  { timestamps: true }
);

export default model<iPostData>("posts", postModel);
