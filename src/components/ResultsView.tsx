import React, { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Trophy, Award, Calendar, Target } from 'lucide-react';
import { GradingResult } from '../types';
import { mintSkillNFT } from '../services/nftService';

interface ResultsViewProps {
  skillName: string;
  result: GradingResult;
  submission: string;
  onBack: () => void;
}

export function ResultsView({ skillName, result, submission, onBack }: ResultsViewProps) {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [isMinting, setIsMinting] = useState(false);
  const [mintedNFT, setMintedNFT] = useState<string | null>(null);

  const handleMintNFT = async () => {
    if (!wallet.connected || !result.passed) return;

    setIsMinting(true);
    try {
      const mintAddress = await mintSkillNFT(connection, wallet, skillName, result);
      setMintedNFT(mintAddress);
    } catch (error) {
      console.error('Minting failed:', error);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
        <div className="text-center mb-8">
          <div className={`text-6xl mb-4 ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
            {result.passed ? '🎉' : '😔'}
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {result.passed ? 'Congratulations!' : 'Keep Practicing!'}
          </h2>
          <p className="text-gray-300">
            {result.passed 
              ? 'You passed the skill test and can mint your NFT proof!'
              : 'You need at least 75% to pass. Try again to improve your score.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="text-purple-400" size={24} />
              <h3 className="text-xl font-semibold text-white">Your Score</h3>
            </div>
            <div className="text-4xl font-bold text-purple-400 mb-2">{result.score}%</div>
            <div className="flex items-center gap-2">
              <Award className="text-yellow-400" size={16} />
              <span className="text-yellow-400 font-medium">{result.level}</span>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="text-green-400" size={24} />
              <h3 className="text-xl font-semibold text-white">Skill</h3>
            </div>
            <div className="text-2xl font-bold text-white mb-2">{skillName}</div>
            <div className="flex items-center gap-2">
              <Calendar className="text-gray-400" size={16} />
              <span className="text-gray-400">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">AI Feedback</h3>
          <p className="text-gray-300 leading-relaxed">{result.feedback}</p>
        </div>

        {result.passed && wallet.connected && (
          <div className="text-center mb-6">
            {mintedNFT ? (
              <div className="bg-green-900 border border-green-700 rounded-lg p-6">
                <div className="text-green-400 text-2xl mb-2">✅</div>
                <h3 className="text-xl font-semibold text-green-400 mb-2">NFT Minted Successfully!</h3>
                <p className="text-green-300 mb-4">Your skill proof has been stored on Solana blockchain</p>
                <p className="text-sm text-gray-400 font-mono break-all">Mint: {mintedNFT}</p>
              </div>
            ) : (
              <button
                onClick={handleMintNFT}
                disabled={isMinting}
                className="flex items-center gap-2 mx-auto px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
              >
                {isMinting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Minting NFT...
                  </>
                ) : (
                  <>
                    <Trophy size={20} />
                    Mint Skill NFT
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {result.passed && !wallet.connected && (
          <div className="text-center mb-6">
            <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-4">
              <p className="text-yellow-300">Connect your wallet to mint your skill NFT</p>
            </div>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={onBack}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Back to Skills
          </button>
        </div>
      </div>
    </div>
  );
}
