export interface Indicator {
  id: string;
  name: string;
  current: number;
  goal: number;
  color?: string;
}