// export const addDecimal = (num) => {
//   return parseFloat(num).toFixed(2);
// };

// export const updateCart = (state) => {
//   state.itemsPrice = addDecimal(
//     state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
//   );

//   state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);

//   state.taxPrice = addDecimal(Number(0.15 * state.itemsPrice).toFixed(2));

//   state.totalPrice = addDecimal(
//     Number(state.itemsPrice) +
//       Number(state.shippingPrice) +
//       Number(state.taxPrice)
//   );

//   localStorage.setItem("cart", JSON.stringify(state));
//   return state;
// };

// Format number to 2 decimals but return as a Number (not string)
export const addDecimal = (num) => {
  return Number(num.toFixed(2));
};

export const updateCart = (state) => {
  // 1️⃣ Calculate items total
  state.itemsPrice = addDecimal(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // 2️⃣ Calculate shipping
  state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);

  // 3️⃣ Calculate tax
  state.taxPrice = addDecimal(0.15 * state.itemsPrice);

  // 4️⃣ Calculate total
  state.totalPrice = addDecimal(
    state.itemsPrice + state.shippingPrice + state.taxPrice
  );

  // 5️⃣ Persist to localStorage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
