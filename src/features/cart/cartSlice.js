import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://course-api.com/react-useReducer-cart-project";
const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkAPI) => {
    // console.log(name);
    //console.log(thunkAPI.getState());
    //thunkAPI.dispatch(openModal());
    try {
      const response = await axios(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong!");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount += 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount -= 1;
    },
    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((element) => {
        amount += element.amount;
        total += element.amount * element.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        //console.log(action);
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      });
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
