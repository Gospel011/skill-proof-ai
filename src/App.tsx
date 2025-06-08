import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletContextProvider } from './contexts/WalletContext';
import { WalletButton } from './components/WalletButton';
import { SkillSelector } from './components/SkillSelector';
import { ChallengeView } from './components/ChallengeView';
import { ResultsView } from './components/ResultsView';
import { NFTGallery } from './components/NFTGallery';
import { SkillTest, Challenge, GradingResult } from './types';
import { getChallengeBySkillId } from './services/skillTests';
import { Trophy, User } from 'lucide-react';

type AppState = 'home' | 'challenge' | 'results' | 'gallery';

function AppContent() {
  const { connected } = useWallet();
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [selectedSkill, setSelectedSkill] = useState<SkillTest | null>(null);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [gradingResult, setGradingResult] = useState<GradingResult | null>(null);
  const [submission, setSubmission] = useState<string>('');

  const handleSelectSkill = (skill: SkillTest) => {
    const challenge = getChallengeBySkillId(skill.id);
    if (challenge) {
      setSelectedSkill(skill);
      setCurrentChallenge(challenge);
      setCurrentState('challenge');
    }
  };

  const handleChallengeComplete = (result: GradingResult, userSubmission: string) => {
    setGradingResult(result);
    setSubmission(userSubmission);
    setCurrentState('results');
  };

  const handleBackToHome = () => {
    setCurrentState('home');
    setSelectedSkill(null);
    setCurrentChallenge(null);
    setGradingResult(null);
    setSubmission('');
  };

  const handleShowGallery = () => {
    setCurrentState('gallery');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🧠</div>
            <h1 className="text-2xl font-bold text-white">SkillProof AI</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {connected && (
              <button
                onClick={handleShowGallery}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <Trophy size={16} />
                My NFTs
              </button>
            )}
            <WalletButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        {!connected ? (
          <div className="max-w-4xl mx-auto text-center p-6">
            <div className="text-6xl mb-6">🚀</div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Prove Your Skills on Solana
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Take AI-assessed challenges, earn verifiable skill NFTs, and showcase your expertise on the blockchain.
            </p>
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Connect Your Wallet to Start</h3>
              <p className="text-gray-300 mb-6">
                Connect your Solana wallet to take skill tests and mint NFT proofs of your abilities.
              </p>
              <WalletButton />
            </div>
          </div>
        ) : (
          <>
            {currentState === 'home' && (
              <SkillSelector onSelectSkill={handleSelectSkill} />
            )}
            
            {currentState === 'challenge' && currentChallenge && (
              <ChallengeView
                challenge={currentChallenge}
                onComplete={handleChallengeComplete}
                onBack={handleBackToHome}
              />
            )}
            
            {currentState === 'results' && selectedSkill && gradingResult && (
              <ResultsView
                skillName={selectedSkill.name}
                result={gradingResult}
                submission={submission}
                onBack={handleBackToHome}
              />
            )}
            
            {currentState === 'gallery' && (
              <NFTGallery onBack={handleBackToHome} />
            )}
          </>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <WalletContextProvider>
      <AppContent />
    </WalletContextProvider>
  );
}

export default App;
