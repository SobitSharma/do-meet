// app/components/VideoCall.tsx
'use client';

import {
  CallControls,
  ParticipantView,
  useCallStateHooks,
  StreamVideoParticipant,
} from '@stream-io/video-react-sdk';
import { useState } from 'react';
import { Users, X, Copy, Check, Monitor, LayoutGrid, Mic, MicOff } from 'lucide-react';

export default function VideoCall() {
  const { useCallCallingState, useParticipants } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participants = useParticipants();
  
  const [showParticipants, setShowParticipants] = useState(false);
  const [copied, setCopied] = useState(false);
  const [layoutMode, setLayoutMode] = useState<'speaker' | 'grid'>('speaker');

  // Get unique participants by userId
  const uniqueParticipants = Array.from(
    new Map(participants.map(p => [p.userId, p])).values()
  );

  // Get meeting ID from URL
  const meetingId = typeof window !== 'undefined' 
    ? window.location.pathname.split('/').pop() 
    : '';

  const handleCopyMeetingId = async () => {
    if (meetingId) {
      await navigator.clipboard.writeText(meetingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (callingState !== 'joined') {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl text-white font-medium">Joining call...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen bg-gray-900 flex flex-col">
      {/* Header Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/60 to-transparent p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Meeting Info */}
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
              <div className="text-xs text-gray-300 mb-1">Meeting ID</div>
              <div className="flex items-center gap-2">
                <code className="text-white font-mono font-semibold">{meetingId}</code>
                <button
                  onClick={handleCopyMeetingId}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                  title="Copy meeting ID"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-300" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Layout Toggle */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-1 border border-white/20 flex gap-1">
              <button
                onClick={() => setLayoutMode('speaker')}
                className={`p-2 rounded transition-all ${
                  layoutMode === 'speaker' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-300 hover:bg-white/10'
                }`}
                title="Speaker view"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutMode('grid')}
                className={`p-2 rounded transition-all ${
                  layoutMode === 'grid' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-300 hover:bg-white/10'
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Participants Button */}
            <button
              onClick={() => setShowParticipants(!showParticipants)}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all border border-white/20"
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">{uniqueParticipants.length}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Video Layout */}
      <div className="flex-1 relative p-4">
        <div className={`h-full w-full ${
          layoutMode === 'grid' 
            ? 'grid gap-2' 
            : 'flex items-center justify-center'
        }`}
        style={layoutMode === 'grid' ? {
          gridTemplateColumns: uniqueParticipants.length === 1 
            ? '1fr' 
            : uniqueParticipants.length === 2 
            ? 'repeat(2, 1fr)' 
            : uniqueParticipants.length <= 4
            ? 'repeat(2, 1fr)'
            : 'repeat(3, 1fr)',
          gridTemplateRows: uniqueParticipants.length <= 2 
            ? '1fr' 
            : uniqueParticipants.length <= 4
            ? 'repeat(2, 1fr)'
            : 'auto'
        } : undefined}
        >
          {uniqueParticipants.map((participant) => (
            <div 
              key={participant.sessionId}
              className={`${
                layoutMode === 'speaker' && !participant.isLocalParticipant
                  ? 'w-full h-full max-w-6xl'
                  : layoutMode === 'speaker'
                  ? 'absolute bottom-24 right-4 w-48 h-36'
                  : 'w-full h-full'
              } bg-gray-800 rounded-lg overflow-hidden shadow-xl`}
            >
              <ParticipantView 
                participant={participant}
                ParticipantViewUI={null}
              />
              {/* Custom Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium truncate">
                    {participant.name || participant.userId}
                    {participant.isLocalParticipant && ' (You)'}
                  </span>
                  {!participant.publishedTracks || participant.publishedTracks.length === 0 ? (
                    <MicOff className="w-4 h-4 text-red-400" />
                  ) : (
                    <Mic className="w-4 h-4 text-green-400" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6">
        <div className="max-w-4xl mx-auto">
          <CallControls />
        </div>
      </div>

      {/* Participants Sidebar */}
      {showParticipants && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowParticipants(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-gray-800 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-white">
                  Participants ({uniqueParticipants.length})
                </h3>
              </div>
              <button
                onClick={() => setShowParticipants(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Custom Participants List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {uniqueParticipants.map((participant) => {
                // Check if participant has audio track published
                const hasAudio = participant.publishedTracks && 
                  participant.publishedTracks.length > 0;
                
                return (
                  <div
                    key={participant.sessionId}
                    className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    {/* Avatar */}
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-sm">
                        {participant.name?.charAt(0).toUpperCase() || participant.userId?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">
                        {participant.name || participant.userId || 'Anonymous'}
                        {participant.isLocalParticipant && (
                          <span className="ml-2 text-xs text-blue-400">(You)</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {participant.userId}
                      </p>
                    </div>

                    {/* Mic Status */}
                    <div className="flex-shrink-0">
                      {hasAudio ? (
                        <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                          <Mic className="w-4 h-4 text-green-400" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                          <MicOff className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}