import mongoose from "mongoose";

// const url: string = "mongodb://127.0.0.1:27017/blogDB";
const url: string =
  "mongodb+srv://kossyuzoigwe:kossyuzoigwe@francisuzoigwe.3irljsp.mongodb.net/blogDB";

export const blogDB = () => {
  mongoose.connect(url).then(() => {
    console.log("Spinning.....");
  });
};
