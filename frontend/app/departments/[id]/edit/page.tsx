"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useMutation, useQuery } from "@apollo/client";
import { motion } from "framer-motion"; // For animations
import {
  DELETE_DEPARTMENT,
  GET_DEPARTMENT_BY_ID,
  UPDATE_DEPARTMENT,
} from "@/lib/graphql/queries";

export default function EditDepartmentPage({ params }: any) {
  const { id } = params; // Get department ID from the URL params
  const [name, setName] = useState("");
  const [subDepartments, setSubDepartments] = useState([{ name: "" }]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();

  const {
    data,
    loading: queryLoading,
    error,
  } = useQuery(GET_DEPARTMENT_BY_ID, {
    variables: { id },
  });

  console.log(id);

  const [updateDepartment] = useMutation(UPDATE_DEPARTMENT);
  const [deleteDepartment] = useMutation(DELETE_DEPARTMENT);

  useEffect(() => {
    if (data && data.department) {
      setName(data.department.name);
      setSubDepartments(data.department.subDepartments);
    }
  }, [data]);

  const handleSubDepartmentChange = (index: number, value: string) => {
    const updatedSubDepartments = [...subDepartments];
    updatedSubDepartments[index].name = value;
    setSubDepartments(updatedSubDepartments);
  };

  const handleAddSubDepartment = () => {
    setSubDepartments([...subDepartments, { name: "" }]);
  };

  const handleRemoveSubDepartment = (index: number) => {
    const updatedSubDepartments = subDepartments.filter((_, i) => i !== index);
    setSubDepartments(updatedSubDepartments);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("user-token");
    if (!token) {
      console.error("User is not authenticated");
      setLoading(false);
      return;
    }

    try {
      await updateDepartment({
        variables: {
          id,
          input: {
            name,
            subDepartments,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      router.push("/departments");
    } catch (err) {
      console.error("Error updating department:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      setDeleteLoading(true);

      try {
        await deleteDepartment({
          variables: {
            id,
          },
        });
        router.push("/departments");
      } catch (err) {
        console.error("Error deleting department:", err);
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  if (queryLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading department: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Label htmlFor="name">Department Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {subDepartments.map((subDepartment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-full">
                    <Label htmlFor={`subDepartment${index}`}>
                      SubDepartment {index + 1}
                    </Label>
                    <Input
                      id={`subDepartment${index}`}
                      value={subDepartment.name}
                      onChange={(e) =>
                        handleSubDepartmentChange(index, e.target.value)
                      }
                      required
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => handleRemoveSubDepartment(index)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            ))}

            <Button
              type="button"
              onClick={handleAddSubDepartment}
              className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add SubDepartment
            </Button>

            <div className="mt-6 flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/departments")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <div className="animate-spin h-5 w-5 border-4 border-t-4 border-white rounded-full"></div>
                ) : (
                  "Update Department"
                )}
              </Button>
            </div>
          </form>

          <Button
            type="button"
            onClick={handleDelete}
            className="mt-4 w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            disabled={deleteLoading}
          >
            {deleteLoading ? "Deleting..." : "Delete Department"}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
