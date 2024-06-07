import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },

    removeProduct: (state, action) => {
      const productId = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product.id === productId
      );
      if (productIndex !== -1) {
        const removedProduct = state.products[productIndex];
        state.products.splice(productIndex, 1);
        state.quantity -= 1;
        state.total -= removedProduct.price * removedProduct.quantity;
      }
    },
    resetQuantity: (state) => {
      state.quantity = 0;
    }

  },
});

export const { addProduct, removeProduct, resetQuantity } = cartSlice.actions;
export default cartSlice.reducer;