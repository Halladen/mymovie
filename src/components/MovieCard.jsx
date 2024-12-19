import React from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import "../styles/MovieCard.css";
import moviePoster from "../assets/moviePoster.png";
import { Link } from "react-router-dom";
import {
  MdFavorite,
  MdBookmarkAdd,
  MdOutlineBookmarkAdd,
} from "react-icons/md";
import { IoMdPlay } from "react-icons/io";

const posterBaseUrl = import.meta.env.VITE_POSTER_BASE_URL;

const MovieCard = ({ movieDetail }) => {
  const onFavourite = () => {};
  // console.log(POSTER_BASE_URL + movieDetail.poster_path);
  // console.log("movieDetail: ", movieDetail);
  return (
    <div className="">
      <div className="relative ">
        <Link
          to={`${movieDetail.title ? "movie" : "tv"}/${movieDetail.id}-${
            movieDetail.title
              ? movieDetail.title.split(" ").join("-")
              : movieDetail.name.split(" ").join("-")
          }`}
          className="text-base font-bold"
        >
          <img
            className="h-60 min-w-40 rounded-lg"
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
        <div className="absolute top-1 right-1 p-1 flex gap-2 bg-slate-300 rounded-lg">
          <button>
            <MdFavorite color="black" />
          </button>
          <button>
            <MdOutlineBookmarkAdd color="black" />
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
