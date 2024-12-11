"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Building2, Trash2, Plus, Sparkles } from "lucide-react";
import { useMutation } from "@apollo/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  CREATE_DEPARTMENT,
  GET_DEPARTMENT_BY_ID,
  GET_DEPARTMENTS,
  UPDATE_DEPARTMENT,
} from "@/lib/graphql/queries";
import { Loading } from "@/components/ui/loading";

export default function EditDepartmentPage({
  initialData,
  id,
  onClose,
}: {
  initialData: { name: string; subDepartments: { name: string }[] };
  onClose: () => void;
  id: number;
}) {
  const [name, setName] = useState(initialData.name || "");
  const [subDepartments, setSubDepartments] = useState(
    initialData.subDepartments || [{ name: "" }]
  );

  const [updatedDepartment, { loading }] = useMutation(UPDATE_DEPARTMENT, {
    refetchQueries: [{ query: GET_DEPARTMENT_BY_ID }],
  });

  const handleSubDepartmentChange = (index: number, value: string) => {
    const updatedSubDepartments = subDepartments.map((subDepartment, idx) => {
      if (idx === index) {
        // Create a new object for the subDepartment to ensure immutability
        return { ...subDepartment, name: value };
      }
      return subDepartment;
    });
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
    console.log("it is working o");
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const sanitizedSubDepartments = subDepartments.map((subDept) => ({
        id: (subDept as any).id,
        name: subDept.name,
      }));
      const data = await updatedDepartment({
        variables: {
          input: {
            id,
            name,
            subDepartments: sanitizedSubDepartments,
          },
        },

        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      console.log(data);

      onClose();
    } catch (error) {
      console.error("Error editiing department:", error);
    }
  };

  // Show loader if the form is being submitted
  // if (loading) return <Loading />;

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 overflow-hidden relative">
      {/* Animated background shapes */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>

      <div className="w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-white/10 backdrop-blur-md overflow-hidden border-none">
            <motion.div
              className="flex items-center space-x-4 p-6 bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Building2 className="h-10 w-10 text-yellow-300" />
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Edit Department
                </h2>
              </div>
            </motion.div>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6 p-6">
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Label
                    htmlFor="name"
                    className="text-lg font-semibold text-white"
                  >
                    Department Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g., IT Department"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 border-2 border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                    required
                  />
                </motion.div>

                <AnimatePresence>
                  {subDepartments?.map((subDepartment, index) => (
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
                          <Label
                            htmlFor={`subDepartment${index}`}
                            className="text-lg font-semibold text-white"
                          >
                            SubDepartment {index + 1}
                          </Label>
                          <div className="flex items-center space-x-4">
                            <Input
                              id={`subDepartment${index}`}
                              placeholder={`e.g., SubDepartment ${index + 1}`}
                              value={subDepartment.name}
                              onChange={(e) =>
                                handleSubDepartmentChange(index, e.target.value)
                              }
                              className="w-full px-4 py-3 bg-white/20 border-2 border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                              required
                            />
                            <Button
                              type="button"
                              onClick={() => handleRemoveSubDepartment(index)}
                              className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <Button
                    type="button"
                    onClick={handleAddSubDepartment}
                    className="w-full py-3 bg-yellow-400 text-purple-900 rounded-xl hover:bg-yellow-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex items-center justify-center space-x-2"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add SubDepartment</span>
                  </Button>
                </motion.div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-4 p-6 bg-gradient-to-r from-purple-500 to-pink-500">
                <Button
                  type="button"
                  variant="outline"
                  className="px-6 py-3 text-black border-2 border-white/50 rounded-xl hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-6 py-3 bg-yellow-400 text-purple-900 rounded-xl hover:bg-yellow-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex items-center space-x-2"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="animate-spin h-5 w-5 border-4 border-t-4 border-purple-900 rounded-full"></div>
                  ) : (
                    <>
                      <span>Save Changes</span>
                      <Sparkles className="h-5 w-5" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
