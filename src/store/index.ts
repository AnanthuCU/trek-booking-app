import { configureStore } from "@reduxjs/toolkit";
import treksReducer from "./slices/trekSlice"; // ✅ Import reducer

export const store = configureStore({
  reducer: {
    treks: treksReducer, // ✅ Ensure this key is "treks", NOT "trek"
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
