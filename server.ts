import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = 3000;

// Body parser limits for high resolution leaf photos
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// Handle invalid JSON body payload errors gracefully
app.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof SyntaxError && "status" in err && (err as any).status === 400 && "body" in err) {
    res.status(400).json({ error: "Invalid JSON body provided in request." });
    return;
  }
  next(err);
});

// Lazy initialize Gemini client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check route
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "CropDoc AI API" });
});

// API route to analyze crop/plant leaf image using Gemini Vision
app.post("/api/analyze-leaf", async (req, res) => {
  try {
    const { imageBase64, language = "English", voiceContext } = req.body;

    if (!imageBase64) {
      res.status(400).json({ error: "Image data (imageBase64) is required." });
      return;
    }

    // Extract mimeType and clean base64 bytes from Data URL if present
    let cleanBase64 = imageBase64;
    let mimeType = req.body.mimeType || "image/jpeg";

    if (typeof imageBase64 === "string" && imageBase64.startsWith("data:")) {
      const commaIdx = imageBase64.indexOf(",");
      if (commaIdx !== -1) {
        const header = imageBase64.substring(0, commaIdx);
        cleanBase64 = imageBase64.substring(commaIdx + 1).trim();
        const mimeMatch = header.match(/^data:([^;]+)/);
        if (mimeMatch) mimeType = mimeMatch[1];
      }
    }

    // Ensure mimeType is a format supported by Gemini Vision API
    if (!["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"].includes(mimeType)) {
      mimeType = "image/jpeg";
    }

    const ai = getGeminiClient();

    const promptText = `You are CropDoc, an expert agricultural plant pathologist and senior crop doctor serving farmers in India.
Analyze this photo of a plant leaf carefully.

Target Language for user text: ${language}
${voiceContext ? `Farmer's Voice Description of symptoms: "${voiceContext}"` : ""}

Your task:
1. Determine if the photo clearly shows a plant/crop leaf or agricultural plant part. If it is NOT a plant or leaf, set isLeaf to false and category to "Unknown/Unclear".
2. Identify the specific crop/plant species (e.g., Tomato, Potato, Corn, Wheat, Rice, Cotton, Chilli, Grape, Apple, Rose, Soybean, etc.).
3. Classify the condition into exactly ONE of these primary categories:
   - "Healthy"
   - "Early Blight"
   - "Late Blight"
   - "Leaf Spot"
   - "Powdery Mildew"
   - "Nutrient Deficiency"
   - "Pest Infestation"
   - "Rust Disease"
   - "Bacterial Spot"
   - "Unknown/Unclear"

4. Estimate confidence level (percentage from 50 to 99).
5. Estimate disease severity level ("Healthy", "Mild", "Moderate", "Severe") and exact infected area percentage (0 to 100).
6. Growth stage recognition: identify current plant stage ("Seedling", "Vegetative", "Flowering", "Fruiting", "Harvesting").
7. Pest & Nutrient detection: specify pest name if pests are present, or specific deficiency (e.g., "Nitrogen Deficiency", "Potassium Deficiency", "Zinc Deficiency") if applicable.
8. Explainable AI: Provide 2-3 specific visual traits observed on the leaf that justify this diagnosis (e.g., "Concentric dark rings with yellow chlorotic halo", "White powdery fungal spots on upper surface").
9. Infected area coordinates: Provide 1 to 3 bounding box coordinates (percentages 0-100 for x, y, width, height) highlighting the affected disease spots on the leaf image.
10. Recovery timeline & Fertilizer schedule: Estimate recovery timeline in days (e.g. 10) and provide a 2-step fertilizer application schedule with timing, fertilizer name, dosage per acre, and purpose.
11. Yield Impact Estimate: Estimate potential yield loss percentage (0-80%), recoverable percentage (20-100%), estimated financial impact in INR per acre, and actionable advice.
12. Unknown Disease Alert: Set unknownDiseaseAlert to true if symptoms look unusual, mutated, or represent an emerging pathogen.
13. Provide a short, plain-language description explaining the condition in simple terms that a farmer can easily understand.
14. Provide 3 simple, practical, distinct step-by-step field treatment action steps (e.g. Step 1: Sanitation & infected leaf removal, Step 2: Spray application instructions, Step 3: Soil moisture & nutrient support). Do NOT repeat medicine names unnecessarily.
15. Provide two detailed treatment arrays:
   - organicTreatments: 1 or 2 distinct, low-cost, eco-friendly botanical or bio-pesticide options.
   - chemicalTreatments: 1 or 2 distinct, fast-acting chemical fungicide or pesticide options.
   IMPORTANT for treatments:
   - Provide UNIQUE treatments only. Do NOT repeat the same active ingredient or medicine twice in the array.
   - For name: treatment name with active ingredient ONLY (e.g. "Mancozeb 75% WP", "Neem Oil 10,000 PPM"). Do NOT include prefixes like "Chemical Option:", "Option 1:", or "Low Cost".
   - dosagePerAcre: exact quantity per acre (e.g. "500 g per acre in 200 L water").
   - applicationMethod: foliar spray, soil drench, or timing guidelines in ${language}.
   - estimatedCostRangeINR: estimated cost per acre in Indian Rupees (e.g. 250).
16. Provide 2-3 preventive measures to protect the crop from future infections.

IMPORTANT: All text fields MUST be written in ${language} so the farmer can easily read or hear it.
For diseaseName, ALWAYS include the local language/vernacular name used by local farmers along with the English name in parentheses.`;

    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: cleanBase64,
              },
            },
            {
              text: promptText,
            },
          ],
        },
        config: {
          temperature: 0.2,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              isLeaf: { type: Type.BOOLEAN },
              cropName: { type: Type.STRING },
              diseaseCategory: { type: Type.STRING },
              diseaseName: { type: Type.STRING },
              confidence: { type: Type.NUMBER },
              severity: { type: Type.STRING },
              severityPercentage: { type: Type.NUMBER },
              growthStage: { type: Type.STRING },
              pestIdentified: { type: Type.STRING },
              nutrientDeficiency: { type: Type.STRING },
              recoveryTimelineDays: { type: Type.NUMBER },
              unknownDiseaseAlert: { type: Type.BOOLEAN },
              description: { type: Type.STRING },
              symptoms: { type: Type.ARRAY, items: { type: Type.STRING } },
              treatmentSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
              organicTreatments: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    dosagePerAcre: { type: Type.STRING },
                    applicationMethod: { type: Type.STRING },
                    estimatedCostRangeINR: { type: Type.NUMBER },
                  },
                },
              },
              chemicalTreatments: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    dosagePerAcre: { type: Type.STRING },
                    applicationMethod: { type: Type.STRING },
                    estimatedCostRangeINR: { type: Type.NUMBER },
                  },
                },
              },
              fertilizerSchedule: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    timing: { type: Type.STRING },
                    fertilizerName: { type: Type.STRING },
                    dosagePerAcre: { type: Type.STRING },
                    purpose: { type: Type.STRING },
                  },
                },
              },
              explainableAI: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    feature: { type: Type.STRING },
                    observation: { type: Type.STRING },
                    importanceScore: { type: Type.NUMBER },
                  },
                },
              },
              infectedAreas: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    x: { type: Type.NUMBER },
                    y: { type: Type.NUMBER },
                    width: { type: Type.NUMBER },
                    height: { type: Type.NUMBER },
                    label: { type: Type.STRING },
                  },
                },
              },
              yieldImpact: {
                type: Type.OBJECT,
                properties: {
                  potentialYieldLossPercent: { type: Type.NUMBER },
                  recoverableYieldPercent: { type: Type.NUMBER },
                  financialImpactEstimateINR: { type: Type.NUMBER },
                  actionableGuidance: { type: Type.STRING },
                },
              },
              preventiveMeasures: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: [
              "isLeaf",
              "cropName",
              "diseaseCategory",
              "diseaseName",
              "confidence",
              "severity",
              "description",
              "symptoms",
              "treatmentSuggestions",
              "preventiveMeasures",
            ],
          },
        },
      });
    } catch (primaryErr: any) {
      console.warn("Primary model gemini-3.6-flash error, falling back to gemini-2.5-flash:", primaryErr?.message || primaryErr);
      response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: cleanBase64,
              },
            },
            {
              text: promptText,
            },
          ],
        },
        config: {
          temperature: 0.2,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              isLeaf: { type: Type.BOOLEAN },
              cropName: { type: Type.STRING },
              diseaseCategory: { type: Type.STRING },
              diseaseName: { type: Type.STRING },
              confidence: { type: Type.NUMBER },
              severity: { type: Type.STRING },
              description: { type: Type.STRING },
              symptoms: { type: Type.ARRAY, items: { type: Type.STRING } },
              treatmentSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
              preventiveMeasures: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: [
              "isLeaf",
              "cropName",
              "diseaseCategory",
              "diseaseName",
              "confidence",
              "severity",
              "description",
              "symptoms",
              "treatmentSuggestions",
              "preventiveMeasures",
            ],
          },
        },
      });
    }

    let responseText = response.text || "";
    if (!responseText) {
      throw new Error("No output text received from Gemini API.");
    }

    // Strip potential markdown code fences or surrounding spaces
    responseText = responseText.trim();
    if (responseText.startsWith("```")) {
      responseText = responseText
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();
    }

    let resultData;
    try {
      resultData = JSON.parse(responseText);
    } catch (parseErr: any) {
      console.warn("Direct JSON.parse failed, attempting substring extraction:", parseErr?.message);
      const startIdx = responseText.indexOf("{");
      const endIdx = responseText.lastIndexOf("}");
      if (startIdx !== -1 && endIdx > startIdx) {
        const jsonSub = responseText.substring(startIdx, endIdx + 1);
        resultData = JSON.parse(jsonSub);
      } else {
        throw parseErr;
      }
    }

    // Server-side treatment deduplication and sanitizer
    if (resultData && typeof resultData === "object") {
      const cleanName = (str?: string) =>
        (str || "")
          .replace(/^[🌱🧪]?\s*(Low[- ]Cost|Eco[- ]Friendly|Organic|Botanical|Chemical)\s*(\/|\&|\+)?\s*(Eco[- ]Friendly|Botanical|Pesticide|Fungicide|Medicine)?\s*(Option|Treatment|Solution)?\s*[:\-–—\.]*\s*/i, "")
          .replace(/^(Organic|Botanical|Chemical)\s*(Option|Treatment|Medicine|Spray|Solution)\s*[:\-–—\.]*\s*/i, "")
          .replace(/^Option\s*\d*[:\-–—\.]*\s*/i, "")
          .trim();

      const dedupeList = (list?: any[]) => {
        if (!Array.isArray(list) || list.length === 0) return list;
        const seen = new Set<string>();
        return list.filter((item) => {
          if (!item || typeof item !== "object") return false;
          item.name = cleanName(item.name);
          const key = item.name.toLowerCase().replace(/[^a-z0-9]/g, "");
          if (!key || seen.has(key)) return false;
          seen.add(key);
          return true;
        }).slice(0, 2); // Limit to max 2 clean, distinct options
      };

      resultData.organicTreatments = dedupeList(resultData.organicTreatments);
      resultData.chemicalTreatments = dedupeList(resultData.chemicalTreatments);
    }

    res.json(resultData);
  } catch (error: any) {
    console.error("Error in /api/analyze-leaf:", error);
    res.status(500).json({
      error: "Failed to analyze leaf image with AI model.",
      details: error?.message || String(error),
    });
  }
});

