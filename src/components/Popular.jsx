import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { getMovies } from "../utils/getMovies";

// list of providers id like netflex,disney plus,amazon prime video and apple tv plus
const PROVIDERS_ID = {
  netflex: 8,
  amazonPrime: 9,
};
const Popular = () => {
  const [movieList, setMovieList] = useState(Array(10).fill({}));
  const [type, setType] = useState("streaming");
  const endpointRef = useRef(
    "/discover/movie?watch_region=US&with_watch_providers=9,8&sort_by=popularity.desc"
  );

  const getPopularEndpoint = (type, page = 1, providers) => {
    const providerList = Object.values(providers).join(",");
    if (type == "now_playing") {
      return `/movie/now_playing?language=en-US&page=${page}&with_watch_providers=${providerList}&`;
    } else if (type === "tv") {
      return `/discover/tv?language=en-US&sort_by=popularity.desc&watch_region=US&with_watch_providers=${providerList}&page=${page}`;
    } else {
      return [
        `/discover/movie?watch_region=US&with_watch_providers=${providerList}&sort_by=popularity.desc&page=${page}`,
        `/discover/tv?watch_region=US&with_watch_providers=${providerList}&sort_by=popularity.desc&page=${page}`,
      ];
    }
  };
  const handleTrending = (type) => {
    endpointRef.current = getPopularEndpoint(
      (type = type),
      (providers = PROVIDERS_ID)
    );
    setType(type);
  };
  useEffect(() => {
    
    if (type === "streaming") {
      for (let i = 1; i < 3; i++) {
        endpointRef.current = getPopularEndpoint(
          (type = type),
          (page = i),
          (providers = PROVIDERS_ID)
        );
        getMovies(endpointRef.current).then(data=>);
      }
    } else {
      getMovies(endpointRef.current).then((data) => {
        if (data.results) {
          setMovieList(data.results);
        }
        console.log("Movie data: ", data.results);
      });
    }
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
              type === "tv" ? "bg-slate-800" : "bg-white"
            } pr-5 pl-5 rounded-full`}
          >
            <button
              onClick={() => handleTrending("tv")}
              className={`${
                type === "tv"
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
