import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import Pagination from './Pagination.jsx';
import BASE from '../../../api/config';

function Resources() {
  const [mediaList,setMediaList]=useState([]);
  const [filteredMedia,setFilteredMedia]=useState([]);    
  const [currentPage,setCurrentPage]=useState(1);
  const [itemsPerPage]=useState(6); // little more compact for phone
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState(null);
  const [downloadURLs, setDownloadURLs] = useState({});

  const fetchMediaList = async () => {
    try {
       const res= await fetch(`${BASE}/v1/getallmedia`);
       const data=await res.json();
       if(res.ok){
          setMediaList(data.mediaList);
          setFilteredMedia(data.mediaList);
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
      media.description.toLowerCase().includes(search.toLowerCase()) 
    ));
    setFilteredMedia(filtered);
    setCurrentPage(1); 
  }, [mediaList, search]);

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
    if(filteredMedia.length) fetchAllDownloadURLs();
  }, [filteredMedia]);

  let startIndex=(currentPage-1)*itemsPerPage;
  let endIndex=startIndex+itemsPerPage;
  let currentPageMedia=filteredMedia.slice(startIndex,endIndex);
  const totalPages=Math.ceil(filteredMedia.length/itemsPerPage);

  const handleDownload=async(id)=>{
    try{
      const res=await fetch(`${BASE}/v1/download/${id}`);
      const data=await res.json();
      const fileURL= data.downloadURLforMedia;
      
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = "media"; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(fileURL); 
    } 
   catch(error){
      console.error("Error downloading media:", error);
    } 
  }  

  return (
    <div className="px-4 sm:px-6 py-6">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold">My Media</h2>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-full sm:w-60 focus:outline-none focus:ring"
        />
      </div>

      {/* Media Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentPageMedia.map(media => (
          <div key={media._id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
            <div className="relative w-full aspect-video bg-gray-100">
              {media.thumbnailKey && (
                <img 
                  onClick={() => setPreview(media)} 
                  src={downloadURLs[media.thumbnailKey] || "/fallback.png"} 
                  alt={media.title || "Media thumbnail"} 
                  className="absolute top-0 left-0 w-full h-full object-cover border shadow rounded cursor-pointer"
                />
              )}
            </div>

            <div className="p-4">
              <h3 className="text-base sm:text-lg font-semibold truncate">{media.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2 h-16 sm:h-20">
                {media.description}
              </p>

              <div className="text-xs text-gray-500 mt-2 flex justify-between">
                <span>{media.fileType}</span>
                <span>{(media.fileSize / (1024 * 1024)).toFixed(1)} MB</span>
              </div>

              <div className="mt-4">
                <button 
                  className='w-full rounded-lg bg-green-600 hover:bg-green-700 font-bold text-white py-2 text-sm sm:text-base'
                  onClick={()=>handleDownload(media._id)}
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 relative w-full max-w-3xl">
            <button 
              onClick={() => setPreview(null)} 
              className="absolute top-2 right-2 bg-gray-200 rounded-full p-1 hover:bg-gray-300"
            >
              <RxCross2 className="w-6 h-6" />
            </button>
            {preview.fileType.startsWith("video") ? (
              <video className="w-full h-auto rounded" src={downloadURLs[preview.s3Key]} muted controls autoPlay playsInline />
            ) : (
              <img className="w-full h-auto rounded" src={downloadURLs[preview.s3Key]} alt={preview.title} />
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
  )
}

export default Resources
