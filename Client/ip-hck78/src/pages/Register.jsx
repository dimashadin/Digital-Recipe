import axios from "../config/axiosInstance";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.access_token) {
      navigate("/");
    }
  }, []);

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "POST",
        url: "/register",
        data: {
          username,
          email,
          password,
        },
      });

      Swal.fire({
        title: "Register Success",
        icon: "success",
      });

      navigate("/login");
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
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1
            className="text-center font-bold"
            style={{
              fontSize: "100px",
              fontFamily: "serif",
              color: "#543A14",
            }}
          >
            MyRecipe
          </h1>

          <form
            onSubmit={handleRegister}
            className="mb-0 mt-6 space-y-4 rounded-xl p-6 shadow-2xl sm:p-8 lg:p-10"
            style={{
              backgroundColor: "#F5F5DC",
              borderRadius: "20px",
            }}
          >
            <p
              className="text-center text-2xl font-medium mb-10"
              style={{ color: "#543A14" }}
            >
              Register
            </p>

            {/* Username Input */}
            <div className="relative shadow-xl">
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-[#543A14] placeholder:text-gray-500"
                placeholder="Enter Username"
              />
            </div>

            {/* Email Input */}
            <div className="relative shadow-xl">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-[#543A14] placeholder:text-gray-500"
                placeholder="Enter Email"
              />
            </div>

            {/* Password Input */}
            <div className="relative shadow-xl">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-[#543A14] placeholder:text-gray-500"
                placeholder="Enter Password"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="block w-full rounded-lg px-5 py-3 text-sm font-medium text-white"
              style={{ backgroundColor: "#543A14" }}
            >
              Register
            </button>

            {/* Link to Login */}
            <p className="text-center text-sm text-gray-500">
              Have an account?
              <Link to="/login" className="underline ml-2 text-[#543A14]">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
