import { Document, model, Schema, Types } from "mongoose";

interface iLike {
  user: {}[];
}

interface iLikeData extends iLike, Document {}
const likeModel = new Schema<iLikeData>(
  {
    user: [{ type: Types.ObjectId, ref: "post" }],
  },
  { timestamps: true }
);

export default model<iLikeData>("like", likeModel);
