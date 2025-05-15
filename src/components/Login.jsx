

'use client';

import { UserButton } from '@civic/auth/react';
import { useUser } from '@civic/auth-web3/react';

export default function UserLogin({ onConnect }) {
  const { user } = useUser();


  return (
    <div className="flex items-center space-x-4">
      <UserButton className="text-sm !border-none !hover:none" />
    </div>
  );
}
