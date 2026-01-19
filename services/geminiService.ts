/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { getApiKey } from "../utils/apiKeyManager";

// --- 2026 Industry Standard Model Constants ---
const PRIMARY_MODEL = 'imagen-4.0-generate-001'; 
const FALLBACK_MODEL = 'gemini-3-flash-preview'; 

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

const handleApiResponse = (response: GenerateContentResponse, context: string): string => {
    if (response.promptFeedback?.blockReason) {
        throw new Error(`Request blocked: ${response.promptFeedback.blockReason}`);
    }
    const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
    if (imagePart?.inlineData) {
        return `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
    }
    throw new Error(`The AI failed to return a premium image for ${context}.`);
};

async function generateWithFallback(ai: any, payload: any, context: string): Promise<GenerateContentResponse> {
    try {
        return await ai.models.generateContent({ ...payload, model: PRIMARY_MODEL });
    } catch (error) {
        console.warn(`Primary model failed. Falling back to ${FALLBACK_MODEL}.`);
        return await ai.models.generateContent({ ...payload, model: FALLBACK_MODEL });
    }
}

/**
 * GENERATE EDITED IMAGE - LOCALIZED MASTERPIECE
 */
export const generateEditedImage = async (
    originalImage: File,
    userPrompt: string,
    hotspot: { x: number, y: number }
): Promise<string> => {
    const apiKey = getApiKey() || process.env.API_KEY || '';
    const ai = new GoogleGenAI({ apiKey });
    const originalImagePart = await fileToPart(originalImage);
    
    // PREMIUM PROMPT: Focuses on sub-pixel blending and light temperature matching
    const prompt = `ACT AS A SENIOR VFX COMPOSITOR. 
Task: Perform a hyper-realistic localized edit at (x: ${hotspot.x}, y: ${hotspot.y}).
Request: "${userPrompt}"
Technical Requirements:
- Use sub-pixel accuracy to blend the edit with the original grain structure.
- Match the global illumination, light temperature (Kelvin), and shadow density perfectly.
- Maintain 8k ultra-sharp resolution and 32-bit color depth fidelity.
- Ensure the edit is indistinguishable from a physical photograph.
Output: Return ONLY the raw processed image buffer. No text.`;

    const response = await generateWithFallback(ai, {
        contents: { parts: [originalImagePart, { text: prompt }] },
    }, 'edit');
    return handleApiResponse(response, 'edit');
};

/**
 * GENERATE FILTERED IMAGE - CINEMATIC COLOR SCIENCE
 */
export const generateFilteredImage = async (
    originalImage: File,
    filterPrompt: string,
): Promise<string> => {
    const apiKey = getApiKey() || process.env.API_KEY || '';
    const ai = new GoogleGenAI({ apiKey });
    const originalImagePart = await fileToPart(originalImage);

    // PREMIUM PROMPT: Focuses on professional color grading and LUT-style aesthetics
    const prompt = `ACT AS A MASTER COLORIST. 
Apply a professional cinematic grade: "${filterPrompt}"
Technical Guidelines:
- Utilize advanced Tonal Mapping and Film Print Emulation (FPE).
- Enhance micro-contrast without introduced artifacts or noise.
- Apply professional-grade color science (Rec.2020 color space fidelity).
- Maintain the original composition while elevating the "vibe" to a 70mm IMAX aesthetic.
Output: Return ONLY the final color-graded image.`;

    const response = await generateWithFallback(ai, {
        contents: { parts: [originalImagePart, { text: prompt }] },
    }, 'filter');
    return handleApiResponse(response, 'filter');
};

/**
 * GENERATE ADJUSTED IMAGE - OPTICAL FIDELITY
 */
export const generateAdjustedImage = async (
    originalImage: File,
    adjustmentPrompt: string,
): Promise<string> => {
    const apiKey = getApiKey() || process.env.API_KEY || '';
    const ai = new GoogleGenAI({ apiKey });
    const originalImagePart = await fileToPart(originalImage);

    // PREMIUM PROMPT: Focuses on HDR range and dynamic contrast
    const prompt = `ACT AS A HIGH-END DIGITAL RETOUCHER.
Adjustment Request: "${adjustmentPrompt}"
Technical Standards:
- Optimize dynamic range (HDR) while preserving highlight and shadow detail.
- Ensure 100% realistic texture retention; do not "soften" the image unless requested.
- Apply global luminance corrections with professional-grade smoothness.
- Preserve the exact aspect ratio and 2K/4K resolution clarity.
Output: Return ONLY the adjusted master file.`;

    const response = await generateWithFallback(ai, {
        contents: { parts: [originalImagePart, { text: prompt }] },
    }, 'adjustment');
    return handleApiResponse(response, 'adjustment');
};

/**
 * GENERATE IMAGE FROM TEXT - THE "ULTRA" GENERATOR
 */
export const generateImageFromText = async (
    prompt: string,
    aspectRatio: string = '1:1'
): Promise<string> => {
    const apiKey = getApiKey() || process.env.API_KEY || '';
    const ai = new GoogleGenAI({ apiKey });

    // PREMIUM PROMPT: The "Holy Grail" of generation keywords for Imagen 4
    const fullPrompt = `MASTERPIECE PHOTOGRAPHY: "${prompt}"
Technical Specifications for Maximum Quality:
- Style: Photorealistic, shot on 35mm anamorphic lens, f/1.8 aperture.
- Lighting: Volumetric lighting, global illumination, ray-traced reflections.
- Detail: Hyper-detailed textures (pores, fabric weave, micro-surface imperfections).
- Finish: 8k UHD, crispy sharp focus, cinematic bokeh, professional color science.
- Composition: Golden ratio, award-winning photography standards.
- Aspect Ratio: ${aspectRatio}.
Output: Return ONLY the final high-fidelity masterpiece image. No text.`;

    const response = await generateWithFallback(ai, {
        contents: { parts: [{ text: fullPrompt }] },
    }, 'text-to-image');
    return handleApiResponse(response, 'image generation');
};
