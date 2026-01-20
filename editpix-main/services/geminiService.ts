/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, GenerateContentResponse, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { getApiKey } from "../utils/apiKeyManager";

// --- 2026 Industry Standard Model Constants ---
export const PRIMARY_MODEL = 'gemini-3-pro-image'; 
export const FALLBACK_MODEL = 'imagen-4.0-generate-001'; 
export const NANO_MODEL = 'nanobannana-1'; // "NanoBannana" aka nanobannana

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
    const imagePart = candidate?.content?.parts?.find(part => part.inlineData);
    if (imagePart?.inlineData) {
        return `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
    }

    // 4. Fallback for Empty Responses
    throw new Error(`System Error: The AI confirmed completion but did not return image data for ${context}.`);
};

async function generateWithModel(ai: any, payload: any, model: string, context: string): Promise<GenerateContentResponse> {
    try {
        return await ai.models.generateContent({
            ...payload,
            model,
            safetySettings: SAFETY_SETTINGS
        });
    } catch (error) {
        const rawMessage = error instanceof Error ? error.message : String(error);
        console.error(`Model ${model} failed for ${context}:`, error);
        throw new Error(`Model ${model} failed for ${context}: ${rawMessage}`);
    }
}

async function generateWithFallback(ai: any, payload: any, context: string): Promise<GenerateContentResponse> {
    try {
        // First, try the primary (e.g. Imagen). If it fails with a clear API /
        // permission error, surface that directly instead of silently hiding it
        // behind a fallback response.
        return await generateWithModel(ai, payload, PRIMARY_MODEL, context);
    } catch (primaryError) {
        const message = primaryError instanceof Error ? primaryError.message : String(primaryError);

        // If it's an auth/permission/quota/model error, do NOT fall back – show it.
        if (/PERMISSION|UNAUTHENTICATED|UNAUTHORIZED|API key|quota|NOT_FOUND|model/i.test(message)) {
            throw primaryError instanceof Error
                ? primaryError
                : new Error(message);
        }

        console.warn(`Primary model failed for ${context}. Trying fallback: ${FALLBACK_MODEL}`);

        try {
            return await generateWithModel(ai, payload, FALLBACK_MODEL, context);
        } catch (fallbackError) {
            const fbMessage = fallbackError instanceof Error ? fallbackError.message : String(fallbackError);
            throw new Error(
                `Both models failed for ${context}. Primary: ${message}. Fallback: ${fbMessage}`
            );
        }
    }
}

export const generateEditedImage = async (
    originalImage: File,
    userPrompt: string,
    hotspot: { x: number, y: number },
    model?: string
): Promise<string> => {
    const apiKey = getApiKey() || process.env.API_KEY || '';
    const ai = new GoogleGenAI({ apiKey });
    const originalImagePart = await fileToPart(originalImage);
    
    const prompt = `ACT AS A SENIOR VFX COMPOSITOR. 
Task: Perform a hyper-realistic localized edit at (x: ${hotspot.x}, y: ${hotspot.y}).
Request: "${userPrompt}"
Technical Requirements:
- Use sub-pixel accuracy to blend the edit with the original grain structure.
- Match global illumination, light temperature, and shadow density.
Output: Return ONLY the raw processed image buffer. No text.`;

    const payload = {
        contents: { parts: [originalImagePart, { text: prompt }] },
    };
    
    const response = model
        ? await generateWithModel(ai, payload, model, 'edit')
        : await generateWithFallback(ai, payload, 'edit');

    return handleApiResponse(response, 'edit');
};

export const generateFilteredImage = async (
    originalImage: File,
    filterPrompt: string,
    model?: string
): Promise<string> => {
    const apiKey = getApiKey() || process.env.API_KEY || '';
    const ai = new GoogleGenAI({ apiKey });
    const originalImagePart = await fileToPart(originalImage);

    const prompt = `ACT AS A MASTER COLORIST. Apply cinematic grade: "${filterPrompt}"
Guidelines: Advanced Tonal Mapping, Rec.2020 fidelity, 70mm IMAX aesthetic.
Output: Return ONLY the final color-graded image.`;

    const payload = {
        contents: { parts: [originalImagePart, { text: prompt }] },
    };

    const response = model
        ? await generateWithModel(ai, payload, model, 'filter')
        : await generateWithFallback(ai, payload, 'filter');

    return handleApiResponse(response, 'filter');
};

export const generateAdjustedImage = async (
    originalImage: File,
    adjustmentPrompt: string,
    model?: string
): Promise<string> => {
    const apiKey = getApiKey() || process.env.API_KEY || '';
    const ai = new GoogleGenAI({ apiKey });
    const originalImagePart = await fileToPart(originalImage);

    const prompt = `ACT AS A HIGH-END DIGITAL RETOUCHER. Adjustment: "${adjustmentPrompt}"
Standards: Preserve 100% realistic texture, HDR detail retention, 4K clarity.
Output: Return ONLY the adjusted master file.`;

    const payload = {
        contents: { parts: [originalImagePart, { text: prompt }] },
    };

    const response = model
        ? await generateWithModel(ai, payload, model, 'adjustment')
        : await generateWithFallback(ai, payload, 'adjustment');
        
    return handleApiResponse(response, 'adjustment');
};

export const generateImageFromText = async (
    prompt: string,
    aspectRatio: string = '1:1',
    model?: string
): Promise<string> => {
    const apiKey = getApiKey() || process.env.API_KEY || '';
    const ai = new GoogleGenAI({ apiKey });

    const fullPrompt = `MASTERPIECE PHOTOGRAPHY: "${prompt}"
Specs: 35mm anamorphic lens, f/1.8, volumetric lighting, hyper-detailed textures, 8k UHD.
Aspect Ratio: ${aspectRatio}.
Output: Return ONLY the high-fidelity masterpiece image. No text.`;

    const payload = {
        contents: { parts: [{ text: fullPrompt }] },
    };

    const response = model
        ? await generateWithModel(ai, payload, model, 'text-to-image')
        : await generateWithFallback(ai, payload, 'text-to-image');

    return handleApiResponse(response, 'image generation');
};
