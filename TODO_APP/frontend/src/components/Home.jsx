import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosCreate } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
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

        setTodos(res.data.todos);
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
      setTodos([...todos, res.data.newTodo]);

      setNewTodo("");
    } catch (error) {
      setError("Failed to create Todo");
    }
  };
  const updateTodo = async (id) => {
    const todo = todos.find((todo) => todo._id === id);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/todo/update/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        }
      );
      setTodos(todos.map((todo) => (todo._id === id ? res.data.todo : todo)));
    } catch (error) {
      setError("Failed to Update Todo");
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

  const availabaleTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <>
      <div className="bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-md mx-8 sm:mx-auto p-6 my-10">
        <h1 className="text-2xl mb-3 font-semibold text-center">
          {" "}
          YOUR <span className="text-red-600">TODOS</span>
        </h1>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Add a new todo..."
            className="flex-grow p-2 border rounded-l-md focus:outline-none"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && createTodo()}
          />
          <button
            className="bg-green-400 border rounded-r-md text-white px-4 py-2 hover:bg-green-700 duration-300 text-2xl 
          "
            onClick={createTodo}
          >
            <IoIosCreate />
          </button>
        </div>
        {loading ? (
          <div className="text-center">
            <div className="rotate text-4xl text-center">
              <AiOutlineLoading3Quarters />
            </div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-xl">{error}</div>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo, idx) => (
              <li
                className="flex items-center justify-between p-3 bg-gray-200 rounded-md"
                key={idx}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 cursor-pointer"
                    checked={todo.completed}
                    onChange={() => updateTodo(todo._id)}
                  />
                  <span
                    className={` ${
                      todo.completed
                        ? "line-through text-gray-400 font-semibold "
                        : "text-gray-600 font-semibold"
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  className="text-red-400 hover:text-red-600 text-3xl cursor-pointer"
                  onClick={() => deleteTodo(todo._id)}
                >
                  <MdDeleteForever />
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-4 text-center text-sm text-gray-700">
          {availabaleTodos} Todo Remaining
        </p>
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white text-2xl rounded-md hover:bg-blue-700 duration-500 mx-auto block">
          <IoLogOut />
        </button>
      </div>
    </>
  );
};

export default Home;
