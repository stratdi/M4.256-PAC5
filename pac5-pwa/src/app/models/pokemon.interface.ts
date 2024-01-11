import { Stats } from "./stats.interface";

export interface Pokemon {
  id: string;
  imageUrl: string;
  spriteUrl: string;
  name: string;
  description: string;
  types: string[];
  height: number;
  width: number;
  stats: Stats;
}