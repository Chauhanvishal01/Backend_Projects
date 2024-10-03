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

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(201).json({ message: "Todo Fetched successfully", todos });
  } catch (error) {
    res.status(400).json({ message: "Error occuring while Fetching" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      id,
      { text, completed },
      {
        new: true,
      }
    );
    res.status(201).json({ message: "Todo Updated Successfully", todo });
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: "Error occuring while Updating" });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(201).json({ message: "Todo Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error occuring while Updating" });
  }
};
