'use client';

import {
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

  const uniqueParticipants = Array.from(new Map(participants.map(p => [p.userId, p])).values());
  const meetingId = typeof window !== 'undefined'
    ? window.location.pathname.split('/').pop()
    : '1234567890';

  const handleCopyMeetingId = () => {
    if (meetingId) {
      const el = document.createElement('textarea');
      el.value = meetingId;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
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
    <div className="relative h-full w-full flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/60 to-transparent p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Meeting Info */}
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20 shadow-md">
              <div className="text-xs text-gray-300 mb-1">Meeting ID</div>
              <div className="flex items-center gap-2">
                <code className="text-white font-mono font-semibold text-sm">{meetingId}</code>
                <button
                  onClick={handleCopyMeetingId}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  title="Copy meeting ID"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-300" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/20 flex gap-1 shadow-md">
              <button
                onClick={() => setLayoutMode('speaker')}
                className={`p-2 rounded-lg transition-all ${layoutMode === 'speaker'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-white/10'}`}
                title="Speaker View"
              >
                <Monitor className="w-5 h-5" />
              </button>
              <button
                onClick={() => setLayoutMode('grid')}
                className={`p-2 rounded-lg transition-all ${layoutMode === 'grid'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-white/10'}`}
                title="Grid View"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => setShowParticipants(!showParticipants)}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-all border border-white/20 shadow-md"
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">{uniqueParticipants.length}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="flex-1 relative p-4 overflow-auto">
        <div className={`h-full w-full ${layoutMode === 'grid' ? 'grid gap-4 p-2' : 'flex items-center justify-center p-2'}`}
          style={layoutMode === 'grid' ? {
            gridTemplateColumns: uniqueParticipants.length === 1
              ? '1fr'
              : uniqueParticipants.length <= 4
                ? 'repeat(auto-fit, minmax(350px, 1fr))'
                : 'repeat(auto-fit, minmax(300px, 1fr))',
            gridTemplateRows: uniqueParticipants.length === 1
              ? '1fr'
              : uniqueParticipants.length <= 4
                ? 'repeat(auto-fit, minmax(300px, 1fr))'
                : 'auto'
          } : undefined}
        >
          {uniqueParticipants.map((participant) => (
            <div
              key={participant.sessionId}
              className={`${layoutMode === 'speaker' && !participant.isLocalParticipant
                ? 'w-full h-full max-w-6xl mx-auto'
                : layoutMode === 'speaker'
                  ? 'absolute bottom-[100px] right-4 w-52 h-36 z-20 shadow-2xl transition-all duration-300 hover:scale-[1.02]'
                  : 'w-full h-full'} bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700`}
            >
              <ParticipantView participant={participant as StreamVideoParticipant} ParticipantViewUI={null} />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium truncate drop-shadow-lg">
                    {participant.name || participant.userId}
                    {participant.isLocalParticipant && ' (You)'}
                  </span>
                  {!participant.publishedTracks || participant.publishedTracks.length === 0
                    ? <MicOff className="w-4 h-4 text-red-400 drop-shadow-lg" />
                    : <Mic className="w-4 h-4 text-green-400 drop-shadow-lg" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Participants Sidebar */}
      {showParticipants && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[45]" onClick={() => setShowParticipants(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-80 max-w-xs bg-gray-800 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Participants</h3>
                <span className="text-lg font-medium text-gray-400">({uniqueParticipants.length})</span>
              </div>
              <button onClick={() => setShowParticipants(false)} className="p-2 hover:bg-gray-700 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {uniqueParticipants.map((participant) => {
                const isMuted = !participant.publishedTracks || participant.publishedTracks.length === 0;
                return (
                  <div key={participant.sessionId} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-all shadow-sm border border-gray-700">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-base">{participant.name?.charAt(0).toUpperCase() || 'U'}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{participant.name || 'Anonymous User'}</p>
                      <p className="text-xs text-blue-400">{participant.isLocalParticipant ? '(You)' : participant.userId}</p>
                    </div>
                    <div className="flex-shrink-0 flex gap-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isMuted ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
                        {isMuted ? <MicOff className="w-4 h-4 text-red-400" /> : <Mic className="w-4 h-4 text-green-400" />}
                      </div>
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
