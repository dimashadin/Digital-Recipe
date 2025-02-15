import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import axios from "../config/axiosInstance";

import { useEffect, useState } from "react";
import CardRecipe from "../components/CardRecipe";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipe } from "../slices/recipeSlice";
import Carousel from "../components/Carousel";

export default function Home() {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipes);

  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  async function handleGemini(e) {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "POST",
        url: "/gemini",
        data: {
          message,
        },
      });

      setResult(data);
    } catch (error) {
      // console.log(error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  }

  const renderList = (list) => (
    <ul style={{ paddingLeft: "20px", lineHeight: "1.8", color: "#444" }}>
      {list.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );

  const formatRecipe = (recipe) => {
    return (
      <div style={{ textAlign: "left", marginTop: "20px" }}>
        <h3 style={{ color: "#333", fontSize: "20px" }}>{recipe.recipeName}</h3>
        <h4 style={{ color: "#555", marginTop: "10px" }}>Ingredients:</h4>
        {renderList(recipe.ingredients)}
        <h4 style={{ color: "#555", marginTop: "10px" }}>Instructions:</h4>
        {renderList(recipe.instruction)}
      </div>
    );
  };

  useEffect(() => {
    dispatch(fetchRecipe());
  }, []);

  return (
    <>
      <Navbar />

      {/* Carousel */}
      <div className="flex justify-center">
        <div className="carousel rounded-box" style={{ height: "300px" }}>
          <div className="carousel-item object-cover">
            {recipe.map((recipe) => {
              return <Carousel key={recipe.id} recipe={recipe} />;
            })}
          </div>
        </div>
      </div>
      {/* Carousel End */}

      <div className="flex justify-center items-center my-6">
        <h1
          style={{
            fontSize: "36px",
            fontFamily: "'Poppins', sans-serif",
            color: "#543A14",
            fontWeight: "bold",
            textAlign: "center",
            borderBottom: "3px solid #E5E5E5",
            paddingBottom: "8px",
            maxWidth: "80%",
          }}
        >
          Our Recipes
        </h1>
      </div>

      {/* AI BUTTON */}
      <div>
        <button
          className="ml-5"
          style={{
            width: "60px",
            height: "60px",
            padding: "10px",
            backgroundColor: "#543A14",
            color: "#F5F5DC",
            border: "none",
            borderRadius: "50%", // Membuat tombol menjadi bulat
            cursor: "pointer",
            position: "fixed",
            bottom: "20px", // Jarak dari bawah
            right: "20px", // Jarak dari kanan
            zIndex: 1000, // Pastikan tombol tetap di atas elemen lain
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Menambahkan efek bayangan untuk kesan melayang
            transition: "all 0.3s ease", // Animasi halus ketika tombol dihover
          }}
          onClick={() => setShowModal(true)}
          onMouseEnter={(e) =>
            (e.target.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)")
          } // Bayangan lebih besar saat hover
          onMouseLeave={(e) =>
            (e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)")
          } // Mengembalikan bayangan
        >
          AI
        </button>

        {showModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                width: "500px",
                maxHeight: "80%", // Limiting the max height of the modal
                textAlign: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                overflowY: "auto", // Adding scroll if content overflows
              }}
            >
              <h2 style={{ marginBottom: "20px", color: "#333" }}>
                Tuliskan apa yang sedang kalian rasakan saat ini maka kami akan
                membuatkan resep makanannya !
              </h2>
              <form onSubmit={handleGemini}>
                <textarea
                  placeholder="Enter your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    marginBottom: "20px",
                    fontSize: "14px",
                    color: "#333",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#543A14",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Generate
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </form>
              {result && (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <h2 style={{ color: "#333" }}>Generated Recipe</h2>
                  {formatRecipe(result)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* AI BUTTON END */}

      {/* CARD */}
      <div className="w-full flex justify-center mt-2 ">
        <div className="grid grid-cols-3 gap-2">
          {recipe.map((recipe) => {
            return (
              <CardRecipe
                key={recipe.id}
                recipe={recipe}
                fetchRecipe={fetchRecipe}
              />
            );
          })}
        </div>
      </div>
      {/* CARD END */}
    </>
  );
}
