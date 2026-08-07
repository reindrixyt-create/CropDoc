import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { ImageUploader } from "./components/ImageUploader";
import { CameraCapture } from "./components/CameraCapture";
import { ResultView } from "./components/ResultView";
import { HistoryList } from "./components/HistoryList";
import { CameraGuideModal } from "./components/CameraGuideModal";
import { LanguagePickerModal } from "./components/LanguagePickerModal";
import { OnboardingModal } from "./components/OnboardingModal";
import { ScanProgressSteps } from "./components/ScanProgressSteps";
import { BottomTabBar, TabType } from "./components/BottomTabBar";
import { FloatingScanButton } from "./components/FloatingScanButton";
import { AgriChatbot } from "./components/AgriChatbot";
import { MandiAndSchemes } from "./components/MandiAndSchemes";
import { DiseaseResult, LanguageCode } from "./types";
import { UI_TRANSLATIONS } from "./data/translations";
import { analyzeLeafImageClientSide } from "./utils/tfFallback";
import { PRESET_SAMPLES } from "./data/sampleImages";
import { Sprout, Sparkles, AlertCircle } from "lucide-react";

// Utility to convert any image (including SVGs or raw Data URLs) into a clean JPEG base64 Data URI
async function convertImageToJpegDataUri(imageUri: string): Promise<string> {
  if (imageUri.startsWith("data:image/jpeg;base64,") || imageUri.startsWith("data:image/png;base64,")) {
    return imageUri;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const w = img.naturalWidth || 400;
        const h = img.naturalHeight || 400;
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          const jpegUri = canvas.toDataURL("image/jpeg", 0.92);
          resolve(jpegUri);
          return;
        }
      } catch (e) {
        console.warn("Canvas JPEG conversion failed:", e);
      }
      resolve(imageUri);
    };
    img.onerror = () => resolve(imageUri);
    img.src = imageUri;
  });
}

