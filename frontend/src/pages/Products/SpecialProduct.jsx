import React from "react";
import Heart from "./Heart";
import { Link } from "react-router-dom";

const SpecialProduct = ({ products }) => {
  return (
    <>
      <div className="flex justify-center flex-wrap mt-[2rem]">
        {products.map((product) => (
          <div key={product._id}>
            <div className="w-[30rem] ml-[2rem] p-3">
              <div className="relative">
                <Heart product={product} />

                <img
                  src={product.image}
                  alt=""
                  className="w-150 rounded h-60 object-cover "
                />
                <Link to={`/product/${product._id}`}>
                  <div className="flex">
                    <p className="mt-1">{product.name}</p>
                    <p className="ml-[23rem] rounded bg-red-600 text-white py-1 px-2 mt-1">
                      ${product.price}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SpecialProduct;
