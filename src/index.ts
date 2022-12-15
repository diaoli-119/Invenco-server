import express, { Express, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "./dbProcess";

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT || "5001";
const refreshTokenSecretKey: string = process.env.REFRESH_TOKEN_SECRET ?? "";
const accessTokenSecretKey: string = process.env.ACCESS_TOKEN_SECRET ?? "";

app.use(express.json());

let refreshTokens = [];

app.post("/token", (req: Request, res: Response) => {
  const refreshToken: string = req.body.token;
  if (!refreshToken) return res.sendStatus(401);
  if (!refreshToken.includes(refreshToken)) return res.sendStatus(403);
  verify(refreshToken, refreshTokenSecretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    //@ts-ignore
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

// middleware
const generateAccessToken = (user: any) => {
  return sign(user, accessTokenSecretKey, { expiresIn: "15s" });
};

app.post("/login", (req, res) => {
  // Authenticate User
  const username = req.body.username;
  const user = { name: username };
  console.log("username =", req.body);
  const accessToken = generateAccessToken(user);
  const refreshToken = sign(user, refreshTokenSecretKey);
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

app.get("/employees", (req: Request, res: Response) => {
  const sqlStr: string = "SELECT * FROM employees";
  db.all(sqlStr, [], (err: Error, rows: any) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ rows });
  });
});

app.post("/createemployees", (req: Request, res: Response) => {
  let insert = "INSERT INTO employees (name, age) VALUES (?,?)";
  db.run(insert, [req.body?.name, req.body?.age]);
  res.status(200).json({ succ: "OK" });
});

app.listen(port, () => {
  console.log(`⚡️[TS server]: Server is running at http://localhost:${port}`);
});
