import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/get/${params.id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [params.id]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    images: [],
  });

  useEffect(() => {
    setFormData({
      title: product.title || "",
      description: product.description || "",
      price: product.price || "",
      images: product.images || [],
    });
  }, [product]);

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

      const response = await fetch(
        `http://localhost:5000/api/update/${product.id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      toast.success("Your Product  has been updated!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      navigate("/allProduct");
      setProduct(responseData);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto shadow-md mt-10 px-10 py-5 bg-slate-200"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold mb-4 text-center ">Update Product</h2>
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
          <div className="flex flex-wrap gap-2 mb-5">
            {product.images &&
              product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  className="mt-4 flex gap-2 w-[50px] h-[50px]"
                />
              ))}
          </div>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            accept="image/*"
            className="w-full p-2 border"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Update
        </button>
        <Link
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 float-end"
          to="/allProduct"
        >
          Show All Product
        </Link>
      </form>
    </div>
  );
};

export default UpdateProduct;
