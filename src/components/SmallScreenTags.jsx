import React, { useEffect, useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const SmallScreenTags = ({
  name,
  type,
  tags,
  handleType,
  dropdown,
  setDropdown,
}) => {
  const tagRef = useRef(null);

  useEffect(() => {
    // handle click outside the tags' div
    const handleClickOutside = (event) => {
      if (tagRef.current && !tagRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    if (dropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return (
    <div ref={tagRef} className="relative sm:hidden w-32 h-6">
      <div
        className={`absolute top-0 left-0 py-[1px] w-full border-2  font-semibold  bg-slate-800  rounded-2xl ${
          dropdown ? "z-10" : ""
        } ${name == "trailers" ? "" : "border-black"}`}
      >
        <button
          onClick={() => {
            setDropdown((prev) => (prev ? false : true));
            handleType(type);
          }}
          className={`w-full text-start pl-3  ${
            name == "trailers"
              ? "text-white"
              : "text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-400"
          }`}
        >
          {tags.find((tag) => tag[0] === type)?.[1] || ""}
          <span className="absolute right-1 top-0 my-0  ">
            <RiArrowDropDownLine color="white" size={30} />
          </span>
        </button>

        {/* dropdown options */}
        {dropdown && (
          <ul className="" role="menu">
            {tags.map(([value, label]) => {
              if (value !== type) {
                return (
                  <div key={value} className="hover:bg-slate-700 my-2">
                    <li
                      onClick={() => {
                        setDropdown(false);
                        handleType(value);
                      }}
                      className={`w-full text-start pl-3 cursor-pointer ${
                        name == "trailers"
                          ? "text-white"
                          : "text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-400"
                      }`}
                    >
                      {label}
                    </li>
                  </div>
                );
              }
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SmallScreenTags;
