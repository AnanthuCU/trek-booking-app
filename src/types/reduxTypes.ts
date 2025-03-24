import { Trek } from "./trekTypes";
import { User } from "./userTypes";
import { Booking } from "./bookingTypes";

export interface TreksState {
  list: Trek[];
}

export interface UsersState {
  currentUser: User | null;
}

export interface BookingsState {
  bookings: Booking[];
}
