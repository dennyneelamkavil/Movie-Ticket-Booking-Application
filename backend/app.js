import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./db/index.js";
import router from "./routes/index.js";
const PORT = process.env.PORT;

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
