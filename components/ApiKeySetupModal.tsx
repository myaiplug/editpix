/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

interface ApiKeySetupModalProps {
  onSubmit: (apiKey: string) => void;
  onShowGuide: () => void;
  isOpen: boolean;
}

const ApiKeySetupModal: React.FC<ApiKeySetupModalProps> = ({ onSubmit, onShowGuide, isOpen }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
      setApiKey('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-scale-in">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#7C4DFF] to-[#00C2FF] rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">API Key Required</h2>
          <p className="text-gray-400">Enter your Google Gemini API key to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIza..."
              className="w-full bg-gray-800 border border-gray-600 text-gray-200 rounded-lg p-4 pr-12 text-base focus:ring-2 focus:ring-[#7C4DFF] focus:outline-none transition"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition"
            >
              {showKey ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          <div className="bg-[#7C4DFF]/10 border border-[#7C4DFF]/20 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-[#7C4DFF] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-[#7C4DFF]">
                <p className="font-semibold mb-1">Your API key is stored securely</p>
                <p className="text-[#7C4DFF]/80">It's encrypted and saved locally in your browser for 24 hours only.</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!apiKey.trim()}
            className="w-full bg-gradient-to-br from-[#7C4DFF] to-[#00C2FF] text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-[#7C4DFF]/30 hover:shadow-xl hover:shadow-[#7C4DFF]/40 hover:-translate-y-0.5 active:scale-95 disabled:from-gray-700 disabled:to-gray-600 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none text-base"
          >
            Save API Key
          </button>

          <button
            type="button"
            onClick={onShowGuide}
            className="w-full bg-transparent border border-gray-600 text-gray-300 font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:bg-white/5 hover:border-gray-500 active:scale-95 text-base"
          >
            Don't have an API key? Learn how to get one
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-xs text-gray-500 text-center">
            EditPix runs entirely in your browser. Your API key is never sent to our servers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySetupModal;
