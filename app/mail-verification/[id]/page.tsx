"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type PageProps = {
  params: {
    id: string;
  };
};

const VerificationPage = ({ params }: PageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(undefined);
  const [success, setSuccess] = useState();
  let email = typeof window !== "undefined" ? localStorage.getItem("email") : null;

  useEffect(() => {
    (async function () {
      const validate = await fetch(`${process.env.NEXT_PUBLIC_API}` + `mail/${params.id}`, {
        method: "POST",
        body: JSON.stringify({ to: email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await validate.json();
      if (!res.success) {
        setSuccess(res.success);
        setIsLoading(false);
        return setMessage(res.msg);
      }
      setSuccess(res.success);
      setIsLoading(false);
      return localStorage.removeItem("email");
    })();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        {isLoading ? (
          <div className="mb-6">
            <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="Loading" />
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Verification {success ? "success" : "failed"}!</h2>
            <p className="text-gray-700 mb-6">{message || "Your email has been verified successfully."}</p>
            {success ? (
              <Link
                href={"/login/"}
                className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => {
                  // Handle button click event
                }}
              >
                Continue
              </Link>
            ) : (
              <a
                href={"https://mail.google.com?authuser=" + email}
                target="_blank"
                className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => {
                  // Handle button click event
                }}
              >
                Bring to my email
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;
