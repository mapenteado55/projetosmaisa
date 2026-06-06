export interface Product {
  id: string;
  name: string;
  price: number; // in BRL (R$)
  category: 'formal' | 'casual' | 'festa' | 'acessorios' | 'calcados';
  description: string;
  brand: string;
  imageUrl: string;
  colors: string[];
  sizes: string[];
  isFeatured?: boolean;
}

export interface StylistMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface StoreHours {
  day: string;
  hours: string;
}

export interface RouteDetail {
  mode: 'DRIVING' | 'WALKING' | 'BICYCLING';
  origin: string;
  distance: string;
  duration: string;
}
