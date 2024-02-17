import express, { Application } from "express";
import { mainApp } from "./mainApp";
import { blogBD } from "./config/blogDB";

const app: Application = express();
const port: number = 2345;

mainApp(app);
const Server = app.listen(port, () => {
  blogBD();
});

process.on("uncaughtException", (error: any) => {
  console.log(`Server is shutting down due to : ${error?.text}`);

  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log(`Server is shutting down due to : ${reason?.text}`);

  Server.close(() => {
    process.exit(1);
  });
});
