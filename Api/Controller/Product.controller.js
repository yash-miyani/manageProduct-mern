import { dirname, resolve } from "path";
import Product from "../module/Product.models.js";
import { ApiError } from "../util/ApiError.js";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const folderPath = resolve(__dirname, "../");

export const createProduct = async (req, res, next) => {
  try {
    const { title, description, price } = req.body;
    const images = req.files;
    const imgFilenames = images.map((image) => image.filename);
    const product = await Product.create({
      title,
      description,
      price,
      images: imgFilenames,
    });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new ApiError(404, "Product Not Found");
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const findData = await Product.findById(req.params.id);
    let imagePath;

    // Check if new files are uploaded
    if (req.files && req.files.length > 0) {
      // Delete existing images if needed
      findData.images.forEach((img) => {
        fs.unlink(`${folderPath}/uploads/${img.split("/")[3]}`, (unlink) => {
          if (unlink) {
            console.log("File deleted successfully");
          }
        });
      });

      // Map new file names
      imagePath = req.files.map((image) => image.filename);
    } else {
      // No new files, keep existing images
      imagePath = findData.images;
    }

    const { title, description, price } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        price,
        images: imagePath,
      },
      { new: true }
    );
    if (!updatedProduct) {
      throw new ApiError(404, "Product is not product");
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      throw new ApiError(404, "Product not found");
    }

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};
