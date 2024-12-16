const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// list of providers id like netflex,disney plus,amazon prime video and apple tv plus
const PROVIDERS_ID = {
  Netflex: 8,
  amazonPrime: 9,
};

export const getMovies = async (endpoint, page = 1) => {
  try {
    const res = await fetch(
      BASE_URL + endpoint + "page=" + page + "&api_key=" + API_KEY
    );
    const data = await res.json();
    console.log(data.results);
    return data;
  } catch (error) {
    console.error("Error accessing the endpoint: ", error);
  }
};

export const getEndpoint = (
  type,
  movieOrTv = "movie",
  movieId = null,
  providers = PROVIDERS_ID
) => {
  const providerList = Object.values(providers).join(",");
  if (type === "now_playing") {
    return `/${movieOrTv}/now_playing?language=en-US&with_watch_providers=${providerList}&`;
  } else if (type === "ontv") {
    return `/discover/${movieOrTv}?language=en-US&sort_by=popularity.desc&watch_region=US&with_watch_providers=${providerList}&`;
  } else if (type === "streaming") {
    return `/discover/${movieOrTv}?watch_region=US&with_watch_providers=${providerList}&sort_by=popularity.desc&`;
  } else if (type === "trailer" && movieId) {
    return `/${movieOrTv}/${movieId}/videos`;
  }
};
