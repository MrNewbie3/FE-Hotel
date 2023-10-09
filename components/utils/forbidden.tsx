import Link from "next/link";
import React from "react";

export default function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4 text-red-600">Forbidden Access</h1>
      <p className="mb-8">You do not have permission to access this page.</p>
      {/* <Link href="/admin" className="btn btn-primary">
        Go to Home
      </Link> */}
    </div>
  );
}
