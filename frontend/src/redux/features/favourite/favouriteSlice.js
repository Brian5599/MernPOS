import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
  name: "favourites",
  initialState: [],
  reducers: {
    addtoFavourites: (state, action) => {
      if (!state.some((product) => product._id === action.payload._id)) {
        const updatedState = [...state, action.payload];
        localStorage.setItem("favorites", JSON.stringify(updatedState));
        return updatedState;
      }
      return state;
    },
    removeFavourites: (state, action) => {
      const updatedState = state.filter(
        (product) => product._id !== action.payload._id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedState));
      return updatedState;
    },
    setFavourites: (state, action) => {
      localStorage.setItem("favorites", JSON.stringify(action.payload));
      return action.payload;
    },
  },
});

export const { addtoFavourites, removeFavourites, setFavourites } =
  favouriteSlice.actions;

export default favouriteSlice.reducer;

export const selectFavouriteProduct = (state) => state.favourites;
