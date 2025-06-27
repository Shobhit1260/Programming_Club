import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Pagination from './Pagination';
import { RxCross1 } from "react-icons/rx";

function Resources() {
    const [mediaList,setMediaList]=useState([]);
    const [filteredMedia,setfilteredMedia]=useState([]);    
    const [currentPage,setCurrentPage]=useState(1);
    const [itemsPerPage,setItemsPerPage]=useState(5);
    const [search, setSearch] = useState("");
    const [previewVideo, setPreviewVideo] = useState(null);


    const fetchMediaList = async () => {
    try{
       const res= await fetch('http://localhost:4000/v1/getallmedia');
       const data=await res.json();
       if(res.ok){
          console.log("Media List:", data.mediaList);
          setMediaList(data.mediaList);
          setfilteredMedia(data.mediaList);
       }  
    }
    catch(error){
        console.error("Error fetching media list:", error);
    }
  }
    useEffect(() => {
      fetchMediaList();
    }, []);
     
    useEffect(() => {
        const filtered = mediaList.filter(media =>(
            media.title.toLowerCase().includes(search.toLowerCase()) ||
            media.description.toLowerCase().includes(search.toLowerCase()) ||
            media.fileName.toLowerCase().includes(search.toLowerCase()) ||
            media.UploadedBy?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
            media.UploadedBy?.lastName?.toLowerCase().includes(search.toLowerCase())
        ));
        setfilteredMedia(filtered);
        setCurrentPage(1); 
    }, [mediaList, search]);
   
    let startIndex=(currentPage-1)*itemsPerPage;
    let endIndex=startIndex+itemsPerPage;
    let currentPageMedia=filteredMedia.slice(startIndex,endIndex);
    const totalPages=Math.ceil(filteredMedia.length/itemsPerPage);

   const onDelete = async (id) => {
    const res = await fetch(`http://localhost:4000/v1/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      setMediaList(prev => prev.filter(item => item._id !== id));
    }
  };

  const onEdit = (media) => {
    // Implement edit functionality here
    toast.info(`Edit functionality for ${media.title} is not implemented yet.`);
  }

const [downloadURLs, setDownloadURLs] = useState({});

useEffect(() => {
  const fetchAllDownloadURLs = async () => {
    const urls = {};
    for (let media of filteredMedia) {
      const res = await fetch(`http://localhost:4000/v1/download/${media._id}`);
      const data = await res.json();
      urls[media.s3Key] = data.downloadURL;
    }
    setDownloadURLs(urls);
  };
  fetchAllDownloadURLs();
}, [filteredMedia]);

    

  return (
    <div className="px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">My Media</h2>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-1.5 rounded-md w-60 focus:outline-none focus:ring"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {currentPageMedia.map(media => (
         <div key={media._id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
        <div className="relative w-full aspect-video bg-gray-100">
        {media.fileType.startsWith("video") ? (
          <div onClick={() => setPreviewVideo(downloadURLs[media.s3Key])} className="cursor-pointer">
            <video
              className="w-full h-full object-cover"
              src={downloadURLs[media.s3Key]}
              muted
              playsInline
            />
          </div>
        ) : (
         <div onClick={() => setPreviewVideo(downloadURLs[media.s3Key])} className="cursor-pointer">
          <img className="w-full h-full object-cover" src={downloadURLs[media.s3Key]} alt={media.title} />
           </div>
        )}
        {media.thumbnailKey && (
          <img
            src={downloadURLs[media.thumbnailKey] || "/fallback.png"} 
            alt={media.title || "Media thumbnail"} 
            className="absolute top-2 left-2 w-20 h-12 object-cover border shadow rounded"
          />
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{media.title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{media.description}</p>

        <div className="text-xs text-gray-500 mt-2 flex justify-between">
          <span>{media.fileType}</span>
          <span>{(media.fileSize / (1024 * 1024)).toFixed(1)} MB</span>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={() => onEdit(media)} className="text-blue-600 hover:underline text-sm">Edit</button>
          <button onClick={() => onDelete(media._id)} className="text-red-600 hover:underline text-sm">Delete</button>
        </div>
      </div>
    </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />
        </div>
      )}
       {previewVideo && (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    <div className="relative w-full max-w-4xl">
      <button
        onClick={() => setPreviewVideo(null)}
        className="absolute top-2 right-2 text-white text-xl bg-black/50 p-2 rounded-full"
      >
        <RxCross1 />
      </button>
      <video
        src={previewVideo}
        controls
        autoPlay
        className="w-full h-[80vh] object-contain bg-black rounded"
      />
    </div>
  </div>
)}
    </div>
   

  )
}

export default Resources
