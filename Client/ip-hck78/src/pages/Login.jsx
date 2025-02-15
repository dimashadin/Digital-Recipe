import { useEffect, useState } from "react";
import axios from "../config/axiosInstance";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.access_token) {
      navigate("/");
    }

    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "medium" } // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "POST",
        url: "/login",
        data: {
          email,
          password,
        },
      });

      Swal.fire({
        title: "Login Success",
        icon: "success",
      });

      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  }

  async function handleCredentialResponse(response) {
    try {
      const google_token = response.credential;
      // console.log(response, '<-- ini response dari google')
      // console.log("Encoded JWT ID token: " + response.credential);
      const { data } = await axios({
        method: "POST",
        url: "/google-login",
        headers: {
          google_token,
        },
      });
      Swal.fire({
        title: "Login with google success",
        icon: "success",
      });

      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message,
      });
    }
  }

  return (
    <>
      <section className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center ">
            <h1
              className=" font-bold sm:text-3xl"
              style={{
                fontSize: "75px",
                fontFamily: "serif",
                color: "#543A14",
              }}
            >
              MyRecipe
            </h1>
          </div>

          <form
            onSubmit={handleLogin}
            className="mx-auto mb-0 mt-16 max-w-md space-y-4 "
          >
            <div>
              <div className="relative shadow-xl">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <div className="relative shadow-xl">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                No account?
                <Link to={"/register"} className="underline ml-2 text-grey-200">
                  Register
                </Link>
              </p>

              <button
                type="submit"
                className="inline-block rounded-lg  px-5 py-3 text-sm font-medium text-white"
                style={{ backgroundColor: "#543A14" }}
              >
                Login
              </button>
            </div>
            <div id="buttonDiv"></div>
          </form>
        </div>

        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt=""
            src="https://img.freepik.com/premium-vector/hat-chef-logo-template_677077-309.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>
    </>
  );
}
