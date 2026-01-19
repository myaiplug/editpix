<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# EditPix - AI-Powered Photo Editing

EditPix is a powerful, browser-based AI photo editor that uses Google's Gemini AI for advanced image manipulation. Features include precise retouching, creative filters, professional adjustments, AI image generation, and a manifest board for creating custom compositions.

View your app in AI Studio: https://ai.studio/apps/drive/15K6TLDzwyw2fKXOJrbxVYgVpM6upWe_b

## Features

### 🎨 Core Editing Tools
- **Precise Retouching** - Click any point on your image for localized edits with 12+ preset options
- **Creative Filters** - 8+ artistic filters (Synthwave, Anime, Noir, etc.) with expandable options
- **Professional Adjustments** - Blur backgrounds, enhance details, adjust lighting, and more
- **Crop Tool** - Flexible cropping with aspect ratio controls

### ✨ AI Image Generator
- **Text-to-Image Generation** - Create stunning images from text descriptions
- **Aspect Ratio Selection** - Choose from Square, Portrait, Landscape, or Wide formats
- **Example Prompts** - Get inspired with built-in example prompts
- **Seamless Integration** - Generate images without uploading, then edit them

### 🎭 Manifest Board
- **Multi-Image Canvas** - Create compositions with up to 20 images
- **Text Support** - Add customizable text elements to your canvas
- **Save & Load** - Save your work and return later to continue editing
- **Export** - Export your final composition as PNG
- **Drag & Drop** - Easy positioning of images and text elements

### 🔐 Security Features
- **Password Protection** - Optional password protection for family testing
- **API Key Management** - Secure encrypted storage with 24-hour expiration
- **Educational Guide** - Built-in tutorial explaining API keys with links to 5 free providers
- **Environment Variables** - Configure API keys and passwords via .env.local


## Getting Started

### Quick Start (No Installation)

1. Open EditPix in your browser
2. **Optional:** If password protection is enabled, enter the application password
3. When prompted, enter your Google Gemini API key
   - Don't have one? Click "Learn how to get one" for a guided tutorial
   - Get a free key from [Google AI Studio](https://aistudio.google.com/app/apikey)
4. Choose your workflow:
   - Upload an image to edit
   - Generate an image from text using the AI Image Generator
   - Create a composition using the Manifest Board

### Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. (Optional) Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local and configure:
   # - GEMINI_API_KEY: Your Google Gemini API key
   # - APP_PASSWORD: Optional password for application access (leave empty to disable)
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

## Password Protection

Protect your EditPix instance with a password for family testing or limited access:

1. Copy `.env.local.example` to `.env.local`
2. Set `APP_PASSWORD=your_secure_password`
3. Users will be prompted to enter the password before accessing the app
4. Leave `APP_PASSWORD` empty to disable password protection


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
