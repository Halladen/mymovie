import React, { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import TrailerModal from "./TrailerModal";

const posterBaseUrl = import.meta.env.VITE_POSTER_BASE_URL;

const TrailerCard = ({ movieDetail, setBackground }) => {
  const [isVisible, setIsVisible] = useState(false);

  const heandleBackground = () => setBackground(movieDetail.backdrop_path);

  return (
    <div className="relative min-w-[300px] min-h-[200px] mt-5">
      <div
        onClick={() => setIsVisible(true)}
        onMouseEnter={heandleBackground}
        className=" relative w-full h-[170px] p-2 hover:scale-110 ease-in-out duration-150"
      >
        <img
          className="w-full h-full rounded-lg relative"
          src={`${posterBaseUrl}${movieDetail.backdrop_path}`}
          alt={`${movieDetail.original_title} poster`}
        />
        <button className="absolute top-0 left-0 flex justify-center items-center h-full w-full  ">
          <FaPlay size={44} />
        </button>
      </div>

      <div className="text-center  mt-1">
        <Link
          to={`${movieDetail.original_title ? "movie" : "tv"}/${
            movieDetail.id
          }-${
            movieDetail.original_title
              ? movieDetail.original_title.split(" ").join("-")
              : movieDetail.original_name.split(" ").join("-")
          }`}
          className="text-lg font-bold"
        >
          {movieDetail.original_title || movieDetail.original_name}
        </Link>
        <p>{movieDetail.trailer.name || ""}</p>
      </div>

      {isVisible && (
        <TrailerModal movieDetail={movieDetail} setVisible={setIsVisible} />
      )}
    </div>
  );
};

export default TrailerCard;
