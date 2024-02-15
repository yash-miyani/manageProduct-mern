import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
        get: (image) => {
          return `${process.env.APP_URL}/${image}`;
        },
      },
    ],
  },
  { toJSON: { getters: true } }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
