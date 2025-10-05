// app/page.tsx
import JoinMeetingForm from "./JoinMeetingForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6 lg:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome to Do-Meet
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with anyone, anywhere. Start an instant meeting or join with a code.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Meeting Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-gray-100">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Get Started
                </h2>
                <p className="text-gray-600">
                  Create a new meeting or join an existing one
                </p>
              </div>
              
              <JoinMeetingForm />
            </div>
          </div>

          {/* Right Side - Features */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">HD Video & Audio</h3>
              </div>
              <p className="text-blue-100">
                Crystal clear video and audio quality for seamless communication
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Secure & Private</h3>
              </div>
              <p className="text-gray-600">
                End-to-end encryption keeps your conversations private and secure
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Unlimited Participants</h3>
              </div>
              <p className="text-gray-600">
                Host meetings with unlimited participants at no extra cost
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">100K+</div>
            <div className="text-gray-600 text-sm">Active Users</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-indigo-600 mb-2">99.9%</div>
            <div className="text-gray-600 text-sm">Uptime</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
            <div className="text-gray-600 text-sm">Countries</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-pink-600 mb-2">5M+</div>
            <div className="text-gray-600 text-sm">Meetings Hosted</div>
          </div>
        </div>
      </div>
    </main>
  );
}