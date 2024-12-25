import React, { useRef, useEffect } from "react";
const YOUTUBE_BASE_URL = "https://www.youtube.com/embed/";
import { MdOutlineClose } from "react-icons/md";

const TrailerModal = ({ movieDetail, setVisible }) => {
  const modalRef = useRef(null);

  // handle clicks outside the trailer's modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setVisible]);
  return (
    <div className="fixed top-0 left-0 text-white bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center md:items-start h-full w-full z-[1000]">
      <div
        ref={modalRef}
        className=" w-[90%] lg:w-[70%] h-[40%] sm:h-[45%] md:h-[65%] lg:h-[75%] bg-black mt-10"
      >
        <div className="flex justify-between items-center m-5 ">
          <div className="">
            {movieDetail.original_title || movieDetail.original_name} | Official
            Trailer
          </div>
          <button onClick={() => setVisible(false)}>
            <MdOutlineClose size={30} />
          </button>
        </div>
        <iframe
          title="Trailer Video"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          src={`${YOUTUBE_BASE_URL}${movieDetail.trailer?.key || ""}`}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default TrailerModal;
