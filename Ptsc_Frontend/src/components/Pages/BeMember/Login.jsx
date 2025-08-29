import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Signup from "./Signup";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { toast } from "react-toastify";
import BASE from "../../../api/config";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const res = await fetch(`${BASE}/v1/Login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const formData = await res.json();
    localStorage.setItem("role", formData.role);

    if (res.ok) toast.success("Successfully logged in as a PTSC member.");
    else toast.warning(formData.message);

    reset();
  };

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-200 
      dark:from-gray-900 dark:via-gray-800 dark:to-black flex flex-col justify-center items-center px-8 py-24">
      
      <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-20 w-full max-w-6xl">
        
        {/* Left Side Text */}
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <h1 className="text-black font-bold text-3xl sm:text-4xl lg:text-5xl font-serif dark:text-white leading-snug">
            More than just code
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg font-serif">
            You're shaping the face of our club. Build, manage, and inspire with every commit.{" "}
            <span className="text-orange-500 font-semibold">
              Wait at least 24 hrs after registering your details.
            </span>
          </p>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md backdrop-blur-xl bg-white/80 dark:bg-gray-800/70 p-8 rounded-3xl 
          shadow-2xl border border-gray-200 dark:border-gray-700 transition-transform hover:scale-[1.02] duration-300">
          
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-center text-gray-800 dark:text-white">
              Login to Continue
            </h2>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-3 border border-gray-300 dark:border-gray-600">
                <HiOutlineMail className="text-gray-500 dark:text-gray-300" />
                <input
                  className="flex-1 bg-transparent outline-none text-sm dark:text-white"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-sm">
                  *{errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-3 border border-gray-300 dark:border-gray-600">
                <HiOutlineLockClosed className="text-gray-500 dark:text-gray-300" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="flex-1 bg-transparent outline-none text-sm dark:text-white"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                      message:
                        "Must include uppercase, lowercase, number & special character",
                    },
                  })}
                />
              </div>
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
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 
              text-white font-semibold py-3 rounded-lg font-serif transition-all 
              disabled:opacity-50 shadow-lg"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register CTA */}
          <button
            onClick={() => setShowForm(true)}
            className="mt-6 w-full bg-gradient-to-r from-green-500 to-teal-600 hover:opacity-90 
            text-white font-serif py-3 rounded-lg font-bold text-sm shadow-lg transition"
          >
            Register Your Details First
          </button>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-2 animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] scale-95 animate-scaleUp">
            
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
