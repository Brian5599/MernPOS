import React from "react";
import Heart from "./Heart";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setFavourites,
  addtoFavourites,
  removeFavourites,
} from "../../redux/features/favourite/favouriteSlice";

const SmallProduct = ({ product }) => {
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
    <>
      <div
        key={product._id}
        className="relative rounded-lg shadow-md p-3 flex flex-col items-center bg-white text-black"
      >
        {/* Heart in top-right */}
        <div
          onClick={toggleFavourite}
          className="absolute top-2 right-2 cursor-pointer text-xl"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-black" />
          )}
        </div>

        {/* Product image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-40 h-40 object-cover rounded-md"
        />

        {/* Product name */}
        <h3 className="mt-2 text-center font-semibold text-sm">
          {product.name}
        </h3>
      </div>
    </>
  );
};

export default SmallProduct;
