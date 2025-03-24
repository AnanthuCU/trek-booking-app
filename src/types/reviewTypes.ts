export interface Review {
    id: string;
    trekId: number;
    userId: string;
    rating: number; // 1-5 stars
    comment: string;
    createdAt: string; // ISO date format
  }
  