
/**
 * @type {import('next').NextConfig}
 */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs"


const withCivicAuth = createCivicAuthPlugin({
  clientId:  `${process.env.CLIENT_ID}`,
});


const nextConfig = {
  experimental: {
    // Enable if needed for specific experimental features
    // appDir: true,
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer'),
    };
    
    return config;
  },
  
  // Disable static export for now to fix build issues
  output: 'standalone',
};


export default withCivicAuth(nextConfig);