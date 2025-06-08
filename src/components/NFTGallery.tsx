import React from 'react';
import { Trophy, Calendar, Target, Award } from 'lucide-react';
import { getUserNFTs } from '../services/nftService';
import { SkillNFT } from '../types';

interface NFTGalleryProps {
  onBack: () => void;
}

export function NFTGallery({ onBack }: NFTGalleryProps) {
  const nfts: SkillNFT[] = getUserNFTs();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Your Skill NFTs</h2>
        <p className="text-gray-300">Your verified skills stored on Solana blockchain</p>
      </div>

      {nfts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-xl font-semibold text-white mb-2">No NFTs Yet</h3>
          <p className="text-gray-300 mb-6">Complete skill tests to earn your first NFT proof</p>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Take a Test
          </button>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {nfts.map((nft, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">🏆</div>
                  <h3 className="text-xl font-semibold text-white">{nft.name}</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="text-purple-400" size={16} />
                      <span className="text-gray-300">Skill</span>
                    </div>
                    <span className="text-white font-medium">{nft.skill}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="text-green-400" size={16} />
                      <span className="text-gray-300">Score</span>
                    </div>
                    <span className="text-green-400 font-bold">{nft.score}%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="text-yellow-400" size={16} />
                      <span className="text-gray-300">Level</span>
                    </div>
                    <span className="text-yellow-400 font-medium">{nft.level}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-blue-400" size={16} />
                      <span className="text-gray-300">Date</span>
                    </div>
                    <span className="text-blue-400">{nft.date}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-sm text-gray-400 font-mono break-all">
                    {nft.mint.slice(0, 8)}...{nft.mint.slice(-8)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={onBack}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Take Another Test
            </button>
          </div>
        </>
      )}
    </div>
  );
}
