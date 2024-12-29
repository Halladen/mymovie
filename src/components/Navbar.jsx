import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";

const movies = ["Popular", "Now Playing", "Upcoming", "Top Rated"];
const tvs = ["Popular", "On TV", "Top Rated"];
const Navbar = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [isMovies, setIsMovies] = useState(false);
  const [isMoviesOption, setIsMoviesOption] = useState(false);
  const [isTvOptions, setIsTvOptions] = useState(false);
  const [isTV, setIsTV] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  const handleToggle = () => {
    setIsToggle((prev) => (prev ? false : true));
    setIsMovies(false);
    setIsTV(false);
  };

  useEffect(() => {
    // handle clicks outside the sidebar and the toggle button
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        handleToggle();
      }
    };

    if (isToggle) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isToggle]);

  return (
    <div className="relative">
      <div className="text-white fixed w-full h-16 bg-slate-800 flex justify-between md:justify-center items-center  flex-row z-10 md:gap-10 px-10 md:px-5  py-5 ">
        {/* big screen */}
        <Link
          to={"/"}
          className="hidden md:block min-w-36 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300"
        >
          MyMovie
        </Link>

        {/* small screen */}
        <Link to={"/"} className="block md:hidden text-lg font-extrabold">
          <div className=" text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500">
            My
            <span className="h-3 w-7 ml-2 rounded-full inline-block bg-blue-400 "></span>
          </div>
          <div className="tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500">
            Movie
          </div>
        </Link>

        {/* toggle button small screen */}
        <button
          ref={buttonRef}
          onClick={handleToggle}
          className="block md:hidden cursor-pointer"
        >
          <TiThMenu size={30} />
        </button>

        {/* sidebar for small screens that open on toggle */}
        <div
          // onMouseLeave={handleToggle}
          className={` fixed h-full w-[80%] z-10 top-16 right-0 bg-slate-700  transition-transform  ease-in-out duration-300 ${
            isToggle ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div
            ref={sidebarRef}
            className="w-full py-5 flex flex-col items-end gap-3 font-semibold"
          >
            <div
              onClick={() => setIsMovies((prev) => (prev ? false : true))}
              className=" cursor-pointer px-5 pt text-right hover:text-slate-300 "
            >
              Movies
            </div>

            {/* when click on movies  */}
            {isMovies && (
              <div className="flex flex-col items-end px-5 py-2 bg-slate-600 w-full text-slate-300 gap-1 font-normal">
                {movies.map((movie, index) => (
                  <Link
                    onClick={handleToggle}
                    to={`/movies/${
                      movie == "Now Playing"
                        ? "now-playing"
                        : movie == "Top Rated"
                        ? "top-rated"
                        : movie.toLowerCase()
                    }`}
                    key={index}
                    className="hover:text-white"
                  >
                    {movie}
                  </Link>
                ))}
              </div>
            )}

            <div
              onClick={() => setIsTV((prev) => (prev ? false : true))}
              className="hover:text-slate-300 cursor-pointer px-5"
            >
              TV Shows
            </div>

            {/* when click on TV Shows  */}
            {isTV && (
              <div
                onClick={handleToggle}
                className="flex flex-col items-end px-5 py-2 bg-slate-600 w-full text-slate-300 gap-1 font-normal"
              >
                {tvs.map((tv, index) => (
                  <Link
                    to={`/tv-shows/${
                      tv == "Top Rated"
                        ? "top-rated"
                        : tv == "On TV"
                        ? "on-tv"
                        : tv.toLocaleLowerCase()
                    }`}
                    key={index}
                    className="hover:text-white"
                  >
                    {tv}
                  </Link>
                ))}
              </div>
            )}
            <Link
              onClick={handleToggle}
              to="/favorites"
              className="hover:text-slate-300 px-5"
            >
              Favorites
            </Link>
            <Link
              onClick={handleToggle}
              to="/watchlist"
              className="hover:text-slate-300 px-5"
            >
              Watchlist
            </Link>
          </div>
        </div>

        {/* links for big screen */}
        <div className="hidden md:flex  items-center justify-center gap-20  md:gap-44 lg:gap-72">
          <div className=" flex items-center">
            <div className="flex gap-10">
              <div className="relative py-4 cursor-pointer">
                <span
                  onClick={() =>
                    setIsMoviesOption((prev) => (prev ? false : true))
                  }
                  className="font-semibold hover:text-slate-300"
                >
                  Movies
                </span>
                {isMoviesOption && (
                  <div
                    onMouseLeave={() => setIsMoviesOption(false)}
                    className="absolute mt-1 py-2  border  bg-white text-black  w-32 rounded flex flex-col gap-1"
                  >
                    {movies.map((movie, index) => (
                      <Link
                        onClick={() => setIsMoviesOption(false)}
                        to={`/movies/${
                          movie == "Now Playing"
                            ? "now-playing"
                            : movie == "Top Rated"
                            ? "top-rated"
                            : movie.toLowerCase()
                        }`}
                        key={index}
                        className="hover:bg-slate-300 w-full  pl-3 hover:pl-3.5"
                      >
                        {movie}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative py-4  cursor-pointer">
                <span
                  onClick={() =>
                    setIsTvOptions((prev) => (prev ? false : true))
                  }
                  className="font-semibold hover:text-slate-300"
                >
                  TV Shows
                </span>

                {isTvOptions && (
                  <div
                    onMouseLeave={() => setIsTvOptions(false)}
                    className="absolute border mt-1 py-2 bg-white text-black   w-32 rounded flex flex-col gap-1"
                  >
                    {tvs.map((tv, index) => (
                      <Link
                        onClick={() => setIsTvOptions(false)}
                        to={`/tv-shows/${
                          tv == "Top Rated"
                            ? "top-rated"
                            : tv == "On TV"
                            ? "on-tv"
                            : tv.toLocaleLowerCase()
                        }`}
                        key={index}
                        className="hover:bg-slate-300 w-full block pl-3 hover:pl-3.5"
                      >
                        {tv}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* favorite and watchlist */}
          <div>
            <NavLink
              to={"/favorites"}
              className="font-semibold mx-7 hover:text-slate-300"
            >
              Favorites
            </NavLink>
            <NavLink
              to={"/watchlist"}
              className="font-semibold hover:text-slate-300"
            >
              Watchlist
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
