import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { getMovies, getEndpoint } from "../utils/helper";

const Popular = () => {
  const [movieList, setMovieList] = useState(Array(10).fill({}));
  const [type, setType] = useState("streaming");

  const handleTrending = (type) => {
    setType(type);
  };
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // get the endponts
        let endpoints = [];
        const movieEndpoint = getEndpoint(type, "movie");
        const tvEndpoint = getEndpoint(type, "tv");
        if (type === "streaming") {
          endpoints = [movieEndpoint, tvEndpoint];
        } else if (type === "now_playing") {
          endpoints = [movieEndpoint, movieEndpoint];
        } else if (type === "ontv") {
          endpoints = [tvEndpoint, tvEndpoint];
        }

        // fetch all endpoints
        const [data1, data2] = await Promise.all([
          getMovies(endpoints[0], 1),
          getMovies(endpoints[1], 2),
        ]);

        const results = [...data1.results, ...data2.results];
        setMovieList(results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchMovies();
  }, [type]);
  return (
    <section className=" min-h-[400px]  pt-6 mx-2  md:mx-10 xl:mx-28">
      <div className=" flex gap-5 items-center ">
        <h5 className="text-xl font-semibold pl-2 md:pl-0">What's Popular</h5>
        <div className="relative font-semibold border-solid  border-2 border-black rounded-full flex flex-row">
          <div
            className={`${
              type === "streaming" ? "bg-slate-800" : "bg-white"
            } pr-5 pl-5 rounded-full`}
          >
            <button
              onClick={() => handleTrending("streaming")}
              className={`${
                type === "streaming"
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
            } pr-5 pl-5 rounded-full`}
          >
            <button
              onClick={() => handleTrending("ontv")}
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
            } pr-5 pl-5 rounded-full`}
          >
            <button
              onClick={() => handleTrending("now_playing")}
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
