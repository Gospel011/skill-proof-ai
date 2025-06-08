import { GradingResult } from '../types';

// Mock AI grading service - in production, this would call OpenAI API
export async function gradeSubmission(
  skillId: string,
  submission: string,
  prompt: string
): Promise<GradingResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock grading logic based on submission length and content
  const wordCount = submission.trim().split(/\s+/).length;
  const hasCodeBlocks = submission.includes('function') || submission.includes('const') || submission.includes('let');
  const hasStructure = submission.includes('\n') && wordCount > 50;

  let score = 0;
  let feedback = '';
  let level: 'Beginner' | 'Intermediate' | 'Advanced' = 'Beginner';

  if (skillId === 'javascript') {
    if (hasCodeBlocks && wordCount > 20) {
      score = Math.floor(Math.random() * 20) + 75; // 75-95
      level = score > 85 ? 'Advanced' : 'Intermediate';
      feedback = 'Good implementation with proper syntax and logic. Shows understanding of array methods and functional programming concepts.';
    } else {
      score = Math.floor(Math.random() * 30) + 45; // 45-75
      feedback = 'Basic understanding demonstrated but could improve code structure and efficiency.';
    }
  } else if (skillId === 'writing') {
    if (hasStructure && wordCount > 100) {
      score = Math.floor(Math.random() * 20) + 80; // 80-100
      level = score > 90 ? 'Advanced' : 'Intermediate';
      feedback = 'Excellent technical writing with clear structure, comprehensive coverage, and good examples.';
    } else {
      score = Math.floor(Math.random() * 25) + 50; // 50-75
      feedback = 'Good attempt but could benefit from more detailed explanations and better organization.';
    }
  } else if (skillId === 'ui-design') {
    if (hasStructure && wordCount > 150) {
      score = Math.floor(Math.random() * 15) + 82; // 82-97
      level = score > 90 ? 'Advanced' : 'Intermediate';
      feedback = 'Comprehensive design thinking with good consideration of user experience, accessibility, and visual hierarchy.';
    } else {
      score = Math.floor(Math.random() * 20) + 55; // 55-75
      feedback = 'Shows basic design understanding but needs more detailed consideration of user needs and interface patterns.';
    }
  }

  return {
    score,
    feedback,
    level,
    passed: score >= 75
  };
}
