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
      route: [
        { id: 1, latitude: 27.9881, longitude: 86.925, elevation: 5364 },
        { id: 2, latitude: 27.9901, longitude: 86.920, elevation: 5400 },
        { id: 3, latitude: 27.9950, longitude: 86.910, elevation: 5500 },
        { id: 4, latitude: 28.0000, longitude: 86.900, elevation: 5600 },
      ],
    },
    {
      id: 2,
      name: "Annapurna Circuit",
      description: "A scenic trek around the Annapurna mountain range.",
      price: 900,
      isFeatured: false,
      route: [
        { id: 1, latitude: 28.5955, longitude: 83.8203, elevation: 3200 },
        { id: 2, latitude: 28.6000, longitude: 83.8100, elevation: 3300 },
      ],
    },
    {
      id: 3,
      name: "Kilimanjaro Trek",
      description: "Climb to the top of Africa’s highest peak.",
      price: 1500,
      isFeatured: true,
      route: [
        { id: 1, latitude: 22.5955, longitude: 73.8203, elevation: 3200 },
        { id: 2, latitude: 23.6000, longitude: 78.8100, elevation: 3300 },
      ],
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
