import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Pagination from './Pagination';
import { RxCross2 } from "react-icons/rx";
function Resources() {
    const [mediaList,setMediaList]=useState([]);
    const [filteredMedia,setfilteredMedia]=useState([]);    
    const [currentPage,setCurrentPage]=useState(1);
    const [itemsPerPage,setItemsPerPage]=useState(5);
    const [search, setSearch] = useState("");
    const [preview, setPreview] = useState(null);


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
            media.title.toLowerCase().includes(search.toLowerCase())
        ));
        setfilteredMedia(filtered);
        setCurrentPage(1); 
    }, [mediaList, search]);
   
   const onDelete = async (id) => {
    const res = await fetch(`http://localhost:4000/v1/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      toast.success("Media deleted successfully");
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
      urls[media.s3Key] = data.downloadURLforMedia;
      urls[media.thumbnailKey] = data.downloadURLforThumbnail;
    }
    setDownloadURLs(urls);
  };
  fetchAllDownloadURLs();
}, [filteredMedia]);

    let startIndex=(currentPage-1)*itemsPerPage;
    let endIndex=startIndex+itemsPerPage;
    let currentPageMedia=filteredMedia.slice(startIndex,endIndex);
    const totalPages=Math.ceil(filteredMedia.length/itemsPerPage);

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

      <div className=" grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
     
        {currentPageMedia.map(media => (
         <div key={media._id} className="z-60 bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <div className="relative w-full aspect-video bg-gray-100">
        {media.thumbnailKey && (
          <img onClick={() => setPreview(media)} 
            src={downloadURLs[media.thumbnailKey] || "/fallback.png"} 
            alt={media.title || "Media thumbnail"} 
            className="absolute top-0 left-0 w-full h-full object-cover border shadow rounded"
          />
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{media.title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2 h-24">{media.description}</p>

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

      {preview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 relative max-w-3xl w-full">
            <button onClick={() => setPreview(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              <RxCross2 className="w-6 h-6" />
            </button>
            {preview.fileType.startsWith("video") ? (
          <div className="cursor-pointer">
            <video
              className="w-full h-full object-cover"
              src={downloadURLs[preview.s3Key]}
              muted
              controls
              autoPlay
              playsInline
            />
          </div>
        ) : (
         <div  className="cursor-pointer">
          <img className="w-full h-full object-cover" src={downloadURLs[preview.s3Key]} alt={preview.title} />
           </div>
        )}
          </div>
        </div>
      )}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />
        </div>
      )}
      
    </div>
   

  )
}

export default Resources
