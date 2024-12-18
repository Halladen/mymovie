const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const SUFFIX = "?language=en-US&watch_region=US&with_watch_providers=8,9&";
export const getMovies = async (endpoint, page = 1) => {
  try {
    const res = await fetch(
      BASE_URL + endpoint + "page=" + page + "&api_key=" + API_KEY
    );
    const data = await res.json();
    // console.log(data.results);
    return data;
  } catch (error) {
    console.error("Error accessing the endpoint: ", error);
  }
};

export const getTrailer = async (endpoint) => {
  try {
    // Make the API request
    const res = await fetch(`${BASE_URL}${endpoint}&api_key=${API_KEY}`);
    const data = await res.json();

    // Handle trailer filtering for movies and TV
    if (data?.results?.length > 0) {
      const trailer = data.results.find((item) =>
        item.name.toLowerCase().includes("official trailer")
      );

      // Return the first "official trailer" or any available trailer
      return trailer || data.results[0];
    }
    return null;
  } catch (error) {
    console.error("Error accessing the endpoint: ", error);
    return null;
  }
};

export const getMovieEndpoint = (type, movieId = null) => {
  if (type === "now_playing") {
    return `/movie/now_playing${SUFFIX}`;
  } else if (type === "trailer" && movieId) {
    return `/movie/${movieId}/videos${SUFFIX}`;
  } else if (type === "upcoming") {
    return `/movie/upcoming${SUFFIX}`;
  } else if (type === "popular") {
    return `/movie/popular${SUFFIX}`;
  } else if (type === "top_rated") {
    return `/movie/top_rated${SUFFIX}`;
  } else if (type === "streaming") {
    return `/discover/movie${SUFFIX}`;
  }
};

export const getTvEndpoint = (type, tvId = null) => {
  if (type === "airingToday") {
    return `/tv/airing_today${SUFFIX}`;
  } else if (type === "trailer" && tvId) {
    return `/tv/${tvId}/videos${SUFFIX}`;
  } else if (type === "onTheAir") {
    // return a list of tv shows that air in the next 7 days
    return `/tv/on_the_air${SUFFIX}`;
  } else if (type === "popular") {
    return `/tv/popular${SUFFIX}`;
  } else if (type === "top_rated") {
    return `/tv/top_rated${SUFFIX}`;
  } else if (type === "streaming") {
    return `/discover/tv${SUFFIX}`;
  }
};

export const getTrendingEndpoint = (time) => {
  if (time === "day") {
    return `/trending/all/day${SUFFIX}`;
  } else if (time === "week") {
    return `/trending/all/week${SUFFIX}`;
  } else {
    return "";
  }
};
