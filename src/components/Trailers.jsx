import React, { useEffect, useState } from "react";
import TrailerCard from "./TrailerCard";
import { getTrailers } from "../utils/GetTrailers";

const bgImageBaseUrl = import.meta.env.VITE_BG_IMAGE_BASE_URL;
const Trailers = () => {
  const [movies, setMovies] = useState([]);
  const [bgImage, setBgImage] = useState("");
  useEffect(() => {
    getTrailers()
      .then((movies) => {
        setMovies(movies);
        setBgImage(movies[1].backdrop_path);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <section
      className="min-h-[300px] text-white pt-6 pl-10 xl:px-28  bg-cover "
      style={{
        backgroundImage: `
      linear-gradient(to right, rgba(3, 37, 65, 0.75), rgba(3, 37, 65, 0.75)),
      url(${bgImageBaseUrl}${bgImage})
    `,
      }}
    >
      <div className=" flex gap-5 items-center">
        <h5 className="text-xl font-semibold pl-2 md:pl-0">Latest Trailers</h5>
        {/* <div className="relative gap-5 px-5 font-semibold border-solid  border-2 border-black rounded-full flex flex-row">
          <button>Popular</button>
          <button>Streaming</button>
          <button>On TV</button>
          <button>In Theater</button>
        </div> */}
      </div>
      <div className="flex flex-row gap-3 scrollbar-thin overflow-x-auto mt-5 pb-10">
        {movies.map(
          (movie, index) =>
            movie.backdrop_path && (
              <TrailerCard
                key={movie.id}
                detail={movie}
                setBackground={setBgImage}
              />
            )
        )}
      </div>
    </section>
  );
};

export default Trailers;
