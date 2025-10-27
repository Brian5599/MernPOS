import React, { act, useState } from "react";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import { Link } from "react-router";
import Ratings from "./Rating";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [active, setActive] = useState("allReviews");

  const dispatch = useDispatch();
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="mr-[5rem] flex flex-col">
          {["allReviews", "review", "related"].map((tab) => (
            <div
              key={tab}
              className={`flex-1 p-4 cursor-pointer text-lg ${
                active === tab ? "font-bold border-b-2 border-pink-600" : ""
              }`}
              onClick={() => setActive(tab)}
            >
              {tab === "allReviews" && "All Reviews"}
              {tab === "review" && "Write Your Review"}
              {tab === "related" && "Related Products"}
            </div>
          ))}
        </div>
        <div className="flex-1">
          <section>
            {active === "allReviews" && (
              <div className="mt-5">
                {!product.reviews || product.reviews.length === 0 ? (
                  <p>No Reviews</p>
                ) : (
                  <div>
                    {product.reviews.map((review) => (
                      <div key={review._id} className="border-b py-2">
                        <div className="flex justify-between">
                          <strong>{review.name}</strong>
                        </div>
                        <p>{review.comment}</p>
                        <Ratings value={review.rating} />
                        <div>
                          <p>{review.createdAt.substring(0, 10)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {active === "review" && (
              <div className="mt-4">
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <label className="block text-xl mb-2">Rating</label>
                    <select
                      value={rating}
                      required
                      onChange={(e) => setRating(e.target.value)}
                      className="p-2 border rounded-lg w-full text-white"
                    >
                      <option value="">Select</option>
                      <option value="1">Inferior</option>
                      <option value="2">Decent</option>
                      <option value="3">Great</option>
                      <option value="4">Excellent</option>
                      <option value="5">Exceptional</option>
                    </select>

                    <label className="block text-xl mt-4 mb-2">Comment</label>
                    <textarea
                      rows="3"
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="p-2 border rounded-lg w-full text-white"
                    />
                    <button
                      type="submit"
                      disabled={loadingProductReview}
                      className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-3"
                      onClick={submitHandler}
                    >
                      Submit
                    </button>
                  </form>
                ) : (
                  <p>
                    Please <Link to="/login">sign in</Link> to write a review
                  </p>
                )}
              </div>
            )}

            {active === "related" && (
              <div className="flex flex-wrap gap-10">
                {!data ? (
                  <Loader />
                ) : (
                  data.map((p) => (
                    <Link key={p._id} to={`/product/${p._id}`}>
                      <SmallProduct product={p} />
                    </Link>
                  ))
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductTabs;
