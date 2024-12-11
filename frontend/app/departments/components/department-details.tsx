"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_DEPARTMENT_BY_ID } from "@/lib/graphql/queries";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Loading } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Edit, ArrowLeft, AlertTriangle } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import EditDepartmentPage from "@/app/departments/components/edit-department-form";

export default function GetDepartmentDetail({ id }: { id: string }) {
  const router = useRouter();

  const [isEditable, setIsEditable] = useState(false);

  const { data, loading, error } = useQuery(GET_DEPARTMENT_BY_ID, {
    variables: { id: Number(id) },
  });

  const department = data?.department;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white p-8 overflow-hidden relative">
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

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-64"
              >
                <Loading />
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-red-500/80 backdrop-blur-md rounded-3xl p-6 text-white flex items-center space-x-4"
              >
                <AlertTriangle className="w-8 h-8" />
                <div>
                  <h2 className="text-xl font-bold">Error</h2>
                  <p>
                    Unable to load department details. Please try again later.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="rounded-3xl shadow-2xl h-[90dvh] bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden">
                  <motion.div
                    className="flex flex-col md:flex-row items-center justify-between p-6 bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                      <Building2 className="h-10 w-10 text-yellow-300" />
                      <h2 className="text-4xl font-bold text-white">
                        {department?.name}
                      </h2>
                    </div>
                    {/* <Link href={`/departments/${Number(id)}/edit`}>  */}
                    <Button
                      onClick={() => setIsEditable(true)}
                      className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                    >
                      <Edit className="h-5 w-5" />
                      <span>Edit Department</span>
                    </Button>
                    {/* </Link> */}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-semibold mb-4">
                        SubDepartments
                      </h3>
                      <ul className="space-y-2">
                        <AnimatePresence>
                          <div className="grid grid-cols-3 gap-4">
                            {department?.subDepartments.map(
                              (sub: any, index: number) => (
                                <motion.li
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 20 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                  }}
                                  className="bg-white/20 rounded-lg p-8 text-white flex items-center space-x-3"
                                >
                                  <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                                  <span>{sub.name}</span>
                                </motion.li>
                              )
                            )}
                          </div>
                        </AnimatePresence>
                      </ul>
                    </CardContent>
                  </motion.div>

                  <Button
                    onClick={() => router.push("/departments")}
                    className="absolute bottom-4 right-4 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 flex items-center space-x-2 border border-white/50"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back to Departments</span>
                  </Button>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Modal
        className="!w-[500px] !p-0"
        isOpen={isEditable}
        onClose={() => setIsEditable(false)}
      >
        <EditDepartmentPage
          id={Number(id)}
          initialData={department}
          onClose={() => setIsEditable(false)}
        />
      </Modal>
    </>
  );
}
