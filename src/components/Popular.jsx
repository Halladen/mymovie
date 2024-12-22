import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { getMovies, getMovieEndpoint, getTvEndpoint } from "../utils/helper";
import { _ } from "lodash";
import BigScreenTags from "./BigScreenTags";
import SmallScreenTags from "./SmallScreenTags";

const tags = [
  ["popular", "Popular"],
  ["ontv", "On TV"],
  ["now_playing", "In Theaters"],
];

const Popular = () => {
  const [movieList, setMovieList] = useState(Array(10).fill({}));
  const [type, setType] = useState("popular");
  const [dropdown, setDropdown] = useState(false);
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
    <section className=" min-h-[400px]  pt-6 px-2  md:px-10 xl:px-28">
      <div className=" flex gap-5  items-center ">
        <h5 className="text-xl font-semibold">What's Popular</h5>
        {/* big screen tags */}
        <BigScreenTags
          name={"popular"}
          type={type}
          tags={tags}
          handleType={handleType}
          setDropdown={setDropdown}
        />

        {/* dropdwn for small screens tags */}
        <SmallScreenTags
          name={"popular"}
          type={type}
          tags={tags}
          handleType={handleType}
          dropdown={dropdown}
          setDropdown={setDropdown}
        />
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
