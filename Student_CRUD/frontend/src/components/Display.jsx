import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteStudent from "./DeleteStudent";

const Display = () => {
  const navigate = useNavigate();
  const { data: students, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/students/getAll");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Somethig went wrong");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  return (
    <>
      <div className="text-gray-900 bg-gray-200">
        <div className="p-4 flex">
          <h1 className="text-3xl">Students</h1>
        </div>
        {isLoading && (
          <div className="flex justify-center h-full items-center">
            <h1 className="text-center text-3xl"> Loading....</h1>
          </div>
        )}
        <div className="px-3 py-4 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4 ">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-3 px-5">Name</th>
                <th className="text-left p-3 px-5">Age</th>
                <th className="text-left p-3 px-5">Fees</th>
                <th />
              </tr>
              {!isLoading &&
                students?.data.map((student, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-green-200 cursor-pointer bg-gray-100"
                  >
                    <td className="p-3 px-5">
                      <input
                        type="text"
                        defaultValue={student.name}
                        className="bg-transparent border-b-2 border-gray-300 py-2"
                        disabled
                      />
                    </td>
                    <td className="p-3 px-5">
                      <input
                        type="text"
                        defaultValue={student.age}
                        className="bg-transparent border-b-2 border-gray-300 py-2"
                        disabled
                      />
                    </td>
                    <td className="p-3 px-5">
                      <input
                        type="text"
                        defaultValue={student.fees}
                        className="bg-transparent border-b-2 border-gray-300 py-2"
                        disabled
                      />
                    </td>
                    <td className="p-3 px-5 flex justify-end">
                      <button
                        type="button"
                        className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => navigate(`/update/${student._id}`)}
                      >
                        Edit
                      </button>
                      <DeleteStudent student={student} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Display;
