import React, { useEffect, useState } from "react";
import axios from "axios";
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
  return <div>Home</div>;
};

export default Home;
