import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Booking } from "@/types/bookingTypes";

interface BookingsState {
  bookings: Booking[];
}

const initialState: BookingsState = {
  bookings: [
    {
      id: "b1",
      trekId: 1,
      userId: "u1",
      numberOfPeople: 2,
      totalPrice: 2400,
      status: "confirmed",
      bookedAt: new Date().toISOString(),
    },
    {
      id: "b2",
      trekId: 2,
      userId: "u2",
      numberOfPeople: 1,
      totalPrice: 900,
      status: "pending",
      bookedAt: new Date().toISOString(),
    },
  ],
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
    cancelBooking: (state, action: PayloadAction<string>) => {
      const booking = state.bookings.find((b) => b.id === action.payload);
      if (booking) booking.status = "cancelled";
    },
    confirmBooking: (state, action: PayloadAction<string>) => {
      const booking = state.bookings.find((b) => b.id === action.payload);
      if (booking) booking.status = "confirmed";
    },
  },
});

export const { addBooking, cancelBooking, confirmBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
