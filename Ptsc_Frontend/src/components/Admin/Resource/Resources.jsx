import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Pagination from './Pagination';
import { RxCross2 } from "react-icons/rx";

<<<<<<< HEAD
import  BASE  from '../../../api/config'
=======
const BASE = "https://programming-club-46ae.onrender.com";
>>>>>>> 7a15d5036515a617cc23c460850248068f3ecf2c

function Resources({fetchMediaList, mediaList, filteredMedia, setFilteredMedia, setMediaList}) {
  //  const [mediaList, setMediaList] = useState([]);
  // const [filteredMedia, setFilteredMedia] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Show more items on bigger screens
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState(null);
  const [downloadURLs, setDownloadURLs] = useState({});

<<<<<<< HEAD
 
=======
  const fetchMediaList = async () => {
    try {
      const res = await fetch(`${BASE}/v1/getallmedia`);
      const data = await res.json();
      if (res.ok) {
        setMediaList(data.mediaList);
        setFilteredMedia(data.mediaList);
      }
    } catch (error) {
      console.error("Error fetching media list:", error);
    }
  };

  useEffect(() => {
    fetchMediaList();
  }, []);
>>>>>>> 7a15d5036515a617cc23c460850248068f3ecf2c

  useEffect(() => {
    const filtered = mediaList.filter(media =>
      media.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredMedia(filtered);
    setCurrentPage(1);
  }, [mediaList, search]);

  const onDelete = async (id) => {
    const res = await fetch(`${BASE}/v1/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      toast.success("Media deleted successfully");
      setMediaList(prev => prev.filter(item => item._id !== id));
    }
  };

  const onEdit = (media) => {
    toast.info(`Edit functionality for ${media.title} is not implemented yet.`);
  };

  useEffect(() => {
    const fetchAllDownloadURLs = async () => {
      const urls = {};
      for (let media of filteredMedia) {
        const res = await fetch(`${BASE}/v1/download/${media._id}`);
        const data = await res.json();
        urls[media.s3Key] = data.downloadURLforMedia;
        urls[media.thumbnailKey] = data.downloadURLforThumbnail;
      }
      setDownloadURLs(urls);
    };
    fetchAllDownloadURLs();
  }, [filteredMedia]);

  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  let currentPageMedia = filteredMedia.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);

  return (
    <div className="px-4 sm:px-6 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          My Media
        </h2>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-full sm:w-60 
                     focus:outline-none focus:ring focus:ring-blue-300
                     dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
        />
      </div>

      {/* Media Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentPageMedia.map(media => (
          <div
            key={media._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition 
                       overflow-hidden flex flex-col"
          >
            {/* Thumbnail */}
            <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-700">
              {media.thumbnailKey && (
                <img
                  onClick={() => setPreview(media)}
                  src={downloadURLs[media.thumbnailKey] || "/fallback.png"}
                  alt={media.title || "Media thumbnail"}
                  className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
                />
              )}
            </div>

            {/* Card Content */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold truncate text-gray-800 dark:text-gray-100">
                {media.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2 flex-grow">
                {media.description}
              </p>

              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex justify-between">
                <span>{media.fileType}</span>
                <span>{(media.fileSize / (1024 * 1024)).toFixed(1)} MB</span>
              </div>

              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={() => onEdit(media)}
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(media._id)}
                  className="text-red-600 dark:text-red-400 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 relative max-w-4xl w-full">
            <button
              onClick={() => setPreview(null)}
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              <RxCross2 className="w-6 h-6" />
            </button>
            {preview.fileType.startsWith("video") ? (
              <video
                className="w-full h-full object-cover rounded"
                src={downloadURLs[preview.s3Key]}
                muted
                controls
                autoPlay
                playsInline
              />
            ) : (
              <img
                className="w-full h-full object-cover rounded"
                src={downloadURLs[preview.s3Key]}
                alt={preview.title}
              />
            )}
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />
        </div>
      )}
    </div>
  );
}

export default Resources;
