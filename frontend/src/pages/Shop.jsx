import { useEffect, useState } from "react";
import {
  setCategories,
  setProducts,
  setBrand,
  setCheck,
} from "../redux/features/shop/shopSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFetchCategoryQuery } from "../redux/api/categoryApiSlice";
import {
  useGetFilteredProductsMutation,
  useGetShopProductsQuery,
} from "../redux/api/productApiSlice";
import { useFetchBrandQuery } from "../redux/api/brandApiSlice";
import { Link } from "react-router";
import { addToCart } from "../redux/features/cart/cartSlice";
import { toast } from "react-toastify";

const Shop = () => {
  const { categories, brands, checked, radio, products } = useSelector(
    (state) => state.shop
  );

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 9;
  const allProductsQuery = useGetShopProductsQuery({ page, limit });

  const categoryQuery = useFetchCategoryQuery();
  const brandQuery = useFetchBrandQuery();
  const [getFilteredProducts, { data: filteredProducts, isLoading }] =
    useGetFilteredProductsMutation();

  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    if (checked.length || radio.length) {
      getFilteredProducts({ checked, radio });
    }
  }, [checked, radio, getFilteredProducts]);

  useEffect(() => {
    if (!categoryQuery.isLoading) {
      dispatch(setCategories(categoryQuery.data));
    }
  }, [categoryQuery.data, dispatch]);

  useEffect(() => {
    if (!brandQuery.isLoading) {
      dispatch(setBrand(brandQuery.data));
    }
  }, [brandQuery.data, dispatch]);

  useEffect(() => {
    if (!allProductsQuery.isLoading && allProductsQuery.data) {
      dispatch(setProducts(allProductsQuery.data.products));
    }
  }, [allProductsQuery.data, dispatch]);

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setCheck(updatedChecked));
  };

  const availableBrands =
    checked.length > 0
      ? brands.filter((brand) =>
          filteredProducts?.some((product) => product.brand === brand._id)
        )
      : brands;

  const handleBrandClick = (brand) => {
    if (filteredProducts) {
      const productsByBrand = filteredProducts.filter(
        (product) => product.brand === brand._id
      );
      dispatch(setProducts(productsByBrand));
    }
  };
  const handleCart = (product, qty = 1) => {
    if (product.countInStock === 0) {
      toast.error("Out of Stock");
      return;
    } else if (qty > product.countInStock) {
      toast.error(`You have reached to maximum stock`);
    } else {
      dispatch(addToCart({ ...product, qty }));
      toast.success("Added item successfully", {
        autoClose: 2000,
      });
    }
  };

  const handlePrice = (e) => {
    const value = e.target.value;
    setPriceFilter(value);

    if (!value) {
      dispatch(setProducts(filteredProducts ?? allProductsQuery.data ?? []));
      return;
    }

    const filtered = (filteredProducts ?? allProductsQuery.data ?? []).filter(
      (product) => product.price <= parseInt(value, 10)
    );

    dispatch(setProducts(filtered));
  };

  return (
    <div className="container ml-[5rem]">
      <div className="flex md:flex-row">
        <div className="bg-[#151515] p-3  mb-2">
          <h2 className="text-center py-2 bg-black rounded-full mb-2 text-white">
            Categories
          </h2>

          <div className="p-5 w-[15rem]">
            {categories?.map((category) => (
              <div className="mb-2" key={category._id}>
                <div className="flex items-center mr-4">
                  <input
                    type="checkbox"
                    id={`cat-${category._id}`}
                    checked={checked.includes(category._id)}
                    onChange={(e) =>
                      handleCheck(e.target.checked, category._id)
                    }
                    className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <label
                    htmlFor={`cat-${category._id}`}
                    className="ml-2 text-sm font-medium text-white"
                  >
                    {category.name}
                  </label>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-center py-2 bg-black rounded-full mb-2 text-white">
            Brand
          </h2>

          <div className="p-5 w-[15rem]">
            {availableBrands?.map((brand) => (
              <div className="mb-2" key={brand._id}>
                <div className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="brand"
                    id={`brand-${brand._id}`}
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <label
                    htmlFor={`brand-${brand._id}`}
                    className="ml-2 text-sm font-medium text-white"
                  >
                    {brand.name}
                  </label>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-center py-2 bg-black rounded-full mb-2 text-white">
            Price
          </h2>
          <div className="p-5 w-[15rem]">
            <div className="mb-2">
              <div className="flex items-center mr-4">
                <input
                  type="number"
                  value={priceFilter}
                  className="border-red-600 text-black bg-white rounded-md text-center px-3 py-2"
                  onChange={handlePrice}
                  placeholder="Enter Price"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button
              className="bg-red-500 py-1 px-24  rounded-full"
              onClick={() => window.location.reload()}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="p-3 ml-2">
          <h3 className="h4 text-center mb-2 ">Products</h3>
          <div className="flex flex-wrap">
            {products.map((product) => (
              <div
                className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mt-3 ml-2"
                key={product._id}
              >
                <Link to={`/product/${product._id}`}>
                  <div className="relative mx-4 mt-4 h-40 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                    <img
                      src={product.image}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                        {product.name}
                      </p>
                      <p className="block font-sans text-base font-medium leading-relaxed text-white antialiased bg-black rounded ">
                        ${product.price}
                      </p>
                    </div>
                    <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                      {product.description.substring(0, 60)}
                    </p>
                  </div>
                </Link>
                {product.quantity && product.countInStock === 0 ? (
                  <div className="p-4 pt-0 flex">
                    <button
                      className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6  font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-black text-white"
                      type="button"
                      disabled
                    >
                      Notify Me
                    </button>
                  </div>
                ) : (
                  <div className="p-4 pt-0 flex">
                    <button
                      className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6  font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-black text-white"
                      type="button"
                      onClick={() => handleCart(product, 1)}
                    >
                      Add to Cart
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-500 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(allProductsQuery.data?.pages).keys()].map((x) => (
          <button
            key={x + 1}
            onClick={() => setPage(x + 1)}
            className={`px-4 py-2 rounded ${
              page === x + 1 ? "bg-black text-white" : "bg-gray-500"
            }`}
          >
            {x + 1}
          </button>
        ))}

        <button
          disabled={page === allProductsQuery.data?.pages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-500 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Shop;
