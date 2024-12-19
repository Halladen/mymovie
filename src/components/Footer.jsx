import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="bg-slate-800  text-white pb-16 pt-10 w-full  flex flex-col md:flex-row flex-wrap  p-5 justify-center  gap-10">
      <div className=" flex flex-col">
        <div className="tracking-widest self-center md:self-end">
          <Link to={"/"}>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500">
              My
              <span className="h-5 w-14 ml-2 rounded-full inline-block bg-blue-400 "></span>
            </h1>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500">
              Movie
              <div className="h-5 w-26 mt-2  rounded-full block bg-blue-400 "></div>
            </h1>
          </Link>
        </div>

        <button className="mt-10 w-1/2 md:w-full self-center md:self-start bg-white font-bold text-blue-700 p-2 rounded-sm">
          JOIN THE COMMUNITY
        </button>
      </div>
      <div className="font-semibold pt-10 ">
        <h1 className="font-bold text-lg">THE BASICS</h1>
        <button className="block">About MyMovie</button>
        <button className="block">Contact Us</button>
        <button className="block">Support Forums</button>
        <button className="block">System Status</button>
      </div>
      <div className="font-semibold pt-10">
        <h1 className="font-bold text-lg">GET INVOLVED</h1>
        <button className="block">Add New Movie</button>
        <button className="block">Add New TV Shows</button>
      </div>
      <div className="font-semibold pt-10">
        <h1 className="font-bold text-lg">COMMUNITY</h1>
        <button className="block">Guidelines</button>
        <button className="block">Discussions</button>
        <button className="block">Leaderboard</button>
      </div>
      <div className="font-semibold pt-10">
        <h1 className="font-bold text-lg">LEGAL</h1>
        <button className="block">Terms of Use</button>
        <button className="block">Privacy Policy</button>
      </div>
    </section>
  );
};

export default Footer;
