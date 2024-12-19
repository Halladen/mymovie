import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMovieEndpoint,
  getTvEndpoint,
  getMovieDetail,
} from "../utils/helper";
import { MdFavorite, MdBookmarkAdd } from "react-icons/md";
import { IoMdPlay } from "react-icons/io";
import TrailerModal from "../components/TrailerModal";

const bgImageBaseUrl = import.meta.env.VITE_BG_IMAGE_BASE_URL;

const ViewDetail = () => {
  const { type, detail } = useParams();
  const [movie, setMovie] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const id = detail.split("-")[0] || "";
        console.log("type: ", type, "id: ", id);

        const endpoint =
          type === "movie"
            ? getMovieEndpoint(type, id)
            : getTvEndpoint(type, id);

        await getMovieDetail(endpoint).then((data) => {
          data.trailer =
            data.videos.results.find(
              (trailer) => trailer.name.toLowerCase() === "official trailer"
            ) ||
            data.videos.results[0] ||
            [];
          setMovie(data);
        });
      } catch (error) {
        console.error("Error accessing api data: ", error);
      }
    };

    getMovie();
  }, [type, detail]);

  const formatRuntime = (runtime) => {
    const hour = Math.floor(runtime / 60);
    const mins = runtime % 60;
    return `${hour}h${mins}m`;
  };
  return (
    <section className="relative">
      <div
        className=" min-h-[500px] bg-cover bg-no-repeat bg-center flex flex-wrap md:flex-nowrap gap-10 p-10"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(157.5, 199.5, 220.5, 1) calc((50vw - 170px) - 340px), rgba(157.5, 199.5, 220.5, 0.84) 50%, rgba(157.5, 199.5, 220.5, 0.84) 100%),url(${bgImageBaseUrl}${movie?.backdrop_path})`,
        }}
      >
        {/* movie image */}
        <div className="">
          <img
            className="h-[450px] min-w-[300px] rounded-lg"
            src={bgImageBaseUrl + movie?.poster_path}
            alt={movie?.original_title || movie?.original_name}
          />
          {/* <div className="h-[60px] w-[300px] bg-slate-600 rounded-b-lg flex justify-center items-center"></div> */}
        </div>

        {/* movie details */}
        <div className="my-7">
          <div className=" my-1 font-semibold  text-2xl md:text-4xl ">
            {movie?.original_title || movie?.original_name || "unknown"}
            {movie?.release_date || movie?.first_air_date ? (
              <span className="font-normal">
                {" "}
                (
                {(movie?.release_date || movie?.first_air_date)?.split(
                  "-"
                )[0] || ""}
                )
              </span>
            ) : null}
          </div>

          {/* movie release dat, genre and runtime */}
          <div>
            {movie?.release_date || movie?.first_air_date ? (
              <span className="">
                {(movie?.release_date || movie?.first_air_date)
                  ?.split("-")
                  .reverse()
                  .join("/")}{" "}
                ({movie?.origin_country[0] || ""})
              </span>
            ) : null}
            <ul className="list-disc inline-block ml-6">
              {movie?.genres && (
                <li>{movie.genres.map((genre) => genre.name).join(", ")}</li>
              )}
            </ul>
            {movie?.runtime ? (
              <ul className="list-disc inline-block ml-6">
                <li>{formatRuntime(movie.runtime)}</li>
              </ul>
            ) : (
              ""
            )}
          </div>

          {/* User score */}
          <div className=" flex justify-start items-center gap-3">
            <div className="text-white flex justify-center items-center bg-black h-[60px] w-[60px] rounded-full my-3 p-[3px]">
              <div
                className="h-full w-full rounded-full p-[3px] flex justify-center items-center"
                style={{
                  background: `conic-gradient(yellow ${
                    movie?.vote_average * 10 || 0
                  }%,grey 0)`,
                }}
              >
                <div className="bg-black h-full w-full relative rounded-full flex justify-center items-center font-bold">
                  {Math.floor(movie?.vote_average * 10) || "NR"}
                  {movie?.vote_average > 0 ? (
                    <span className="absolute text-[9px] left-[33px] top-4">
                      %
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div className="font-bold">
              <p>User</p>
              <p>Score</p>
            </div>
          </div>

          {/* favorite, add to list and plya trailer */}
          <div className="flex justify-start items-center gap-3">
            <button className="bg-slate-700 rounded-full h-10 w-10 flex justify-center items-center">
              <MdFavorite color="white" />
            </button>
            <button className="bg-slate-700 rounded-full h-10 w-10 flex justify-center items-center">
              <MdBookmarkAdd color="white" />
            </button>
            <button
              onClick={() => setIsVisible(true)}
              className="font-bold hover:text-white flex justify-center items-center gap-2"
            >
              <IoMdPlay /> <span>Play Trailer</span>
            </button>
          </div>

          {/* movie overview */}
          <div className="my-5">
            {movie?.tagline ? <p className="">{movie.tagline}</p> : ""}
            <h4 className="font-bold mt-1 text-lg">Overview</h4>
            <p>{movie?.overview}</p>
          </div>
        </div>
      </div>

      {/* trailer modal */}
      {isVisible && (
        <TrailerModal movieDetail={movie} setVisible={setIsVisible} />
      )}
    </section>
  );
};

export default ViewDetail;
