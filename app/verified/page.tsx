"use client";
import Image from "next/image";
import React from "react";

const VerificationEmailSent = () => {
  const email = localStorage.getItem("email");
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <Image
          height={400}
          width={400}
          src="https://img.freepik.com/free-vector/illustration-e-mail-protection-concept-e-mail-envelope-with-file-document-attach-file-system-security-approved_1150-41788.jpg?size=626&ext=jpg"
          alt="Email Sent"
          className="mx-auto mb-6"
        />
        <h2 className="text-2xl font-bold text-center mb-4">Email Sent for Verification</h2>
        <p className="text-gray-700 text-center mb-6">We've sent a verification email. Please check your inbox and follow the instructions to complete the process.</p>
        <div className="text-center">
          <a
            href={`https://mail.google.com?authuser=${email}`}
            target="_blank"
            className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {
              // Handle button click event
            }}
          >
            Check it here
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerificationEmailSent;