export default function App() {
  // Saved language preference
  const [currentLang, setCurrentLang] = useState<LanguageCode>(() => {
    return (localStorage.getItem("cropdoc_lang") as LanguageCode) || "en";
  });

  // Outdoor High-Contrast Sunlight Mode
  const [isOutdoorMode, setIsOutdoorMode] = useState<boolean>(() => {
    return localStorage.getItem("cropdoc_outdoor_mode") === "true";
  });

  // First-Time Onboarding Modal State
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    return localStorage.getItem("cropdoc_onboarding_completed") !== "true";
  });

  // Language Picker Modal State
  const [isLangModalOpen, setIsLangModalOpen] = useState<boolean>(false);

  // Active view tab
  const [activeTab, setActiveTab] = useState<TabType>("scanner");

  // State flags
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [activeResult, setActiveResult] = useState<DiseaseResult | null>(null);
  const [isLiveCameraOpen, setIsLiveCameraOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Scan history in LocalStorage
  const [history, setHistory] = useState<DiseaseResult[]>(() => {
    try {
      const saved = localStorage.getItem("cropdoc_history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cropdoc_history", JSON.stringify(history));
    } catch (e) {
      console.warn("Failed to persist history to localStorage:", e);
    }
  }, [history]);

  // Toggle Outdoor High Contrast Mode
  const handleToggleOutdoorMode = () => {
    setIsOutdoorMode((prev) => {
      const next = !prev;
      localStorage.setItem("cropdoc_outdoor_mode", String(next));
      return next;
    });
  };

  // Save language to localStorage
  const handleSelectLang = (lang: LanguageCode) => {
    setCurrentLang(lang);
    localStorage.setItem("cropdoc_lang", lang);
  };

  const handleCompleteOnboarding = () => {
    localStorage.setItem("cropdoc_onboarding_completed", "true");
    setIsOnboardingOpen(false);
  };

  // Process leaf image via Gemini Server API with client-side TF.js fallback
  const handleAnalyzeImage = async (rawImageUri: string, voiceContext?: string) => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    setActiveTab("scanner");

    // Ensure image is converted to a clean JPEG base64 Data URI
    const base64Image = await convertImageToJpegDataUri(rawImageUri);

    try {
      // 1. Attempt Server-side Gemini 2.5 Flash analysis
      const response = await fetch("/api/analyze-leaf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: base64Image,
          language: currentLang,
          voiceContext: voiceContext || "",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const geminiResult: DiseaseResult = {
          id: `scan_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          timestamp: Date.now(),
          imageUri: base64Image,
          cropName: data.cropName || "Crop Leaf",
          diseaseCategory: data.diseaseCategory || "Healthy",
          diseaseName: data.diseaseName || "Leaf Condition",
          confidence: data.confidence || 90,
          severity: data.severity || "Mild",
          description: data.description || "Analysis completed.",
          symptoms: data.symptoms || [],
          treatmentSuggestions: data.treatmentSuggestions || [],
          organicTreatments: data.organicTreatments || [],
          chemicalTreatments: data.chemicalTreatments || [],
          preventiveMeasures: data.preventiveMeasures || [],
          organicTreatment: data.organicTreatment,
          chemicalTreatment: data.chemicalTreatment,
          source: "gemini",
          language: currentLang,
        };

        setActiveResult(geminiResult);
        setIsAnalyzing(false);
        return;
      }
    } catch (err) {
      console.warn("Server API unavailable, falling back to local client model:", err);
    }

    // 2. Client-side TensorFlow.js & Canvas fallback
    try {
      const fallbackResult = await analyzeLeafImageClientSide(base64Image, currentLang);
      setActiveResult(fallbackResult);
    } catch (fallbackErr: any) {
      console.error("Client fallback error:", fallbackErr);
      setAnalysisError("Failed to analyze image. Please try again with a clearer photo.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveToHistory = (resultToSave: DiseaseResult) => {
    if (history.some((item) => item.id === resultToSave.id)) {
      return;
    }
    setHistory((prev) => [resultToSave, ...prev]);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  // Determine active step for scan progress steps indicator
  const currentStep = isAnalyzing
    ? "analyzing"
    : activeResult && activeTab === "scanner"
    ? "result"
    : "photo";

  const activeResultIsRisk = Boolean(
    activeResult &&
      activeResult.severity !== "Healthy" &&
      activeResult.diseaseCategory !== "Healthy"
  );

  return (
    <div
      className={`min-h-screen flex flex-col font-sans antialiased transition-all pb-24 sm:pb-8 ${
        isOutdoorMode
          ? "bg-amber-50 text-slate-950 font-bold border-slate-900 contrast-125"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      {/* Header */}
      <Header
        currentLang={currentLang}
        onOpenLangModal={() => setIsLangModalOpen(true)}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
        }}
        historyCount={history.length}
        onOpenGuide={() => setIsGuideOpen(true)}
        isOutdoorMode={isOutdoorMode}
        onToggleOutdoorMode={handleToggleOutdoorMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 overflow-x-hidden">
        {/* Scan Progress Steps Bar */}
        {(activeTab === "scanner" || isAnalyzing) && (
          <ScanProgressSteps
            currentStep={currentStep}
            currentLang={currentLang}
            isRisk={activeResultIsRisk}
          />
        )}

        {/* Analyzing Loading Screen */}
        {isAnalyzing ? (
          <div className="bg-white rounded-3xl p-10 border-2 border-emerald-500 shadow-xl text-center space-y-6 my-8 animate-fadeIn max-w-md mx-auto">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin" />
              <Sprout className="w-10 h-10 text-emerald-600 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900">
                {t.analyzingImage}
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                {t.analyzingSubtitle}
              </p>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 flex items-center justify-center gap-2 text-xs font-bold text-emerald-800">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Scanning leaf structure, spots & color patterns</span>
            </div>
          </div>
        ) : activeTab === "scanner" ? (
          activeResult ? (
            <ResultView
              result={activeResult}
              currentLang={currentLang}
              onReset={() => {
                setActiveResult(null);
                setAnalysisError(null);
              }}
              onSave={handleSaveToHistory}
              isSaved={history.some((item) => item.id === activeResult.id)}
            />
          ) : (
            <div className="space-y-6 animate-fadeIn">
              {/* Error Alert */}
              {analysisError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-900 p-4 rounded-2xl flex items-center gap-3 text-xs font-bold">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>{analysisError}</span>
                </div>
              )}

              {/* Tagline Hero Bar */}
              <div className="text-center space-y-1.5 py-1">
                <p className="text-xs sm:text-sm font-extrabold text-emerald-900 bg-emerald-100/90 inline-block px-4 py-1.5 rounded-full border border-emerald-300 shadow-2xs">
                  {t.tagline}
                </p>
              </div>

              {/* Upload & Live Camera Entry */}
              <ImageUploader
                currentLang={currentLang}
                onImageSelected={handleAnalyzeImage}
                onOpenLiveCamera={() => setIsLiveCameraOpen(true)}
                onOpenGuide={() => setIsGuideOpen(true)}
              />
            </div>
          )
        ) : activeTab === "chatbot" ? (
          /* AI Voice/Text Multilingual Agri Chatbot */
          <AgriChatbot currentLang={currentLang} />
        ) : activeTab === "mandi" ? (
          /* Mandi Commodity Prices & PM-KISAN Government Schemes */
          <MandiAndSchemes currentLang={currentLang} />
        ) : activeTab === "samples" ? (
          /* Preset Leaf Samples View */
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-black text-slate-900 mb-1">
                {t.tabSamples}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Test CropDoc with preset leaf pathology photos representing common disease categories.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRESET_SAMPLES.map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => handleAnalyzeImage(sample.imageUri)}
                  className="group bg-white rounded-2xl p-4 border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-4"
                >
                  <img
                    src={sample.imageUri}
                    alt={sample.diseaseName}
                    className="w-20 h-20 rounded-xl object-cover bg-slate-50 border border-slate-200 shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {sample.crop}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      {sample.category}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-tight">
                      {sample.shortDesc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* History View */
          <HistoryList
            history={history}
            currentLang={currentLang}
            onSelectScan={(result) => {
              setActiveResult(result);
              setActiveTab("scanner");
            }}
            onClearHistory={handleClearHistory}
            onDeleteItem={handleDeleteHistoryItem}
            onStartScan={() => {
              setActiveResult(null);
              setActiveTab("scanner");
            }}
          />
        )}
      </main>

      {/* Floating Scan CTA Button */}
      {(activeTab !== "scanner" || activeResult !== null) && (
        <FloatingScanButton
          activeTab={activeTab}
          onClick={() => {
            setActiveResult(null);
            setActiveTab("scanner");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}

      {/* Mobile Bottom Navigation Tab Bar */}
      <BottomTabBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
        }}
        historyCount={history.length}
        currentLang={currentLang}
      />

      {/* Searchable Language Modal */}
      <LanguagePickerModal
        isOpen={isLangModalOpen}
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
        onClose={() => setIsLangModalOpen(false)}
      />

      {/* Onboarding Carousel Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        currentLang={currentLang}
        onComplete={handleCompleteOnboarding}
      />

      {/* Live Camera Modal */}
      {isLiveCameraOpen && (
        <CameraCapture
          currentLang={currentLang}
          onCapture={(imageUri) => {
            setIsLiveCameraOpen(false);
            handleAnalyzeImage(imageUri);
          }}
          onClose={() => setIsLiveCameraOpen(false)}
        />
      )}

      {/* Photo Guide Modal */}
      {isGuideOpen && (
        <CameraGuideModal
          currentLang={currentLang}
          onClose={() => setIsGuideOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800 text-center space-y-1">
        <p className="font-bold text-slate-300">
          CropDoc AI — Smart Agricultural Diagnostics
        </p>
        <p className="text-[11px] text-slate-500">
          Prototype demo for agricultural decision support. Always consult local agricultural extension officers.
        </p>
      </footer>
    </div>
  );
}
