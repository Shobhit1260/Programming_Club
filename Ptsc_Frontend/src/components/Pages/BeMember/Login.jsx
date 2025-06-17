import React from 'react';
import { useForm } from "react-hook-form";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    console.log(data);
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-white dark:from-gray-800 dark:to-gray-900 p-6 md:p-12">
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-2xl flex flex-col gap-6 shadow-lg bg-white dark:bg-gray-800 p-6 md:p-10 rounded-xl"
        >
          <h2 className="text-xl md:text-2xl font-bold text-center text-gray-700 dark:text-white">
            Login
          </h2>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              className="text-sm p-3 rounded-lg border-2 border-gray-400 dark:border-gray-600 outline-none focus:border-blue-400 dark:bg-gray-700 dark:text-white"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <span className="text-red-500 text-sm mt-1">*{errors.email.message}</span>}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              className="text-sm p-3 rounded-lg border-2 border-gray-400 dark:border-gray-600 outline-none focus:border-blue-400 dark:bg-gray-700 dark:text-white"
              {...register("Password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message:
                    "Must contain 1 uppercase, 1 lowercase, 1 number, 8+ characters",
                },
              })}
            />
            {errors.Password && <span className="text-red-500 text-sm mt-1">*{errors.Password.message}</span>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
