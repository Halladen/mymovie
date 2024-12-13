import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { getMovies } from "../utils/getMovies";

const Popular = () => {
  const [movieList, setMovieList] = useState(Array(10).fill({}));
  const [type, setType] = useState("now_playing");
  const endpointRef = useRef("/movie/now_playing?language=en-US&");

  const handleTrending = (type) => {
    if (type === "now_playing") {
      endpointRef.current = "/movie/now_playing?language=en-US&";
    } else if (type === "ontv") {
      endpointRef.current = "/movie/ontv?language=en-US&";
    } else {
      endpointRef.current = "/discover/movie?language=en-US&";
    }
    setType(type);
  };
  useEffect(() => {
    const endpoint = `/movie/${type}?language=en-US&`;
    getMovies(endpointRef.current).then((data) => {
      if (data.results) {
        setMovieList(data.results);
      }
      console.log("Movie data: ", data);
    });
  }, [type]);
  return (
    <section className=" min-h-[400px]  pt-6 mx-2  md:mx-10 xl:mx-28">
      <div className=" flex gap-5 items-center ">
        <h5 className="text-xl font-semibold pl-2 md:pl-0">What's Popular</h5>
        <div className="relative font-semibold border-solid  border-2 border-black rounded-full flex flex-row">
          <div
            className={`${
              type === "now" ? "bg-slate-800" : "bg-white"
            } pr-5 pl-5 rounded-full`}
          >
            <button
              onClick={() => handleTrending("now")}
              className={`${
                type === "now"
                  ? "bg-slate-800 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300"
                  : "text-black"
              } `}
            >
              Streaming
            </button>
          </div>

          <div
            className={`${
              type === "onTv" ? "bg-slate-800" : "bg-white"
            } pr-5 pl-5 rounded-full`}
          >
            <button
              onClick={() => handleTrending("onTv")}
              className={`${
                type === "onTv"
                  ? "bg-slate-800 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300"
                  : "text-black"
              } `}
            >
              On TV
            </button>
          </div>

          <div
            className={`${
              type === "now_playing" ? "bg-slate-800" : "bg-white"
            } pr-5 pl-5 rounded-full`}
          >
            <button
              onClick={() => handleTrending("inTheater")}
              className={`${
                type === "now_playing"
                  ? "bg-slate-800 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300"
                  : "text-black"
              } `}
            >
              In Theaters
            </button>
          </div>
        </div>
      </div>
      <div
        className="flex flex-row  pt-4 overflow-x-auto scrollbar-thin  h-full justify-start gap-2 md:gap-5 "
        style={{ minHeight: "calc(150px * 1.5)" }}
      >
        {movieList.map((movie, index) => (
          <MovieCard key={index} movieDetail={movie} />
        ))}
      </div>
    </section>
  );
};

export default Popular;
