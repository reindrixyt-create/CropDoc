import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  Volume2,
  VolumeX,
  RotateCcw,
  BookmarkPlus,
  Share2,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Info,
  Bug,
  Sprout,
  Check,
  PhoneCall,
  MessageSquare,
  FlaskConical,
  Leaf,
  Calculator,
  FileText,
  ExternalLink,
  MapPin,
  Download,
} from "lucide-react";
import { DiseaseResult, LanguageCode } from "../types";
import { UI_TRANSLATIONS } from "../data/translations";

interface ResultViewProps {
  result: DiseaseResult;
  currentLang: LanguageCode;
  onReset: () => void;
  onSave: (result: DiseaseResult) => void;
  isSaved: boolean;
}

// Sanitizes treatment text by stripping out repeated header phrases, emojis, or redundant "Option" prefixes
const sanitizeTreatmentText = (str?: string): string => {
  if (!str) return "";
  return str
    .replace(/^[🌱🧪]?\s*(Low[- ]Cost|Eco[- ]Friendly|Organic|Botanical|Chemical)\s*(\/|\&|\+)?\s*(Eco[- ]Friendly|Botanical|Pesticide|Fungicide|Medicine)?\s*(Option|Treatment|Solution)?\s*[:\-–—\.]*\s*/i, "")
    .replace(/^(Organic|Botanical|Chemical)\s*(Option|Treatment|Medicine|Spray|Solution)\s*[:\-–—\.]*\s*/i, "")
    .replace(/^Option\s*\d*[:\-–—\.]*\s*/i, "")
    .replace(/^\.\s*/, "")
    .trim();
};

interface CleanTreatmentItem {
  name: string;
  dosage: string;
  method?: string;
  unitCost: number;
  totalCost: number;
}

