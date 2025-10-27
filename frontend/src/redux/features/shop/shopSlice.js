import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  categories: [],
  brands: [],
  products: [],
  checked: [],
  radio: [],
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCheck: (state, action) => {
      state.checked = action.payload;
    },
    setRadio: (state, action) => {
      state.radio = action.payload;
    },
    setBrand: (state, action) => {
      state.brands = action.payload;
    },
  },
});

export const { setCategories, setProducts, setCheck, setRadio, setBrand } =
  shopSlice.actions;
export default shopSlice.reducer;
