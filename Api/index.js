import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotEnv from "dotenv";
import multer from "multer";
import cors from "cors";

import { errorHandler } from "./util/errorHandler.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "./Controller/Product.controller.js";

dotEnv.config();

mongoose
  .connect("mongodb://localhost:27017/productsDB")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Api/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).array("images", 5);

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("Api/uploads"));

// Api Routes
app.post("/api/create", upload, createProduct);
app.get("/api/getAll", getAllProduct);
app.get("/api/get/:id", getProduct);
app.put("/api/update/:id", upload, updateProduct);
app.delete("/api/delete/:id", deleteProduct);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Port Runnig on ${port}`);
});
