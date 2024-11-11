// interfaces/index.ts
export interface Material {
    name: string;
    unit: string;
    quantity: number;
  }
  
  export interface CandleType {
    name: string;
    waxWeight: number; // in grams
    waxVolume: number; // in ml
    cost: number;
    stock: number;
    fragrance?: Material;
    accessory?: Material;
  }
  