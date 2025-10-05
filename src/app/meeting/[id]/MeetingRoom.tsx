// app/meeting/[id]/MeetingRoom.tsx
'use client';

import { useEffect, useState } from 'react';
import { useStreamVideoClient, Call, StreamCall } from '@stream-io/video-react-sdk';
import VideoCall from '@/app/components/VideoCall';
import { Video, Loader2, AlertCircle } from 'lucide-react';

interface MeetingRoomProps {
  meetingId: string;
}

export default function MeetingRoom({ meetingId }: MeetingRoomProps) {
  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call | null>(null);
  const [isJoining, setIsJoining] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!client) return;

    let mounted = true;

    const setupCall = async () => {
      try {
        setIsJoining(true);
        setError(null);

        // Create or join the call
        const newCall = client.call('default', meetingId);
        
        // Join with video and audio enabled
        await newCall.join({ 
          create: true,
          data: {
            members: [],
          }
        });

        if (mounted) {
          setCall(newCall);
        }
      } catch (err) {
        console.error('Error joining call:', err);
        if (mounted) {
          setError('Failed to join the meeting. Please try again.');
        }
      } finally {
        if (mounted) {
          setIsJoining(false);
        }
      }
    };

    setupCall();

    return () => {
      mounted = false;
      if (call) {
        call.leave().catch(console.error);
      }
    };
  }, [client, meetingId]);

  // Loading State
  if (isJoining) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
              <Video className="w-12 h-12 text-blue-400" />
            </div>
            <Loader2 className="w-8 h-8 text-blue-400 animate-spin absolute -bottom-2 left-1/2 -ml-4" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Joining Meeting
          </h2>
          <p className="text-gray-400 mb-4">Please wait while we connect you...</p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 inline-block border border-white/20">
            <p className="text-sm text-gray-300">
              Meeting ID: <span className="font-mono font-semibold text-white">{meetingId}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !call) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-red-500/20 text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Connection Failed
            </h2>
            <p className="text-gray-400 mb-6">
              {error || 'Unable to join the meeting. Please try again.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="mt-3 block w-full text-gray-400 hover:text-white transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success - Show Video Call
  return (
    <StreamCall call={call}>
      <VideoCall />
    </StreamCall>
  );
}