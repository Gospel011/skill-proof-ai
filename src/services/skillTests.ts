import { SkillTest, Challenge } from '../types';

export const skillTests: SkillTest[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Test your JavaScript fundamentals and problem-solving skills',
    duration: 30,
    difficulty: 'Intermediate',
    icon: '🟨'
  },
  {
    id: 'writing',
    name: 'Technical Writing',
    description: 'Demonstrate your ability to write clear, technical documentation',
    duration: 45,
    difficulty: 'Beginner',
    icon: '✍️'
  },
  {
    id: 'ui-design',
    name: 'UI Design',
    description: 'Show your understanding of user interface design principles',
    duration: 60,
    difficulty: 'Advanced',
    icon: '🎨'
  }
];

export const challenges: Record<string, Challenge[]> = {
  javascript: [
    {
      id: 'js-1',
      skillId: 'javascript',
      title: 'Array Manipulation',
      description: 'Write a function that processes arrays efficiently',
      prompt: 'Create a function called `processArray` that takes an array of numbers and returns a new array with only the even numbers, doubled, and sorted in ascending order.\n\nExample:\nInput: [3, 1, 4, 1, 5, 9, 2, 6]\nOutput: [4, 8, 12]\n\nWrite your solution below:',
      timeLimit: 1800 // 30 minutes
    }
  ],
  writing: [
    {
      id: 'writing-1',
      skillId: 'writing',
      title: 'API Documentation',
      description: 'Write clear documentation for a REST API endpoint',
      prompt: 'Write comprehensive documentation for a REST API endpoint that creates a new user account. Include:\n\n1. Endpoint URL and HTTP method\n2. Request parameters and body structure\n3. Response format for success and error cases\n4. Example requests and responses\n5. Authentication requirements\n\nWrite your documentation below:',
      timeLimit: 2700 // 45 minutes
    }
  ],
  'ui-design': [
    {
      id: 'ui-1',
      skillId: 'ui-design',
      title: 'Mobile App Design',
      description: 'Design a user-friendly mobile interface',
      prompt: 'Design a mobile app interface for a task management application. Describe in detail:\n\n1. The main screen layout and navigation\n2. How users will add, edit, and complete tasks\n3. Visual hierarchy and information architecture\n4. Color scheme and typography choices\n5. Accessibility considerations\n\nProvide a detailed written description of your design:',
      timeLimit: 3600 // 60 minutes
    }
  ]
};

export function getChallengeBySkillId(skillId: string): Challenge | null {
  const skillChallenges = challenges[skillId];
  return skillChallenges ? skillChallenges[0] : null;
}
