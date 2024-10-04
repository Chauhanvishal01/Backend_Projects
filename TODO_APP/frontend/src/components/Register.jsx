import React, { useState } from "react";
import { Link } from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div>
        <div className="flex h-screen items-center justify-center bg-gray-200">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold m-5 text-center">
              Sign <span className="text-red-600">Up</span>
            </h2>
            <form>
              <div className="mb-4">
                <label for="" className="block mb-2 font-semibold">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your username..."
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="mb-4">
                <label for="" className="block mb-2 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
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
                />
              </div>

              <button className="w-full p-3 bg-green-400 text-white hover:bg-green-600 duration-200 rounded-xl font-semibold ">
                Register
              </button>
              <p className="mt-4 text-center text-gray-600">
                Already have an Account ?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {" "}
                  Login
                </Link>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
