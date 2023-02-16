import prisma from "./database";
import express, { json, Request, Response } from "express";

const app = express();
app.use(json());

app.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.sendStatus(200).send(users);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
