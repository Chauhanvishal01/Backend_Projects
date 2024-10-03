import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosCreate } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
const Home = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/todo/get`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setTodos(res.data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const createTodo = async () => {
    if (!newTodo) return;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/todo/create`,
        {
          text: newTodo,
          completed: false,
        },
        {
          withCredentials: true,
        }
      );
      setTodos([...todos, res.data]);
      setNewTodo("");
    } catch (error) {
      setError("Failed to create Todo");
    }
  };
  const updateTodo = async (id) => {
    const todo = todos.find((todo) => todo._id === id);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/todo/update/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        }
      );
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    } catch (error) {
      setError("Failed to fetch Todo Status");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/todo/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      setError("Failed to Delete Todo");
    }
  };
  return (
    <>
      <div className="bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-md mx-8 sm:mx-auto p-6 my-10">
        <h1 className="text-2xl font-semibold text-center">
          {" "}
          YOUR <span className="text-red-600">TODOS</span>
        </h1>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Add a new todo..."
            className="flex-grow p-2 border rounded-l-md focus:outline-none"
          />
          <button className="bg-green-400 border rounded-r-md text-white px-4 py-2 hover:bg-green-700 duration-300 text-2xl ">
            <IoIosCreate />
          </button>
        </div>
        <ul className="space-y-2">
          <li className="flex items-center justify-between p-3 bg-gray-200 rounded-md">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-400">Todo</span>
            </div>
            <button className="text-red-400 hover:text-red-600 text-3xl">
              <MdDeleteForever />
            </button>
          </li>
        </ul>
        <p className="mt-4 text-center text-sm text-gray-700">
          0 Todo Remaining
        </p>
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white text-2xl rounded-md hover:bg-blue-700 duration-500 mx-auto block">
          <IoLogOut />
        </button>
      </div>
    </>
  );
};

export default Home;
