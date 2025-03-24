export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string; // Optional profile picture
    role: "user" | "admin"; // User roles
  }
  