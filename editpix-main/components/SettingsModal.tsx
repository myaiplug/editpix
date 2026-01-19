/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { getTimeUntilExpiry, clearApiKey, enableAdminMode, disableAdminMode } from '../utils/apiKeyManager';
import { PRIMARY_MODEL, FALLBACK_MODEL, NANO_MODEL } from '../services/geminiService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateApiKey: () => void;
  onShowGuide: () => void;
  onAdminModeChange: (isEnabled: boolean) => void;
  isAdminMode: boolean;
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  onUpdateApiKey,
  onShowGuide,
  onAdminModeChange,
  isAdminMode,
  selectedModel,
  onModelChange
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

  const models = [
    { id: '', name: 'Default (Auto Fallback)' },
    { id: PRIMARY_MODEL, name: 'Imagen 4' },
    { id: FALLBACK_MODEL, name: 'Gemini 3 Flash' },
    { id: NANO_MODEL, name: 'Gemini Nano' },
  ];

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
          {/* Model Selection Section */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM5.5 9.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-3zM12 7.293a1 1 0 01.707.293l2.5 2.5a1 1 0 010 1.414l-2.5 2.5a1 1 0 01-1.414-1.414L12.586 11H10a1 1 0 110-2h2.586l-1.293-1.293A1 1 0 0112 7.293z" clipRule="evenodd" />
              </svg>
              AI Model Selection
            </h3>
            <div className="relative">
              <select
                value={selectedModel}
                onChange={(e) => onModelChange(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg p-3 appearance-none focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              >
                {models.map(model => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </div>
             <p className="text-xs text-gray-400 mt-2">
              Select the generative model. 'Default' uses Imagen 4 with an automatic fallback to Gemini 3.
            </p>
          </section>

          {/* API Key Section */}
          <section className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:bg-blue-700 active:scale-95 text-sm flex items-center justify-center gap-2"
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
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Admin Mode
            </h3>

            {isAdminMode ? (
              <div className="space-y-3">
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-purple-400 mb-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-semibold text-sm">Admin Mode Enabled</span>
                  </div>
                  <p className="text-sm text-purple-400/80">Access to advanced features and video generation</p>
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
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:from-purple-700 hover:to-pink-700 active:scale-95 text-sm flex items-center justify-center gap-2"
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
                      className="w-full bg-gray-800 border border-gray-600 text-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                      autoFocus
                    />
                    {adminError && (
                      <p className="text-red-400 text-sm">{adminError}</p>
                    )}
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:bg-purple-700 active:scale-95 text-sm"
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

