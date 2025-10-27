import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "history",
  initialState: {
    items: [],
  },
  reducers: {
    addToHistory: (state, action) => {
      const product = action.payload;

      const exists = state.items.find((p) => p._id === product._id);
      if (exists) {
        state.items = [
          product,
          ...state.items.filter((p) => p._id !== product._id),
        ];
      } else {
        state.items = [product, ...state.items].slice(0, 10);
      }
    },
    clearHistory: (state) => {
      state.items = [];
    },
  },
});

export const { addToHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;
