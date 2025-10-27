// import React from "react";
// import { useParams, Link } from "react-router-dom";
// import Loader from "../components/Loader";
// import Message from "./Admin/Message";
// import {
//   useGetAllProductsQuery,
//   useGetSpecialProductsQuery,
// } from "../redux/api/productApiSlice";
// import Header from "../components/Header";
// import SpecialProduct from "./Products/SpecialProduct";

// const Home = () => {
//   const { keyword } = useParams();
//   const limit = 6;
//   const {
//     data: products,
//     isLoading,
//     isError,
//   } = useGetSpecialProductsQuery({ keyword });
//   return (
//     <>
//       {!keyword ? <Header /> : null}
//       {isLoading ? (
//         <Loader />
//       ) : isError ? (
//         <Message>{isError.error}</Message>
//       ) : (
//         <>
//           <div className="flex justify-between items-center">
//             <h1 className="ml-[20rem]">Special Products</h1>
//             <Link
//               to="/shop"
//               className="mr-[20rem] bg-gray-600 rounded-lg text-white py-1 px-2 "
//             >
//               Shop
//             </Link>
//           </div>
//           <div>
//             <SpecialProduct products={products.products} />
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Home;

import React from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "./Admin/Message";
import { useGetSpecialProductsQuery } from "../redux/api/productApiSlice";
import Header from "../components/Header";
import SpecialProduct from "./Products/SpecialProduct";

const Home = () => {
  const { keyword } = useParams();
  const {
    data: products,
    isLoading,
    isError,
  } = useGetSpecialProductsQuery({
    keyword,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Header Section */}
      {!keyword && <Header />}

      {/* Main Content */}
      <div className="container mx-auto ">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">
            {isError?.data?.message || isError.error}
          </Message>
        ) : (
          <>
            {/* Title Row */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold tracking-wide bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                ✨ Special Products
              </h1>
              <Link
                to="/shop"
                className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-5 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-200"
              >
                Go to Shop →
              </Link>
            </div>

            {/* Product Section */}
            <div className="bg-gray-900/40 rounded-2xl shadow-lg p-6 border border-gray-800">
              <SpecialProduct products={products.products} />
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 mt-10 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} FOOTER HERE
      </footer>
    </div>
  );
};

export default Home;
