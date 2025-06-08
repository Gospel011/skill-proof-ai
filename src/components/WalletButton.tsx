import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function WalletButton() {
  return (
    <div className="wallet-adapter-button-trigger">
      <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-lg !font-medium" />
    </div>
  );
}
