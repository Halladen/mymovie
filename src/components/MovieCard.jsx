import React, { useEffect, useState } from "react";
import "../styles/MovieCard.css";
import moviePoster from "../assets/moviePoster.png";
import { Link } from "react-router-dom";
import { MdFavorite, MdBookmarkAdded } from "react-icons/md";
import { handleBookmark, handleFavorite } from "../utils/helper";
const posterBaseUrl = import.meta.env.VITE_POSTER_BASE_URL;

const MovieCard = ({ movieDetail }) => {
  const [favorite, setFavorite] = useState(false);
  const [bookmark, setBookmark] = useState(false);

  useEffect(() => {
    // check if the current movie in the favorites
    // some method return true or false
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFavorite = favorites.some((item) => item.id === movieDetail.id);
    setFavorite(isFavorite);

    // check if the current movie in the favorites
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const isBookmark = bookmarks.some((item) => item.id === movieDetail.id);

    setBookmark(isBookmark);
  }, [movieDetail.id]);

  return (
    <div className="hover:scale-105 ease-in-out duration-150 h-fit">
      <div className="relative ">
        <Link
          to={`${movieDetail.title ? "movie" : "tv"}/${movieDetail.id}-${
            movieDetail.title
              ? movieDetail.title.split(" ").join("-")
              : movieDetail.name.split(" ").join("-")
          }`}
          className="text-base font-bold "
        >
          <img
            className="h-60 min-w-40 rounded-lg "
            src={
              movieDetail.poster_path
                ? posterBaseUrl + movieDetail.poster_path
                : moviePoster
            }
            alt={movieDetail.title}
          />
        </Link>
        <div className="progress-bar">
          <div
            className="progress"
            style={{
              background: `conic-gradient(yellow ${
                movieDetail.vote_average * 10
              }%,white 0)`,
            }}
          >
            <div className="progress-percentage">
              {Math.floor(movieDetail.vote_average * 10) || "00"}
            </div>
          </div>
        </div>

        {/* favorite and add to list icon */}
        <div className="absolute top-1 right-1 p-1 flex gap-2   rounded-lg">
          <button
            onClick={() => handleFavorite(movieDetail, favorite, setFavorite)}
            className="bg-slate-700 rounded-full p-1"
          >
            <MdFavorite color={`${favorite ? "red" : "white"}`} />
          </button>

          <button
            onClick={() => handleBookmark(movieDetail, bookmark, setBookmark)}
            className="bg-slate-700 rounded-full p-1"
          >
            <MdBookmarkAdded color={`${bookmark ? "red" : "white"}`} />
          </button>
        </div>
      </div>

      <div className="pb-6 pt-7 ">
        <Link
          to={`${movieDetail.title ? "movie" : "tv"}/${movieDetail.id}-${
            movieDetail.title
              ? movieDetail.title.split(" ").join("-")
              : movieDetail.name.split(" ").join("-")
          }`}
          className="text-base font-bold"
        >
          {movieDetail.original_title || movieDetail.original_name}
        </Link>

        <p className="mt-1">
          {movieDetail.release_date || movieDetail.first_air_date}
          {/* {movieDetail.first_air_date} */}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
