import React, { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();
export const useMovieContext = () => {
  return useContext(MovieContext);
};
export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}` +
          "/movie/popular?api_key=" +
          `${import.meta.env.VITE_API_KEY}`
      );
      const data = await res.json();
      setMovies(data.results);
      // console.log(data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);
  const values = {
    movies,
  };
  return (
    <MovieContext.Provider value={values}>{children}</MovieContext.Provider>
  );
};
