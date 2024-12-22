import React from "react";

const BigScreenTags = ({ name, type, tags, handleType }) => {
  if (name === "trailers") {
    return (
      <div className="relative hidden sm:flex flex-row  font-semibold border-solid  border-2 border-white rounded-full">
        {tags &&
          tags.map((tag, index) => (
            <button
              key={index}
              onClick={() => handleType(tag[0])}
              className={`${
                type === tag[0]
                  ? "bg-slate-800 text-black bg-gradient-to-r from-slate-100 to-slate-500 "
                  : "text-white"
              } px-5 rounded-full`}
            >
              {tag[1]}
            </button>
          ))}
      </div>
    );
  }

  if (name === "popular" || name === "trending") {
    return (
      <div className="hidden sm:flex flex-row  font-semibold border-solid  border-2 border-black rounded-full ">
        {tags &&
          tags.map((tag, index) => (
            <div
              key={index}
              className={`${
                type === tag[0] ? "bg-slate-800" : "bg-white"
              } px-5 rounded-full`}
            >
              <button
                onClick={() => handleType(tag[0])}
                className={`${
                  type === tag[0]
                    ? "bg-slate-800 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300"
                    : "text-black"
                } `}
              >
                {tag[1]}
              </button>
            </div>
          ))}
      </div>
    );
  }

  return null;
};

export default BigScreenTags;
