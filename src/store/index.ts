import { configureStore } from "@reduxjs/toolkit";
import trekReducer from "./slices/trekSlice";

export const store = configureStore({
  reducer: {
    trek: trekReducer,
  },
});

// Infer RootState & AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
