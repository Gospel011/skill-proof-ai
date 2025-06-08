import React, { useState, useEffect } from 'react';
import { Clock, Send } from 'lucide-react';
import { Challenge, GradingResult } from '../types';
import { gradeSubmission } from '../services/aiGrading';

interface ChallengeViewProps {
  challenge: Challenge;
  onComplete: (result: GradingResult, submission: string) => void;
  onBack: () => void;
}

export function ChallengeView({ challenge, onComplete, onBack }: ChallengeViewProps) {
  const [submission, setSubmission] = useState('');
  const [timeLeft, setTimeLeft] = useState(challenge.timeLimit);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const result = await gradeSubmission(challenge.skillId, submission, challenge.prompt);
      onComplete(result, submission);
    } catch (error) {
      console.error('Grading failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">{challenge.title}</h2>
            <p className="text-gray-300">{challenge.description}</p>
          </div>
          <div className="flex items-center gap-2 text-purple-400">
            <Clock size={20} />
            <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
            <pre className="text-gray-300 whitespace-pre-wrap">{challenge.prompt}</pre>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-white font-medium mb-2">Your Solution:</label>
          <textarea
            value={submission}
            onChange={(e) => setSubmission(e.target.value)}
            className="w-full h-64 bg-gray-900 border border-gray-600 rounded-lg p-4 text-white font-mono resize-none focus:border-purple-500 focus:outline-none"
            placeholder="Write your solution here..."
            disabled={isSubmitting || timeLeft === 0}
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !submission.trim() || timeLeft === 0}
            className="flex items-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Grading...
              </>
            ) : (
              <>
                <Send size={16} />
                Submit
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
