//redux
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";
import authReducer from "../features/auth/authSlice";
import favouriteReducer from "../features/favourite/favouriteSlice";
import cartReducer from "../features/cart/cartSlice";
import shopReducer from "./shop/shopSlice";
import historyReducer from "./history/historySlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favourites: favouriteReducer,
    cart: cartReducer,
    shop: shopReducer,
    history: historyReducer,
  },
  middleware: (getDefaultMiddlewawre) =>
    getDefaultMiddlewawre().concat(apiSlice.middleware),
  devTools: true,
});
setupListeners(store.dispatch);

export default store;
