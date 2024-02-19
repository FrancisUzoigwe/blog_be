import { Application, Request, Response, json } from "express";
import cors from "cors";
import morgan from "morgan";

export const mainApp = (app: Application) => {
  app.use(json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "DELETE", "PATCH"],
    })
  );
  app.use(morgan("dev"));
  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: "Success....",
      });
    } catch (error: any) {
      return res.status(400).json({
        message: "Error ....",
        data: error?.message,
      });
    }
  });
};
