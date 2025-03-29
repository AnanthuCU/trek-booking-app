// import {Trek} from "./trekTypes"
// import { User } from "./userTypes";

export interface Booking {
    id: string;
    trekId: number;
    userId: string;
    numberOfPeople: number;
    totalPrice: number;
    status: "pending" | "confirmed" | "cancelled";
    bookedAt: string; // ISO date format
  }
  