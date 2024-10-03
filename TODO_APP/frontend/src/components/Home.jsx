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

  return <div>Home</div>;
};

export default Home;
