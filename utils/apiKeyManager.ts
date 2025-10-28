/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

const STORAGE_KEY = 'editpix_api_key';
const ADMIN_MODE_KEY = 'editpix_admin_mode';
const EXPIRY_HOURS = 24;

interface StoredApiKey {
  encryptedKey: string;
  timestamp: number;
}

/**
 * Simple encryption using base64 encoding with a salt
 * Note: This is not highly secure encryption, but provides basic obfuscation
 * For production, consider using Web Crypto API or more robust encryption
 */
const encryptKey = (apiKey: string): string => {
  const salt = 'editpix_salt_2025';
  const combined = `${salt}:${apiKey}:${salt}`;
  return btoa(combined);
};

/**
 * Decrypt the API key
 */
const decryptKey = (encryptedKey: string): string => {
  try {
    const decoded = atob(encryptedKey);
    const parts = decoded.split(':');
    if (parts.length === 3) {
      return parts[1];
    }
    return '';
  } catch {
    return '';
  }
};

/**
 * Check if stored API key is expired
 */
const isExpired = (timestamp: number): boolean => {
  const now = Date.now();
  const expiryTime = EXPIRY_HOURS * 60 * 60 * 1000; // 24 hours in milliseconds
  return (now - timestamp) > expiryTime;
};

/**
 * Save API key to localStorage with encryption and timestamp
 */
export const saveApiKey = (apiKey: string): void => {
  const encryptedKey = encryptKey(apiKey);
  const data: StoredApiKey = {
    encryptedKey,
    timestamp: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/**
 * Get API key from localStorage if not expired
 * Returns null if expired or not found
 */
export const getApiKey = (): string | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const data: StoredApiKey = JSON.parse(stored);
    
    if (isExpired(data.timestamp)) {
      // Clear expired key
      clearApiKey();
      return null;
    }
    
    return decryptKey(data.encryptedKey);
  } catch {
    return null;
  }
};

/**
 * Clear API key from localStorage
 */
export const clearApiKey = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

/**
 * Check if admin mode is enabled
 */
export const isAdminMode = (): boolean => {
  return localStorage.getItem(ADMIN_MODE_KEY) === 'true';
};

/**
 * Enable admin mode
 */
export const enableAdminMode = (password: string): boolean => {
  // Simple password check - in production, this should be more secure
  const ADMIN_PASSWORD = 'editpix2025admin'; // TODO: Move to environment variable
  
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(ADMIN_MODE_KEY, 'true');
    return true;
  }
  return false;
};

/**
 * Disable admin mode
 */
export const disableAdminMode = (): void => {
  localStorage.removeItem(ADMIN_MODE_KEY);
};

/**
 * Get time until API key expires in human-readable format
 */
export const getTimeUntilExpiry = (): string | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const data: StoredApiKey = JSON.parse(stored);
    const now = Date.now();
    const expiryTime = EXPIRY_HOURS * 60 * 60 * 1000;
    const timeLeft = expiryTime - (now - data.timestamp);
    
    if (timeLeft <= 0) return null;
    
    const hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000));
    const minutesLeft = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
    
    if (hoursLeft > 0) {
      return `${hoursLeft}h ${minutesLeft}m`;
    }
    return `${minutesLeft}m`;
  } catch {
    return null;
  }
};
