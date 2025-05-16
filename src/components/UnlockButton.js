
'use client';

import { useState } from 'react';
import StatusMessage from './StatusMessage';
import { createSignMessage } from '@/lib/crypto';
import { useWallet } from '@civic/auth-web3/react';

export default function UnlockButton({ requestData, publicKey }) {
  const [status, setStatus] = useState(null);
  const [statusType, setStatusType] = useState('info');
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  
  // Get the full wallet object from Civic
  const wallet = useWallet({ type: 'solana' });

  if (!requestData || !publicKey) {
    return null;
  }

  const handleUnlock = async () => {
    try {
      setLoading(true);
      setStatus('Preparing signature request...');
      setStatusType('info');

      // For MVP purposes - check if we can sign without OTP
    
      try {
        // Build the message to sign
        const message = createSignMessage(requestData.lockId, requestData.requestId);
        const encodedMessage = new TextEncoder().encode(message);

        setStatus('Please approve the signature request in Civic popup...');

        // First try to use wallet.wallet.signMessage
        if (wallet.wallet && typeof wallet.wallet.signMessage === 'function') {
          const signatureBytes = await wallet.wallet.signMessage(encodedMessage);
          
          // Handle successful signature
          const signatureHex = Array.from(signatureBytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
            
          setStatus('Signature created, verifying...');
          
          // For MVP, simulate successful verification
          // setTimeout(() => {
          //   setStatus('✅ Access granted! Door unlocking...');
          //   setStatusType('success');
          //   setUnlocked(true);
          // }, 1000);
          
          // return;


        


                // Send to backend for verification
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: requestData.requestId,
          publicKey,
          signature: signatureHex,
          message
        }),
      });
        

      console.log("hiii:", JSON.stringify({
          requestId: requestData.requestId,
          publicKey,
          signature: signatureHex,
          message
        }));


        
      const result = await response.json();
      if (result.success) {
        setStatus('✅ Access granted! Door unlocking...');
        setStatusType('success');
        setUnlocked(true);
      } else {
        setStatus(`❌ Access denied: ${result.error || 'Unknown error'}`);
        setStatusType('error');
      }


    }

        // If that doesn't work, fall through to the mock success
      } catch (signError) {
        console.log("Signing error, falling back to mock:", signError);
        // Continue to mock success below
      }
   
    } catch (err) {
      console.error('Failed to sign message:', err);
      setStatus(`Failed to sign message: ${err.message}`);
      setStatusType('error');
    } finally {
      setLoading(false);
    }
  };

  const isWalletConnected = wallet?.address;

  return (
    <div className="my-4">
      <p className="mb-2">Sign and unlock:</p>
      <button
        onClick={handleUnlock}
        disabled={loading || unlocked || !isWalletConnected}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Signing...' : unlocked ? 'Unlocked!' : 'Sign & Unlock'}
      </button>

      {!isWalletConnected && (
        <div className="mt-2 text-amber-600">
          Wallet not connected properly. Please make sure your Civic wallet is connected.
        </div>
      )}

      {status && (
        <StatusMessage
          message={status}
          type={statusType}
          autoHide={statusType !== 'success' && statusType !== 'error'}
        />
      )}

      {unlocked && (
        <div className="mt-4 p-4 border-l-4 border-blue-500 bg-blue-50 text-blue-700 text-sm">
          <h3 className="font-bold">System Status</h3>
          <p>
            The system is now in active monitoring mode. The ESP32 controller is
            polling the server more frequently to ensure quick response times.
          </p>
          <p>
            This will automatically adjust back to normal polling after a period
            of inactivity to conserve resources.
          </p>
        </div>
      )}
    </div>
  );
}