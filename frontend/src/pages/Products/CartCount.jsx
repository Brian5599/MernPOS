// import React from "react";
// import { useSelector } from "react-redux";

// const CartCount = () => {
//   const cartItems = useSelector((state) => state.cart.cartItems);

//   const count = cartItems.length;

//   return (
//     <div className=" left-1 ">
//       {count > 0 && (
//         <span className="px-1 py-0 text-sm text-white bg-red-500 rounded-full">
//           {count}
//         </span>
//       )}
//     </div>
//   );
// };

// export default CartCount;
import React from "react";
import { useSelector } from "react-redux";

const CartCount = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const count = cartItems.length;

  if (count === 0) return null;

  return (
    <span
      className="
        absolute -top-3 -right-2
        px-1.5 py-0
        text-xs font-semibold
        text-white bg-red-500
        rounded-full
        shadow-md
      "
    >
      {count}
    </span>
  );
};

export default CartCount;
