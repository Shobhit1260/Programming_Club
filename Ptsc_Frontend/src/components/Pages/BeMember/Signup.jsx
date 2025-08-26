import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const res = await fetch("http://localhost:4000/v1/SignUp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.userName,
          email: data.email,
          password: data.password,
          mobile: data.mobile,
        }),
      });

      const formData = await res.json();
      if (res.ok) toast.success(formData.message);
      else toast.error(formData.message);
    } catch (error) {
      console.log("Error while registering details:", error);
    }
    reset();
  };

  return (
    <div className="w-full top-0 left-0 bg-gradient-to-b from-blue-200 to-white dark:from-gray-800 dark:to-gray-900 flex justify-center items-center px-3 py-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md flex flex-col gap-4 shadow-lg bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-lg font-bold text-center font-serif text-gray-800 dark:text-white">
          Register Yourself
        </h2>

        {/* First Name */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
            First Name
          </label>
          <input
            className="p-2 text-sm rounded-md border border-gray-400 dark:border-gray-600 outline-none 
            focus:ring-1 focus:ring-blue-400 dark:bg-gray-700 dark:text-white transition"
            {...register("firstName", {
              required: "First name is required",
              minLength: { value: 3, message: "Minimum length should be 3" },
            })}
          />
          {errors.firstName && (
            <span className="text-red-500 text-xs">
              *{errors.firstName.message}
            </span>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Last Name
          </label>
          <input
            className="p-2 text-sm rounded-md border border-gray-400 dark:border-gray-600 outline-none 
            focus:ring-1 focus:ring-blue-400 dark:bg-gray-700 dark:text-white transition"
            {...register("lastName", {
              required: "Last name is required",
              minLength: { value: 3, message: "Minimum length should be 3" },
            })}
          />
          {errors.lastName && (
            <span className="text-red-500 text-xs">
              *{errors.lastName.message}
            </span>
          )}
        </div>

        {/* Username */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
            className="p-2 text-sm rounded-md border border-gray-400 dark:border-gray-600 outline-none 
            focus:ring-1 focus:ring-blue-400 dark:bg-gray-700 dark:text-white transition"
            {...register("userName", {
              required: "Username is required",
              minLength: { value: 3, message: "Minimum length should be 3" },
            })}
          />
          {errors.userName && (
            <span className="text-red-500 text-xs">
              *{errors.userName.message}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            className="p-2 text-sm rounded-md border border-gray-400 dark:border-gray-600 outline-none 
            focus:ring-1 focus:ring-blue-400 dark:bg-gray-700 dark:text-white transition"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">
              *{errors.email.message}
            </span>
          )}
        </div>

        {/* Mobile */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Mobile No.
          </label>
          <input
            className="p-2 text-sm rounded-md border border-gray-400 dark:border-gray-600 outline-none 
            focus:ring-1 focus:ring-blue-400 dark:bg-gray-700 dark:text-white transition"
            {...register("mobile", {
              required: "Mobile no. is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit number",
              },
            })}
          />
          {errors.mobile && (
            <span className="text-red-500 text-xs">
              *{errors.mobile.message}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            className="p-2 text-sm rounded-md border border-gray-400 dark:border-gray-600 outline-none 
            focus:ring-1 focus:ring-blue-400 dark:bg-gray-700 dark:text-white transition"
            {...register("password", {
              required: "Enter the password",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Must include uppercase, lowercase, number, special character, and min 8 chars",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-xs">
              *{errors.password.message}
            </span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 text-sm rounded-md 
          font-semibold transition-all duration-300 disabled:opacity-50 shadow"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
