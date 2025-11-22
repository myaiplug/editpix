/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface FaviconCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateFavicon: (prompt: string) => void;
}

const FaviconCreatorModal: React.FC<FaviconCreatorModalProps> = ({ isOpen, onClose, onGenerateFavicon }) => {
  const [prompt, setPrompt] = useState('');
  const [iconType, setIconType] = useState('letter');

  if (!isOpen) return null;

  const iconTypes = [
    { id: 'letter', name: 'Letter Icon', description: 'Single letter or initials' },
    { id: 'symbol', name: 'Symbol', description: 'Icon or abstract shape' },
    { id: 'minimal', name: 'Minimal Logo', description: 'Simplified brand mark' },
  ];

  const handleGenerate = () => {
    if (prompt.trim()) {
      const enhancedPrompt = `Create a favicon/app icon that is: ${prompt}. Style: ${iconType}. Design requirements: Simple, bold, and instantly recognizable at small sizes (16x16, 32x32, 64x64 pixels). Use high contrast colors. Center the main element. Make it work on both light and dark backgrounds. The icon should be square format with minimal detail - focus on a single strong visual element. Use flat design principles with solid colors. Ensure it's scalable and looks sharp at very small sizes.`;
      onGenerateFavicon(enhancedPrompt);
      setPrompt('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-100">Favicon Generator</h2>
            <p className="text-sm text-gray-400 mt-1">Create perfectly sized favicons and app icons</p>
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
              Describe your icon
            </label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Letter T in blue', 'Mountain symbol', 'Tech company icon'"
              className="w-full bg-gray-900/50 border border-gray-700 text-gray-200 rounded-lg p-4 text-base focus:ring-2 focus:ring-green-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Icon type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {iconTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setIconType(type.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    iconType === type.id
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-gray-700 bg-gray-900/30 hover:border-gray-600'
                  }`}
                >
                  <div className="font-semibold text-gray-200">{type.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-gray-300">
                <strong className="text-green-400">Important:</strong> Favicons work best when kept simple. Use a single letter, shape, or symbol with high contrast colors. The icon will be optimized for multiple sizes.
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <div className="text-sm text-gray-400 space-y-2">
              <div className="font-semibold text-gray-300 mb-2">Size Information:</div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>16x16 - Browser tab favicon</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>32x32 - Standard favicon</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>192x192 - Android app icon</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>512x512 - High-res app icon</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim()}
            className="w-full bg-gradient-to-br from-green-600 to-green-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/40 hover:-translate-y-px active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Generate Favicon
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaviconCreatorModal;
