"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useWalletContext } from '@/contexts/WalletContext';
import { Check } from 'lucide-react';

export const WalletConnect = () => {
  const { isConnected, address, connect } = useWalletContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await connect();
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wallet-status text-xs flex items-center justify-end min-w-[180px]">
      {isConnected ? (
        <div className="flex items-center space-x-2">
          <Check className="h-3 w-3 text-[#00ff41]" />
          <span className="font-mono">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>
      ) : (
        <Button
          onClick={handleConnect}
          disabled={isLoading}
          className="bg-transparent border border-[#00ff41] text-[#00ff41] hover:bg-[#003b00] transition-colors text-xs py-1 h-auto"
        >
          {isLoading ? 'Connecting...' : 'Initialize Connection Protocol'}
        </Button>
      )}
    </div>
  );
};