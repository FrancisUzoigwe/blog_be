import { Application, Request, Response, json } from "express";
import cors from "cors";
import morgan from "morgan";

export const mainApp = (app: Application) => {
  app.use(json());
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "DELETE", "PATCH", "POST"],
    })
  );
  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: "Success!",
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error?.message,
      });
    }
  });
};
