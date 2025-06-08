import React from 'react';
import { SkillTest } from '../types';
import { skillTests } from '../services/skillTests';

interface SkillSelectorProps {
  onSelectSkill: (skill: SkillTest) => void;
}

export function SkillSelector({ onSelectSkill }: SkillSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Choose Your Skill Test</h2>
        <p className="text-gray-300">Select a skill to prove your expertise and earn a verifiable NFT</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {skillTests.map((skill) => (
          <div
            key={skill.id}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-colors cursor-pointer"
            onClick={() => onSelectSkill(skill)}
          >
            <div className="text-4xl mb-4">{skill.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{skill.name}</h3>
            <p className="text-gray-300 mb-4">{skill.description}</p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-purple-400">{skill.duration} minutes</span>
              <span className={`px-2 py-1 rounded ${
                skill.difficulty === 'Beginner' ? 'bg-green-900 text-green-300' :
                skill.difficulty === 'Intermediate' ? 'bg-yellow-900 text-yellow-300' :
                'bg-red-900 text-red-300'
              }`}>
                {skill.difficulty}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
