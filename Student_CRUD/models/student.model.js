import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 60,
    },
    fees: {
      type: Number,
      default: 2000,
    },
  },
  {
    timestamps: true,
  }
);

const Student = new mongoose.model("Student", studentSchema);

export default Student;
