// app/layout.jsx
import { Inter } from 'next/font/google';
import './globals.css';
import { CivicAuthProvider } from '@civic/auth-web3/nextjs';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Project Heimdall - Smart Lock',
  description: 'A secure smart lock system using blockchain authentication',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CivicAuthProvider>
           
          {children}
        </CivicAuthProvider>
      </body>
    </html>
  );
}
