import express, { Application } from "express";
import { mainApp } from "./mainApp";
import { blogDB } from "./config/blogDB";

const app: Application = express();
const port: number = 2345;

mainApp(app);
const Server = app.listen(port, () => {
  blogDB();
});
process.on("uncaughtException", (error: any) => {
  console.log("uncaughtException error", error?.message);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection reason", reason?.message);

  Server.close(() => {
    process.exit(1);
  });
});
