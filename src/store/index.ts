// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer"; // ✅ Import the combined reducers

export const store = configureStore({
  reducer: rootReducer, // ✅ Use rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
