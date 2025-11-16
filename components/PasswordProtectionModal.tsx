/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface PasswordProtectionModalProps {
  isOpen: boolean;
  onAuthenticate: () => void;
}

const PasswordProtectionModal: React.FC<PasswordProtectionModalProps> = ({ isOpen, onAuthenticate }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const appPassword = process.env.APP_PASSWORD;
    
    if (!appPassword) {
      // No password protection enabled
      onAuthenticate();
      return;
    }
    
    if (password === appPassword) {
      sessionStorage.setItem('editpix_authenticated', 'true');
      onAuthenticate();
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 max-w-md w-full shadow-2xl animate-fade-in">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            EditPix
          </h2>
          <p className="text-gray-400 mt-2">Enter password to access the application</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95"
          >
            Access Application
          </button>
        </form>
        
        <p className="text-gray-500 text-xs mt-6 text-center">
          Password protection helps keep your family testing secure
        </p>
      </div>
    </div>
  );
};

export default PasswordProtectionModal;
