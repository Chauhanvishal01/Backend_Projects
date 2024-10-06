import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const naviagteTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data.message || "User Logged In");

      setEmail("");
      setPassword("");
      naviagteTo("/");
    } catch (error) {
      let errorMessage = "User Login Failed";

      if (error.response && error.response.data) {
        const errors = error.response.data.errors;

        if (Array.isArray(errors)) {
          errorMessage = errors.join(", ");
        } else if (typeof errors === "string") {
          errorMessage = errors;
        }
      }

      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div>
        <div className="flex h-screen items-center justify-center bg-gray-200">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold m-5 text-center">
              Log <span className="text-red-600">In</span>
            </h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label for="" className="block mb-2 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label for="" className="block mb-2 font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password..."
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full p-3 bg-green-400 text-white hover:bg-green-600 duration-200 rounded-xl font-semibold "
              >
                Login
              </button>
              <p className="mt-4 text-center text-gray-600">
                Don't have an Account ?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {" "}
                  SignUp 
                </Link>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
