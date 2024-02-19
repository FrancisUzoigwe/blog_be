import mongoose from "mongoose";

const string = "mongodb://127.0.0.1:27017/blogDB";

export const blogDB = () => {
  mongoose.connect(string).then(() => {
    console.log("Connection established!");
  });
};
