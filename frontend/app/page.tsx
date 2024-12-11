"use client"; // Required for Next.js 13+ client-side components

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <div className="max-w-screen-xl mx-auto p-8 text-center">
      <h1 className="text-3xl font-semibold">
        Welcome to Department Management
      </h1>
      <button
        onClick={handleLoginRedirect}
        className="mt-8 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Continue to Login
      </button>
    </div>
  );
}
