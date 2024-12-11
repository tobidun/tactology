"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { DepartmentList } from "./components/department-list";
import { Loading } from "@/components/ui/loading";
import { useDepartments } from "@/hooks/use-department";
import { motion } from "framer-motion";
import { useState } from "react";

export default function DepartmentsPage() {
  const { departments = [], loading, error } = useDepartments();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  const totalPages = Math.ceil(departments?.length / itemsPerPage);
  const currentDepartments = departments?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
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

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="relative rounded-3xl shadow-2xl h-[90dvh] bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden">
            <motion.div
              className="flex flex-col md:flex-row items-center justify-between p-6 bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <Building2 className="h-10 w-10 text-yellow-300" />
                <h2 className="text-4xl font-bold text-yellow-300">
                  Departments
                </h2>
              </div>
              <Link href="/departments/create">
                <Button className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Add Department</span>
                  <Sparkles className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <CardContent className="p-6 ">
                <DepartmentList departments={currentDepartments} />
              </CardContent>
            </motion.div>
            <div className="flex justify-end gap-1 absolute bottom-4 right-4">
              {/* Back Button */}
              <Button
                className="bg-yellow-400 hover:bg-yellow-300 text-purple-900"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                Back
              </Button>
              {/* Next Button */}
              <Button
                className="bg-yellow-400 hover:bg-yellow-300 text-purple-900"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
