/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from './icons';

interface FilterPanelProps {
  onApplyFilter: (prompt: string) => void;
  isLoading: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onApplyFilter, isLoading }) => {
  const [selectedPresetPrompt, setSelectedPresetPrompt] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const presets = [
    { name: 'Synthwave', prompt: 'Apply a vibrant 80s synthwave aesthetic with neon magenta and cyan glows, and subtle scan lines.' },
    { name: 'Anime', prompt: 'Give the image a vibrant Japanese anime style, with bold outlines, cel-shading, and saturated colors.' },
    { name: 'Lomo', prompt: 'Apply a Lomography-style cross-processing film effect with high-contrast, oversaturated colors, and dark vignetting.' },
    { name: 'Glitch', prompt: 'Transform the image into a futuristic holographic projection with digital glitch effects and chromatic aberration.' },
    { name: 'Noir', prompt: 'Convert the image to a high-contrast black and white noir style, with deep shadows and dramatic lighting.' },
    { name: 'Infrared', prompt: 'Simulate an infrared photo effect, making foliage white and skies dark, with a dreamy, surreal look.' },
    { name: 'Oil Painting', prompt: 'Transform the image to look like a classical oil painting, with visible brush strokes and a textured canvas feel.' },
    { name: 'Pop Art', prompt: 'Apply a vibrant pop art style inspired by Andy Warhol, using bold, flat colors and strong outlines.' },
  ];
  
  const activePrompt = selectedPresetPrompt || customPrompt;

  const handlePresetClick = (prompt: string) => {
    setSelectedPresetPrompt(prompt);
    setCustomPrompt('');
  };
  
  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomPrompt(e.target.value);
    setSelectedPresetPrompt(null);
  };

  const handleApply = () => {
    if (activePrompt) {
      onApplyFilter(activePrompt);
    }
  };

  const renderPresetButton = (preset: { name: string; prompt: string }) => (
    <button
      key={preset.name}
      onClick={() => handlePresetClick(preset.prompt)}
      disabled={isLoading}
      className={`w-full text-center bg-white/10 border border-transparent text-gray-200 font-semibold py-3 px-4 rounded-md transition-all duration-200 ease-in-out hover:bg-white/20 hover:border-white/20 active:scale-95 text-base disabled:opacity-50 disabled:cursor-not-allowed ${selectedPresetPrompt === preset.prompt ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-blue-500' : ''}`}
    >
      {preset.name}
    </button>
  );

  return (
    <div className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col gap-4 animate-fade-in backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-center text-gray-300">Apply a Filter</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {presets.slice(0, 4).map(renderPresetButton)}
      </div>

      {showMoreFilters && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 animate-fade-in">
              {presets.slice(4).map(renderPresetButton)}
          </div>
      )}

      <button
        onClick={() => setShowMoreFilters(!showMoreFilters)}
        className="flex items-center justify-center gap-2 w-full text-center bg-transparent border border-white/20 text-gray-300 font-semibold py-2 px-4 rounded-md transition-all duration-200 ease-in-out hover:bg-white/10 hover:border-white/30 active:scale-95 text-base"
      >
        {showMoreFilters ? 'Show Less' : 'Show More'}
        {showMoreFilters ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
      </button>

      <input
        type="text"
        value={customPrompt}
        onChange={handleCustomChange}
        placeholder="Or describe a custom filter (e.g., '80s synthwave glow')"
        className="flex-grow bg-gray-800 border border-gray-600 text-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition w-full disabled:cursor-not-allowed disabled:opacity-60 text-base"
        disabled={isLoading}
      />
      
      {activePrompt && (
        <div className="animate-fade-in flex flex-col gap-4 pt-2">
          <button
            onClick={handleApply}
            className="w-full bg-gradient-to-br from-blue-600 to-blue-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-base disabled:from-blue-800 disabled:to-blue-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
            disabled={isLoading || !activePrompt.trim()}
          >
            Apply Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;