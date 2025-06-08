export interface SkillTest {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: string;
}

export interface Challenge {
  id: string;
  skillId: string;
  title: string;
  description: string;
  prompt: string;
  timeLimit: number; // in seconds
}

export interface SkillNFT {
  mint: string;
  name: string;
  skill: string;
  score: number;
  level: string;
  date: string;
  feedback: string;
}

export interface GradingResult {
  score: number;
  feedback: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  passed: boolean;
}
