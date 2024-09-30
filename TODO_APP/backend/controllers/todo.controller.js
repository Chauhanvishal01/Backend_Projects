import Todo from "../models/todo.model.js";

export const createTodo = async (req, res) => {
  const { text, completed } = req.body;
  const todo = new Todo({
    text,
    completed,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "Todo Created Successfully", newTodo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occuring while creation" });
  }
};


