import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { _ } from "lodash";
import { getTrendingEndpoint, getMovies } from "../utils/helper";
import BigScreenTags from "./BigScreenTags";
import SmallScreenTags from "./SmallScreenTags";
import "../styles/Trending.css";

const tags = [
  ["day", "Today"],
  ["week", "This Week"],
];

const Trending = () => {
  const [trendingList, setTrendingList] = useState([]);
  const [time, setTime] = useState("day");
  const [dropdown, setDropdow] = useState(false);
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
      <div className=" flex gap-5 items-center">
        <h5 className="text-xl font-bold">Trending</h5>
        {/* tags for large screen and hide it in small screen */}
        <BigScreenTags
          name={"trending"}
          type={time}
          tags={tags}
          setType={handleTrending}
        />
        {/* dropdwn for small screens */}
        <SmallScreenTags
          name={"trending"}
          type={time}
          tags={tags}
          handleType={handleTrending}
          dropdown={dropdown}
          setDropdown={setDropdow}
        />
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
