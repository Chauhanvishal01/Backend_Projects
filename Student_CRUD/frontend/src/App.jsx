import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UpdatePage from "./pages/UpdatePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/update/:id" element={<UpdatePage />} />
      </Routes>
      <ToastContainer theme="dark" position="top-right" />
    </>
  );
};

export default App;
