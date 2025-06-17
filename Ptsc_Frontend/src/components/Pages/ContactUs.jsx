import React from 'react';
import { useForm } from "react-hook-form";

function ContactUs() {
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
    <div className='w-full min-h-screen bg-gradient-to-b from-blue-200 to-white bg-gray-800 pt-24 dark:from-gray-800 dark:to-gray-800  px-4 dark:text-white  md:px-16'>
      <div className='flex flex-col gap-6 mb-12 text-center'>
        <h1 className='text-3xl md:text-4xl font-bold font-serif'>Contact Us</h1>
        <h2 className='text-base md:text-xl text-gray-600 dark:text-gray-300 font-serif'>
          Get in touch with our team
        </h2>
      </div>

      <div className='flex justify-center'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full max-w-3xl bg-white dark:bg-gray-900 shadow-xl rounded-2xl px-6 py-10 md:px-12 flex flex-col gap-6'
        >
          {/* Name */}
          <div className='flex flex-col'>
            <label className='text-sm font-serif'>Name</label>
            <input
              {...register("Name", {
                required: "Name is required",
                minLength: { value: 3, message: "Minimum length should be 3" },
              })}
              className='p-3 rounded-lg border-2 border-gray-400 outline-none text-black dark:text-white bg-transparent focus:border-blue-400 transition-all duration-200'
            />
            {errors.Name && <span className='text-red-500 text-sm'>* {errors.Name.message}</span>}
          </div>

          {/* Email */}
          <div className='flex flex-col'>
            <label className='text-sm font-serif'>Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className='p-3 rounded-lg border-2 border-gray-400 outline-none text-black dark:text-white bg-transparent focus:border-blue-400 transition-all duration-200'
            />
            {errors.email && <span className='text-red-500 text-sm'>* {errors.email.message}</span>}
          </div>

          {/* Mobile */}
          <div className='flex flex-col'>
            <label className='text-sm font-serif'>Mobile No.</label>
            <input
              {...register("mobile", {
                required: "Mobile no. is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit number",
                },
              })}
              className='p-3 rounded-lg border-2 border-gray-400 outline-none text-black dark:text-white bg-transparent focus:border-blue-400 transition-all duration-200'
            />
            {errors.mobile && <span className='text-red-500 text-sm'>* {errors.mobile.message}</span>}
          </div>

          {/* Message */}
          <div className='flex flex-col'>
            <label className='text-sm font-serif'>Message</label>
            <textarea
              {...register("Message", {
                required: "Enter the message",
                minLength: { value: 10, message: "Enter at least 10 characters" },
              })}
              rows={5}
              className='p-3 rounded-lg border-2 border-gray-400 outline-none text-black dark:text-white bg-transparent focus:border-blue-400 transition-all duration-200 resize-none'
            />
            {errors.Message && <span className='text-red-500 text-sm'>* {errors.Message.message}</span>}
          </div>

          {/* Submit */}
          <input
            type='submit'
            disabled={isSubmitting}
            value={isSubmitting ? "Sending Message..." : "Send Message"}
            className='cursor-pointer bg-blue-500 text-white font-bold rounded-lg p-3 transition-all hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed'
          />
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
