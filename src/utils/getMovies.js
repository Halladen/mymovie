const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const getMovies = async (endpoint, page = 1) => {
  try {
    const res = await fetch(
      BASE_URL + endpoint + "page=" + page + "&api_key=" + API_KEY
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error accessing the endpoint: ", error);
  }
};
