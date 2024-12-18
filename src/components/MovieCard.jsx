import React from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import "../styles/MovieCard.css";
import moviePoster from "../assets/moviePoster.png";
const posterBaseUrl = import.meta.env.VITE_POSTER_BASE_URL;

const MovieCard = ({ movieDetail }) => {
  const onFavourite = () => {};
  // console.log(POSTER_BASE_URL + movieDetail.poster_path);
  // console.log("movieDetail: ", movieDetail);
  return (
    <div className="">
      <div className="relative ">
        <img
          className="h-60 min-w-40 rounded-lg"
          src={
            movieDetail.poster_path
              ? posterBaseUrl + movieDetail.poster_path
              : moviePoster
          }
          alt={movieDetail.title}
        />
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
      </div>

      <div className="pb-6 pt-7 ">
        <a href="" className="font-bold" onClick={onFavourite}>
          {movieDetail.title || movieDetail.name || "unknown"}
          {/* {movieDetail.name} */}
        </a>
        <p className="mt-1">
          {movieDetail.release_date || movieDetail.first_air_date}
          {/* {movieDetail.first_air_date} */}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
