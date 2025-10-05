// app/providers/StreamProvider.tsx
'use client'; // CLIENT COMPONENT - Uses Stream SDK

import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';
import '@stream-io/video-react-sdk/dist/css/styles.css';

interface StreamProviderProps {
  children: ReactNode;
}

export default function StreamProvider({ children }: StreamProviderProps) {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initClient = async () => {
      try {
        // Get current user - you can customize this
        const userId = `user-${Math.random().toString(36).substring(7)}`;
        const userName = `User ${userId.slice(-4)}`;

        // Fetch token from your API
        const response = await fetch('/api/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });

        const { token, apiKey } = await response.json();

        // Initialize Stream client
        const streamClient = new StreamVideoClient({
          apiKey,
          user: {
            id: userId,
            name: userName,
          },
          token,
        });

        setClient(streamClient);
      } catch (error) {
        console.error('Failed to initialize Stream client:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initClient();

    return () => {
      client?.disconnectUser();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading Stream...</div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">Failed to load Stream</div>
      </div>
    );
  }

  return <StreamVideo client={client}>{children}</StreamVideo>;
}