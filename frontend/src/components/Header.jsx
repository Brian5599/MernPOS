import React from "react";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import ProductCarousel from "../pages/Products/ProductCarousel";
import SmallProduct from "../pages/Products/SmallProduct";

const Header = () => {
  const { data, isLoading, isError } = useGetTopProductsQuery();
  if (isLoading) return <Loader />;

  if (isError)
    return <div className="text-red-600">Error Have Nothing To Load</div>;
  return (
    <>
      <div className="flex justify-around">
        <div className=" w-[40rem] p-4">
          <div className="grid grid-cols-2 gap-4">
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
        <ProductCarousel />
      </div>
    </>
  );
};

export default Header;
