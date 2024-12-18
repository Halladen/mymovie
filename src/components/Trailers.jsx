import React, { useEffect, useRef, useState } from "react";
import TrailerCard from "./TrailerCard";
import {
  getMovies,
  getMovieEndpoint,
  getTvEndpoint,
  getTrailer,
} from "../utils/helper";
import { _ } from "lodash";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const bgImageBaseUrl = import.meta.env.VITE_BG_IMAGE_BASE_URL;

const Trailers = () => {
  const [movies, setMovies] = useState([]);
  const [bgImage, setBgImage] = useState("");
  const [type, setType] = useState("popular");
  const scrollRef = useRef(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const endpoints =
          type === "popular"
            ? [getMovieEndpoint("popular"), getTvEndpoint("popular")]
            : type === "streaming"
            ? [getMovieEndpoint("streaming"), getTvEndpoint("streaming")]
            : type === "ontv"
            ? [getTvEndpoint("onTheAir"), getTvEndpoint("onTheAir")]
            : [
                getMovieEndpoint("now_playing"),
                getMovieEndpoint("now_playing"),
              ];

        // Fetch data for endpoints
        const [data1, data2] = await Promise.all([
          getMovies(endpoints[0], 1),
          getMovies(endpoints[1], endpoints[0] === endpoints[1] ? 2 : 1), // Different page for identical endpoints
        ]);

        // Combine results
        const results = [...(data1?.results || []), ...(data2?.results || [])];

        const shuffleResult = _.shuffle(results);
        const addTrailers = await Promise.all(
          shuffleResult.map(async (movie) => {
            // get trailer according to movie or tv
            if (movie.original_title) {
              const trailer = await getTrailer(
                getMovieEndpoint("trailer", movie.id)
              );
              // console.log("movie trailer: ", trailer);
              return { ...movie, trailer };
            } else {
              const trailer = await getTrailer(
                getTvEndpoint("trailer", movie.id)
              );

              return { ...movie, trailer };
            }
          })
        );

        setBgImage(shuffleResult[0].poster_path);
        setMovies(addTrailers);
        // console.log(shuffleResult);
      } catch (error) {
        setMovies([]);
        console.error("Error fetching data: ", error);
      }
    };

    fetchMovies();
  }, [type]);

  const handleType = (type) => {
    setType(type);
    scrollRef.current.scrollLeft = 0;
  };
  return (
    <section
      className="min-h-[300px] text-white pt-6 pl-10 xl:px-28  bg-cover "
      style={{
        backgroundImage: `
      linear-gradient(to right, rgba(3, 37, 65, 0.75), rgba(3, 37, 65, 0.75)),
      url(${bgImageBaseUrl}${bgImage})
    `,
      }}
    >
      <div className=" flex gap-5 items-center">
        <h5 className="text-xl font-semibold pl-2 md:pl-0">Latest Trailers</h5>
        <div className="relative font-semibold border-solid  border border-white rounded-full flex flex-row">
          <button
            onClick={() => handleType("popular")}
            className={`${
              type === "popular"
                ? "bg-slate-800 text-black bg-gradient-to-r from-slate-100 to-slate-500 "
                : "text-white"
            } px-5 rounded-full`}
          >
            Popular
          </button>

          <button
            onClick={() => handleType("streaming")}
            className={`${
              type === "streaming"
                ? "bg-slate-800 text-black bg-gradient-to-r from-slate-100 to-slate-500 "
                : "text-white"
            } px-5 rounded-full`}
          >
            Streaming
          </button>

          <button
            onClick={() => handleType("ontv")}
            className={`${
              type === "ontv"
                ? "bg-slate-800 text-black bg-gradient-to-r from-slate-100 to-slate-500 "
                : "text-white"
            } px-5 rounded-full `}
          >
            On TV
          </button>

          <button
            onClick={() => handleType("now_playing")}
            className={`${
              type === "now_playing"
                ? "bg-slate-800 text-black bg-gradient-to-r from-slate-100 to-slate-500 "
                : "text-white"
            } px-5 rounded-full`}
          >
            In Theater
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex flex-row gap-3 scrollbar-thin overflow-x-auto mt-5 pb-10"
      >
        {movies.map(
          (movie, index) =>
            movie.backdrop_path &&
            movie.id &&
            movie.trailer && (
              <TrailerCard
                key={index}
                MovieDetail={movie}
                setBackground={setBgImage}
              />
            )
        )}
      </div>
    </section>
  );
};

export default Trailers;
