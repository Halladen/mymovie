import React, { useCallback, useEffect, useRef, useState } from "react";
import TrailerCard from "./TrailerCard";
import BigScreenTags from "./BigScreenTags";
import SmallScreenTags from "./SmallScreenTags";
import {
  getMovies,
  getMovieEndpoint,
  getTvEndpoint,
  getTrailer,
} from "../utils/helper";
import { _ } from "lodash";

const bgImageBaseUrl = import.meta.env.VITE_BG_IMAGE_BASE_URL;
const tags = [
  ["popular", "Popular"],
  ["streaming", "Streaming"],
  ["ontv", "On TV"],
  ["now_playing", "In Theater"],
];

const Trailers = () => {
  const [movies, setMovies] = useState([]);
  const [bgImage, setBgImage] = useState("");
  const [type, setType] = useState("popular");
  const [dropdown, setDropdown] = useState(false);
  const scrollRef = useRef(0);

  const fetchMovies = useCallback(async () => {
    try {
      const endpoints =
        type === "popular"
          ? [getMovieEndpoint("popular"), getTvEndpoint("popular")]
          : type === "streaming"
          ? [getMovieEndpoint("streaming"), getTvEndpoint("streaming")]
          : type === "ontv"
          ? [getTvEndpoint("onTheAir"), getTvEndpoint("onTheAir")]
          : [getMovieEndpoint("now_playing"), getMovieEndpoint("now_playing")];

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

      setBgImage(shuffleResult[0].backdrop_path);
      setMovies(addTrailers);
      // console.log(shuffleResult);
    } catch (error) {
      setMovies([]);
      console.error("Error fetching data: ", error);
    }
  }, [type]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleType = (type) => {
    setType(type);
    scrollRef.current.scrollLeft = 0;
  };

  return (
    <section
      className="min-h-[300px] text-white pt-6 px-2  md:px-10 xl:px-28 bg-cover bg-center "
      style={{
        backgroundImage: `
      linear-gradient(to right, rgba(3, 37, 65, 0.75), rgba(3, 37, 65, 0.75)),
      url(${bgImageBaseUrl}${bgImage})
    `,
      }}
    >
      <div className=" flex gap-5  items-center ">
        <h5 className="text-xl font-semibold ">Latest Trailers</h5>
        <BigScreenTags
          name={"trailers"}
          type={type}
          tags={tags}
          handleType={handleType}
        />

        <SmallScreenTags
          name={"trailers"}
          type={type}
          tags={tags}
          handleType={handleType}
          dropdown={dropdown}
          setDropdown={setDropdown}
        />
      </div>
      <div
        ref={scrollRef}
        className="flex flex-row gap-3 scrollbar-thin overflow-x-auto"
      >
        {movies.map(
          (movie, index) =>
            movie.backdrop_path &&
            movie.id &&
            movie.trailer && (
              <TrailerCard
                key={index}
                movieDetail={movie}
                setBackground={setBgImage}
              />
            )
        )}
      </div>
    </section>
  );
};

export default Trailers;
