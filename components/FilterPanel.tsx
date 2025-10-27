/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from './icons';

interface FilterPanelProps {
  onApplyFilter: (prompt: string) => void;
  isLoading: boolean;
  isAdminMode?: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onApplyFilter, isLoading, isAdminMode = false }) => {
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

  const adminPresets = [
    { name: 'Cinematic', prompt: 'Apply professional cinematic color grading with rich teal and orange tones, enhanced contrast, deep blacks, and a subtle film grain texture for a blockbuster movie aesthetic.' },
    { name: 'Renaissance', prompt: 'Transform the image into a masterpiece inspired by Renaissance art, with chiaroscuro lighting, rich earth tones, ornate details, and the refined brushwork characteristic of masters like Caravaggio and Rembrandt.' },
    { name: 'Cyberpunk', prompt: 'Apply a dystopian cyberpunk aesthetic with intense neon colors (purple, cyan, magenta), rain-slicked surfaces, holographic overlays, digital artifacts, and a gritty urban atmosphere.' },
    { name: 'Watercolor Dream', prompt: 'Transform into an ethereal watercolor painting with soft, flowing color bleeds, delicate pigment gradations, subtle paper texture, and dreamy translucent layers that create a romantic, artistic atmosphere.' },
  ];

  const allPresets = isAdminMode ? [...presets, ...adminPresets] : presets;
  
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

  const renderPresetButton = (preset: { name: string; prompt: string }, isAdmin = false) => (
    <button
      key={preset.name}
      onClick={() => handlePresetClick(preset.prompt)}
      disabled={isLoading}
      className={`w-full text-center bg-white/10 border ${isAdmin ? 'border-purple-500/30' : 'border-transparent'} text-gray-200 font-semibold py-3 px-4 rounded-md transition-all duration-200 ease-in-out hover:bg-white/20 ${isAdmin ? 'hover:border-purple-500/50' : 'hover:border-white/20'} active:scale-95 text-base disabled:opacity-50 disabled:cursor-not-allowed ${selectedPresetPrompt === preset.prompt ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-blue-500' : ''}`}
    >
      {preset.name}
      {isAdmin && <span className="ml-2 text-xs text-purple-400">★</span>}
    </button>
  );

  return (
    <div className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col gap-4 animate-fade-in backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-center text-gray-300">Apply a Filter</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {allPresets.slice(0, 4).map(preset => renderPresetButton(preset, false))}
      </div>

      {showMoreFilters && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 animate-fade-in">
              {allPresets.slice(4, 8).map(preset => renderPresetButton(preset, false))}
          </div>
      )}

      {isAdminMode && showMoreFilters && (
        <div className="border-t border-purple-500/20 pt-4 mt-2">
          <div className="flex items-center justify-center gap-2 mb-3">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span className="text-sm font-bold text-purple-400">Admin Exclusive Filters</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 animate-fade-in">
            {adminPresets.map(preset => renderPresetButton(preset, true))}
          </div>
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