import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { getMovies, getMovieEndpoint, getTvEndpoint } from "../utils/helper";
import { _ } from "lodash";
const Popular = () => {
  const [movieList, setMovieList] = useState(Array(10).fill({}));
  const [type, setType] = useState("popular");
  const scrollRef = useRef(0);

  const handleType = (type) => {
    setType(type);
    scrollRef.current.scrollLeft = 0;
  };
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // get the endponts
        let endpoints = [];
        // const movieEndpoint = getMovieEndpoint(type);
        // const tvEndpoint = getTvEndpoint("popular");
        if (type === "popular") {
          endpoints = [
            getMovieEndpoint("streaming"),
            getTvEndpoint("streaming"),
          ];
        } else if (type === "now_playing") {
          endpoints = [
            getMovieEndpoint("now_playing"),
            getMovieEndpoint("now_playing"),
          ];
        } else if (type === "ontv") {
          endpoints = [
            getTvEndpoint("airingToday"),
            getTvEndpoint("airingToday"),
          ];
        }

        // fetch all endpoints
        const [data1, data2] = await Promise.all([
          getMovies(endpoints[0], 1),
          getMovies(endpoints[1], 2),
        ]);

        const results = [...(data1.results || []), ...(data2.results || [])];
        const shuffleResult = _.shuffle(results);
        setMovieList(shuffleResult);
        // console.log("result", shuffleResult);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchMovies();
  }, [type]);
  return (
    <section className=" min-h-[400px]  pt-6 px-2  sm:px-10 md:px-20">
      <div className=" flex gap-2 sm:gap-5  items-center ">
        <h5 className="text-lg sm:text-xl sm:font-semibold">What's Popular</h5>
        <div className="relative border-solid  border-2 border-black text-sm md:text-base  sm:font-semibold  rounded-full flex flex-row justify-center ">
          <div
            className={`${
              type === "popular" ? "bg-slate-800" : "bg-white"
            } px-2 sm:px-5 rounded-full`}
          >
            <button
              onClick={() => handleType("popular")}
              className={`${
                type === "popular"
                  ? "bg-slate-800 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300"
                  : "text-black"
              } `}
            >
              Streaming
            </button>
          </div>

          <div
            className={`${
              type === "ontv" ? "bg-slate-800" : "bg-white"
            } px-2 sm:px-5 rounded-full`}
          >
            <button
              onClick={() => handleType("ontv")}
              className={`${
                type === "ontv"
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
            } px-2 sm:px-5 rounded-full`}
          >
            <button
              onClick={() => handleType("now_playing")}
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
        ref={scrollRef}
        className="flex flex-row  pt-4 overflow-x-auto scrollbar-thin  h-full justify-start gap-2 md:gap-5 "
        style={{ minHeight: "calc(150px * 1.5)" }}
      >
        {movieList.map((movie, index) =>
          movie.poster_path ? (
            <MovieCard key={index} movieDetail={movie} />
          ) : null
        )}
      </div>
    </section>
  );
};

export default Popular;
