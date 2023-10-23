import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "products",
  initialState: {
    visitedProducts: [],
  },
  reducers: {
    addVisitedProducts: (state, action) => {
      const itemPresent = state.visitedProducts.find(
        product => product.id === action.payload.id
      );

      if (!itemPresent) {
        state.visitedProducts.push(action.payload.product);
      }
    },
  },
});

export const { addVisitedProducts } = CartSlice.actions;

export default CartSlice.reducer;
