/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface LogoCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateLogo: (prompt: string, style: string) => void;
}

const LogoCreatorModal: React.FC<LogoCreatorModalProps> = ({ isOpen, onClose, onGenerateLogo }) => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('modern');

  if (!isOpen) return null;

  const logoStyles = [
    { id: 'modern', name: 'Modern', description: 'Clean, minimalist design' },
    { id: 'vintage', name: 'Vintage', description: 'Classic, retro aesthetic' },
    { id: 'tech', name: 'Tech', description: 'Futuristic, innovative' },
    { id: 'elegant', name: 'Elegant', description: 'Sophisticated, refined' },
    { id: 'playful', name: 'Playful', description: 'Fun, creative' },
    { id: 'corporate', name: 'Corporate', description: 'Professional, trustworthy' },
  ];

  const handleGenerate = () => {
    if (prompt.trim()) {
      const enhancedPrompt = `Create a professional, high-quality logo for ${prompt}. Style: ${style}. The logo should be clean, scalable, and suitable for both light and dark backgrounds. Use vector-style graphics with simple, bold shapes. Make it memorable and instantly recognizable. Ensure it works well at small and large sizes.`;
      onGenerateLogo(enhancedPrompt, style);
      setPrompt('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-100">Logo Creator</h2>
            <p className="text-sm text-gray-400 mt-1">Professional high-quality logo generation</p>
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

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              What's your brand or business?
            </label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Tech Startup', 'Coffee Shop', 'Fitness App'"
              className="w-full bg-gray-900/50 border border-gray-700 text-gray-200 rounded-lg p-4 text-base focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Choose a style
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {logoStyles.map((styleOption) => (
                <button
                  key={styleOption.id}
                  onClick={() => setStyle(styleOption.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    style === styleOption.id
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-gray-700 bg-gray-900/30 hover:border-gray-600'
                  }`}
                >
                  <div className="font-semibold text-gray-200">{styleOption.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{styleOption.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-gray-300">
                <strong className="text-cyan-400">Pro Tip:</strong> Your logo will be generated at high resolution suitable for all uses. For best results, be specific about your brand identity.
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim()}
            className="w-full bg-gradient-to-br from-cyan-600 to-blue-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-px active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Generate Professional Logo
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoCreatorModal;
