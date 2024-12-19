import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { _ } from "lodash";
import { getTrendingEndpoint, getMovies } from "../utils/helper";
import "../styles/Trending.css";
const Trending = () => {
  const [trendingList, setTrendingList] = useState([]);
  const [time, setTime] = useState("day");
  const scrollRef = useRef(0);

  const handleTrending = (time) => {
    setTime(time);
    scrollRef.current.scrollLeft = 0;
  };
  useEffect(() => {
    const endpoint = getTrendingEndpoint(time);
    getMovies(endpoint)
      .then((data) => {
        const shuffleData = _.shuffle(data.results);
        setTrendingList(shuffleData);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, [time]);
  return (
    <section className=" min-h-[400px]  pt-6 mx-2  md:mx-10 xl:mx-28">
      <div className=" flex gap-2 sm:gap-5 items-center ">
        <h5 className="text-lg sm:text-xl sm:font-semibold">Trending</h5>
        <div className="relative text-sm md:text-base  sm:font-semibold border-solid  border-2 border-black rounded-full flex flex-row">
          <div
            className={`${
              time === "day" ? "bg-slate-800" : "bg-white"
            } pr-5 pl-5 rounded-full`}
          >
            <button
              onClick={() => handleTrending("day")}
              className={`${
                time === "day"
                  ? "bg-slate-800 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300"
                  : "text-black"
              } `}
            >
              Today
            </button>
          </div>

          <div
            className={`${
              time === "week" ? "bg-slate-800" : "bg-white"
            } pl-5 pr-5 rounded-full`}
          >
            <button
              onClick={() => handleTrending("week")}
              className={`${
                time === "week"
                  ? "bg-slate-800 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300"
                  : "text-black"
              } `}
            >
              This Week
            </button>
          </div>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex flex-row  pt-4 overflow-x-auto scrollbar-thin  h-full justify-start gap-2 md:gap-5 "
        style={{ minHeight: "calc(150px * 1.5)" }}
      >
        {trendingList.map((movie, index) =>
          movie.poster_path ? (
            <MovieCard key={index} movieDetail={movie} />
          ) : null
        )}
      </div>
    </section>
  );
};

export default Trending;
