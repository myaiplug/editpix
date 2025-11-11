/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface ApiKeyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApiKeyGuideModal: React.FC<ApiKeyGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const providers = [
    {
      name: 'Google Gemini',
      description: 'Best for this app - Free tier includes generous image generation limits',
      freeLimit: '1,500 requests/day',
      link: 'https://aistudio.google.com/app/apikey',
      recommended: true,
    },
    {
      name: 'OpenAI DALL-E',
      description: 'High-quality images with creative styles',
      freeLimit: '$5 free credit for new users',
      link: 'https://platform.openai.com/api-keys',
      recommended: false,
    },
    {
      name: 'Stability AI',
      description: 'Stable Diffusion models for diverse image generation',
      freeLimit: '25 credits free on signup',
      link: 'https://platform.stability.ai/account/keys',
      recommended: false,
    },
    {
      name: 'Hugging Face',
      description: 'Access to multiple open-source models',
      freeLimit: 'Free tier available with rate limits',
      link: 'https://huggingface.co/settings/tokens',
      recommended: false,
    },
    {
      name: 'Replicate',
      description: 'Run various AI models via API',
      freeLimit: '$5 free credit for new users',
      link: 'https://replicate.com/account/api-tokens',
      recommended: false,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-2xl max-w-4xl w-full my-8 animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-gray-900 to-gray-800 border-b border-gray-700 rounded-t-2xl p-6 flex items-start justify-between z-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">API Key Guide</h2>
            <p className="text-gray-400">Everything you need to know about API keys</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* What is an API Key */}
          <section className="bg-gradient-to-br from-[#7C4DFF]/10 to-[#00C2FF]/10 border border-[#7C4DFF]/20 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">What is an API Key?</h3>
                <p className="text-gray-300 leading-relaxed">
                  An API key is like a password that lets EditPix communicate with AI services on your behalf. 
                  Think of it as a special code that proves you have permission to use AI image generation features.
                </p>
              </div>
            </div>
          </section>

          {/* Why You Need It */}
          <section className="bg-gradient-to-br from-[#7C4DFF]/10 to-[#00C2FF]/10 border border-[#7C4DFF]/20 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-[#7C4DFF]/20 p-3 rounded-lg">
                <svg className="w-6 h-6 text-[#7C4DFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Why Do You Need It?</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p><strong>Privacy & Control:</strong> You maintain full control over your AI usage and costs</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p><strong>Direct Access:</strong> Your requests go directly to AI providers for better performance</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p><strong>Free Tiers:</strong> Most providers offer generous free tiers perfect for personal use</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Get Free API Keys */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-4">Top 5 Free API Key Providers</h3>
            <p className="text-gray-400 mb-6">
              These services offer free API keys with generous limits. Click on any provider to get started:
            </p>
            
            <div className="space-y-4">
              {providers.map((provider) => (
                <a
                  key={provider.name}
                  href={provider.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-800/50 border border-gray-700 rounded-xl p-5 transition-all duration-200 hover:bg-gray-700/50 hover:border-gray-600 hover:shadow-lg group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                          {provider.name}
                        </h4>
                        {provider.recommended && (
                          <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                            RECOMMENDED
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{provider.description}</p>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-semibold text-green-400">{provider.freeLimit}</span>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Helpful Resources */}
          <section className="bg-gradient-to-br from-[#FFB84D]/10 to-[#FF9900]/10 border border-[#FFB84D]/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Helpful Resources</h3>
            <div className="space-y-3">
              <a
                href="https://www.youtube.com/results?search_query=what+is+an+api+key+explained"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-green-400 hover:text-green-300 transition-colors group"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="group-hover:underline">Video: What is an API? (Beginner Friendly)</span>
              </a>
              <a
                href="https://www.freecodecamp.org/news/what-is-an-api-in-english-please-b880a3214a82/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-green-400 hover:text-green-300 transition-colors group"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="group-hover:underline">Article: What is an API? In Plain English</span>
              </a>
              <a
                href="https://developers.google.com/ai/gemini-api/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-green-400 hover:text-green-300 transition-colors group"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="group-hover:underline">Docs: Google Gemini API Documentation</span>
              </a>
            </div>
          </section>

          {/* Security Note */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="text-sm">
                <p className="font-semibold text-yellow-300 mb-1">Keep Your API Key Safe</p>
                <p className="text-yellow-400/80">
                  Never share your API key publicly or commit it to version control. 
                  EditPix stores it securely in your browser and it expires after 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 p-6">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-br from-blue-600 to-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-95"
          >
            Got it! Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyGuideModal;
