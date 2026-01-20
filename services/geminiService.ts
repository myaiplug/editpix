/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, GenerateContentResponse, GenerateImagesResponse, HarmCategory, HarmBlockThreshold, SafetyFilterLevel } from "@google/genai";
import { getApiKey } from "../utils/apiKeyManager";

// --- 2026 Industry Standard Model Constants ---
const PRIMARY_MODEL = 'imagen-4.0-generate-001'; 
const FALLBACK_MODEL = 'gemini-3-flash-preview'; 

const SAFETY_SETTINGS = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
];

const fileToPart = async (file: File): Promise<{ inlineData: { mimeType: string; data: string; } }> => {
    const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
    const arr = dataUrl.split(',');
    const mimeType = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
    const data = arr[1];
    return { inlineData: { mimeType, data } };
};

/**
 * ADVANCED ERROR HANDLING
 * Provides specific user feedback based on the 2026 API response structure.
 */
const handleApiResponse = (response: GenerateContentResponse, context: string): string => {
    // 1. Handle Prompt-Level Blocks (Safety/Policy)
    if (response.promptFeedback?.blockReason) {
        const reason = response.promptFeedback.blockReason;
        const msg = response.promptFeedback.blockReasonMessage || "Please rephrase your request.";
        throw new Error(`Generation Blocked: Your prompt triggered a ${reason} filter. ${msg}`);
    }

    const candidate = response.candidates?.[0];

    // 2. Handle Candidate-Level Finish Reasons
    if (candidate?.finishReason && candidate.finishReason !== 'STOP') {
        switch (candidate.finishReason) {
            case 'SAFETY':
                throw new Error("Safety Block: The generated content was flagged. Try a less descriptive prompt.");
            case 'RECITATION':
                throw new Error("Copyright Protection: The model produced content too similar to existing works.");
            case 'OTHER':
                throw new Error("Complex Request: The AI struggled to render this masterpiece. Try simplifying the details.");
            default:
                throw new Error(`Generation Interrupted: ${candidate.finishReason}. Please try again.`);
        }
    }

    // 3. Extract Image Data
    const imagePart = candidate?.content?.parts?.find(part => (part as any).inlineData);
    if (imagePart && (imagePart as any).inlineData) {
        const inlineData = (imagePart as any).inlineData as { mimeType?: string; data: string };
        const mimeType = inlineData.mimeType || "image/png";
        return `data:${mimeType};base64,${inlineData.data}`;
    }

    // 4. If we got a textual response instead of an image, surface it to the user for clarity
    const textPart = candidate?.content?.parts?.find(part => (part as any).text);
    if (textPart && (textPart as any).text) {
        const text = (textPart as any).text as string;
        const preview = text.length > 240 ? `${text.slice(0, 240)}...` : text;
        throw new Error(
            `The AI returned an explanation instead of an image for ${context}. ` +
            `This often means the configured model does not support image editing/generation with your API key. ` +
            `Model message: "${preview}"`
        );
    }

    // 5. Fallback for completely empty responses
    console.error("GenAI response contained no image or text parts", { context, response });
    throw new Error(`System Error: The AI confirmed completion but did not return image data for ${context}.`);
};

interface GenerateWithFallbackPayload {
    model?: string;
    contents?: any;
    config?: any;
    [key: string]: unknown;
}

const createGoogleGenAIClient = (): GoogleGenAI => {
    const apiKey = getApiKey() || process.env.API_KEY || '';
    return new GoogleGenAI({ apiKey });
};

async function generateWithFallback(
    ai: GoogleGenAI,
    payload: GenerateWithFallbackPayload,
    context: string
): Promise<GenerateContentResponse> {
    const { contents, config = {}, ...rest } = payload;
    
    try {
        return await ai.models.generateContent({ 
            model: PRIMARY_MODEL,
            contents: contents,
            config: {
                ...config,
                safetySettings: SAFETY_SETTINGS
            },
            ...rest
        } as any);
    } catch (primaryError) {
        console.warn(`Primary model failed for ${context}. Trying fallback: ${FALLBACK_MODEL}`);
        try {
            return await ai.models.generateContent({ 
                model: FALLBACK_MODEL,
                contents: contents,
                config: {
                    ...config,
                    safetySettings: SAFETY_SETTINGS
                },
                ...rest
            } as any);
        } catch (fallbackError) {
            const primaryMessage = primaryError instanceof Error ? primaryError.message : 'Unknown primary error';
            const fallbackMessage = fallbackError instanceof Error ? fallbackError.message : 'Unknown fallback error';
            const combinedError = new Error(
                `Both primary and fallback models failed. Primary: ${primaryMessage}. Fallback: ${fallbackMessage}`
            );
            (combinedError as any).primaryError = primaryError;
            (combinedError as any).fallbackError = fallbackError;
            throw combinedError;
        }
    }
}
export const generateEditedImage = async (
    originalImage: File,
    userPrompt: string,
    hotspot: { x: number, y: number }
): Promise<string> => {
    const ai = createGoogleGenAIClient();
    const originalImagePart = await fileToPart(originalImage);
    
    const prompt = `ACT AS A SENIOR VFX COMPOSITOR. 
Task: Perform a hyper-realistic localized edit at (x: ${hotspot.x}, y: ${hotspot.y}).
Request: "${userPrompt}"
Technical Requirements:
- Use sub-pixel accuracy to blend the edit with the original grain structure.
- Match global illumination, light temperature, and shadow density.
Output: Return ONLY the raw processed image buffer. No text.`;

    const response = await generateWithFallback(ai, {
        contents: { parts: [originalImagePart, { text: prompt }] },
    }, 'edit');
    return handleApiResponse(response, 'edit');
};

