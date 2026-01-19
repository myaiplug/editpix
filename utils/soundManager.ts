/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Sound utility for playing UI sounds using Web Audio API
 */

class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    // Initialize AudioContext lazily to avoid autoplay issues
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      this.audioContext = null; // Will be created on first use
    }
  }

  private getAudioContext(): AudioContext | null {
    if (!this.audioContext && typeof window !== 'undefined' && 'AudioContext' in window) {
      this.audioContext = new AudioContext();
    }
    return this.audioContext;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Play a click sound
   */
  playClick() {
    if (!this.enabled) return;
    this.playTone(800, 0.05, 0.1);
  }

  /**
   * Play a button press sound
   */
  playButton() {
    if (!this.enabled) return;
    this.playTone(600, 0.08, 0.15);
  }

  /**
   * Play a success/done sound
   */
  playSuccess() {
    if (!this.enabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    // Play a pleasant chord
    setTimeout(() => this.playTone(523.25, 0.15, 0.3), 0);    // C
    setTimeout(() => this.playTone(659.25, 0.15, 0.3), 50);   // E
    setTimeout(() => this.playTone(783.99, 0.2, 0.4), 100);   // G
  }

  /**
   * Play an error sound
   */
  playError() {
    if (!this.enabled) return;
    this.playTone(200, 0.2, 0.3);
  }

  /**
   * Play a hover sound (very subtle)
   */
  playHover() {
    if (!this.enabled) return;
    this.playTone(1000, 0.03, 0.05);
  }

  /**
   * Play a generate/processing start sound
   */
  playProcessing() {
    if (!this.enabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    // Rising tone
    this.playSweep(400, 800, 0.3);
  }

  /**
   * Play a notification sound
   */
  playNotification() {
    if (!this.enabled) return;
    setTimeout(() => this.playTone(880, 0.1, 0.15), 0);
    setTimeout(() => this.playTone(1047, 0.15, 0.2), 100);
  }

  /**
   * Play a tone at specified frequency and duration
   */
  private playTone(frequency: number, duration: number, volume: number = 0.1) {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      // Envelope for smoother sound
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  }

  /**
   * Play a frequency sweep
   */
  private playSweep(startFreq: number, endFreq: number, duration: number) {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(startFreq, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration);

      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (error) {
      console.warn('Error playing sweep:', error);
    }
  }
}

// Create a singleton instance
const soundManager = new SoundManager();

export default soundManager;
