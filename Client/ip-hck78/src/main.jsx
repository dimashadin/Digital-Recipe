import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import store from "./store";
import { Provider } from "react-redux";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Authentication from "./pages/authentication";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";

import UpdateRecipe from "./pages/UpdateRecipe";
import LowCalories from "./pages/lowCalories";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Authentication />}>
          <Route path="/" element={<Home />} />
          <Route path="/addRecipe" element={<AddRecipe />} />
          <Route path="/lowCaloriesList" element={<LowCalories />} />

          <Route path="/updateRecipe/:id" element={<UpdateRecipe />} />
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
