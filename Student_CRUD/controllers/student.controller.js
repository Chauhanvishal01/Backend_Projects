import Student from "../models/student.model.js";

export const registerStudent = async (req, res) => {
  try {
    const { name, age, fees } = req.body;

    if (!name || !age) {
      return res.status(400).json({
        success: false,
        message: "Name and Age are required",
      });
    }
    if (age < 18 || age > 60) {
      return res
        .status(400)
        .json({ message: "Age must be greater than 18 and less than 60" });
    }

    const feesToUse = fees || "2000";
    const newStudent = await Student.create({
      name,
      age,
      fees: feesToUse,
    });

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      newStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, fees } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, age, fees },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    if (!students) {
      return res.status(404).json({ message: "No Student Found!" });
    }
    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    await Student.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Student Deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
