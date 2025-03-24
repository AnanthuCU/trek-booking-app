import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Trek } from "@/types/trekTypes";
// export interface Trek {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   isFeatured: boolean;
// }

interface TreksState {
  list: Trek[]; // ✅ Ensure the key is "treks", not "trekList"
}

const initialState: TreksState = {
  list: [
    {
      id: 1,
      name: "Everest Base Camp",
      description: "A challenging trek to Everest Base Camp.",
      price: 1200,
      isFeatured: true,
    },
    {
      id: 2,
      name: "Annapurna Circuit",
      description: "A scenic trek around the Annapurna mountain range.",
      price: 900,
      isFeatured: false,
    },
    {
      id: 3,
      name: "Kilimanjaro Trek",
      description: "Climb to the top of Africa’s highest peak.",
      price: 1500,
      isFeatured: true,
    },
  ],
};

const treksSlice = createSlice({
  name: "treks",
  initialState,
  reducers: {
    addTrek: (state, action: PayloadAction<Trek>) => {
      state.list.push(action.payload);
    },
  },
});

export const { addTrek } = treksSlice.actions;
export default treksSlice.reducer;
