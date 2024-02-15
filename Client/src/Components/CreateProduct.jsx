// src/components/CreateProductForm.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    images: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormData((prevState) => ({
      ...prevState,
      images: files,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);

      // Convert FileList to an array
      const imageFiles = Array.from(formData.images);

      // Append each file to the FormData
      imageFiles.forEach((file, index) => {
        formDataToSend.append(`images`, file);
      });
      const res = await fetch("http://localhost:5000/api/create", {
        method: "POST",
        body: formDataToSend,
      });
      if (res.ok) {
        toast.success("Product Create Successfully...", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      setFormData({
        title: "",
        description: "",
        price: "",
        images: [],
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div>
      <header className="App-header">
        <h1 className="text-3xl font-bold text-center mt-8">
          MERN Stack Product Management
        </h1>
      </header>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto shadow-2xl shadow-current mt-10 p-10"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold mb-4 text-center">Create Product</h2>
        <div className="mb-4">
          <label className="block mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Images:</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            required
            accept="image/*"
            className="w-full p-2 border"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create
        </button>

        <Link
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 float-end
      "
          to="/allProduct"
        >
          Show All Product
        </Link>
      </form>
    </div>
  );
};

export default CreateProduct;
