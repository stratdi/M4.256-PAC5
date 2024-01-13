import { Stats } from "./stats.interface";

export interface Pokemon {
  id: number;
  imageUrl: string;
  spriteUrl: string;
  name: string;
  description?: string;
  types?: string[];
  height?: number;
  weight?: number;
  stats?: Stats;
}