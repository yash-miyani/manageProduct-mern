import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateProduct from "./Components/CreateProduct";
import ShowProduct from "./Components/ShowProduct";
import UpdateProduct from "./Components/Updateproduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateProduct />} />
          <Route path="/allProduct" element={<ShowProduct />} />
          <Route path="/updateProduct/:id" element={<UpdateProduct />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
};

export default App;
