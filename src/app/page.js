
// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import QRCodeGenerator from '@/components/QRCodeGenerator';
// import UnlockButton from '@/components/UnlockButton';
// import UserLogin from '@/components/Login';
// import CivicWallet from '@/components/CivicWallet';

// export default function Home() {
//   const [requestData, setRequestData] = useState(null);
//   const [walletKey, setWalletKey] = useState(null);

//   const handleRequestCreated = data => setRequestData(data);
//   const handleWalletConnected = publicKey => setWalletKey(publicKey);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navbar */}
//       <nav className="flex items-center justify-between p-6 bg-white shadow-md">
//         <Link href="/" className="text-2xl font-bold text-purple-600">
//           Heimdall
//         </Link>
//         <div className="flex items-center space-x-4">
//           <Link href="/admin" className="text-sm font-medium text-gray-600 hover:text-purple-600">
//            Admin Panel
//           </Link>
//           <UserLogin />
//         </div>
//       </nav>

//       {/* Main content */}
//       <main className="max-w-3xl mx-auto p-6 space-y-10">
//         {/* Hero */}
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold text-gray-800">Project Heimdall</h1>
//           <p className="mt-2 text-lg text-gray-600">Smart Lock MVP</p>
//         </div>

//         {/* Steps */}
//         <div className="space-y-8">
       
//           <div className="p-6 bg-white rounded-2xl shadow-lg">
//             <h3 className="text-xl font-semibold mb-4">Step 1: Generate QR Code</h3>
//             <QRCodeGenerator onRequestCreated={handleRequestCreated} />
//           </div>
          

//           {/* Step 1 */}
//           {requestData && (
//             <div className="p-6 bg-white rounded-2xl shadow-lg">
//               <h3 className="text-xl font-semibold mb-4">Step 2: Connect Wallet</h3>
//               <div className="space-y-4">
//                 <CivicWallet onConnect={handleWalletConnected} />
//               </div>
//             </div>
//           )}

//           {/* Step 2 */}
//           {requestData && walletKey && (
//             <div className="p-6 bg-white rounded-2xl shadow-lg">
//               <h3 className="text-xl font-semibold mb-4">Step 3: Unlock</h3>
//               <div className="flex flex-col items-center space-y-4">
//                 <UnlockButton requestData={requestData} publicKey={walletKey} className="w-full max-w-xs" />
//                 <button
//                   onClick={() => setRequestData(null)}
//                   className="px-4 py-2 border border-purple-600 text-purple-600 rounded-full hover:bg-purple-50 transition"
//                 >
//                   Reset
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }



































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
  const [currentStep, setCurrentStep] = useState(1);

  const handleRequestCreated = data => {
    setRequestData(data);
    setCurrentStep(2);
  };
  
  const handleWalletConnected = publicKey => {
    setWalletKey(publicKey);
    setCurrentStep(3);
  };

  const handleReset = () => {
    setRequestData(null);
    setWalletKey(null);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-70 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">H</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                Heimdall
              </span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/admin" className="text-gray-600 hover:text-purple-600 text-sm font-medium transition-colors">
                Admin Panel
              </Link>
              <UserLogin />
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-4xl mx-auto py-12 px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Project Heimdall
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Secure Smart Lock System
          </p>
        </div>

        {/* Progress tracker */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? "bg-purple-600" : "bg-gray-200"
              }`}>
                <span className="text-white font-bold">1</span>
              </div>
              <span className={`mt-2 text-sm ${
                currentStep >= 1 ? "text-purple-600 font-medium" : "text-gray-500"
              }`}>Generate QR</span>
            </div>
            
            <div className={`flex-1 h-1 mx-2 ${
              currentStep >= 2 ? "bg-purple-600" : "bg-gray-200"
            }`} />
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? "bg-purple-600" : "bg-gray-200"
              }`}>
                <span className="text-white font-bold">2</span>
              </div>
              <span className={`mt-2 text-sm ${
                currentStep >= 2 ? "text-purple-600 font-medium" : "text-gray-500"
              }`}>Connect Wallet</span>
            </div>
            
            <div className={`flex-1 h-1 mx-2 ${
              currentStep >= 3 ? "bg-purple-600" : "bg-gray-200"
            }`} />
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= 3 ? "bg-purple-600" : "bg-gray-200"
              }`}>
                <span className="text-white font-bold">3</span>
              </div>
              <span className={`mt-2 text-sm ${
                currentStep >= 3 ? "text-purple-600 font-medium" : "text-gray-500"
              }`}>Unlock</span>
            </div>
          </div>
        </div>

        {/* Steps Content */}
        <div className="space-y-6">
          {/* Step 1: QR Code Generator */}
          <div className={`transition-all duration-300 ${currentStep === 1 ? "opacity-100" : "opacity-50"}`}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-4 px-6">
                <h3 className="text-xl font-semibold text-white">Generate QR Code</h3>
              </div>
              <div className="p-6">
                <QRCodeGenerator onRequestCreated={handleRequestCreated} />
              </div>
            </div>
          </div>

          {/* Step 2: Connect Wallet */}
          <div className={`transition-all duration-300 ${currentStep === 2 ? "opacity-100" : "opacity-50"}`}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-4 px-6">
                <h3 className="text-xl font-semibold text-white">Connect Wallet</h3>
                <p className="text-purple-100 text-sm">Link your crypto wallet to verify identity</p>
              </div>
              <div className="p-6">
                <CivicWallet onConnect={handleWalletConnected} />
              </div>
            </div>
          </div>

          {/* Step 3: Unlock */}
          <div className={`transition-all duration-300 ${currentStep === 3 ? "opacity-100" : "opacity-50"}`}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-4 px-6">
                <h3 className="text-xl font-semibold text-white">Unlock Access</h3>
                <p className="text-purple-100 text-sm">Authenticate and unlock your smart lock</p>
              </div>
              <div className="p-6 flex flex-col items-center">
                <UnlockButton 
                  requestData={requestData} 
                  publicKey={walletKey} 
                  className="w-full max-w-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                />
                
                <button
                  onClick={handleReset}
                  className="mt-4 px-6 py-2 border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium"
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}