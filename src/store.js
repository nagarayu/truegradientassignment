import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./components/authSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
