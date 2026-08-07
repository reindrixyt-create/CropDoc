export type DiseaseCategory =
  | "Healthy"
  | "Early Blight"
  | "Late Blight"
  | "Leaf Spot"
  | "Powdery Mildew"
  | "Nutrient Deficiency"
  | "Pest Infestation"
  | "Rust Disease"
  | "Bacterial Spot"
  | "Unknown/Unclear";

export type SeverityLevel = "Healthy" | "Mild" | "Moderate" | "Severe";

export interface TreatmentItem {
  name: string;
  dosagePerAcre: string;
  applicationMethod: string;
  estimatedCostRangeINR: number;
}

export interface TreatmentDetail {
  type: "organic" | "chemical";
  name: string;
  dosagePerAcre: string;
  costINRPerAcre: number;
  description?: string;
}

export interface FertilizerScheduleItem {
  timing: string;
  fertilizerName: string;
  dosagePerAcre: string;
  purpose: string;
}

export interface ExplainableFeature {
  feature: string;
  observation: string;
  importanceScore?: number; // 0-100
}

export interface InfectedAreaBox {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number;
  height: number;
  label: string;
}

export interface YieldImpactEstimate {
  potentialYieldLossPercent: number;
  recoverableYieldPercent: number;
  financialImpactEstimateINR: number;
  actionableGuidance: string;
}

export interface DiseaseResult {
  id: string;
  timestamp: number;
  imageUri: string; // Base64 or object URL
  cropName: string;
  diseaseCategory: DiseaseCategory;
  diseaseName: string;
  confidence: number;
  severity: SeverityLevel;
  severityPercentage?: number;
  description: string;
  symptoms: string[];
  treatmentSuggestions: string[];
  organicTreatments?: TreatmentItem[];
  chemicalTreatments?: TreatmentItem[];
  organicTreatment?: TreatmentDetail;
  chemicalTreatment?: TreatmentDetail;
  preventiveMeasures: string[];
  source: "gemini" | "mobilenet_tfjs" | "fallback_analyzer";
  language: string;
  notes?: string;
  voiceContext?: string;
  farmSizeAcres?: number;
  // Advanced AgriTech Extensions
  growthStage?: string;
  pestIdentified?: string;
  nutrientDeficiency?: string;
  recoveryTimelineDays?: number;
  fertilizerSchedule?: FertilizerScheduleItem[];
  explainableAI?: ExplainableFeature[];
  infectedAreas?: InfectedAreaBox[];
  yieldImpact?: YieldImpactEstimate;
  unknownDiseaseAlert?: boolean;
  latitude?: number;
  longitude?: number;
  locationName?: string;
}

export type LanguageCode =
  | "en"
  | "hi"
  | "es"
  | "te"
  | "mr"
  | "pb"
  | "bn"
  | "gu"
  | "ta"
  | "kn"
  | "or"
  | "as";

export interface LanguageConfig {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export interface PresetSample {
  id: string;
  crop: string;
  category: DiseaseCategory;
  diseaseName: string;
  imageUri: string;
  shortDesc: string;
}

export interface CameraDeviceOption {
  deviceId: string;
  label: string;
}

// Chatbot Interface
export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: number;
  suggestedQuestions?: string[];
  imageUri?: string;
}



// Mandi Price Interface
export interface MandiPriceItem {
  id: string;
  crop: string;
  mandiName: string;
  state: string;
  pricePerQuintalINR: number;
  priceChange24hPercent: number;
  trend: "up" | "down" | "stable";
  lastUpdated: string;
}

// Government Scheme Interface
export interface GovtScheme {
  id: string;
  title: string;
  category: string;
  subsidyAmount: string;
  eligibility: string;
  description: string;
  applyUrl: string;
  helpline: string;
}

// Agri Store / KVK Expert Interface
export interface AgriStore {
  id: string;
  name: string;
  type: "kvk" | "pesticide_store" | "nursery" | "government_center";
  address: string;
  distanceKm: number;
  phone: string;
  rating: number;
  openNow: boolean;
  latitude: number;
  longitude: number;
}




