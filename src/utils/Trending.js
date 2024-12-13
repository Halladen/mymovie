export const getTrending = async (time, setTrending) => {
  try {
    const endpoint = `/trending/all/${time}?api_key=`;
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}` +
        endpoint +
        `${import.meta.env.VITE_API_KEY}`
    );
    const data = await res.json();
    setTrending(data.results);
    return;
  } catch (error) {
    console.log(error);
    return null;
  }
};
