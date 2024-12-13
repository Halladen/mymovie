import React, { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

const posterBaseUrl = import.meta.env.VITE_POSTER_BASE_URL;
const YOUTUBE_BASE_URL = "https://www.youtube.com/embed/";

const TrailerCard = ({ detail, setBackground }) => {
  const [iconSize, setIconSize] = useState(44);
  const [isVisible, setIsVisible] = useState(false);

  const heandleBackground = () => setBackground(detail.backdrop_path);
  const increaseIconSize = () => setIconSize(54);
  const decreaseIconSize = () => setIconSize(44);
  const handleModal = (bool) => {
    setIsVisible(bool);
    // console.log(detail);
  };

  useEffect(() => {
    // console.log(detail);
    // console.log(detail.trailer);
  });
  return (
    <div className="relative min-w-[300px] h-[200px] ">
      <div
        onClick={() => handleModal(true)}
        onMouseEnter={heandleBackground}
        className=" relative w-full h-[170px] p-2 hover:p-0 transition-all duration-150 ease-in-out"
      >
        <img
          className="w-full h-full rounded-lg relative"
          src={`${posterBaseUrl}${detail.backdrop_path}`}
          alt={`${detail.original_title} poster`}
        />
        <button
          className="absolute top-0 left-0 flex justify-center items-center h-full w-full  "
          onMouseEnter={increaseIconSize}
          onMouseLeave={decreaseIconSize}
        >
          <FaPlay size={iconSize} />
        </button>
      </div>

      <h5 className="text-center font-semibold mt-3">
        {detail.original_title}
      </h5>

      {isVisible && (
        <div className="fixed top-0 left-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center h-full w-full z-[1000]">
          <div className="w-[65%] sm:h-[40%] md:h-[65%] lg:h-[75%] bg-black">
            <div className="flex justify-between items-center m-5 ">
              <div className="">{detail.original_title} | Official Trailer</div>
              <button onClick={() => handleModal(false)}>
                <MdOutlineClose size={30} />
              </button>
            </div>
            <iframe
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              src={`${YOUTUBE_BASE_URL}${detail.trailer.key}`}
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrailerCard;
