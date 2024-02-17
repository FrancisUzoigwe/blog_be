import mongoose from "mongoose";

const url: string = "mongodb://127.0.0.1:27017/blogDB";

export const blogBD = () => {
  mongoose.connect(url).then(() => {
    console.log("Server connection has been successfully established!!");
  });
};
