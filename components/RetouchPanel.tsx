/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

interface RetouchPanelProps {
  onApplyRetouch: (prompt: string) => void;
  isLoading: boolean;
  isAdminMode?: boolean;
  editHotspot: { x: number, y: number } | null;
  prompt: string;
  onPromptChange: (prompt: string) => void;
}

const RetouchPanel: React.FC<RetouchPanelProps> = ({ 
  onApplyRetouch, 
  isLoading, 
  isAdminMode = false,
  editHotspot,
  prompt,
  onPromptChange
}) => {
  const [selectedPresetPrompt, setSelectedPresetPrompt] = useState<string | null>(null);
  const [showMorePresets, setShowMorePresets] = useState(false);

  const basicPresets = [
    { name: 'Brighten Area', prompt: 'Brighten this area naturally while maintaining texture and detail' },
    { name: 'Darken Area', prompt: 'Darken this area subtly while preserving natural look' },
    { name: 'Sharpen Detail', prompt: 'Enhance sharpness and clarity in this specific area' },
    { name: 'Soften Area', prompt: 'Apply gentle softening to this area while keeping it natural' },
  ];

  const morePresets = [
    { name: 'Color Pop', prompt: 'Enhance color vibrancy and saturation in this area' },
    { name: 'Reduce Noise', prompt: 'Reduce noise and grain in this area while maintaining detail' },
    { name: 'Add Contrast', prompt: 'Increase contrast in this area for more definition' },
    { name: 'Warm Tone', prompt: 'Add warm, golden tones to this area' },
  ];

  const adminPresets = [
    { name: 'Remove Blemish', prompt: 'Remove any blemishes, spots, or imperfections from the skin while maintaining natural skin texture and pores' },
    { name: 'Whiten Teeth', prompt: 'Naturally whiten and brighten teeth, removing any discoloration while keeping them looking realistic and not artificially white' },
    { name: 'Enhance Eyes', prompt: 'Enhance eye clarity, add natural catchlights, slightly brighten the iris, and sharpen eye details for a captivating look' },
    { name: 'Smooth Skin Pro', prompt: 'Apply professional skin smoothing with frequency separation technique: reduce imperfections while preserving natural skin texture, pores, and three-dimensional quality' },
  ];

  const handlePresetClick = (presetPrompt: string) => {
    setSelectedPresetPrompt(presetPrompt);
    onPromptChange(presetPrompt);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPromptChange(e.target.value);
    setSelectedPresetPrompt(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && editHotspot) {
      onApplyRetouch(prompt);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-md text-gray-400">
        {editHotspot ? 'Great! Now describe your localized edit below.' : 'Click an area on the image to make a precise edit.'}
      </p>

      {editHotspot && (
        <div className="w-full">
          {/* Basic Presets */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            {basicPresets.map(preset => (
              <button
                key={preset.name}
                onClick={() => handlePresetClick(preset.prompt)}
                disabled={isLoading}
                className={`w-full text-center bg-white/10 border border-transparent text-gray-200 font-semibold py-3 px-4 rounded-md transition-all duration-200 ease-in-out hover:bg-white/20 hover:border-white/20 active:scale-95 text-base disabled:opacity-50 disabled:cursor-not-allowed ${selectedPresetPrompt === preset.prompt ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-blue-500' : ''}`}
              >
                {preset.name}
              </button>
            ))}
          </div>

          {/* More Presets (collapsible) */}
          {showMorePresets && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3 animate-fade-in">
              {morePresets.map(preset => (
                <button
                  key={preset.name}
                  onClick={() => handlePresetClick(preset.prompt)}
                  disabled={isLoading}
                  className={`w-full text-center bg-white/10 border border-transparent text-gray-200 font-semibold py-3 px-4 rounded-md transition-all duration-200 ease-in-out hover:bg-white/20 hover:border-white/20 active:scale-95 text-base disabled:opacity-50 disabled:cursor-not-allowed ${selectedPresetPrompt === preset.prompt ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-blue-500' : ''}`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          )}

          {/* Admin Presets */}
          {isAdminMode && showMorePresets && (
            <div className="border-t border-purple-500/20 pt-3 mb-3">
              <div className="flex items-center justify-center gap-2 mb-3">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span className="text-sm font-bold text-purple-400">Pro Retouch Presets</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 animate-fade-in">
                {adminPresets.map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => handlePresetClick(preset.prompt)}
                    disabled={isLoading}
                    className={`w-full text-center bg-white/10 border border-purple-500/30 text-gray-200 font-semibold py-3 px-4 rounded-md transition-all duration-200 ease-in-out hover:bg-white/20 hover:border-purple-500/50 active:scale-95 text-base disabled:opacity-50 disabled:cursor-not-allowed ${selectedPresetPrompt === preset.prompt ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-purple-500' : ''}`}
                  >
                    {preset.name}
                    <span className="ml-2 text-xs text-purple-400">★</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Show More/Less Button */}
          <button
            onClick={() => setShowMorePresets(!showMorePresets)}
            className="flex items-center justify-center gap-2 w-full text-center bg-transparent border border-white/20 text-gray-300 font-semibold py-2 px-4 rounded-md transition-all duration-200 ease-in-out hover:bg-white/10 hover:border-white/30 active:scale-95 text-base mb-3"
          >
            {showMorePresets ? 'Show Less' : 'Show More Options'}
            <svg className={`w-5 h-5 transition-transform ${showMorePresets ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
        <input
          type="text"
          value={prompt}
          onChange={handleCustomChange}
          placeholder={editHotspot ? "e.g., 'change my shirt color to blue'" : "First click a point on the image"}
          className="flex-grow bg-gray-800 border border-gray-700 text-gray-200 rounded-lg p-5 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition w-full disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isLoading || !editHotspot}
        />
        <button 
          type="submit"
          className="bg-gradient-to-br from-blue-600 to-blue-500 text-white font-bold py-5 px-8 text-lg rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner disabled:from-blue-800 disabled:to-blue-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
          disabled={isLoading || !prompt.trim() || !editHotspot}
        >
          Generate
        </button>
      </form>
    </div>
  );
};

export default RetouchPanel;
