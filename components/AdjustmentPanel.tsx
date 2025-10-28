/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from './icons';

interface AdjustmentPanelProps {
  onApplyAdjustment: (prompt: string) => void;
  isLoading: boolean;
  isAdminMode?: boolean;
}

const AdjustmentPanel: React.FC<AdjustmentPanelProps> = ({ onApplyAdjustment, isLoading, isAdminMode = false }) => {
  const [selectedPresetPrompt, setSelectedPresetPrompt] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [showMoreAdjustments, setShowMoreAdjustments] = useState(false);

  const presets = [
    { name: 'Blur Background', prompt: 'Apply a realistic depth-of-field effect, making the background blurry while keeping the main subject in sharp focus.' },
    { name: 'Enhance Details', prompt: 'Slightly enhance the sharpness and details of the image without making it look unnatural.' },
    { name: 'Warmer Lighting', prompt: 'Adjust the color temperature to give the image warmer, golden-hour style lighting.' },
    { name: 'Studio Light', prompt: 'Add dramatic, professional studio lighting to the main subject.' },
  ];

  const adminPresets = [
    { name: 'HDR Pro', prompt: 'Apply professional HDR (High Dynamic Range) processing with perfectly balanced highlights and shadows, enhanced local contrast, vibrant but natural colors, and micro-detail enhancement for an ultra-realistic, publication-quality result.' },
    { name: 'Portrait Retouch Pro', prompt: 'Apply high-end portrait retouching: smooth skin texture while preserving natural pores, enhance eye clarity and catchlights, whiten teeth subtly, add dimensional contouring, optimize skin tone consistency, and add a professional beauty glow without looking over-processed.' },
    { name: 'Atmospheric Depth', prompt: 'Create stunning atmospheric perspective with precisely graduated depth-of-field, subtle atmospheric haze in distant elements, enhanced aerial perspective, bokeh refinement, and professional lens characteristics for a cinematic three-dimensional quality.' },
    { name: 'Color Grading Pro', prompt: 'Apply professional color grading with carefully calibrated primary color correction, secondary selective color enhancement, skin tone protection, highlight and shadow color tinting, and sophisticated tonal curves for a high-end editorial look.' },
    { name: 'Dynamic Range Max', prompt: 'Maximize dynamic range with advanced shadow recovery revealing hidden details, highlight preservation maintaining texture, midtone clarity enhancement, micro-contrast optimization, and tonal separation refinement for maximum visual impact.' },
    { name: 'Lens Perfection', prompt: 'Apply professional lens correction and enhancement: remove chromatic aberration, correct distortion, optimize vignetting for artistic effect, enhance corner sharpness, and add subtle lens characteristics of premium optics.' },
    { name: 'Light Sculptor', prompt: 'Masterfully sculpt lighting with directional light enhancement, shadow depth refinement, highlight bloom control, specular highlight optimization, and three-dimensional form revelation through sophisticated light and shadow manipulation.' },
    { name: 'Texture Wizard', prompt: 'Enhance micro and macro texture with intelligent detail extraction, surface characteristic enhancement, material definition improvement, tactile quality amplification, and texture contrast optimization while maintaining photorealistic appearance.' },
    { name: 'Clarity Master', prompt: 'Apply professional clarity enhancement with intelligent edge sharpening, local contrast optimization, haze removal, detail definition improvement, and tonal micro-contrast refinement for exceptional visual punch and definition.' },
    { name: 'Mood Architect', prompt: 'Create sophisticated mood and atmosphere through subtle color temperature shifts, tonal distribution refinement, contrast sculpting, shadow and highlight tinting, and emotional color palette optimization for powerful visual storytelling.' },
    { name: 'Pro Sharpening', prompt: 'Apply multi-radius professional sharpening with edge detection, detail preservation, halo prevention, selective frequency enhancement, and output-optimized sharpening for maximum perceived sharpness without artifacts.' },
    { name: 'Tonal Mastery', prompt: 'Achieve perfect tonal balance with sophisticated curve adjustments, zone system optimization, tonal separation enhancement, luminosity range expansion, and harmonious tonal distribution for gallery-quality tonal excellence.' },
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
      onApplyAdjustment(activePrompt);
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
      <h3 className="text-lg font-semibold text-center text-gray-300">Apply a Professional Adjustment</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {allPresets.slice(0, 4).map(preset => renderPresetButton(preset, false))}
      </div>

      {isAdminMode && showMoreAdjustments && (
        <div className="border-t border-purple-500/20 pt-4 mt-2">
          <div className="flex items-center justify-center gap-2 mb-3">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span className="text-sm font-bold text-purple-400">Pro-Level Adjustments</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 animate-fade-in">
            {adminPresets.map(preset => renderPresetButton(preset, true))}
          </div>
        </div>
      )}

      {isAdminMode && (
        <button
          onClick={() => setShowMoreAdjustments(!showMoreAdjustments)}
          className="flex items-center justify-center gap-2 w-full text-center bg-transparent border border-purple-500/30 text-purple-300 font-semibold py-2 px-4 rounded-md transition-all duration-200 ease-in-out hover:bg-purple-500/10 hover:border-purple-500/50 active:scale-95 text-base"
        >
          {showMoreAdjustments ? 'Hide Pro Tools' : 'View Pro Tools'}
          {showMoreAdjustments ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
        </button>
      )}

      <input
        type="text"
        value={customPrompt}
        onChange={handleCustomChange}
        placeholder="Or describe an adjustment (e.g., 'change background to a forest')"
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
                Apply Adjustment
            </button>
        </div>
      )}
    </div>
  );
};

export default AdjustmentPanel;
