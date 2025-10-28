//  import { useEffect } from "react";
// import { useCreateOrderMutation } from "../redux/api/orderApiSlice";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router";
// import ProgressSteps from "../components/ProgressSteps";
// import Message from "../pages/Admin/Message";
// import { clearCartItems } from "../redux/features/cart/cartSlice";
// import { toast } from "react-toastify";
// import Loader from "../components/Loader";

// const Order = () => {
//   const cart = useSelector((state) => state.cart);
//   console.log(cart);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [createOrder, isLoading] = useCreateOrderMutation();
//   useEffect(() => {
//     if (!cart.shippingAddress.address) {
//       navigate("/shipping");
//     }
//   }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

//   const orderHandler = async () => {
//     try {
//       const res = await createOrder({
//         orderItems: cart.cartItems,
//         shippingAddress: cart.shippingAddress,
//         paymentMethod: cart.paymentMethod,
//         itemsPrice: cart.itemsPrice,
//         shippingPrice: cart.shippingPrice,
//         taxPrice: cart.taxPrice,
//         totalPrice: cart.totalPrice,
//       }).unwrap();
//       //   dispatch(clearCartItems());
//       navigate(`/order/${res._id}`);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
//   return (
//     <>
//       <ProgressSteps step1 step2 step3 />
//       <div className=" container mx-auto mt-8 ">
//         {cart.cartItems.length === 0 ? (
//           <Message>Your Cart is Empty</Message>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr>
//                   <td>Image</td>
//                   <td>Product</td>
//                   <td>Quantity</td>
//                   <td>Price</td>
//                   <td>Total</td>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cart.cartItems.map((item, index) => (
//                   <tr key={index}>
//                     <td>
//                       <img
//                         src={item.image}
//                         alt=""
//                         className="w-25 h-25 mt-3 rounded-lg object-cover"
//                       />
//                     </td>
//                     <td>{item.name}</td>
//                     <td>{item.qty}</td>
//                     <td>${item.price.toFixed(2)}</td>
//                     <td>${(item.qty * item.price).toFixed(2)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//     <div className="mt-8">
//       <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
//       <div className="flex flex-wrap justify-between p-5 bg-[#181818]">
//         <ul>
//           <li>
//             <span className="font-semibold mb-4 mr-1">Items : </span>
//             {cart.itemPrice}
//           </li>
//           <li>
//             <span className="font-semibold mb-4 mr-1">Shipping : </span>
//             {cart.shippingPrice}
//           </li>
//           <li>
//             <span className="font-semibold mb-4 mr-1">Tax : </span>
//             {cart.taxPrice}
//           </li>
//           <li>
//             <span className="font-semibold mb-4 mr-1">Total : </span>
//             {cart.totalPrice}
//           </li>
//         </ul>
//         <div>
//           <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
//           <p>
//             <strong>Address:</strong> {cart.shippingAddress.address},{" "}
//             {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
//             {cart.shippingAddress.country}
//           </p>
//         </div>
//         <div>
//           <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
//           <p>
//             <strong>Method:</strong> {cart.paymentMethod}
//           </p>
//         </div>
//       </div>
//     </div>
//     <button
//       className="w-full bg-red-600 rounded-lg py-2 uppercase"
//       disabled={cart.cartItems === 0}
//       onClick={orderHandler}
//     >
//       Place Order
//     </button>
//   </div>
// </>
//   );
// };

// export default Order;

// import { useEffect } from "react";
// import { useCreateOrderMutation } from "../redux/api/orderApiSlice";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router";
// import ProgressSteps from "../components/ProgressSteps";
// import Message from "../pages/Admin/Message";
// import { clearCartItems } from "../redux/features/cart/cartSlice";
// import { toast } from "react-toastify";
// import Loader from "../components/Loader";

// const Order = () => {
//   const cart = useSelector((state) => state.cart);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [createOrder, { isLoading, error }] = useCreateOrderMutation();

//   useEffect(() => {
//     if (!cart.shippingAddress?.address) {
//       navigate("/shipping");
//     }
//   }, [cart.shippingAddress, navigate]);

//   const orderHandler = async () => {
//     try {
//       const res = await createOrder({
//         orderItems: cart.cartItems,
//         shippingAddress: cart.shippingAddress,
//         paymentMethod: cart.paymentMethod,
//         itemsPrice: cart.itemsPrice,
//         shippingPrice: cart.shippingPrice,
//         taxPrice: cart.taxPrice,
//         totalPrice: cart.totalPrice,
//       }).unwrap();

//       // dispatch(clearCartItems());
//       navigate(`/order/${res._id}`);
//     } catch (err) {
//       toast.error(err?.data?.message || err.message);
//     }
//   };

