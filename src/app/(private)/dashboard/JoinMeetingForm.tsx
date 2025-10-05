'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JoinMeetingForm() {
  const [meetingId, setMeetingId] = useState('');
  const router = useRouter();

  const handleCreateMeeting = () => {
    const newMeetingId = Math.random().toString(36).substring(2, 10);
    router.push(`/meeting/${newMeetingId}`);
  };

  const handleJoinMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (meetingId.trim()) {
      router.push(`/meeting/${meetingId}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Create New Meeting */}
      <button
        onClick={handleCreateMeeting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
      >
        Create New Meeting
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or</span>
        </div>
      </div>

      {/* Join Existing Meeting */}
      <form onSubmit={handleJoinMeeting} className="space-y-4">
        <div>
          <label htmlFor="meetingId" className="block text-sm font-medium text-gray-700 mb-2">
            Meeting ID
          </label>
          <input
            type="text"
            id="meetingId"
            value={meetingId}
            onChange={(e) => setMeetingId(e.target.value)}
            placeholder="Enter meeting ID"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={!meetingId.trim()}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Join Meeting
        </button>
      </form>
    </div>
  );
}