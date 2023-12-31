import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./utils/config.js";
import productRouter from "./routes/productRouter.js";

const app = express();

const connectToDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connection Success");
  } catch (error) {
    console.log(`Error occured connecting to the database ${error} `);
  }
};

connectToDB(config.MONGODB_URI);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("dist"));
app.use("/api/products", productRouter);

export default app;
