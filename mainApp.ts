import cors from "cors";
import { Application, Request, Response, json } from "express";
import morgan from "morgan";
import user from "./router/userRouter";
export const mainApp = (app: Application) => {
  app.use(json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "DELETE", "PATCH", "POST"],
    })
  );
  app.use(morgan("dev"));
  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: `Success!`,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: `Error occured while ${error?.text}`,
      });
    }
  });
  app.get("/api", (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: `Success!`,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: `Error occured while ${error?.text}`,
      });
    }
  });
  app.get("/api/v1", (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: `Success!`,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: `Error occured while ${error?.text}`,
      });
    }
  });
  app.use("/api", user);
};
