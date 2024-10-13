import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authentication/authSlice";
import categoryReducer from "./category/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
  },
});

