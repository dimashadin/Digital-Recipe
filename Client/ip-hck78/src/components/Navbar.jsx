import { Link, useNavigate } from "react-router";
import axios from "../config/axiosInstance";
import Swal from "sweetalert2";
import { FaPlusCircle, FaShoppingCart } from 'react-icons/fa';

export default function Navbar() {
  const navigate = useNavigate();
  function handleLogout(e) {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  }

  const handleBuyRecipe = async () =>{
    const {data}= await axios({
      method:"GET",
      url:"/payment/midtrans/initiate",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })

    // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
    window.snap.pay(data.transactionToken, {
      onSuccess: function(result){
        /* You may add your own implementation here */
        // alert("payment success!"); console.log(result);
          Swal.fire({
                title: "Payment success",
                icon: "success",
              });
      }
    })
  }
  return (
    <>
      <div className="navbar" style={{ backgroundColor: "#F5F5DC" }}>
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/addRecipe">
                <FaPlusCircle className="mr-2 text-green-600" /> Add Recipe
              </Link>
            </li>
            <li>
              <Link to="/lowCaloriesList">
                <FaPlusCircle className="mr-2 text-green-600" /> Low Calories List
              </Link>
            </li>
            <li>
              <button onClick={handleBuyRecipe}>
                <FaShoppingCart className="mr-2 text-blue-600" /> Buy Book Recipe
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center">
        <Link
          to="/"
          className="btn btn-ghost text-5xl"
          style={{ fontFamily: "serif", color: "#543A14" }}
        >
          MyRecipe
        </Link>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        <button onClick={handleLogout} className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-box-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
            />
            <path
              fillRule="evenodd"
              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
            />
          </svg>
        </button>
      </div>
    </div>
    </>
  );
}
