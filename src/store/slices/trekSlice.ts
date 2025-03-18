import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Trek {
  id: string;
  name: string;
  description: string;
  price: number;
  level:string;
}

interface TrekState {
  treks: Trek[];
}

const initialState: TrekState = {
  treks: [
    { id: "1", name: "Everest Base Camp", description: "A challenging trek to EBC.", price: 1200,level:"hard" },
    { id: "2", name: "Annapurna Circuit", description: "Beautiful trek in Nepal.", price: 900 ,level:"very hard"},
  ],
};

const trekSlice = createSlice({
  name: "trek",
  initialState,
  reducers: {
    setTreks: (state, action: PayloadAction<Trek[]>) => {
      state.treks = action.payload;
    },
    addTrek: (state, action: PayloadAction<Trek>) => {
      state.treks.push(action.payload);
    },
  },
});

export const { setTreks, addTrek } = trekSlice.actions;
export default trekSlice.reducer;
