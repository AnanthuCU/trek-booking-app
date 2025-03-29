export interface RoutePoint {
  id: number;
  latitude: number;
  longitude: number;
  elevation: number;
}

export interface Trek {
  id: number;
  name: string;
  description: string;
  price: number;
  isFeatured: boolean;
  route: RoutePoint[]; // ✅ Add this property
}
