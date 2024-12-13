import React from "react";

import SearchSection from "../components/SearchSection";
import { useMovieContext } from "../contexts/MovieContext";
import Trailers from "../components/Trailers";
import Popular from "../components/Popular";
import Trending from "../components/Trending.";
const Home = () => {
  const { movies } = useMovieContext();

  return (
    <div className="">
      <SearchSection />
      <Trending />
      <Trailers />
      <Popular />
    </div>
  );
};

export default Home;
