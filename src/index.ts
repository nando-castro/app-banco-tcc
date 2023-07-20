import express, { json, Request, Response } from "express";
import prisma from "./database";

const app = express();
app.use(json());

app.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  if (users.length > 0) return res.status(200).send(users);
  return res.send("No users found");
});

app.post("/users", async (req: Request, res: Response) => {
  const { name } = req.body;
  await prisma.user.create({
    data: {
      name,
    },
  });
  return res.sendStatus(201);
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  return res.sendStatus(200);
});

app.put("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
    },
  });
  return res.sendStatus(200);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
