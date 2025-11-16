/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface ImageGeneratorPanelProps {
  onGenerateImage: (prompt: string, aspectRatio: string) => void;
  isLoading: boolean;
}

const ImageGeneratorPanel: React.FC<ImageGeneratorPanelProps> = ({ onGenerateImage, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('1:1');
  const [showExamples, setShowExamples] = useState(false);

  const aspectRatios = [
    { label: 'Square', value: '1:1' },
    { label: 'Portrait', value: '9:16' },
    { label: 'Landscape', value: '16:9' },
    { label: 'Wide', value: '21:9' },
  ];

  const examplePrompts = [
    'A majestic mountain landscape at sunset with dramatic clouds',
    'A futuristic cityscape with neon lights and flying cars',
    'A cozy coffee shop interior with warm lighting and plants',
    'An abstract geometric pattern in vibrant colors',
    'A serene beach scene with crystal clear water and palm trees',
    'A magical forest with glowing mushrooms and fireflies',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerateImage(prompt, selectedAspectRatio);
    }
  };

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  return (
    <div className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-6 flex flex-col gap-4 animate-fade-in backdrop-blur-sm">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-200 mb-2">AI Image Generator</h3>
        <p className="text-sm text-gray-400">Create stunning images from text descriptions</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Describe your image
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'A beautiful sunset over a calm ocean with sailboats'"
            className="w-full bg-gray-800 border border-gray-600 text-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none disabled:cursor-not-allowed disabled:opacity-60 text-base min-h-[100px]"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Aspect Ratio
          </label>
          <div className="grid grid-cols-4 gap-2">
            {aspectRatios.map((ratio) => (
              <button
                key={ratio.value}
                type="button"
                onClick={() => setSelectedAspectRatio(ratio.value)}
                disabled={isLoading}
                className={`text-center border py-3 px-4 rounded-md transition-all duration-200 ease-in-out font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed ${
                  selectedAspectRatio === ratio.value
                    ? 'bg-blue-500 border-blue-400 text-white'
                    : 'bg-white/10 border-gray-600 text-gray-300 hover:bg-white/20'
                }`}
              >
                {ratio.label}
                <div className="text-xs mt-1 opacity-70">{ratio.value}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full bg-gradient-to-br from-blue-600 to-blue-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-base disabled:from-blue-800 disabled:to-blue-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? 'Generating...' : 'Generate Image'}
        </button>
      </form>

      <div className="border-t border-gray-700 pt-4">
        <button
          onClick={() => setShowExamples(!showExamples)}
          className="flex items-center justify-center gap-2 w-full text-center bg-transparent border border-white/20 text-gray-300 font-semibold py-2 px-4 rounded-md transition-all duration-200 ease-in-out hover:bg-white/10 hover:border-white/30 active:scale-95 text-sm"
        >
          {showExamples ? 'Hide Examples' : 'Show Example Prompts'}
          <svg className={`w-4 h-4 transition-transform ${showExamples ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showExamples && (
          <div className="mt-3 grid gap-2 animate-fade-in">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                disabled={isLoading}
                className="text-left bg-white/5 border border-gray-700 text-gray-300 p-3 rounded-md transition-all duration-200 hover:bg-white/10 hover:border-gray-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {example}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGeneratorPanel;
