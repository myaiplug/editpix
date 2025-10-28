<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# EditPix - AI-Powered Photo Editing

EditPix is a powerful, browser-based AI photo editor that uses Google's Gemini AI for advanced image manipulation. Features include precise retouching, creative filters, professional adjustments, and an admin mode with enhanced capabilities.

View your app in AI Studio: https://ai.studio/apps/drive/15K6TLDzwyw2fKXOJrbxVYgVpM6upWe_b

## Features

### 🎨 Core Editing Tools
- **Precise Retouching** - Click any point on your image for localized edits
- **Creative Filters** - 8+ artistic filters (Synthwave, Anime, Noir, etc.)
- **Professional Adjustments** - Blur backgrounds, enhance details, adjust lighting
- **Crop Tool** - Flexible cropping with aspect ratio controls

### 🔐 API Key Management
- **Secure Storage** - API keys encrypted and stored locally for 24 hours
- **Educational Guide** - Built-in tutorial explaining API keys with links to 5 free providers
- **Easy Management** - Change or remove API keys anytime via Settings

### 👑 Admin Mode
Unlock advanced features with password-protected admin mode:
- **4 Pro Retouch Presets** - Remove blemishes, whiten teeth, enhance eyes, smooth skin
- **12 Pro Adjustments** - HDR, portrait retouching, color grading, and more
- **4 Exclusive Filters** - Cinematic, Renaissance, Cyberpunk, Watercolor Dream

**Admin Password:** `editpix2025admin`

## Getting Started

### Quick Start (No Installation)

1. Open EditPix in your browser
2. When prompted, enter your Google Gemini API key
   - Don't have one? Click "Learn how to get one" for a guided tutorial
   - Get a free key from [Google AI Studio](https://aistudio.google.com/app/apikey)
3. Upload an image and start editing!

### Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. (Optional) Set up your Google AI API key via environment variable:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local and add your API key
   ```
   
   **Note:** If not set, the app will prompt you to enter your API key on first use.

3. Run the app:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser

## API Key Setup

EditPix requires a Google Gemini API key to function. The app provides multiple ways to set this up:

### Option 1: In-App Setup (Recommended)
- On first load, a modal will guide you through entering your API key
- Keys are encrypted and stored securely in your browser
- Keys automatically expire after 24 hours for security

### Option 2: Environment Variable
- Create `.env.local` file with `GEMINI_API_KEY=your_key_here`
- Useful for development or self-hosted deployments

### Getting a Free API Key
The app includes a comprehensive guide to getting free API keys from:
1. **Google Gemini** (Recommended) - 1,500 requests/day
2. OpenAI DALL-E - $5 free credit
3. Stability AI - 25 free credits
4. Hugging Face - Free tier available
5. Replicate - $5 free credit

## Admin Mode

Enable admin mode to access professional-grade presets and tools:

1. Click the **Settings** icon in the header
2. Scroll to **Admin Mode** section
3. Click **Enable Admin Mode**
4. Enter password: `editpix2025admin`
5. Enjoy enhanced features marked with ★

### Admin Features
- **Retouch**: Professional skin retouching, blemish removal, teeth whitening
- **Adjust**: 12 pro-level adjustments including HDR, color grading, lens correction
- **Filters**: 4 exclusive cinematic and artistic filters

## Security & Privacy

- ✅ All processing happens in your browser
- ✅ API keys are encrypted before storage
- ✅ Keys expire automatically after 24 hours
- ✅ No data sent to EditPix servers
- ✅ Your images never leave your device (except to AI provider APIs)

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## License

Apache-2.0