export const generateFilteredImage = async (
    originalImage: File,
    filterPrompt: string,
): Promise<string> => {
    const ai = createGoogleGenAIClient();
    const originalImagePart = await fileToPart(originalImage);

    const prompt = `ACT AS A MASTER COLORIST. Apply cinematic grade: "${filterPrompt}"
Guidelines: Advanced Tonal Mapping, Rec.2020 fidelity, 70mm IMAX aesthetic.
Output: Return ONLY the final color-graded image.`;

    const response = await generateWithFallback(ai, {
        contents: { parts: [originalImagePart, { text: prompt }] },
    }, 'filter');
    return handleApiResponse(response, 'filter');
};

export const generateAdjustedImage = async (
    originalImage: File,
    adjustmentPrompt: string,
): Promise<string> => {
    const ai = createGoogleGenAIClient();
    const originalImagePart = await fileToPart(originalImage);

    const prompt = `ACT AS A HIGH-END DIGITAL RETOUCHER. Adjustment: "${adjustmentPrompt}"
Standards: Preserve 100% realistic texture, HDR detail retention, 4K clarity.
Output: Return ONLY the adjusted master file.`;

    const response = await generateWithFallback(ai, {
        contents: { parts: [originalImagePart, { text: prompt }] },
    }, 'adjustment');
    return handleApiResponse(response, 'adjustment');
};

export const generateImageFromText = async (
    prompt: string,
    aspectRatio: string = '1:1'
): Promise<string> => {
    const ai = createGoogleGenAIClient();

    // Enhanced prompt for highest quality logo/image generation
    const enhancedPrompt = `Professional masterpiece quality: ${prompt}
Technical specifications: Ultra-high resolution, crisp detail, perfect clarity, professional lighting, magazine-quality finish.
Style guidance: Clean, polished, production-ready, visually stunning, commercially viable.
Output requirements: High-fidelity digital artwork, publication-grade quality, no artifacts or defects.`;

    try {
        // Try Imagen 4 first using the generateImages API
        const response: GenerateImagesResponse = await ai.models.generateImages({
            model: PRIMARY_MODEL,
            prompt: enhancedPrompt,
            config: {
                numberOfImages: 1,
                aspectRatio: aspectRatio,
                safetyFilterLevel: SafetyFilterLevel.BLOCK_ONLY_HIGH,
            }
        });

        // Extract image data from Imagen 4 response
        if (response.generatedImages && response.generatedImages.length > 0) {
            const imageData = response.generatedImages[0];
            
            // Check if we have image data
            if (imageData.image) {
                // Handle GCS URI
                if (imageData.image.gcsUri) {
                    throw new Error("GCS URI response not supported. Please configure for inline image data.");
                }
                
                // Handle base64 imageBytes
                if (imageData.image.imageBytes) {
                    const mimeType = imageData.image.mimeType || "image/png";
                    const imageBytes = imageData.image.imageBytes;
                    // Check if it already has data: prefix
                    if (imageBytes.startsWith('data:')) {
                        return imageBytes;
                    }
                    return `data:${mimeType};base64,${imageBytes}`;
                }
            }
        }
        
        throw new Error("Imagen 4 did not return valid image data");
    } catch (imagenError) {
        // Fallback to Gemini using generateContent for text-to-image
        console.warn(`Imagen model failed. Trying Gemini fallback: ${FALLBACK_MODEL}`, imagenError);
        
        const fallbackPrompt = `MASTERPIECE PHOTOGRAPHY: "${prompt}"
Specs: 35mm anamorphic lens, f/1.8, volumetric lighting, hyper-detailed textures, 8k UHD.
Aspect Ratio: ${aspectRatio}.
Output: Return ONLY the high-fidelity masterpiece image. No text.`;

        const response = await ai.models.generateContent({
            model: FALLBACK_MODEL,
            contents: { parts: [{ text: fallbackPrompt }] },
            config: {
                safetySettings: SAFETY_SETTINGS
            }
        });
        
        return handleApiResponse(response, 'image generation');
    }
};
