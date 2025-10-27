import React from "react";
import { useSelector } from "react-redux";

const FavouriteCount = () => {
  const favourites = useSelector((state) => state.favourites);
  const count = favourites.length;

  if (count === 0) return null;

  return (
    <span
      className="
        absolute -top-3 -right-2
        px-1.5 py-0
        text-xs font-semibold
        text-white bg-red-500
        rounded-full
        shadow-md
      "
    >
      {count}
    </span>
  );
};

export default FavouriteCount;
