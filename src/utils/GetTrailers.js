const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

// `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`

// export const getTrailers = async () => {
//   try {
//     // Fetch popular movies and TV shows
//     const popularMovies = await fetch(
//       `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`
//     );

//     const results = await popularMovies.json();
//     const movieList = [];
//     results.results.map(async (movie) => {
//       const res = await fetch(
//         BASE_URL + `/movie/${movie.id}/videos?api_key=` + API_KEY
//       );
//       const data = await res.json();
//       // console.log(movie);
//       // console.log("--------------------------------------");
//       data.results.map((trailer) => {
//         // console.log("trailer: ", trailer.key);
//         // console.log("-----------------------------------------");
//         if (trailer.name == "Official Trailer") {
//           movie.trailer = trailer;
//           movieList.push(movie);
//           // console.log(movie);
//           // console.log("trailer: ", trailer);
//           // console.log("-----------------------------------------");

//           return movie;
//         }
//       });
//     });
//     // console.log(results.results);
//     console.log(movieList);
//     return results;
//   } catch (error) {
//     console.error("Error fetching trailers: ", error);
//   }
// };

export const getTrailers = async () => {
  try {
    // Fetch popular movies
    const popularMoviesResponse = await fetch(
      `${BASE_URL}/movie/now_playing?page=1&api_key=${API_KEY}`
    );
    const popularMoviesData = await popularMoviesResponse.json();

    const movieList = await Promise.all(
      popularMoviesData.results.map(async (movie) => {
        try {
          const trailerResponse = await fetch(
            `${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}`
          );
          const trailerData = await trailerResponse.json();

          // Find the "Official Trailer"
          const officialTrailer = trailerData.results.find((trailer) =>
            trailer.name
              .toLowerCase()
              .includes("official trailer" || "official")
          );

          // Attach the trailer to the movie if found
          if (officialTrailer) {
            return {
              ...movie,
              trailer: officialTrailer,
            };
          }
          return null; // Return null if no trailer found
        } catch (error) {
          console.error(
            `Error fetching trailer for movie ${movie.id}: `,
            error
          );
          return null;
        }
      })
    );
    // console.log(movieList);
    // Filter out null values (movies without trailers)
    const filteredMovieList = movieList.filter((movie) => movie !== null);

    // console.log(filteredMovieList); // Log the enriched movie list
    return filteredMovieList;
  } catch (error) {
    console.error("Error fetching trailers: ", error);
  }
};
