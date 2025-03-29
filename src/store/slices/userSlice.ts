import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/userTypes";

interface UsersState {
  currentUser: User | null;
}

const initialState: UsersState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
