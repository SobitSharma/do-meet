"use client";

import { useState } from "react";
import { Video, Users, Pencil, Zap, Shield, Clock } from "lucide-react";
import { signIn} from "next-auth/react";

export default function SignInPage() {
  const [isHovered, setIsHovered] = useState(false);

  const handleSignIn = () => {
    signIn("google", {callbackUrl:`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`})
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="w-full px-4 py-6 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Video className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DoMeet
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Features */}
          <div className="space-y-8 order-2 md:order-1">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Meet without the
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  hassle
                </span>
              </h1>
              <p className="text-lg text-gray-600">
                No more copying and pasting links. Just enter emails, create groups, and start collaborating instantly.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="flex items-start gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:border-blue-200 transition-all">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Instant Invites</h3>
                  <p className="text-sm text-gray-600">Enter emails and automatically send meeting links. No copy-paste needed.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:border-purple-200 transition-all">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Smart Groups</h3>
                  <p className="text-sm text-gray-600">Create groups once, reuse forever. Your team is just one click away.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:border-indigo-200 transition-all">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Pencil className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Real-time Whiteboard</h3>
                  <p className="text-sm text-gray-600">Collaborate visually with voice + whiteboard or full video meetings.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Sign In Card */}
          <div className="order-1 md:order-2">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-4">
                  <Video className="w-8 h-8 text-white" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">Welcome to DoMeet</h2>
                  <p className="text-gray-600">Sign in to start your seamless meeting experience</p>
                </div>

                <button
                  onClick={handleSignIn}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-full mt-8 px-6 py-4 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-blue-500 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-3 group"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="pt-6 flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    <span>Secure</span>
                  </div>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Free forever</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">Trusted by teams worldwide</p>
              <div className="mt-3 flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full"></div>
                ))}
                <span className="text-sm text-gray-600 ml-2">+10k users</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-4 py-6 md:px-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>© 2025 DoMeet. Built for seamless collaboration.</p>
        </div>
      </footer>
    </div>
  );
}