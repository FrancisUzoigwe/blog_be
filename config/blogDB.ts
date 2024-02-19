import mongoose from "mongoose";

const url: string = "mongodb://127.0.0.1:27017/blogDB";

export const blogDB = () => {
  mongoose.connect(url).then(() => {
    console.log("Spinning.....");
  });
};
