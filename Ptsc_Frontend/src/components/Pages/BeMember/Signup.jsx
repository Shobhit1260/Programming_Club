import {React,useState} from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router';
import {toast} from 'react-toastify'

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();


  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try{
      const res=await fetch("http://localhost:4000/v1/SignUp",{
        method:"POST",
        headers:{
          "content-type":"application/json",
        },
        body:JSON.stringify({
           firstName:data.firstName,
           lastName:data.lastName,
           username:data.userName,
           email:data.email,
           password:data.password,
           mobile:data.mobile,
        })
      });
      const formData=await res.json();
      if(res.ok)
         toast.success(formData.message);  
      else
         toast.error(formData.message);  
    }
    catch(error){
        console.log("error while registering the details",error);
    }
    reset();
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-blue-200 to-white py-4 '>
      <div className='flex flex-col md:flex-row justify-center items-start gap-16 md:gap-12 p-8'> 
       <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full md:w-1/2 lg:w-[80%] flex flex-col space-y-2 md:space-y-6 shadow-xl bg-white dark:bg-gray-900 p-4 md:p-8  rounded-xl'>
          {/* First Name */}
          <div className='flex flex-col'>
            <label className='text-black dark:text-white text-sm font-serif'>First Name</label>
            <input
              className='text-black dark:text-white text-sm outline-none border-2 border-gray-500 rounded-lg p-2 hover:border-blue-400 bg-transparent'
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
              className='text-black dark:text-white text-sm outline-none border-2 border-gray-500 rounded-lg p-2 hover:border-blue-400 bg-transparent'
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
              className='text-black dark:text-white text-sm outline-none border-2 border-gray-500 rounded-lg p-2 hover:border-blue-400 bg-transparent'
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
              className='text-black dark:text-white text-sm outline-none border-2 border-gray-500 rounded-lg p-2 hover:border-blue-400 bg-transparent'
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
              className='text-black dark:text-white text-sm outline-none border-2 border-gray-500 rounded-lg p-2 hover:border-blue-400 bg-transparent'
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
              className='text-black dark:text-white text-sm outline-none border-2 border-gray-500 rounded-lg p-2 hover:border-blue-400 bg-transparent'
              {...register("password", {
                required: "Enter the password",
                pattern: {
                   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                     "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character (@$!%*?&), and be at least 8 characters long"
                   }
              })}
            />
            {errors.password && <span className='text-red-500'>*{errors.password.message}</span>}
          </div>

          {/* Submit Button */}
          <input
            type='submit'
            disabled={isSubmitting}
            value={isSubmitting ? "Registering..." : "Register"}
            className='bg-green-500 hover:bg-green-600 text-white rounded-lg p-2 font-bold transition-colors duration-300 disabled:opacity-50'
          />
        </form>
      </div>
    </div>
  );
}

export default Signup;
