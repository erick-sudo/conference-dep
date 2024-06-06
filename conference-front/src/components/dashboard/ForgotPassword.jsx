import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { backendUrl } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendUrl}forgot-password`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title:
            "An email has been sent to you with instructions for resetting your password.",
        });

        navigate("/reset");
      } else {
        const errorResponse = await response.json();
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: "Failed to request password reset.",
          text: errorResponse.message,
        });
      }
    } catch (error) {
      console.log(error);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "Failed to request password reset.",
        text: "Please try again later.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-10 rounded-md flex flex-col items-center space-y-4"
      >
        <h1 className="text-center font-bold text-2xl">Forgot Password</h1>
        <label className="block mb-2">
          Email address or username:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50"
          />
        </label>
        <button
          type="submit"
          className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-green-600 focus:ring-opacity-50 self-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
