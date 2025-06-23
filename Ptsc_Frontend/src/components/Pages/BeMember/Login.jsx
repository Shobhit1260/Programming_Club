import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router';
import Signup from './Signup';
import { RxCross1 } from "react-icons/rx";
import {  toast } from 'react-toastify';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res=await fetch("http://localhost:4000/v1/Login",{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
       credentials: "include",
      body:JSON.stringify({
        email:data.email,
        password:data.password
      })
    })
    const formData=await res.json();
    if(res.ok)
      toast.success("Successfully logedin as a PTSC member.")
    else 
     toast.warning(formData.message);
    reset();
  };
 
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-200 to-white pt-64 dark:from-gray-800 dark:to-gray-900  md:p-12">
       <div className=' flex flex-col md:flex-row justify-center mt-24 items-start gap-16 md:gap-24 px-12 '>
              <div className='flex flex-col p-12 gap-8'>
              <h1 className="text-black font-bold text-4xl font-serif dark:text-white">More than just code</h1>
              <h1 className="text-gray-500 font-medium text-xl font-serif"> You're shaping the face of our club. Build, manage, and inspire with every commit . <span className='text-orange-500'>Wait atleast 24 hrs after registering your details.</span></h1>
              </div>
              <div className='flex flex-col gap-8 justify-center items-center'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" lg:w-full flex flex-col gap-6 shadow-lg bg-white dark:bg-gray-800 p-6 md:p-10 rounded-xl"
        >
          <h2 className="text-xl md:text-2xl font-bold font-serif text-center text-gray-700 dark:text-white">
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
              {...register("password", {
                required: "Password is required",
                pattern: {
                   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                     "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character (@$!%*?&), and be at least 8 characters long"
                   }
              })}
            />
            {errors.password && <span className="text-red-500 text-sm mt-1">*{errors.password.message}</span>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all font-serif disabled:opacity-50"
          >
            {isSubmitting ? "Logining..." : "Login"}
          </button> 
        </form>
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-600 hover:bg-green-700 text-white font-serif px-6 py-3 rounded-lg font-bold text-sm"
      >
        Register Your Details First
      </button>              
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-0 z-50 flex items-center justify-center">
          <div className="flex justiy-center items-start w-full max-w-2xl mx-auto p-4">
            {/* Close button */}
            <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 md:p-4 overflow-y-auto max-h-[90vh]">
              <Signup />
            </div>
             <button
              className=" text-black text-3xl font-extrabold z-10"
              onClick={() => setShowForm(false)}
            >
             <RxCross1 />
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default Login;
