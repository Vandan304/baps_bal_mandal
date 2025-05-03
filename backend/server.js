import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;
const allowedOrigin = process.env.ORIGIN;

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running");
});

mongoose
  .connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(" MongoDB connected");
    app.listen(port, () => {
      console.log(` Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.error(" DB connection error:", err.message));
