/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useRef, useEffect } from 'react';

const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.624l-.219.874-.219-.874a1.5 1.5 0 00-1.023-1.023l-.874-.219.874-.219a1.5 1.5 0 001.023-1.023l.219-.874.219.874a1.5 1.5 0 001.023 1.023l.874.219-.874.219a1.5 1.5 0 00-1.023 1.023z" />
  </svg>
);

interface HeaderProps {
  onSettingsClick?: () => void;
  onManifestBoardClick?: () => void;
  onLogoCreatorClick?: () => void;
  onFaviconCreatorClick?: () => void;
  isAdminMode?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onSettingsClick, 
  onManifestBoardClick, 
  onLogoCreatorClick,
  onFaviconCreatorClick,
  isAdminMode 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full py-4 px-8 border-b border-gray-700 bg-gray-800/30 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-[1600px] mx-auto">
        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 hover:bg-white/5 rounded-lg p-2 -ml-2 transition-all duration-200 group"
          >
            <SparkleIcon className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
            <h1 className="text-xl font-bold tracking-tight text-gray-100">
              EditPix 
            </h1>
            <svg 
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isAdminMode && (
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              ADMIN
            </span>
          )}
          
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-gray-800/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-2xl overflow-hidden animate-fade-in z-50">
              {onManifestBoardClick && (
                <button
                  onClick={() => {
                    onManifestBoardClick();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center gap-3 group"
                >
                  <svg className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-gray-100">Dream Board</div>
                    <div className="text-xs text-gray-400">Manifest your vision</div>
                  </div>
                </button>
              )}
              
              {onLogoCreatorClick && (
                <button
                  onClick={() => {
                    onLogoCreatorClick();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center gap-3 group"
                >
                  <svg className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-gray-100">Logo Creator</div>
                    <div className="text-xs text-gray-400">Professional high-quality logos</div>
                  </div>
                </button>
              )}
              
              {onFaviconCreatorClick && (
                <button
                  onClick={() => {
                    onFaviconCreatorClick();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center gap-3 group"
                >
                  <svg className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-gray-100">Favicon Generator</div>
                    <div className="text-xs text-gray-400">Perfectly sized favicons</div>
                  </div>
                </button>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {onSettingsClick && (
            <button
              onClick={onSettingsClick}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              aria-label="Settings"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
