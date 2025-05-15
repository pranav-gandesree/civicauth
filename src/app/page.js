
'use client';

import { useState } from 'react';
import Link from 'next/link';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import UnlockButton from '@/components/UnlockButton';
import UserLogin from '@/components/Login';
import CivicWallet from '@/components/CivicWallet';

export default function Home() {
  const [requestData, setRequestData] = useState(null);
  const [walletKey, setWalletKey] = useState(null);

  const handleRequestCreated = data => setRequestData(data);
  const handleWalletConnected = publicKey => setWalletKey(publicKey);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 bg-white shadow-md">
        <Link href="/" className="text-2xl font-bold text-purple-600">
          Heimdall
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/admin" className="text-sm font-medium text-gray-600 hover:text-purple-600">
           Admin Panel
          </Link>
          <UserLogin />
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-3xl mx-auto p-6 space-y-10">
        {/* Hero */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">Project Heimdall</h1>
          <p className="mt-2 text-lg text-gray-600">Smart Lock MVP</p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {/* Step 1 */}
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Step 1: Generate QR Code</h3>
            <QRCodeGenerator onRequestCreated={handleRequestCreated} />
          </div>

          {/* Step 2 */}
          {requestData && (
            <div className="p-6 bg-white rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Step 2: Connect Wallet</h3>
              <div className="space-y-4">
                <CivicWallet onConnect={handleWalletConnected} />
              </div>
            </div>
          )}

          {/* Step 3 */}
          {requestData && walletKey && (
            <div className="p-6 bg-white rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Step 3: Unlock</h3>
              <div className="flex flex-col items-center space-y-4">
                <UnlockButton requestData={requestData} publicKey={walletKey} className="w-full max-w-xs" />
                <button
                  onClick={() => setRequestData(null)}
                  className="px-4 py-2 border border-purple-600 text-purple-600 rounded-full hover:bg-purple-50 transition"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
