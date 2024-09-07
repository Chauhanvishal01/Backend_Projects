import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    fees: "",
  });
  const queryClient = useQueryClient();

  const { mutate: register } = useMutation({
    mutationFn: async ({ name, age, fees }) => {
      try {
        const res = await fetch("/api/students/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, age, fees }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to register");
        return data;
      } catch (error) {
        throw new Error(error);
        
      }
    },
    onSuccess: () => {
      toast.success("Form submitted successfully");
      queryClient.invalidateQueries(["students"]);
      setFormData({ name: '', age: '', fees: '' }); 
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="w-96 h-96  mx-auto ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center border-2 shadow-2xl p-4 rounded-xl "
        >
          <h1 className="text-center font-semibold text-3xl">
            Admission's Open
          </h1>
          <label htmlFor="name">
            <input
              type="text"
              placeholder="enter your name..."
              name="name"
              onChange={handleInputChange}
              value={formData.name}
              required
              className="border-2 my-3 px-2 py-2 outline-none focus:outline-green-400 focus:border-0"
            />
          </label>
          <label htmlFor="age">
            <input
              type="number"
              placeholder="enter your age..."
              name="age"
              onChange={handleInputChange}
              value={formData.age}
              required
              className="border-2 my-3 px-2 py-2 outline-none focus:outline-green-400 focus:border-0"
            />
          </label>
          <label htmlFor="fees">
            <input
              type="number"
              placeholder="enter your  fees..."
              name="fees"
              onChange={handleInputChange}
              value={formData.fees}
              className="border-2 my-3 px-2 py-2 outline-none focus:outline-green-400 focus:border-0"
            />
          </label>
          <button className=" min-w-[40%]  py-2 m-3 bg-green-500 text-white text-xl   border-0 hover:bg-transparent hover:text-black hover:border-2 border-green-500  transition-all duration-300">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
