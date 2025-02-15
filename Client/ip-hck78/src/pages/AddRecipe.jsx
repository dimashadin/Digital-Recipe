import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../config/axiosInstance";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";

export default function AddRecipe() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstruction] = useState("");
  const [prepTimeMinutes, setPrepTimeMinutes] = useState(0);
  const [difficulty, setDifficulty] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [caloriesPerServing, setCaloriesPerServing] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "POST",
        url: "/recipe",
        data: {
          name,
          ingredients,
          instructions,
          prepTimeMinutes,
          difficulty,
          cuisine,
          caloriesPerServing,
          image,
          rating,
        },
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      navigate("/");
      Swal.fire({
        title: `New Recipe Created`,
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  }

  return (
    <>
      <Navbar />
      {/* Form Container */}
      <div className="flex justify-center items-center mt-10">
        <div
          className="p-8 rounded-lg shadow-lg w-full max-w-lg"
          style={{
            backgroundColor: "#FAF3E0",
            border: "1px solid #E5E5E5",
          }}
        >
          <h2
            className="text-3xl font-bold text-center mb-6"
            style={{
              fontFamily: "'Poppins', sans-serif",
              color: "#543A14",
              borderBottom: "3px solid #E5E5E5",
              paddingBottom: "10px",
            }}
          >
            Add a New Recipe
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-800"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter recipe name"
                className="input input-bordered w-full focus:ring focus:ring-yellow-400"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Ingredients Field */}
            <div>
              <label
                htmlFor="ingredients"
                className="block text-sm font-medium text-gray-800"
              >
                Ingredients
              </label>
              <textarea
                id="ingredients"
                placeholder="List ingredients, separated by commas"
                className="textarea textarea-bordered w-full focus:ring focus:ring-yellow-400"
                rows="4"
                onChange={(e) => setIngredients(e.target.value)}
              ></textarea>
            </div>

            {/* Instructions Field */}
            <div>
              <label
                htmlFor="instructions"
                className="block text-sm font-medium text-gray-800"
              >
                Instructions
              </label>
              <textarea
                id="instructions"
                placeholder="Step-by-step instructions"
                className="textarea textarea-bordered w-full focus:ring focus:ring-yellow-400"
                rows="4"
                onChange={(e) => setInstruction(e.target.value)}
              ></textarea>
            </div>

            {/* Preparation Time Field */}
            <div>
              <label
                htmlFor="prepTime"
                className="block text-sm font-medium text-gray-800"
              >
                Preparation Time (minutes)
              </label>
              <input
                id="prepTime"
                type="number"
                placeholder="Enter preparation time"
                className="input input-bordered w-full focus:ring focus:ring-yellow-400"
                onChange={(e) => setPrepTimeMinutes(e.target.value)}
              />
            </div>

            {/* Difficulty Field */}
            <div>
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium text-gray-800"
              >
                Difficulty
              </label>
              <input
                id="difficulty"
                type="text"
                placeholder="e.g., Easy, Medium, Hard"
                className="input input-bordered w-full focus:ring focus:ring-yellow-400"
                onChange={(e) => setDifficulty(e.target.value)}
              />
            </div>

            {/* Cuisine Field */}
            <div>
              <label
                htmlFor="cuisine"
                className="block text-sm font-medium text-gray-800"
              >
                Cuisine
              </label>
              <input
                id="cuisine"
                type="text"
                placeholder="e.g., Italian, Indian, Chinese"
                className="input input-bordered w-full focus:ring focus:ring-yellow-400"
                onChange={(e) => setCuisine(e.target.value)}
              />
            </div>

            {/* Calories Field */}
            <div>
              <label
                htmlFor="calories"
                className="block text-sm font-medium text-gray-800"
              >
                Calories per Serving
              </label>
              <input
                id="calories"
                type="number"
                placeholder="Enter calories per serving"
                className="input input-bordered w-full focus:ring focus:ring-yellow-400"
                onChange={(e) => setCaloriesPerServing(e.target.value)}
              />
            </div>

            {/* Rating Field */}
            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-800"
              >
                Rating (1-5)
              </label>
              <input
                id="rating"
                type="number"
                placeholder="Enter recipe rating"
                className="input input-bordered w-full focus:ring focus:ring-yellow-400"
                onChange={(e) => setRating(e.target.value)}
              />
            </div>

            {/* Image URL Field */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-800"
              >
                Image URL
              </label>
              <input
                id="image"
                type="text"
                placeholder="Enter image URL"
                className="input input-bordered w-full focus:ring focus:ring-yellow-400"
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-between items-center mt-6">
              <Link
                to="/"
                className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition"
              >
                Back
              </Link>
              <button
                type="submit"
                className="px-4 py-2 text-white rounded-lg transition"
                style={{
                  backgroundColor: "#543A14",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
