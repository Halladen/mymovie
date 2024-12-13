import React, { useEffect, useState } from "react";
// import posterImg from "/poster2.jpg";

const IMAGE_BASE_URL = import.meta.env.VITE_BG_IMAGE_BASE_URL;
const MOVIE_BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const SearchSection = () => {
  const [posterUrl, setPosterUrl] = useState("");

  const getPoster = async () => {
    try {
      const res = await fetch(
        MOVIE_BASE_URL + "/movie/now_playing?language=en-US&api_key=" + API_KEY
      );
      const data = await res.json();
      const movie =
        data.results[Math.floor(Math.random() * data.results.length)];

      setPosterUrl(movie.poster_path);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPoster();
  }, []);

  return (
    <section
      className="relative text-white bg-cover h-96 w-full"
      style={{
        backgroundImage: `
      linear-gradient(to right, rgba(3, 37, 65, 0.75), rgba(3, 37, 65, 0.75)),
      url(${IMAGE_BASE_URL}${posterUrl})
    `,
      }}
    >
      {/* <img
        className=" h-96 w-full"
        src={IMAGE_BASE_URL + posterUrl}
        alt="poster"
      /> */}
      {/* <div className=" overlay absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-50"></div> */}
      <div className="absolute   top-1/2 left-0 right-0 px-16 md:px-24">
        <h1 className="text-2xl md:text-3xl font-bold md:font-extrabold">
          Welcome.
        </h1>
        <h2 className="text-lg md:text-xl font-bold md:font-extrabold">
          Millions of movies and TV shows to discover. Explore now.
        </h2>

        <form action="" className="relative mt-10">
          <input
            className="rounded-full w-full py-3 px-4 outline-none text-black"
            type="text"
            placeholder="Search for a movie, tv shows...."
          />

          <button className="absolute right-0 top-0 h-full px-5 rounded-full bg-gradient-to-r from-slate-300 to-blue-300 hover:text-black">
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchSection;
