"use client";

import { useState } from "react";
import { Video, Users, Zap, Shield, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard` });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
              <Video className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-2xl sm:text-3xl font-bold text-white">
              DoMeet
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-blue-200">
            <Shield className="w-4 h-4" />
            <span>Secure & Private</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left Side - Hero Content */}
            <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 rounded-full px-4 py-2 text-blue-200 text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>The future of video meetings</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Meet without
                  <span className="block mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    the hassle
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-blue-100/80 max-w-xl mx-auto lg:mx-0">
                  No more copying links. Just enter emails, create groups, and start collaborating instantly with crystal-clear video.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto lg:mx-0">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all group">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Instant Invites</h3>
                  <p className="text-sm text-blue-200/70">Send meeting links automatically via email</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all group">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Smart Groups</h3>
                  <p className="text-sm text-blue-200/70">Create groups once, reuse forever</p>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2 text-blue-200/80">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm">100% Free</span>
                </div>
                <div className="flex items-center gap-2 text-blue-200/80">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm">No Credit Card</span>
                </div>
                <div className="flex items-center gap-2 text-blue-200/80">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm">Unlimited Meetings</span>
                </div>
              </div>
            </div>

            {/* Right Side - Sign In Card */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
                
                {/* Card */}
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl">
                  <div className="text-center space-y-6">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/50 mb-2">
                      <Video className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    
                    {/* Title */}
                    <div className="space-y-2">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                        Welcome Back
                      </h2>
                      <p className="text-blue-200/80 text-sm sm:text-base">
                        Sign in to access your meetings and groups
                      </p>
                    </div>

                    {/* Google Sign In Button */}
                    <button
                      onClick={handleSignIn}
                      disabled={isLoading}
                      className="group w-full mt-8 px-6 py-4 bg-white hover:bg-gray-50 rounded-xl font-semibold text-gray-900 shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                    >
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                      
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24">
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
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    {/* Privacy Note */}
                    <p className="text-xs text-blue-200/60 pt-4">
                      By signing in, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </div>
                </div>

                {/* Stats Cards Below */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-white">10K+</div>
                    <div className="text-xs text-blue-200/70">Users</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-white">50K+</div>
                    <div className="text-xs text-blue-200/70">Meetings</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-white">99.9%</div>
                    <div className="text-xs text-blue-200/70">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-blue-200/60">
          <p>© 2025 DoMeet. Built for seamless collaboration.</p>
        </div>
      </footer>
    </div>
  );
}