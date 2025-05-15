


'use client';

import { useEffect, useState } from 'react';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { useWallet, CivicWalletAdapter } from '@civic/auth-web3/react';

const useConnection = () => {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const con = new Connection(clusterApiUrl('devnet'));
    setConnection(con);
  }, []);

  return { connection };
};

// A simple hook to get the wallet's balance in lamports
const useBalance = () => {
  const [balance, setBalance] = useState();
  // The Solana Wallet Adapter hooks
  const { connection } = useConnection();
  const { address } = useWallet({ type: 'solana' });

  const publicKey = address ? new PublicKey(address) : null;

  useEffect(() => {
    if (connection && publicKey) {
      connection.getBalance(publicKey).then(setBalance);
    }
  }, [connection, publicKey]);

  return balance;
};

// Separate component for the app content that needs access to hooks
const Wallet = ({ onConnect = () => {} }) => {
  // Get the Solana wallet from Civic
  const wallet = useWallet({ type: 'solana' });

  // Get the Solana wallet balance
  const balance = useBalance();

  useEffect(() => {
    // When the wallet is connected, notify parent component with the public key
    if (wallet.address) {
      onConnect(wallet.address);
      console.log('Wallet connected:', wallet.wallet);
    }
  }, [wallet.address, onConnect]);

  // Handle connect wallet button click
  const handleConnect = async () => {
    try {
      if (wallet.adapter && !wallet.adapter.connected) {
        await wallet.adapter.connect();
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <div className="space-y-4">
      {!wallet.address ? (
        <button
          onClick={handleConnect}
          className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
        >
          Connect Civic Wallet
        </button>
      ) : (
        <div>
          <div className="p-4 border border-green-500 rounded bg-green-50 text-green-800">
            ✅ Wallet Connected
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600">Wallet address: {wallet.address}</p>
            <p className="text-sm text-gray-600">
              Balance: {balance !== null && balance !== undefined ? `${balance / 1e9} SOL` : 'loading...'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;