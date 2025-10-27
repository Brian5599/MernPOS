import React from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import {
  addtoFavourites,
  removeFavourites,
  setFavourites,
} from "../../redux/features/favourite/favouriteSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Heart = ({ product }) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites) || [];
  const isFavorite = favourites.some((p) => p._id === product._id);

  useEffect(() => {
    const storedFavourites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    dispatch(setFavourites(storedFavourites));
  }, [dispatch]);

  const toggleFavourite = () => {
    if (isFavorite) {
      dispatch(removeFavourites({ _id: product._id }));
    } else {
      dispatch(addtoFavourites(product));
    }
  };

  return (
    <div
      onClick={toggleFavourite}
      className="absolute top-2 right-6 cursor-pointer text-xl"
    >
      {isFavorite ? (
        <FaHeart className="text-red-500" />
      ) : (
        <FaRegHeart className="text-black" />
      )}
    </div>
  );
};

export default Heart;
