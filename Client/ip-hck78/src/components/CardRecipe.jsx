import { Link, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import axios from "../config/axiosInstance";
import { useDispatch } from "react-redux";

export default function CardRecipe({ recipe, fetchRecipe }) {
  const navigate = useNavigate();
  const { id } = useParams();
const dispatch = useDispatch()
  async function handleDelete(id) {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios({
          method: "DELETE",
          url: `/recipe/${id}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        Swal.fire("Deleted!", "Recipe has been deleted", "success");
         dispatch(fetchRecipe());
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  }

  return (
    <div
      className="card shadow-lg m-4 rounded-lg overflow-hidden flex flex-col transition-transform transform hover:scale-105"
      style={{
        backgroundColor: "#F5F5DC",
        fontFamily: "'Poppins', sans-serif",
        width: "350px",
        height: "auto", // Mengubah height agar dinamis
        border: "1px solid #E5E5E5",
      }}
    >
      {/* Image Section */}
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
            filter: "brightness(90%)",
          }}
        />
        <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
          {recipe.caloriesPerServing} kcal
        </div>
      </div>

      {/* Details Section */}
      <div
        className="p-4 flex flex-col gap-8 flex-grow"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <h1
          className="text-lg font-bold text-center text-gray-800"
          style={{
            borderBottom: "2px solid #E5E5E5",
            paddingBottom: "4px",
          }}
        >
          {recipe.name}
        </h1>

        <div className="text-sm text-gray-700">
          <p>
            <span className="font-medium">User Id:</span> {recipe.UserId}
          </p>
          <p>
            <span className="font-medium">Difficulty:</span> {recipe.difficulty}
          </p>
          <p>
            <span className="font-medium">Cuisine:</span> {recipe.cuisine}
          </p>
          <p>
            <span className="font-medium">Prep Time:</span>{" "}
            {recipe.prepTimeMinutes} minutes
          </p>
        </div>

        {/* Ingredients */}
        <div className="mt-2">
          <h2 className="font-medium text-gray-800">Ingredients:</h2>
          <ul className="list-inside text-gray-600 text-sm">
            {recipe.ingredients.split("\n").map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="mt-2">
          <h2 className="font-medium text-gray-800">Instructions:</h2>
          <ol className="list-inside text-gray-600 text-sm">
            {recipe.instructions.split("\n").map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* Actions Section (Tombol di bagian bawah) */}
      <div
        className="flex justify-center gap-4 p-4"
        style={{
          backgroundColor: "#F5F5DC",
          marginTop: "auto", // Pastikan tombol tetap berada di bawah
        }}
      >
        <Link
          to={`/updateRecipe/${recipe.id}`}
          className="text-white font-bold px-4 py-2 rounded-lg transition hover:bg-yellow-600"
          style={{
            backgroundColor: "#FFA500",
          }}
        >
          Edit Recipe
        </Link>
        <button
          onClick={() => handleDelete(recipe.id)}
          className="text-white font-bold px-4 py-2 rounded-lg transition hover:bg-red-600"
          style={{
            backgroundColor: "red",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
