import React from "react";
import { useForm } from "react-hook-form";

function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(data);
    reset();
  };

  return (
    <div className="pt-24 w-full min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 sm:px-8 md:px-16 py-16 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-950 shadow-2xl rounded-2xl px-6 sm:px-10 md:px-14 py-10 transition-all">
        
        {/* Heading */}
        <div className="flex flex-col gap-3 mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-blue-600 dark:text-blue-400">
            Contact Us
          </h1>
          <h2 className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-serif">
            We’d love to hear from you! Fill out the form and we’ll get back to you.
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 dark:text-gray-200">Name</label>
            <input
              {...register("Name", {
                required: "Name is required",
                minLength: { value: 3, message: "Minimum length should be 3" },
              })}
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 outline-none 
                         text-black dark:text-white bg-white dark:bg-gray-800 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
            />
            {errors.Name && (
              <span className="text-red-500 text-sm mt-1">* {errors.Name.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 dark:text-gray-200">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 outline-none 
                         text-black dark:text-white bg-white dark:bg-gray-800 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">* {errors.email.message}</span>
            )}
          </div>

          {/* Mobile */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 dark:text-gray-200">Mobile No.</label>
            <input
              {...register("mobile", {
                required: "Mobile no. is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit number",
                },
              })}
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 outline-none 
                         text-black dark:text-white bg-white dark:bg-gray-800 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
            />
            {errors.mobile && (
              <span className="text-red-500 text-sm mt-1">* {errors.mobile.message}</span>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 dark:text-gray-200">Message</label>
            <textarea
              {...register("Message", {
                required: "Enter the message",
                minLength: { value: 10, message: "Enter at least 10 characters" },
              })}
              rows={5}
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 outline-none 
                         text-black dark:text-white bg-white dark:bg-gray-800 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all resize-none"
            />
            {errors.Message && (
              <span className="text-red-500 text-sm mt-1">* {errors.Message.message}</span>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <input
              type="submit"
              disabled={isSubmitting}
              value={isSubmitting ? "Sending..." : "Send Message"}
              className="cursor-pointer w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 
                         text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition-all 
                         disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
