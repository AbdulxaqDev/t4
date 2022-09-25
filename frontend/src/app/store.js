import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../components/features/auth/authSlice";
import userReducer from "../components/features/user/userSlice";

const store = configureStore({
 reducer: {
  auth: authReducer,
  user: userReducer
 },
});

export default store;
