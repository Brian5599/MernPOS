import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../Admin/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaStore,
  FaClock,
  FaStar,
  FaShoppingCart,
} from "react-icons/fa";
import { addToHistory } from "../../redux/features/history/historySlice";
import { useDispatch } from "react-redux";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const dispatch = useDispatch();

  const handleClick = (product) => {
    dispatch(addToHistory(product));
  };

  return (
    <div className="mb-4 lg:block xl:block md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
        >
          {products.map((product) => (
            <div key={product._id} onClick={() => handleClick(product)}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-lg object-cover h-[30rem]"
              />

              <div className="mt-4 flex justify-between">
                <div className="one">
                  <h2>{product.name}</h2>
                  <p> $ {product.price}</p> <br /> <br />
                  <p className="w-[25rem]">
                    {product.description.substring(0, 170)} ...
                  </p>
                </div>

                <div className="flex justify-between w-[20rem]">
                  <div className="one">
                    <h1 className="flex items-center mb-6">
                      <FaStore className="mr-2 text-white" /> Brand:{" "}
                      {product.brand?.name}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaClock className="mr-2 text-white" /> Added:{" "}
                      {moment(product.createdAt).fromNow()}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaStar className="mr-2 text-white" /> Reviews:
                      {product.numReviews}
                    </h1>
                  </div>

                  <div className="two">
                    <h1 className="flex items-center mb-6">
                      <FaStar className="mr-2 text-white" /> Ratings:{" "}
                      {Math.round(product.rating)}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                      {product.quantity}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaBox className="mr-2 text-white" /> In Stock:{" "}
                      {product.countInStock}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
