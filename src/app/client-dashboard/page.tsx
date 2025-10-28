// src/app/client-dashboard/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClientDashboard() {
  const router = useRouter();

  useEffect(() => {
    router.push("/client/dashboard");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
