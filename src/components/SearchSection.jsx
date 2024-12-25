import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import posterImg from "/poster2.jpg";2222

const IMAGE_BASE_URL = import.meta.env.VITE_BG_IMAGE_BASE_URL;
const MOVIE_BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const SearchSection = () => {
  const [posterUrl, setPosterUrl] = useState("");
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const getPoster = async () => {
    try {
      const res = await fetch(
        MOVIE_BASE_URL + "/movie/now_playing?language=en-US&api_key=" + API_KEY
      );
      const data = await res.json();
      const movie =
        data.results[Math.floor(Math.random() * data.results.length)];

      setPosterUrl(movie.backdrop_path);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPoster();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      navigate(`/search?query=${value}`);
    }
  };

  return (
    <section
      className="relative  text-white bg-cover bg-center h-96 w-full "
      style={{
        backgroundImage: `
      linear-gradient(to right, rgba(3, 37, 65, 0.75), rgba(3, 37, 65, 0.75)),
      url(${IMAGE_BASE_URL}${posterUrl})
    `,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full px-10 md:px-20 flex justify-center items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold md:font-extrabold">
            Welcome.
          </h1>
          <h2 className="text-lg md:text-lg font-semibold md:font-bold">
            Millions of movies and TV shows to discover. Explore now.
          </h2>

          <form
            onSubmit={(e) => handleSubmit(e)}
            action=""
            className="relative mt-10"
          >
            <input
              className="rounded-full w-full py-3 px-4 outline-none text-black"
              type="text"
              placeholder="Search for a movie, tv shows...."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <button className="absolute right-0 top-0 h-full px-5 rounded-full bg-gradient-to-r from-slate-300 to-blue-300 hover:text-black">
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
