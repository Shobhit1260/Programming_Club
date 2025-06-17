import React from 'react';
import { useForm } from "react-hook-form";

function BeMember() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    console.log(data);
    reset();
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-blue-200 to-white py-24 dark:bg-gray-800 dark:from-gray-800 dark:to-gray-900  md:p-12'>
      <div className='flex justify-center items-center'>
        <h1></h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full max-w-[900px] flex flex-col gap-6 md:gap-8 shadow-lg bg-white dark:bg-gray-900 p-6 md:p-10 rounded-lg mt-24'
        >
          {/* First Name */}
          <div className='flex flex-col'>
            <label className='text-black dark:text-white text-sm font-serif'>First Name</label>
            <input
              className='text-black dark:text-white text-sm outline-none border-2 border-gray-500 rounded-lg p-4 hover:border-blue-400 bg-transparent'
              {...register("firstName", {
                required: "First name is required",
                minLength: { value: 3, message: "Minimum length should be 3" },
              })}
            />
            {errors.firstName && <span className='text-red-500'>*{errors.firstName.message}</span>}
          </div>

          {/* Last Name */}
          <div className='flex flex-col'>
            <label className='text-black dark:text-white text-sm font-serif'>Last Name</label>
            <input
              className='text-black dark:text-white text-sm outline-none border-2 border-gray-500 rounded-lg p-4 hover:border-blue-400 bg-transparent'
              {...register("lastName", {
                required: "Last name is required",
                minLength: { value: 3, message: "Minimum length should be 3" },
              })}
            />
            {errors.lastName && <span className='text-red-500'>*{errors.lastName.message}</span>}
          </div>

          {/* User Name */}
          <div className='flex flex-col'>
            <label className='text-black dark:text-white text-sm font-serif'>Username</label>
            <input
              className='text-black dark:text-white text-sm outline-none border-2 border-gray-500 rounded-lg p-4 hover:border-blue-400 bg-transparent'
              {...register("userName", {
                required: "Username is required",
                minLength: { value: 3, message: "Minimum length should be 3" },
              })}
            />
            {errors.userName && <span className='text-red-500'>*{errors.userName.message}</span>}
          </div>

          {/* Email */}
          <div className='flex flex-col'>
            <label className='text-black dark:text-white text-sm font-serif'>Email</label>
            <input
              className='text-black dark:text-white text-sm outline-none border-2 border-gray-500 rounded-lg p-4 hover:border-blue-400 bg-transparent'
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <span className='text-red-500'>*{errors.email.message}</span>}
          </div>

          {/* Mobile Number */}
          <div className='flex flex-col'>
            <label className='text-black dark:text-white text-sm font-serif'>Mobile No.</label>
            <input
              className='text-black dark:text-white text-sm outline-none border-2 border-gray-500 rounded-lg p-4 hover:border-blue-400 bg-transparent'
              {...register("mobile", {
                required: "Mobile no. is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit number",
                },
              })}
            />
            {errors.mobile && <span className='text-red-500'>*{errors.mobile.message}</span>}
          </div>

          {/* Password */}
          <div className='flex flex-col'>
            <label className='text-black dark:text-white text-sm font-serif'>Password</label>
            <input
              type='password'
              className='text-black dark:text-white text-sm outline-none border-2 border-gray-500 rounded-lg p-4 hover:border-blue-400 bg-transparent'
              {...register("Password", {
                required: "Enter the password",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message:
                    "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and be 8+ characters long",
                },
              })}
            />
            {errors.Password && <span className='text-red-500'>*{errors.Password.message}</span>}
          </div>

          {/* Submit Button */}
          <input
            type='submit'
            disabled={isSubmitting}
            value={isSubmitting ? "Sending..." : "Send"}
            className='bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-4 font-bold transition-colors duration-300 disabled:opacity-50'
          />
        </form>
      </div>
    </div>
  );
}

export default BeMember;
