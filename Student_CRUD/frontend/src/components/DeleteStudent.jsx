import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
const DeleteStudent = ({ student }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteStudent, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/students/delete/${student._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error.message || "Something went wrong");
      }
    },
    onSuccess: () => {
      toast.success("Student Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleDelete = () => {
    deleteStudent();
  };

  return (
    <div>
      <button
        type="button"
        className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        onClick={handleDelete}
      >
        {isPending ? "Deleteing..." : "Delete"}
      </button>
    </div>
  );
};

export default DeleteStudent;
