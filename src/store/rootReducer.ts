// src/store/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import trekReducer from "./slices/trekSlice";
import bookingReducer from "./slices/bookingSlice";
import userReducer from "./slices/userSlice"; // If you have a user slice

const rootReducer = combineReducers({
  treks: trekReducer,
  bookings: bookingReducer,
  users: userReducer, // Add this only if you have a userSlice
});

export default rootReducer;
