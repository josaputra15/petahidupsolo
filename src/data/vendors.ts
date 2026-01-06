// Vendor type definition - shared across the application
export interface Vendor {
  id: string;
  slug: string;
  name: string;
  age?: number;
  vendorType: string;
  sells: string[];
  story: string;
  photos: string[];
  location: {
    lat: number;
    lng: number;
    addressText: string;
  };
  radiusMeters: number;
  tags: string[];
  createdAt: string;
}
