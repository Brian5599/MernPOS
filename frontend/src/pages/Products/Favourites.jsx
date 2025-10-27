import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosRemoveCircle } from "react-icons/io";
import {
  selectFavouriteProduct,
  removeFavourites,
  setFavourites,
} from "../../redux/features/favourite/favouriteSlice";
import { Link } from "react-router";

const Favourites = () => {
  const favorite = useSelector(selectFavouriteProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedFavourites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    dispatch(setFavourites(storedFavourites));
  }, [dispatch]);
  return (
    <div>
      <h1 className="ml-[20rem]">Favourites</h1>
      <div className="flex flex-col md:flex-row">
        <table className="w-full md:w-4/5 mx-auto border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Image</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Price</th>
              <th className="text-left p-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {favorite?.map((product) => {
              const isFavorite = true;

              const toggleFavourite = () => {
                dispatch(removeFavourites({ _id: product._id }));
              };

              return (
                <tr key={product._id} className="border-b">
                  <td className="p-2">
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </Link>
                  </td>
                  <td className="text-left p-2">{product.name}</td>
                  <td className="text-left p-2">${product.price}</td>
                  <td className="text-left p-2">
                    <button
                      onClick={toggleFavourite}
                      className="cursor-pointer text-xl"
                    >
                      {isFavorite && (
                        <IoIosRemoveCircle className="text-red-500" />
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Favourites;