//   return (
//     <>
//       <ProgressSteps step1 step2 step3 />
//       <div className="container mx-auto mt-8">
//         {cart.cartItems.length === 0 ? (
//           <Message>Your Cart is Empty</Message>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr>
//                   <td>Image</td>
//                   <td>Product</td>
//                   <td>Quantity</td>
//                   <td>Price</td>
//                   <td>Total</td>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cart.cartItems.map((item, index) => (
//                   <tr key={index}>
//                     <td>
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-25 h-25 mt-3 rounded-lg object-cover"
//                       />
//                     </td>
//                     <td>{item.name}</td>
//                     <td>{item.qty}</td>
//                     <td>${item.price.toFixed(2)}</td>
//                     <td>${(item.qty * item.price).toFixed(2)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
//           <div className="flex flex-wrap justify-between p-5 bg-[#181818]">
//             <ul>
//               <li>
//                 <span className="font-semibold mb-4 mr-1">Items : </span>
//                 {cart.itemsPrice}
//               </li>
//               <li>
//                 <span className="font-semibold mb-4 mr-1">Shipping : </span>
//                 {cart.shippingPrice}
//               </li>
//               <li>
//                 <span className="font-semibold mb-4 mr-1">Tax : </span>
//                 {cart.taxPrice}
//               </li>
//               <li>
//                 <span className="font-semibold mb-4 mr-1">Total : </span>
//                 {cart.totalPrice}
//               </li>
//             </ul>
//             <div>
//               <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
//               <p>
//                 <strong>Address:</strong> {cart.shippingAddress.address},{" "}
//                 {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
//                 {cart.shippingAddress.country}
//               </p>
//             </div>
//             <div>
//               <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
//               <p>
//                 <strong>Method:</strong> {cart.paymentMethod}
//               </p>
//             </div>
//           </div>
//         </div>

//         {error && <Message variant="danger">{error.data?.message}</Message>}
//         {isLoading && <Loader />}

//         <button
//           className="w-full bg-red-600 rounded-lg py-2 uppercase"
//           disabled={cart.cartItems.length === 0}
//           onClick={orderHandler}
//         >
//           Place Order
//         </button>
//       </div>
//     </>
//   );
// };

// export default Order;

import { useEffect } from "react";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ProgressSteps from "../../components/ProgressSteps";
import Message from "../../pages/Admin/Message";
// import { clearCartItems } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Order = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress?.address) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress, navigate]);

  const orderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      // dispatch(clearCartItems());
      toast.success("Order placed successfully!");
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 />
      <div className="container mx-auto mt-8 px-4">
        {cart.cartItems.length === 0 ? (
          <Message>Your Cart is Empty</Message>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-700">
                    <th className="p-4 text-left">Image</th>
                    <th className="p-4 text-left">Product</th>
                    <th className="p-4 text-center">Quantity</th>
                    <th className="p-4 text-right">Price</th>
                    <th className="p-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.cartItems.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="p-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      </td>
                      <td className="p-4">{item.name}</td>
                      <td className="p-4 text-center">{item.qty}</td>
                      <td className="p-4 text-right">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="p-4 text-right">
                        ${(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 bg-[#181818] rounded-lg">
                {/* Order Summary */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Summary</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-400">Items:</span>
                      <span className="font-semibold">
                        ${cart.itemsPrice?.toFixed(2) || "0.00"}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-400">Shipping:</span>
                      <span className="font-semibold">
                        ${cart.shippingPrice?.toFixed(2) || "0.00"}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-400">Tax:</span>
                      <span className="font-semibold">
                        ${cart.taxPrice?.toFixed(2) || "0.00"}
                      </span>
                    </li>
                    <li className="flex justify-between pt-2 border-t border-gray-700 mt-2">
                      <span className="font-bold text-lg">Total:</span>
                      <span className="font-bold text-lg text-pink-500">
                        ${cart.totalPrice?.toFixed(2) || "0.00"}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Shipping</h3>
                  <div className="space-y-2 text-gray-300">
                    <p>
                      <strong className="text-white">Address:</strong>
                      <br />
                      {cart.shippingAddress.address}
                    </p>
                    <p>
                      {cart.shippingAddress.city},{" "}
                      {cart.shippingAddress.postalCode}
                    </p>
                    <p>{cart.shippingAddress.country}</p>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
                  <p className="text-gray-300">
                    <strong className="text-white">Method:</strong>
                    <br />
                    {cart.paymentMethod}
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <Message variant="danger" className="mt-4">
                {error.data?.message || "An error occurred"}
              </Message>
            )}

            {isLoading && <Loader />}

            <button
              className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-lg py-3 uppercase transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
              disabled={cart.cartItems.length === 0 || isLoading}
              onClick={orderHandler}
            >
              {isLoading ? "Placing Order..." : "Place Order"}
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Order;
