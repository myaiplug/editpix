/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { getTimeUntilExpiry, clearApiKey, enableAdminMode, disableAdminMode } from '../utils/apiKeyManager';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateApiKey: () => void;
  onShowGuide: () => void;
  onAdminModeChange: (isEnabled: boolean) => void;
  isAdminMode: boolean;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  onUpdateApiKey,
  onShowGuide,
  onAdminModeChange,
  isAdminMode
}) => {
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminError, setAdminError] = useState('');

  if (!isOpen) return null;

  const timeUntilExpiry = getTimeUntilExpiry();

  const handleClearApiKey = () => {
    if (confirm('Are you sure you want to remove your API key? You will need to enter it again to use EditPix.')) {
      clearApiKey();
      onUpdateApiKey();
      onClose();
    }
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = enableAdminMode(adminPassword);
    if (success) {
      setAdminPassword('');
      setShowAdminInput(false);
      setAdminError('');
      onAdminModeChange(true);
    } else {
      setAdminError('Incorrect password');
    }
  };

  const handleDisableAdmin = () => {
    disableAdminMode();
    onAdminModeChange(false);
    setShowAdminInput(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-2xl max-w-lg w-full animate-scale-in">
        {/* Header */}
        <div className="border-b border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
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
          {/* API Key Section */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#7C4DFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              API Key Management
            </h3>
            
            <div className="space-y-3">
              {timeUntilExpiry && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-400 mb-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-semibold text-sm">API Key Active</span>
                  </div>
                  <p className="text-sm text-green-400/80">Expires in {timeUntilExpiry}</p>
                </div>
              )}
              
              <button
                onClick={onShowGuide}
                className="w-full bg-white/10 border border-gray-600 text-gray-200 font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:bg-white/20 hover:border-gray-500 active:scale-95 text-sm flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                View API Key Guide
              </button>

              <button
                onClick={() => {
                  onUpdateApiKey();
                  onClose();
                }}
                className="w-full bg-[#7C4DFF] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:bg-[#6B3EEF] active:scale-95 text-sm flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Change API Key
              </button>

              <button
                onClick={handleClearApiKey}
                className="w-full bg-transparent border border-red-500/30 text-red-400 font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:bg-red-500/10 hover:border-red-500/50 active:scale-95 text-sm flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove API Key
              </button>
            </div>
          </section>

          {/* Admin Mode Section */}
          <section className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#7C4DFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Admin Mode
            </h3>

            {isAdminMode ? (
              <div className="space-y-3">
                <div className="bg-[#7C4DFF]/10 border border-[#7C4DFF]/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-[#7C4DFF] mb-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-semibold text-sm">Admin Mode Enabled</span>
                  </div>
                  <p className="text-sm text-[#7C4DFF]/80">Access to advanced features and video generation</p>
                </div>
                <button
                  onClick={handleDisableAdmin}
                  className="w-full bg-transparent border border-gray-600 text-gray-300 font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:bg-white/5 hover:border-gray-500 active:scale-95 text-sm"
                >
                  Disable Admin Mode
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {!showAdminInput ? (
                  <button
                    onClick={() => setShowAdminInput(true)}
                    className="w-full bg-gradient-to-r from-[#7C4DFF] to-[#00C2FF] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#7C4DFF]/30 active:scale-95 text-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Enable Admin Mode
                  </button>
                ) : (
                  <form onSubmit={handleAdminSubmit} className="space-y-3">
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => {
                        setAdminPassword(e.target.value);
                        setAdminError('');
                      }}
                      placeholder="Enter admin password"
                      className="w-full bg-gray-800 border border-gray-600 text-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#7C4DFF] focus:outline-none transition"
                      autoFocus
                    />
                    {adminError && (
                      <p className="text-red-400 text-sm">{adminError}</p>
                    )}
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 bg-[#7C4DFF] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:bg-[#6B3EEF] active:scale-95 text-sm"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAdminInput(false);
                          setAdminPassword('');
                          setAdminError('');
                        }}
                        className="flex-1 bg-transparent border border-gray-600 text-gray-300 font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:bg-white/5 active:scale-95 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-xs text-gray-400">
                    Admin mode unlocks advanced presets, professional tools, and video generation features.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
