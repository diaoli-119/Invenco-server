import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5001;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server is on");
});

app.get("/signin", (req: Request, res: Response) => {
  res.send("Sign In");
});

app.get("/login", (req: Request, res: Response) => {
  res.send("Login");
});

app.get("/returnemployeelist", (req: Request, res: Response) => {
  res.send("return employee list");
});

app.get("/auth", (req: Request, res: Response) => {
  res.send("authorize endpoints");
});

app.listen(port, () => {
  console.log(`⚡️[TS server]: Server is running at http://localhost:${port}`);
});
