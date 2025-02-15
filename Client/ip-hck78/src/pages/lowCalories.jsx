import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import Swal from "sweetalert2";
import axios from "axios";

export default function LowCalories() {
  const [lowCalo, setLowCalo] = useState([]);
  console.log(lowCalo);

  useEffect(() => {
    const fetchLowCalo = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/recipes?sortBy=caloriesPerServing&order=asc"
        );
        setLowCalo(response.data.recipes);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response?.data?.message || "An error occurred",
        });
      }
    };

    fetchLowCalo();
  }, []);

  return (
    <>
      <Navbar />
      <h1
        className="flex justify-center items-center mt-8 text-3xl font-bold text-gray-800"
        style={{
          fontFamily: "'Poppins', sans-serif",
          color: "#543A14",
          borderBottom: "4px solid #E5E5E5",
          paddingBottom: "10px",
          margin: "0 auto",
          maxWidth: "80%",
          textAlign: "center",
          position: "relative",
          marginTop: "10px",
        }}
      >
        <span
          style={{
            backgroundColor: "#FAF3E0",
            padding: "0 16px",
            borderRadius: "4px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          List of Low-Calorie Recipes
        </span>
      </h1>

      <div className="w-full flex justify-center mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lowCalo.map((recipe) => {
            return (
              <div
                key={recipe.id}
                className="card shadow-lg rounded-lg overflow-hidden bg-white"
                style={{
                  width: "350px",
                  backgroundColor: "#F5F5DC",
                }}
              >
                {/* Recipe Image */}
                <div
                  className="relative"
                  style={{
                    height: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="absolute top-0 left-0 bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded-br-lg">
                    {recipe.caloriesPerServing} kcal
                  </div>
                </div>

                {/* Recipe Details */}
                <div className="p-4">
                  <h2 className="text-lg font-bold text-center text-gray-800 mb-2">
                    {recipe.name}
                  </h2>
                  <div className="text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Difficulty:</span>{" "}
                      {recipe.difficulty}
                    </p>
                    <p>
                      <span className="font-medium">Cuisine:</span>{" "}
                      {recipe.cuisine}
                    </p>
                    <p>
                      <span className="font-medium">Prep Time:</span>{" "}
                      {recipe.prepTimeMinutes} mins
                    </p>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-medium mb-1">Ingredients:</h3>
                    <ul className="list-disc list-inside text-gray-700 text-sm">
                      {recipe.ingredients?.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-medium mb-1">Instructions:</h3>
                    <ol className="list-decimal list-inside text-gray-700 text-sm">
                      {recipe.instructions?.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
