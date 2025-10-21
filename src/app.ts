import express from "express";
import helmet from "helmet";
import { errorMiddleware } from "@/middlewares/error.js";
import dotenv from "dotenv";
import { PrismaClient } from "./generated/prisma";
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes";
import categoryRouter from "./routes/categoryRoutes";

dotenv.config({ path: "./.env" });

export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = process.env.PORT || 4000;
export const db = new PrismaClient();

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: envMode !== "DEVELOPMENT",
    crossOriginEmbedderPolicy: envMode !== "DEVELOPMENT",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// your routes here

app.use("/api", userRouter);
app.use("/api", blogRouter);
app.use("/api", categoryRouter);

app.get((req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

app.use(errorMiddleware);

app.listen(port, () =>
  console.log("Server is working on Port:" + port + " in " + envMode + " Mode.")
);
