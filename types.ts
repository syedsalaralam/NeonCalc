export enum AppView {
  CALCULATOR = 'CALCULATOR',
  CONVERTER = 'CONVERTER',
  GAME = 'GAME',
}

export interface MathQuestion {
  question: string;
  options: number[];
  answer: number;
  explanation: string;
}

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard'
}

export interface ConverterCategory {
  name: string;
  units: string[];
  rates: Record<string, number>; // Base unit multiplier
}