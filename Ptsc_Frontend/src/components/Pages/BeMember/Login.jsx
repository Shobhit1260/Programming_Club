import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Signup from "./Signup";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";

const BASE = "https://programming-club-backend.onrender.com";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const res = await fetch(`${BASE}/Login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const formData = await res.json();
    console.log("formData:", formData.role);
    localStorage.setItem("role", formData.role);

    if (res.ok) toast.success("Successfully logged in as a PTSC member.");
    else toast.warning(formData.message);

    reset();
  };

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-200 to-white 
      dark:from-gray-800 dark:to-gray-900 flex flex-col justify-center items-center px-4 lg:py-16">
      
      <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-20 w-full max-w-6xl">
        
        {/* Left Side Text */}
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <h1 className="text-black font-bold text-3xl sm:text-4xl md:text-5xl font-serif dark:text-white leading-snug">
            More than just code
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg font-serif">
            You're shaping the face of our club. Build, manage, and inspire with every commit.{" "}
            <span className="text-orange-500 font-semibold">
              Wait at least 24 hrs after registering your details.
            </span>
          </p>
        </div>

        {/* Login Form */}
        <div className="flex flex-col gap-6 items-center w-full max-w-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-6 shadow-xl bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-10 rounded-2xl border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl md:text-2xl font-bold font-serif text-center text-gray-700 dark:text-white">
              Login
            </h2>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                className="text-sm p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                outline-none focus:ring-2 focus:ring-blue-400 
                dark:bg-gray-700 dark:text-white transition"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  *{errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                className="text-sm p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                outline-none focus:ring-2 focus:ring-blue-400 
                dark:bg-gray-700 dark:text-white transition"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain 1 uppercase, 1 lowercase, 1 number, 1 special character, and min 8 chars",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  *{errors.password.message}
                </span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 
              text-white font-semibold py-3 rounded-lg font-serif transition-all 
              disabled:opacity-50 shadow-md"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register CTA */}
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-serif px-6 py-3 
            rounded-lg font-bold text-sm shadow-md transition"
          >
            Register Your Details First
          </button>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-2 sm:px-4">
    <div className="relative w-full max-w-lg sm:max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
      
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
        onClick={() => setShowForm(false)}
      >
        <RxCross1 size={24} />
      </button>

      {/* Register Form */}
      <div className="mt-4">
        <Signup />
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Login;