// Deduplicates and normalizes treatment items so farmers get clear, non-repetitive solutions
const getDeduplicatedTreatments = (
  rawTreatments?: { name?: string; dosagePerAcre?: string; applicationMethod?: string; estimatedCostRangeINR?: number; costINRPerAcre?: number }[],
  fallbackTreatment?: { name?: string; dosagePerAcre?: string; costINRPerAcre?: number },
  defaultName: string = "Recommended Treatment",
  defaultDosage: string = "500 ml per acre in 150-200 L water",
  defaultCost: number = 250,
  farmAcres: number = 1
): CleanTreatmentItem[] => {
  const resultList: CleanTreatmentItem[] = [];
  const seenKeys = new Set<string>();

  const candidates = (rawTreatments && rawTreatments.length > 0)
    ? rawTreatments
    : (fallbackTreatment ? [{
        name: fallbackTreatment.name,
        dosagePerAcre: fallbackTreatment.dosagePerAcre,
        estimatedCostRangeINR: fallbackTreatment.costINRPerAcre,
      }] : []);

  for (const item of candidates) {
    if (!item) continue;
    const cleanName = sanitizeTreatmentText(item.name) || defaultName;

    // Key normalization for fuzzy chemical/organic deduplication
    const rawKey = cleanName.toLowerCase().replace(/[^a-z0-9]/g, "");
    
    // Extract core chemical/active keyword if present
    let activeKey = rawKey;
    const coreKeywords = ["mancozeb", "copper", "azoxystrobin", "hexaconazole", "carbendazim", "chlorothalonil", "neem", "trichoderma", "pseudomonas", "bacillus", "streptocycline"];
    for (const kw of coreKeywords) {
      if (rawKey.includes(kw)) {
        activeKey = kw;
        break;
      }
    }

    if (seenKeys.has(activeKey) || (activeKey.length > 3 && Array.from(seenKeys).some(k => k.includes(activeKey) || activeKey.includes(k)))) {
      continue;
    }
    seenKeys.add(activeKey);

    const dosage = sanitizeTreatmentText(item.dosagePerAcre) || defaultDosage;
    const method = sanitizeTreatmentText(item.applicationMethod);
    const unitCost = Number(item.estimatedCostRangeINR || item.costINRPerAcre || defaultCost);
    const validUnitCost = isNaN(unitCost) || unitCost <= 0 ? defaultCost : unitCost;

    resultList.push({
      name: cleanName,
      dosage: dosage,
      method: method,
      unitCost: validUnitCost,
      totalCost: validUnitCost * farmAcres,
    });

    if (resultList.length >= 2) break; // Max 2 distinct unique options per category
  }

  if (resultList.length === 0) {
    resultList.push({
      name: defaultName,
      dosage: defaultDosage,
      unitCost: defaultCost,
      totalCost: defaultCost * farmAcres,
    });
  }

  return resultList;
};

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  currentLang,
  onReset,
  onSave,
  isSaved,
}) => {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [copiedToast, setCopiedToast] = useState<boolean>(false);
  const [reportDownloadedToast, setReportDownloadedToast] = useState<boolean>(false);
  const [farmAcres, setFarmAcres] = useState<number>(result.farmSizeAcres || 1);

  // Check if expert escalation is triggered (confidence < 70 OR severity is Severe)
  const isLowConfidenceOrSevere = result.confidence < 70 || result.severity === "Severe";

  const handleWhatsAppShare = () => {
    const topOrganic = result.organicTreatments?.[0]?.name || result.organicTreatment?.name || "Neem Oil 10,000 PPM";
    const organicCost = (result.organicTreatments?.[0]?.estimatedCostRangeINR || result.organicTreatment?.costINRPerAcre || 250) * farmAcres;
    const topChemical = result.chemicalTreatments?.[0]?.name || result.chemicalTreatment?.name || "Mancozeb 75% WP";

    const shareText = `*CropDoc Diagnosis Report* 🌿\n\n*Crop:* ${result.cropName}\n*Disease:* ${result.diseaseName}\n*Severity:* ${result.severity}\n*AI Confidence:* ${result.confidence}%\n*Farm Size:* ${farmAcres} Acre(s)\n\n*🌱 Low-Cost Organic Option:* ${topOrganic} (Est. ₹${organicCost})\n*🧪 Chemical Option:* ${topChemical}\n\n_Diagnosed via CropDoc AI Doctor_`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleDownloadFarmReport = () => {
    const reportText = `====================================================================
               CROPDOC OFFICIAL CROP HEALTH DIAGNOSIS REPORT
      FOR PRADHAN MANTRI FASAL BIMA YOJANA (PMFBY) & BANK RECORDS
====================================================================

REPORT ID: ${result.id}
DATE & TIME: ${new Date(result.timestamp).toLocaleString("en-IN")}
SOURCE ENGINE: CropDoc AI Doctor (Server & On-Device Vision Engine)

--------------------------------------------------------------------
1. FARMER & FIELD INFORMATION
--------------------------------------------------------------------
Field Size Analyzed: ${farmAcres} Acre(s)
Crop Species: ${result.cropName}
Target Language: ${currentLang.toUpperCase()}

--------------------------------------------------------------------
2. AI DIAGNOSTIC ASSESSMENT
--------------------------------------------------------------------
Identified Disease/Condition: ${result.diseaseName}
Disease Category: ${result.diseaseCategory}
AI Confidence Rating: ${result.confidence}%
Severity Level: ${result.severity}

Description:
${result.description}

Observed Leaf Symptoms:
${(result.symptoms || []).map((s) => `- ${s}`).join("\n")}

--------------------------------------------------------------------
3. RECOMMENDED TREATMENT PLAN & COST ESTIMATE (${farmAcres} ACRES)
--------------------------------------------------------------------
🌱 ORGANIC / ECO-FRIENDLY REMEDY:
- Name: ${result.organicTreatments?.[0]?.name || result.organicTreatment?.name || "Neem Oil 10,000 PPM"}
- Dosage (Per Acre): ${result.organicTreatments?.[0]?.dosagePerAcre || result.organicTreatment?.dosagePerAcre || "500 ml"}
- Application Method: ${result.organicTreatments?.[0]?.applicationMethod || "Foliar Spray"}
- Total Estimated Cost for ${farmAcres} Acre(s): ₹${(result.organicTreatments?.[0]?.estimatedCostRangeINR || result.organicTreatment?.costINRPerAcre || 250) * farmAcres}

🧪 CHEMICAL MEDICINE OPTION:
- Name: ${result.chemicalTreatments?.[0]?.name || result.chemicalTreatment?.name || "Mancozeb 75% WP"}
- Dosage (Per Acre): ${result.chemicalTreatments?.[0]?.dosagePerAcre || result.chemicalTreatment?.dosagePerAcre || "500 g"}
- Application Method: ${result.chemicalTreatments?.[0]?.applicationMethod || "Foliar Spray"}
- Total Estimated Cost for ${farmAcres} Acre(s): ₹${(result.chemicalTreatments?.[0]?.estimatedCostRangeINR || result.chemicalTreatment?.costINRPerAcre || 450) * farmAcres}

--------------------------------------------------------------------
4. PREVENTIVE MEASURES FOR FUTURE CROPS
--------------------------------------------------------------------
${(result.preventiveMeasures || []).map((p) => `✓ ${p}`).join("\n")}

--------------------------------------------------------------------
5. EXPERT HELPLINE & GOVERNMENT VERIFICATION
--------------------------------------------------------------------
Toll-Free Kisan Call Centre: 1800-180-1551
Krishi Vigyan Kendra (KVK) Locator: https://www.google.com/maps/search/Krishi+Vigyan+Kendra+near+me

Note: This document is generated by CropDoc AI Decision Support System to assist farmers, agricultural officers, bank assessors, and insurance agents in documenting crop condition and treatment cost estimations under PMFBY guidelines.
====================================================================`;

    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `CropDoc_Insurance_Report_${result.cropName.replace(/\s+/g, "_")}_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setReportDownloadedToast(true);
    setTimeout(() => setReportDownloadedToast(false), 3000);
  };

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakText = (text: string) => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech audio readout is not supported in this browser.");
      return;
    }

    try {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      setIsPlayingAudio(true);

      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);

        const localeMap: Record<LanguageCode, string> = {
          en: "en-IN",
          hi: "hi-IN",
          es: "es-ES",
          te: "te-IN",
          mr: "mr-IN",
          pb: "pa-IN",
          bn: "bn-IN",
          gu: "gu-IN",
          ta: "ta-IN",
          kn: "kn-IN",
          or: "or-IN",
          as: "as-IN",
        };

        const targetLang = localeMap[currentLang] || "en-IN";
        utterance.lang = targetLang;
        utterance.rate = 0.9; // Clear pace for farmers

        // Select best available browser voice
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          const matchedVoice = voices.find(
            (v) => v.lang === targetLang || v.lang.startsWith(targetLang.split("-")[0])
          );
          if (matchedVoice) {
            utterance.voice = matchedVoice;
          }
        }

        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = (e) => {
          console.warn("Speech synthesis error:", e);
          setIsPlayingAudio(false);
        };

        window.speechSynthesis.speak(utterance);
      }, 50);
    } catch (e) {
      console.warn("Speech synthesis execution error:", e);
      setIsPlayingAudio(false);
    }
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
      return;
    }

    const fullReadout = `Crop: ${result.cropName}. Condition: ${result.diseaseName}. Description: ${result.description}. Symptoms: ${result.symptoms.join(", ")}. Treatments: ${result.treatmentSuggestions.join(", ")}`;
    speakText(fullReadout);
  };

  const handleShare = async () => {
    const shareText = `🌾 CropDoc Diagnosis 🌾\nCrop: ${result.cropName}\nDisease: ${result.diseaseName}\nConfidence: ${result.confidence}%\nTreatments:\n- ${result.treatmentSuggestions.join("\n- ")}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `CropDoc: ${result.diseaseName}`,
          text: shareText,
        });
        return;
      } catch (e) {
        // Fallback to clipboard
      }
    }

    navigator.clipboard.writeText(shareText);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const getSeverityBadge = () => {
    switch (result.severity) {
      case "Healthy":
        return {
          bg: "bg-emerald-100 text-emerald-900 border-emerald-300",
          icon: <ShieldCheck className="w-4 h-4 text-emerald-700" />,
          label: "Healthy",
        };
      case "Mild":
        return {
          bg: "bg-amber-100 text-amber-900 border-amber-300",
          icon: <Info className="w-4 h-4 text-amber-700" />,
          label: "Mild Severity",
        };
      case "Moderate":
        return {
          bg: "bg-orange-100 text-orange-900 border-orange-300",
          icon: <AlertTriangle className="w-4 h-4 text-orange-700" />,
          label: "Moderate Severity",
        };
      case "Severe":
        return {
          bg: "bg-rose-100 text-rose-900 border-rose-300",
          icon: <AlertTriangle className="w-4 h-4 text-rose-700" />,
          label: "Severe Infection",
        };
      default:
        return {
          bg: "bg-slate-100 text-slate-900 border-slate-300",
          icon: <Info className="w-4 h-4 text-slate-700" />,
          label: result.severity,
        };
    }
  };

  const getSeverityBorderClass = () => {
    switch (result.severity) {
      case "Healthy":
        return "border-l-[8px] border-l-emerald-500";
      case "Mild":
        return "border-l-[8px] border-l-amber-500";
      case "Moderate":
        return "border-l-[8px] border-l-orange-500";
      case "Severe":
        return "border-l-[8px] border-l-rose-600";
      default:
        return "border-l-[8px] border-l-emerald-500";
    }
  };

  const getConfidenceMeta = (confidence: number) => {
    if (confidence >= 85) {
      return {
        level: t.confidenceHighLevel || "High Accuracy Match",
        badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
        cardBg: "bg-emerald-50/80 border-emerald-200 text-emerald-950",
        barColor: "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400",
        textColor: "text-emerald-700",
        icon: <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />,
        statusBadge: "bg-emerald-600 text-white",
        note: "High probability visual match against trained AI plant pathogen models.",
      };
    } else if (confidence >= 65) {
      return {
        level: t.confidenceModerateLevel || "Moderate Match",
        badgeBg: "bg-amber-500/20 text-amber-300 border-amber-400/30",
        cardBg: "bg-amber-50/80 border-amber-200 text-amber-950",
        barColor: "bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-400",
        textColor: "text-amber-800",
        icon: <Info className="w-4 h-4 text-amber-400 shrink-0" />,
        statusBadge: "bg-amber-500 text-slate-950 font-bold",
        note: "Moderate visual match. Compare symptoms with leaf appearance before applying treatment.",
      };
    } else {
      return {
        level: t.confidenceLowLevel || "Low Accuracy - Verify with Expert",
        badgeBg: "bg-rose-500/20 text-rose-300 border-rose-400/30",
        cardBg: "bg-rose-50/80 border-rose-200 text-rose-950",
        barColor: "bg-gradient-to-r from-rose-500 via-amber-500 to-rose-400",
        textColor: "text-rose-800",
        icon: <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />,
        statusBadge: "bg-rose-600 text-white font-bold",
        note: "Low visual confidence. Take a closer photo under bright light or call Kisan Helpline.",
      };
    }
  };

  const severityBadge = getSeverityBadge();
  const confMeta = getConfidenceMeta(result.confidence);
  const isRisk = result.severity !== "Healthy" && result.diseaseCategory !== "Healthy";

  return (
    <div className="w-full max-w-full lg:max-w-6xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Blinking Disease Risk Alert Indicator Banner */}
      {isRisk && (
        <div className="bg-rose-950 text-rose-50 p-4 rounded-2xl border-2 border-rose-500 shadow-xl flex items-center justify-between gap-3 animate-pulse ring-4 ring-rose-500/30">
          <div className="flex items-center gap-3">
            <div className="relative flex h-4 w-4 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-600"></span>
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-black tracking-wider text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
                <span>{t.riskDetectedBannerTitle || "HIGH CROP DISEASE RISK DETECTED"}</span>
              </div>
              <p className="text-xs text-rose-100 font-medium leading-tight">
                {t.riskDetectedBannerSub || "Leaf scan identified active infection or pest threat — immediate action recommended."}
              </p>
            </div>
          </div>
          <span className="shrink-0 text-[10px] font-black bg-rose-600 text-white px-2.5 py-1 rounded-lg uppercase tracking-wider animate-pulse shadow-xs border border-rose-400">
            {result.severity} RISK
          </span>
        </div>
      )}

      {/* Disclaimer Notice */}
      <div className="bg-emerald-900 text-emerald-100 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between gap-2 shadow-sm border border-emerald-700">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{t.prototypeNotice}</span>
        </div>
        <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded font-mono uppercase">
          AI Doctor
        </span>
      </div>

      {/* Main Diagnosis Card */}
      <div className={`bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden ${getSeverityBorderClass()}`}>
        {/* Card Header Media & Primary Label */}
        <div className="relative bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          {/* Leaf Thumbnail */}
          <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-white/30 shadow-lg shrink-0 bg-slate-800 group">
            <img
              src={result.imageUri}
              alt="Leaf sample"
              className="w-full h-full object-cover"
            />

            {/* Bounding Box Highlights for Infected Spots */}
            {result.infectedAreas && result.infectedAreas.length > 0 && result.infectedAreas.map((area, idx) => (
              <div
                key={idx}
                style={{
                  left: `${area.x}%`,
                  top: `${area.y}%`,
                  width: `${area.width}%`,
                  height: `${area.height}%`,
                }}
                className="absolute border-2 border-rose-500 bg-rose-500/20 rounded-sm pointer-events-none animate-pulse"
              >
                <span className="absolute -top-3 left-0 bg-rose-600 text-white text-[8px] font-bold px-1 rounded">
                  {area.label || "Spot"}
                </span>
              </div>
            ))}

            {isRisk && (
              <div className="absolute top-2 left-2 bg-rose-600/90 text-white text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1.5 shadow-md border border-rose-400 animate-pulse">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span>RISK</span>
              </div>
            )}
            <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
              {result.confidence}% Match
            </div>
          </div>

          {/* Core Diagnosis Summary */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-400/30 flex items-center gap-1">
                <Sprout className="w-3.5 h-3.5" />
                {result.cropName}
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 ${severityBadge.bg}`}
              >
                {severityBadge.icon}
                {severityBadge.label}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              {result.diseaseName}
            </h2>

            {/* Visual Confidence Meter Bar */}
            <div className="pt-2 space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold text-slate-200">
                <span className="flex items-center gap-1.5">
                  {confMeta.icon}
                  <span>{t.confidence || "AI Confidence Level"}</span>
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${confMeta.badgeBg}`}>
                  {result.confidence}% — {confMeta.level}
                </span>
              </div>
              <div className="relative w-full h-3 bg-slate-800/90 rounded-full overflow-hidden p-0.5 border border-slate-700 shadow-inner">
                <div
                  className={`h-full rounded-full ${confMeta.barColor} transition-all duration-1000 relative overflow-hidden shadow-sm`}
                  style={{ width: `${result.confidence}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Audio Voice Readout Bar for Farmers */}
        <div className="bg-amber-50 border-y border-amber-200/80 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-900 text-xs font-bold">
            <Volume2 className="w-5 h-5 text-amber-700 animate-pulse" />
            <span>Audio Voice Assistant</span>
          </div>
          <button
            onClick={handleToggleAudio}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              isPlayingAudio
                ? "bg-rose-600 text-white hover:bg-rose-700"
                : "bg-amber-500 hover:bg-amber-600 text-slate-950"
            }`}
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>{t.stopAudio}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>{t.listenAudio}</span>
              </>
            )}
          </button>
        </div>

        {/* Details Body */}
        <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Diagnosis Overview, Symptoms, Expert Escalation */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
            {/* Plain Language Description */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-emerald-600" />
                Doctor Description & Plant Growth Stage
              </h3>
              <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
                {result.description}
              </p>

              {/* Growth Stage & Nutrient / Pest Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60 text-xs">
                {result.growthStage && (
                  <span className="bg-emerald-100 text-emerald-900 font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                    🌱 Stage: {result.growthStage}
                  </span>
                )}
                {result.nutrientDeficiency && (
                  <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full border border-amber-300">
                    🧪 Deficiency: {result.nutrientDeficiency}
                  </span>
                )}
                {result.pestIdentified && (
                  <span className="bg-rose-100 text-rose-900 font-bold px-2.5 py-0.5 rounded-full border border-rose-300">
                    🐛 Pest: {result.pestIdentified}
                  </span>
                )}
                {result.recoveryTimelineDays && (
                  <span className="bg-teal-100 text-teal-900 font-bold px-2.5 py-0.5 rounded-full border border-teal-300">
                    ⏱️ Est. Recovery: {result.recoveryTimelineDays} Days
                  </span>
                )}
              </div>
            </div>

            {/* Explainable AI Visual Feature Breakdown */}
            {result.explainableAI && result.explainableAI.length > 0 && (
              <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-2.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Explainable AI — Visual Key Markers
                  </h3>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                    Pathology Vision
                  </span>
                </div>
                <div className="space-y-1.5 text-xs">
                  {(result.explainableAI || []).map((item, idx) => (
                    <div key={idx} className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/80 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <div>
                        <span className="font-bold text-emerald-300">{item.feature}: </span>
                        <span className="text-slate-200">{item.observation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Yield & Financial Impact Estimator */}
            {result.yieldImpact && (
              <div className="bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 text-white p-4.5 rounded-2xl border border-emerald-800/80 space-y-2.5 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-teal-300" />
                    Yield Loss & Financial Impact
                  </span>
                  <span className="bg-teal-500/20 text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-400/30">
                    Acre Estimate
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
                    <span className="text-[10px] text-teal-200 block">Potential Yield Loss</span>
                    <span className="text-lg font-black text-rose-300">
                      {result.yieldImpact.potentialYieldLossPercent}%
                    </span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
                    <span className="text-[10px] text-teal-200 block">Recoverable with Treatment</span>
                    <span className="text-lg font-black text-emerald-300">
                      {result.yieldImpact.recoverableYieldPercent}%
                    </span>
                  </div>
                </div>

                {result.yieldImpact.financialImpactEstimateINR && (
                  <p className="text-xs font-bold text-amber-300 pt-1 border-t border-white/10">
                    Est. Financial Impact: ₹{(result.yieldImpact.financialImpactEstimateINR * farmAcres).toLocaleString("en-IN")} total for {farmAcres} acre(s)
                  </p>
                )}
              </div>
            )}

            {/* 2-Step Fertilizer & Nutrient Schedule */}
            {result.fertilizerSchedule && result.fertilizerSchedule.length > 0 && (
              <div className="bg-amber-50/80 border border-amber-300/80 p-4 rounded-2xl space-y-2.5">
                <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Sprout className="w-4 h-4 text-amber-700" />
                  Recommended Fertilizer Application Schedule
                </h3>
                <div className="space-y-2 text-xs">
                  {(result.fertilizerSchedule || []).map((item, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-amber-200 shadow-2xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-amber-900">
                        <span>Step {idx + 1}: {item.fertilizerName}</span>
                        <span className="text-[10px] bg-amber-100 px-2 py-0.5 rounded-md">{item.timing}</span>
                      </div>
                      <p className="text-slate-700 text-[11px]"><strong>Dosage:</strong> {item.dosagePerAcre} per acre</p>
                      <p className="text-slate-500 text-[11px] italic">{item.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Visual AI Confidence Meter Card */}
            <div className={`rounded-2xl p-4 border ${confMeta.cardBg} space-y-3 shadow-2xs`}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white/90 rounded-lg shadow-2xs border border-slate-200/60">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    {t.confidenceMeterTitle || "AI Diagnosis Confidence Meter"}
                  </h3>
                </div>
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-2xs ${confMeta.statusBadge}`}>
                  {result.confidence}% Match
                </span>
              </div>

              {/* Progress Gauge Bar */}
              <div className="space-y-1">
                <div className="relative w-full h-3.5 bg-slate-200/80 rounded-full overflow-hidden p-0.5 border border-slate-300/70 shadow-inner">
                  <div
                    className={`h-full rounded-full ${confMeta.barColor} transition-all duration-1000 shadow-xs relative overflow-hidden`}
                    style={{ width: `${result.confidence}%` }}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse" />
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-extrabold px-0.5">
                  <span>0% (Uncertain)</span>
                  <span>50% (Moderate)</span>
                  <span>100% (High)</span>
                </div>
              </div>

              <div className="text-xs text-slate-700 font-medium leading-tight flex items-start gap-2 pt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>{confMeta.note}</span>
              </div>
            </div>

            {/* Observable Symptoms */}
            {result.symptoms && result.symptoms.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Bug className="w-4 h-4 text-rose-600" />
                  <span>{t.symptomsTitle}</span>
                </h3>
                <ul className="grid grid-cols-1 gap-2">
                  {result.symptoms.map((symptom, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CONFIDENCE & SEVERITY-BASED EXPERT ESCALATION CARD */}
            {isLowConfidenceOrSevere && (
              <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border-2 border-rose-400 rounded-3xl p-5 space-y-3 shadow-md animate-fade-in">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-rose-600 text-white rounded-2xl shrink-0 shadow-sm">
                    <AlertTriangle className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-slate-900">
                      {t.confirmWithExpertTitle || "Please Confirm With an Expert"}
                    </h3>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {t.confirmWithExpertDesc ||
                        `Low confidence (${result.confidence}%) or severe infection detected on ${result.cropName}. Before purchasing expensive chemical sprays, confirm with a certified government agricultural doctor.`}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5 pt-1">
                  {/* Kisan Call Centre Hotline Button */}
                  <a
                    href="tel:18001801551"
                    className="bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white rounded-2xl p-3 flex items-center justify-center gap-2 font-bold text-xs shadow-sm transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call Kisan Helpline (1800-180-1551)</span>
                  </a>

                  {/* Krishi Vigyan Kendra Locator */}
                  <a
                    href={`https://www.google.com/maps/search/Krishi+Vigyan+Kendra+near+me+${encodeURIComponent(result.cropName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-slate-50 text-slate-900 border-2 border-rose-300 rounded-2xl p-3 flex items-center justify-center gap-2 font-bold text-xs shadow-sm transition-all"
                  >
                    <MapPin className="w-4 h-4 text-rose-600" />
                    <span>{t.findKvk || "Find Nearest Krishi Vigyan Kendra (KVK)"}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Treatments, Farm Acreage Calculator, Report Export, Helpline Callout, Preventive Measures */}
          <div className="lg:col-span-7 space-y-6">

          {/* Requirement 1: ACTIONABLE-IN-RUPEES TREATMENTS WITH FARM ACREAGE CALCULATOR */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t.treatmentsTitle}</span>
              </span>
            </h3>

            {/* Farm Acreage Calculator Bar */}
            <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <label className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-amber-700" />
                  <span>{t.farmSizeLabel || "Farm Size (in Acres):"}</span>
                </label>

                <div className="flex items-center gap-1 bg-white border border-amber-300 rounded-xl px-2 py-1 shadow-sm">
                  {[1, 2, 3, 5, 10].map((acre) => (
                    <button
                      key={acre}
                      type="button"
                      onClick={() => setFarmAcres(acre)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                        farmAcres === acre
                          ? "bg-amber-600 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {acre} Ac
                    </button>
                  ))}
                  <div className="flex items-center gap-1 ml-1 pl-1 border-l border-amber-200">
                    <input
                      type="number"
                      min="0.5"
                      max="100"
                      step="0.5"
                      value={farmAcres}
                      onChange={(e) => setFarmAcres(Math.max(0.5, parseFloat(e.target.value) || 1))}
                      className="w-12 bg-slate-50 border border-amber-300 rounded-md text-center text-xs font-bold py-0.5 text-slate-900 focus:outline-none"
                    />
                    <span className="text-[10px] font-bold text-amber-900">Acres</span>
                  </div>
                </div>
              </div>

              {/* Organic vs Chemical Treatment Cards */}
              {(() => {
                const organicList = getDeduplicatedTreatments(
                  result.organicTreatments,
                  result.organicTreatment,
                  "Neem Oil 10,000 PPM Bio-Spray",
                  "500 ml per acre in 150-200 L water",
                  250,
                  farmAcres
                );

                const chemicalList = getDeduplicatedTreatments(
                  result.chemicalTreatments,
                  result.chemicalTreatment,
                  "Mancozeb 75% WP / Copper Oxychloride",
                  "500 g per acre in 200 L water",
                  450,
                  farmAcres
                );

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    {/* Organic / Low-Cost Option Card */}
                    <div className="bg-white border-2 border-emerald-500 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-3 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                        {t.lowCostOption || "🌱 Eco-Friendly Solution"}
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                          <Leaf className="w-4 h-4 text-emerald-600" />
                          <span>Organic & Botanical Medicine</span>
                        </div>

                        {organicList.map((tr, idx) => (
                          <div key={idx} className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-200/80 space-y-1.5">
                            {organicList.length > 1 && (
                              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                                {idx === 0 ? "Option A (Primary)" : "Option B (Alternative)"}
                              </span>
                            )}
                            <p className="font-extrabold text-sm text-slate-900">{tr.name}</p>
                            <p className="text-xs text-slate-700">
                              <strong>Dosage ({farmAcres} Ac):</strong> {tr.dosage}
                            </p>
                            {tr.method && (
                              <p className="text-[11px] text-slate-600 italic">
                                <strong>How to Apply:</strong> {tr.method}
                              </p>
                            )}
                            <div className="bg-emerald-100/90 text-emerald-950 font-black text-xs px-2.5 py-1 rounded-lg border border-emerald-300 inline-block mt-1">
                              Est. Cost: ₹{tr.totalCost.toLocaleString("en-IN")} ({farmAcres} Acre{farmAcres > 1 ? "s" : ""})
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Chemical Option Card */}
                    <div className="bg-white border-2 border-indigo-500 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-3 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                        {t.chemicalOption || "🧪 Chemical Medicine"}
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2 text-indigo-800 font-bold text-xs">
                          <FlaskConical className="w-4 h-4 text-indigo-600" />
                          <span>Fast-Acting Chemical Fungicide / Pesticide</span>
                        </div>

                        {chemicalList.map((tr, idx) => (
                          <div key={idx} className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-200/80 space-y-1.5">
                            {chemicalList.length > 1 && (
                              <span className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider block">
                                {idx === 0 ? "Option 1 (Fast Contact)" : "Option 2 (Systemic Protection)"}
                              </span>
                            )}
                            <p className="font-extrabold text-sm text-slate-900">{tr.name}</p>
                            <p className="text-xs text-slate-700">
                              <strong>Dosage ({farmAcres} Ac):</strong> {tr.dosage}
                            </p>
                            {tr.method && (
                              <p className="text-[11px] text-slate-600 italic">
                                <strong>How to Apply:</strong> {tr.method}
                              </p>
                            )}
                            <div className="bg-indigo-100/90 text-indigo-950 font-black text-xs px-2.5 py-1 rounded-lg border border-indigo-300 inline-block mt-1">
                              Est. Cost: ₹{tr.totalCost.toLocaleString("en-IN")} ({farmAcres} Acre{farmAcres > 1 ? "s" : ""})
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* General Step-by-Step Treatment List */}
            {(() => {
              const organicList = getDeduplicatedTreatments(result.organicTreatments, result.organicTreatment, "", "", 0, farmAcres);
              const chemicalList = getDeduplicatedTreatments(result.chemicalTreatments, result.chemicalTreatment, "", "", 0, farmAcres);

              // Filter out repetitive lines that just match medicine names
              let cleanSteps = (result.treatmentSuggestions || [])
                .map((s) => sanitizeTreatmentText(s))
                .filter((step) => {
                  if (!step || step.length < 5) return false;
                  const lower = step.toLowerCase();
                  const isMedicineRepeat =
                    organicList.some((o) => o.name && lower.includes(o.name.toLowerCase())) ||
                    chemicalList.some((c) => c.name && lower.includes(c.name.toLowerCase()));
                  return !isMedicineRepeat;
                })
                .filter((step, idx, self) => self.indexOf(step) === idx)
                .slice(0, 3);

              if (cleanSteps.length < 2) {
                cleanSteps = [
                  "Prune and destroy severely infected leaves or branches to halt fungal spore spread.",
                  "Spray early morning or late evening ensuring uniform coverage on upper and lower leaf surfaces.",
                  "Avoid over-irrigation and balance nitrogen fertilizer with potash to enhance natural crop defense."
                ];
              }

              return (
                <div className="grid grid-cols-1 gap-2.5">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>3-Step Field Application Guidance</span>
                  </h4>
                  {cleanSteps.map((cleanStep, idx) => (
                    <div
                      key={idx}
                      className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-3.5 flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-emerald-950 leading-relaxed">
                        {cleanStep}
                      </p>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>

          {/* Requirement 3: INSURANCE-READY REPORT EXPORT */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3 shadow-md border border-slate-800">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {t.downloadReport || "Download Farm Report (Insurance/PMFBY)"}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {t.downloadReportDesc || "Generate documentation for PMFBY crop loss insurance claims or bank verification."}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDownloadFarmReport}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md transition-all shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Download Report (.txt)</span>
              </button>
            </div>

            {reportDownloadedToast && (
              <div className="bg-amber-400/20 text-amber-300 text-xs font-bold rounded-xl p-2.5 border border-amber-400/30">
                ✅ PMFBY Farm Diagnosis Summary downloaded successfully!
              </div>
            )}
          </div>

          {/* Expert Helpline Callout */}
          <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 text-white rounded-2xl p-5 shadow-md border border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 font-bold text-sm text-emerald-300">
                <PhoneCall className="w-5 h-5 text-emerald-400 animate-bounce" />
                <span>{t.callExpert || "Talk to Kisan Helpline (Toll-Free)"}</span>
              </div>
              <p className="text-xs text-slate-300">
                Need official government agricultural doctor advice or custom dosage guidance for your area?
              </p>
              <p className="text-xs font-mono font-bold text-emerald-200">{t.expertHelpline || "Kisan Call Centre: 1800-180-1551"}</p>
            </div>
            <a
              href="tel:18001801551"
              className="shrink-0 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call 1800-180-1551</span>
            </a>
          </div>

          {/* Preventive Measures */}
          {result.preventiveMeasures && result.preventiveMeasures.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <span>{t.preventionTitle}</span>
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {result.preventiveMeasures.map((prev, idx) => (
                  <div
                    key={idx}
                    className="bg-sky-50/60 border border-sky-200/80 rounded-xl p-3 flex items-start gap-2.5 text-xs sm:text-sm text-sky-950 font-medium"
                  >
                    <span className="text-sky-600 font-bold">✓</span>
                    <span>{prev}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-6 flex flex-col sm:flex-row items-center gap-3 justify-between">
          <button
            onClick={onReset}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.scanAnother}</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap sm:flex-nowrap">
            {/* Requirement 4: WhatsApp-Direct Share */}
            <button
              onClick={handleWhatsAppShare}
              className="flex-1 sm:flex-none px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all"
              title={t.whatsappShare || "Share on WhatsApp"}
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.whatsappShare || "WhatsApp Share"}</span>
            </button>

            <button
              onClick={() => onSave(result)}
              disabled={isSaved}
              className={`flex-1 sm:flex-none px-4 py-3 rounded-xl font-bold text-sm border flex items-center justify-center gap-2 transition-all ${
                isSaved
                  ? "bg-slate-200 text-slate-600 border-slate-300 cursor-default"
                  : "bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm"
              }`}
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{t.savedToHistory}</span>
                </>
              ) : (
                <>
                  <BookmarkPlus className="w-4 h-4 text-emerald-600" />
                  <span>{t.saveToHistory}</span>
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-3 bg-white hover:bg-slate-100 text-slate-800 rounded-xl font-bold text-sm border border-slate-300 shadow-sm flex items-center justify-center gap-2 transition-all relative"
              title={t.shareResult}
            >
              <Share2 className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">{t.shareResult}</span>
              {copiedToast && (
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow-lg whitespace-nowrap">
                  Copied to Clipboard!
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

