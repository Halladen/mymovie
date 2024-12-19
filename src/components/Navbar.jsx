import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="text-white relative w-full h-16 bg-slate-800 flex justify-start items-center gap-7 flex-row z-10 p-5 sm:pl-32 md:pl-64">
      <NavLink
        to={"/"}
        className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300"
      >
        MyMovie
      </NavLink>

      <div className="flex justify-between items-center gap-5 md:gap-10">
        {/* <NavLink className="hover:text-slate-400">Movies</NavLink>
        <NavLink className="hover:text-slate-400">TV Shows</NavLink>
        <NavLink className="hover:text-slate-400">Favorites</NavLink> */}

        <div className="relative group  py-4 cursor-pointer">
          <span className="font-semibold">Movies</span>
          <div className="absolute mt-1 hidden border  bg-white text-black   group-hover:block w-32 rounded hover:flex flex-col gap-4">
            <NavLink
              to={"/movies/popular"}
              className="hover:bg-slate-300 w-full block mt-3 pl-3 hover:pl-3.5"
            >
              Popular
            </NavLink>

            <NavLink
              to={"/movies/now-playing"}
              className="hover:bg-slate-300 w-full block my-1 pl-3 hover:pl-3.5"
            >
              Now Playing
            </NavLink>

            <NavLink
              to={"/movies/upcomming"}
              className="hover:bg-slate-300 w-full block my-1 pl-3 hover:pl-3.5"
            >
              Upcoming
            </NavLink>

            <NavLink
              to={"/movies/top-rated"}
              className="hover:bg-slate-300 w-full block mt-1 mb-3 pl-3 hover:pl-3.5"
            >
              Top Rated
            </NavLink>
          </div>
        </div>
        <div className="relative group py-4  cursor-pointer">
          <span className="font-semibold">TV Shows</span>

          <div className="absolute border mt-1 bg-white text-black hidden  group-hover:block w-32 rounded hover:flex flex-col gap-4">
            <NavLink
              to={"/tv-shows/popular"}
              className="hover:bg-slate-300 w-full block mt-3 pl-3 hover:pl-3.5"
            >
              Popular
            </NavLink>

            <NavLink
              to={"/tv-shows/on-tv"}
              className="hover:bg-slate-300 w-full block my-1 pl-3 hover:pl-3.5"
            >
              On TV
            </NavLink>

            <NavLink
              to={"/tv-shows/top-rated"}
              className="hover:bg-slate-300 w-full block mt-1 mb-3 pl-3 hover:pl-3.5"
            >
              Top Rated
            </NavLink>
          </div>
        </div>
        <div>
          <NavLink
            to={"/favorites"}
            className="font-semibold hover:text-slate-300"
          >
            Favorites
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
