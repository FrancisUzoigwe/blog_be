import express, { Application } from "express";
import { mainApp } from "./mainApp";
import { blogDB } from "./config/blogDB";

const port: number = 2345;
const app: Application = express();

mainApp(app);
const Server = app.listen(port, () => {
  blogDB();
});

process.on("uncaughtException", (error) => {
  console.log("Uncaught exception error", error);

  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.log("unhandled rejection error", reason);

  Server.close(() => {
    process.exit(1);
  });
});
