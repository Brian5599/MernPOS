import React, { useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../Admin/Message";
import {
  useGetProductDetailQuery,
  useCreateReviewsMutation,
} from "../../redux/api/productApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoTimeSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { FaTag } from "react-icons/fa";
import { FaStore } from "react-icons/fa6";
import { VscPreview } from "react-icons/vsc";
import moment from "moment";
import Ratings from "./Rating";
import { toast } from "react-toastify";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetail = () => {
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailQuery(productId);
  const { userInfo } = useSelector((state) => state.auth);

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const [createReviews, { isLoading: loadingProductReview }] =
    useCreateReviewsMutation();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReviews({
        productId,
        rating,
        comment,
      }).unwrap();

      toast.success("Review submitted successfully");
      setRating(0);
      setComment("");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const cartHandler = () => {
    if (product.countInStock === 0) {
      toast.error("Out of Stock");
      return;
    } else if (qty > product.countInStock) {
      toast.error(`You have reached to maximum stock`);
    } else {
      toast.success(`Product Added to Cart`);
    }

    dispatch(addToCart({ ...product, qty }));
  };

  if (isLoading) return <Loader />;
  if (error) return <Message>{error.message}</Message>;
  return (
    <>
      <Link to="/" className="flex items-center ml-[10rem]">
        <MdArrowBackIosNew className="mr-2 mt-[1rem]" size={26} />
        <span className="  mt-[1em]">Go Back</span>
      </Link>
      <div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem]">
        <div>
          <img
            src={product?.image}
            alt=""
            className="w-[30rem] h-120 rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-between ml-5">
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] ">
            {product.description.substring(0, 1000)}
          </p>
          <p className="text-4xl my-2 font-extrabold">$ {product.price}</p>
          <div className="flex w-[40rem]">
            <div className="one ">
              <h1 className="flex items-center">
                <FaStore /> Brand : {product.brand?.name}
              </h1>

              <h1 className="flex items-center my-2">
                <IoTimeSharp /> Added : {moment(product.createdAt).fromNow()}
              </h1>

              <h1 className="flex items-center my-2 ">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </h1>
            </div>
            <div className="two">
              <div className="ml-[2rem]">
                <h1 className="flex items-center ">
                  <FaStar /> Rating : {product.rating}
                </h1>

                <h1 className="flex items-center my-2 ">
                  <VscPreview /> Reviews : {product.numReviews}
                </h1>

                <h1 className="flex items-center my-2">
                  <FaTag /> Stock : {product.countInStock}
                </h1>
              </div>
            </div>

            <div className="three">
              <div className="ml-[2rem]">
                <p>Enter Quantity</p>
                {product.countInStock > 0 ? (
                  <input
                    type="number"
                    min={1}
                    max={product.countInStock}
                    value={qty}
                    onChange={(e) => {
                      const enterQty = Number(e.target.value);

                      if (enterQty > product.countInStock) {
                        toast.error(
                          `Only ${product.countInStock} left in stock`
                        );
                        setQty(product.countInStock);
                      } else if (enterQty < 1) {
                        toast.error("Quantity should be at least 1");
                        setQty(1);
                      } else {
                        setQty(enterQty);
                      }
                    }}
                    className="border rounded-sm px-8 "
                  />
                ) : (
                  <div>Out of Stock</div>
                )}
              </div>

              <div className="ml-[2rem] mt-3">
                {product.countInStock > 0 ? (
                  <button
                    className="bg-white text-black  rounded-sm py-2 px-[2.5rem] cursor-pointer"
                    // disabled={product.countInStock === 0}
                    onClick={cartHandler}
                  >
                    ADD TO CART
                  </button>
                ) : (
                  <button
                    className="bg-red-600 text-white rounded-sm py-2 px-[2.5rem] cursor-not-allowed"
                    disabled
                  >
                    OUT OF STOCK
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[5rem]">
          <ProductTabs
            loadingProductReview={loadingProductReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            product={product}
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
