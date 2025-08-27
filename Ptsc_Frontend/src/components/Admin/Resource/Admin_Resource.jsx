import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Resources from './Resources';
import { toast } from 'react-toastify';

const BASE = "http://localhost:4000/v1";

const MediaUploadForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('media', data.media[0]);

    if (data.thumbnail?.[0]) {
      formData.append('thumbnail', data.thumbnail[0]);
    }

    try {
      setLoading(true);
      const res = await fetch(`${BASE}/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        toast.success('Upload successful!');
        reset();
      } else {
        toast.error('Upload failed: ' + result.message);
      }
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto mt-10 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-xl transition-colors duration-300">
      <Resources />

      {loading && (
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 my-4">
          <svg
            className="animate-spin h-5 w-5 text-blue-600 dark:text-blue-400"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          Uploading...
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
        Upload Media
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="space-y-4 w-full"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            {...register('title')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
            placeholder="Enter title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
            placeholder="Enter description"
          />
        </div>

        {/* Media File */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Media File (required)
          </label>
          <input
            type="file"
            accept="video/*,image/*"
            {...register('media', { required: 'Media file is required' })}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md 
              file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer"
          />
          {errors.media && (
            <p className="text-red-500 text-sm mt-1">{errors.media.message}</p>
          )}
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Thumbnail (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            {...register('thumbnail')}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md 
              file:bg-gray-400 file:text-white hover:file:bg-gray-500 cursor-pointer"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md 
            hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default MediaUploadForm;
