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
        { id: 1, latitude: 28.0000, longitude: 86.9000, elevation: 2600 },
        { id: 2, latitude: 28.0360, longitude: 86.9020, elevation: 2700 },
        { id: 3, latitude: 28.0720, longitude: 86.9040, elevation: 3250 },
        { id: 4, latitude: 28.1080, longitude: 86.9060, elevation: 2900 },
        { id: 5, latitude: 28.1440, longitude: 86.9080, elevation: 3100 },
        { id: 6, latitude: 28.1800, longitude: 86.9100, elevation: 3350 },
        { id: 7, latitude: 28.2160, longitude: 86.9120, elevation: 3850 },
        { id: 8, latitude: 28.2520, longitude: 86.9140, elevation: 3900 },
        { id: 9, latitude: 28.2880, longitude: 86.9160, elevation: 4100 }, // Highest point
        { id: 10, latitude: 28.3240, longitude: 86.9180, elevation: 3850 },
        { id: 11, latitude: 28.3600, longitude: 86.9200, elevation: 3550 },
        { id: 12, latitude: 28.3960, longitude: 86.9220, elevation: 3200 },
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