// AI Chatbot Endpoint for Crop Diagnosis & Farming Advice
app.post("/api/chat", async (req, res) => {
  try {
    const { message, language = "English", history = [], imageBase64 } = req.body;

    if (!message && !imageBase64) {
      res.status(400).json({ error: "Message or image is required." });
      return;
    }

    const ai = getGeminiClient();

    const systemPrompt = `You are CropDoc AI Chatbot, an agricultural AI expert, crop pathologist, and farming consultant in India.
Answer the farmer clearly, concisely, and empathetically in ${language}.
Provide practical advice regarding crop diseases, pest control, fertilizers, irrigation, market prices, and government schemes.
If the farmer asks about disease treatment, mention both organic/low-cost methods and chemical solutions.`;

    const contentsParts: any[] = [{ text: systemPrompt }];

    // Format previous conversation history
    if (Array.isArray(history) && history.length > 0) {
      const formattedHistory = history
        .slice(-6)
        .map((h: any) => `${h.sender === "user" ? "Farmer" : "CropDoc AI"}: ${h.text}`)
        .join("\n");
      contentsParts.push({ text: `Recent Conversation Context:\n${formattedHistory}` });
    }

    if (imageBase64) {
      let cleanBase64 = imageBase64;
      let mimeType = "image/jpeg";
      if (typeof imageBase64 === "string" && imageBase64.startsWith("data:")) {
        const commaIdx = imageBase64.indexOf(",");
        if (commaIdx !== -1) {
          const header = imageBase64.substring(0, commaIdx);
          cleanBase64 = imageBase64.substring(commaIdx + 1).trim();
          const mimeMatch = header.match(/^data:([^;]+)/);
          if (mimeMatch) mimeType = mimeMatch[1];
        }
      }
      contentsParts.push({
        inlineData: { mimeType, data: cleanBase64 },
      });
    }

    contentsParts.push({ text: `Farmer asks (${language}): ${message || "Please analyze this image and answer."}` });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: { parts: contentsParts },
      config: {
        temperature: 0.4,
        maxOutputTokens: 2048,
      },
    });

    const replyText = response.text || "I am currently unable to process your query. Please try again.";
    res.json({ reply: replyText });
  } catch (err: any) {
    console.error("Error in /api/chat:", err);
    res.status(500).json({ error: "Failed to generate chat response.", details: err?.message || String(err) });
  }
});



async function startServer() {
  // Vite middleware for development vs static build serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[CropDoc] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
