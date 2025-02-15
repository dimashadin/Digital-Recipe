import { createSlice } from "@reduxjs/toolkit";
import axios from "../config/axiosInstance";
import Swal from "sweetalert2";

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    recipes: [],
  },
  reducers: {
    setRecipes(state, { payload }) {
      state.recipes = payload;
    },
  },
});

// named export
export const { setRecipes } = recipeSlice.actions;

export const fetchRecipe = () => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "/recipe",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    dispatch(setRecipes(data));
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.message,
    });
  }
};

export default recipeSlice.reducer;
