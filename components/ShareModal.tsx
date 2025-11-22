/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageFile: File | null;
  onGenerateContent: (contentType: string, platform: string, imageDescription: string) => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, imageFile, onGenerateContent }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [selectedContentType, setSelectedContentType] = useState<string>('');
  const [imageDescription, setImageDescription] = useState('');
  const [showVeoOption, setShowVeoOption] = useState(false);

  if (!isOpen) return null;

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: '📷', description: 'Captions, hashtags, stories' },
    { id: 'facebook', name: 'Facebook', icon: '👥', description: 'Posts, ads, cover photos' },
    { id: 'twitter', name: 'Twitter/X', icon: '🐦', description: 'Tweets, threads, headers' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', description: 'Professional posts, articles' },
    { id: 'pinterest', name: 'Pinterest', icon: '📌', description: 'Pins, boards, descriptions' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', description: 'Video ideas, captions' },
  ];

  const contentTypes = [
    { id: 'caption', name: 'Caption', description: 'Engaging post caption' },
    { id: 'hashtags', name: 'Hashtags', description: 'Relevant hashtags' },
    { id: 'description', name: 'Description', description: 'Detailed description' },
    { id: 'story', name: 'Story Ideas', description: 'Story/reel concepts' },
    { id: 'ad-copy', name: 'Ad Copy', description: 'Marketing copy' },
    { id: 'blog-post', name: 'Blog Outline', description: 'Blog post structure' },
  ];

  const veoVideoTypes = [
    'Cinematic Pan', 'Zoom Transition', 'Product Showcase', 'Lifestyle Story',
    'Time Lapse', 'Parallax Effect', 'Ambient Loop', '3D Rotation',
    'Dynamic Reveal', 'Particle Effects', 'Morphing Transition', 'Epic Trailer'
  ];

  const handleGenerateContent = () => {
    if (selectedPlatform && selectedContentType && imageDescription.trim()) {
      onGenerateContent(selectedContentType, selectedPlatform, imageDescription);
      // Reset form
      setSelectedPlatform('');
      setSelectedContentType('');
      setImageDescription('');
      onClose();
    }
  };

  const handleVeoTransfer = (videoType: string) => {
    // This would integrate with Veo 3.1 module
    console.log(`Transferring to Veo 3.1 with video type: ${videoType}`);
    alert(`Would transfer to Veo 3.1 for ${videoType} video creation. (Integration pending)`);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-100">Share & Create Content</h2>
            <p className="text-sm text-gray-400 mt-1">Generate engaging content for your image</p>
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
          {/* Image Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Describe your image
            </label>
            <textarea
              value={imageDescription}
              onChange={(e) => setImageDescription(e.target.value)}
              placeholder="e.g., 'A sunset over mountains with vibrant orange and purple colors'"
              className="w-full bg-gray-900/50 border border-gray-700 text-gray-200 rounded-lg p-4 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none"
              rows={3}
            />
          </div>

          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Select platform
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    selectedPlatform === platform.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 bg-gray-900/30 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{platform.icon}</span>
                    <span className="font-semibold text-gray-200">{platform.name}</span>
                  </div>
                  <div className="text-xs text-gray-400">{platform.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Content Type Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Select content type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {contentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedContentType(type.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    selectedContentType === type.id
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-700 bg-gray-900/30 hover:border-gray-600'
                  }`}
                >
                  <div className="font-semibold text-gray-200">{type.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerateContent}
            disabled={!selectedPlatform || !selectedContentType || !imageDescription.trim()}
            className="w-full bg-gradient-to-br from-blue-600 to-purple-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-px active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Generate Content
          </button>

          {/* Veo 3.1 Integration Section */}
          <div className="border-t border-gray-700 pt-6 mt-6">
            <button
              onClick={() => setShowVeoOption(!showVeoOption)}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-pink-600/20 to-purple-600/20 border border-pink-500/30 rounded-lg hover:bg-pink-600/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <div className="text-left">
                  <div className="font-bold text-pink-300">Veo 3.1 Video Creation</div>
                  <div className="text-xs text-gray-400">Transform your image into professional video</div>
                </div>
              </div>
              <svg className={`w-5 h-5 text-pink-400 transition-transform ${showVeoOption ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showVeoOption && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 animate-fade-in">
                {veoVideoTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleVeoTransfer(type)}
                    className="p-3 bg-gray-900/50 border border-pink-500/30 rounded-lg hover:bg-pink-500/10 hover:border-pink-500/50 transition-all text-sm text-gray-300 hover:text-pink-300"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
