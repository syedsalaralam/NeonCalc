export enum AppView {
  HOME = 'HOME',
  CALCULATOR = 'CALCULATOR',
  CONVERTER = 'CONVERTER',
  GAME = 'GAME',
  BLOG = 'BLOG',
  PRIVACY = 'PRIVACY',
  TERMS = 'TERMS',
  ABOUT = 'ABOUT'
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