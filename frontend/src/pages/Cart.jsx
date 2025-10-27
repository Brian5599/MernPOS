// import React from "react";
// import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
// import { Link } from "react-router";
// import { toast } from "react-toastify";
// import { CiTrash } from "react-icons/ci";

// const Cart = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const cart = useSelector((state) => state.cart);
//   const cartItems = cart?.cartItems || [];

//   const handleRemoveFromCart = (id) => {
//     dispatch(removeFromCart(id));
//     toast.info("Item removed from cart");
//   };

//   const handleCheckOut = () => {
//     navigate("/login?redirect=/shipping");
//   };

//   return (
//     <div className="container mx-auto px-6 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-semibold">Your cart</h1>
//         <Link to="/shop" className="text-red-500 hover:underline">
//           Continue Shopping
//         </Link>
//       </div>

//       <div className="flex justify-between items-center mb-6">
//         <h4 className="text-2xl">Product</h4>
//         <h4 className="text-2xl">Quantity</h4>
//         <h4 className="text-2xl">Total</h4>
//       </div>

//       <div className="border-t border-b py-4">
//         {cartItems.map((item) => (
//           <div
//             key={item._id}
//             className="flex items-center justify-between py-4 last:border-none"
//           >
//             <div className="flex items-center gap-4 w-1/2">
//               <Link to={`/product/${item._id}`}>
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-40 h-40 object-cover rounded-sm"
//                 />
//               </Link>
//               <div>
//                 <h2 className="font-medium">{item.name}</h2>
//                 <p className="text-gray-500">${item.price}</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4 w-1/4">
//               <button
//                 onClick={() => {
//                   if (item.qty > 1) {
//                     dispatch(addToCart({ ...item, qty: -1 }));
//                   } else {
//                     handleRemoveFromCart(item._id);
//                   }
//                 }}
//                 className="px-2 py-1 bg-white rounded"
//               >
//                 <p className="text-black">-</p>
//               </button>

//               <span>{item.qty}</span>

//               <button
//                 onClick={() => {
//                   if (item.qty < item.countInStock) {
//                     dispatch(addToCart({ ...item, qty: +1 }));
//                   } else {
//                     toast.error(`Only ${item.countInStock} left in stock`);
//                   }
//                 }}
//                 className="px-2 py-1 bg-white rounded"
//               >
//                 <p className="text-black">+</p>
//               </button>
//               <span>
//                 <button onClick={() => handleRemoveFromCart(item._id)}>
//                   <CiTrash />
//                 </button>
//               </span>
//             </div>

//             <div className="w-1/4 text-right ">
//               ${(item.qty * item.price).toFixed(2)}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Cart summary */}
//       <div className="flex justify-end mt-6">
//         <div className="text-right">
//           <h2 className="text-xl font-semibold">
//             Total Price: ${" "}
//             {cartItems
//               .reduce((acc, item) => acc + item.qty * item.price, 0)
//               .toLocaleString()}{" "}
//           </h2>
//           <p className="text-gray-500 text-sm">
//             Taxes, discounts and shipping calculated at checkout.
//           </p>
//           <button
//             onClick={handleCheckOut}
//             className="mt-4 px-6 py-2 bg-red-500 text-white rounded uppercase"
//           >
//             Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React from "react";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import { toast } from "react-toastify";
import { FaTrash, FaShoppingBag, FaMinus, FaPlus } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const cartItems = cart?.cartItems || [];

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    toast.info("Item removed from cart");
  };

  const handleQuantityChange = (item, change) => {
    const newQty = item.qty + change;

    if (newQty < 1) {
      handleRemoveFromCart(item._id);
      return;
    }

    if (newQty > item.countInStock) {
      toast.error(`Only ${item.countInStock} left in stock`);
      return;
    }

    dispatch(addToCart({ ...item, qty: change }));
  };

  const handleCheckOut = () => {
    if (userInfo) {
      navigate("/shipping");
    } else {
      navigate("/login?redirect=/shipping");
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 lg:ml-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <FaShoppingBag className="mx-auto text-gray-600 text-6xl mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-400">
              Start shopping to fill your cart with amazing products
            </p>
          </div>
          <Link to="/shop">
            <button className="bg-white hover:bg-black hover:text-white text-black px-8 py-3 rounded-lg font-semibold transition-colors">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:ml-20 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Shopping Cart</h1>
          <p className="text-gray-400">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>
        <Link to="/shop">
          <button className="text-pink-500 hover:text-pink-400 font-medium transition-colors flex items-center gap-2">
            <span>← Continue Shopping</span>
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-[#1a1a1a] rounded-lg p-4 md:p-6 hover:bg-[#222] transition-colors"
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Product Image */}
                <Link to={`/product/${item._id}`} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full md:w-32 h-32 object-cover rounded-lg border border-gray-800 hover:border-pink-500 transition-colors"
                  />
                </Link>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link to={`/product/${item._id}`}>
                      <h3 className="text-lg font-semibold text-white hover:text-pink-500 transition-colors mb-2">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-gray-400 text-sm mb-3">
                      ${item.price.toFixed(2)} each
                    </p>
                    {item.countInStock < 10 && (
                      <p className="text-yellow-500 text-sm">
                        Only {item.countInStock} left in stock
                      </p>
                    )}
                  </div>

                  {/* Quantity Controls & Remove Button */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleQuantityChange(item, -1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                      >
                        <FaMinus size={12} />
                      </button>

                      <span className="text-white font-semibold w-8 text-center">
                        {item.qty}
                      </span>

                      <button
                        onClick={() => handleQuantityChange(item, 1)}
                        disabled={item.qty >= item.countInStock}
                        className="w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="text-white font-bold text-lg">
                        ${(item.qty * item.price).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemoveFromCart(item._id)}
                        className="p-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Remove item"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#1a1a1a] rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-gray-300">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              {subtotal < 100 && subtotal > 0 && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <p className="text-blue-400 text-sm">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-gray-800">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-2xl font-bold text-pink-500">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckOut}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition-colors mb-4"
            >
              Proceed to Checkout
            </button>

            <p className="text-gray-400 text-xs text-center">
              Taxes and shipping calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
