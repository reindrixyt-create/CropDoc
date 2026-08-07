import React, { useRef, useState } from "react";
import { Camera, Upload, Image as ImageIcon, Sparkles, CheckCircle2, ArrowRight, AlertTriangle } from "lucide-react";
import { LanguageCode, PresetSample } from "../types";
import { UI_TRANSLATIONS } from "../data/translations";
import { PRESET_SAMPLES } from "../data/sampleImages";

interface ImageUploaderProps {
  currentLang: LanguageCode;
  onImageSelected: (base64Image: string, voiceContext?: string) => void;
  onOpenLiveCamera: () => void;
  onOpenGuide: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentLang,
  onImageSelected,
  onOpenLiveCamera,
  onOpenGuide,
}) => {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [symptomNotes, setSymptomNotes] = useState<string>("");

  const QUICK_SYMPTOM_TAGS = [
    "Yellow leaf spots",
    "Curled leaves",
    "White powdery dust",
    "Black rot patches",
    "Wilting stems",
    "Borer holes",
  ];

  const [qualityNotice, setQualityNotice] = useState<{
    isTooDark: boolean;
    isOverexposed: boolean;
    isLowContrast: boolean;
    rawImageUri: string;
  } | null>(null);

  const handleAddSymptomTag = (tag: string) => {
    setSymptomNotes((prev) => (prev ? `${prev}, ${tag}` : tag));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const checkQualityAndSubmit = (dataUrl: string) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          onImageSelected(dataUrl, symptomNotes);
          return;
        }
        ctx.drawImage(img, 0, 0, 100, 100);
        const imgData = ctx.getImageData(0, 0, 100, 100);
        const pixels = imgData.data;
        let totalLuminance = 0;
        const luminances: number[] = [];

        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          totalLuminance += lum;
          luminances.push(lum);
        }

        const count = luminances.length;
        const avgLuminance = totalLuminance / count;

        let varianceSum = 0;
        for (let i = 0; i < count; i++) {
          varianceSum += Math.pow(luminances[i] - avgLuminance, 2);
        }
        const stdDev = Math.sqrt(varianceSum / count);

        const isTooDark = avgLuminance < 42;
        const isOverexposed = avgLuminance > 230;
        const isLowContrast = stdDev < 16;

        if (isTooDark || isOverexposed || isLowContrast) {
          setQualityNotice({
            isTooDark,
            isOverexposed,
            isLowContrast,
            rawImageUri: dataUrl,
          });
        } else {
          setQualityNotice(null);
          onImageSelected(dataUrl, symptomNotes);
        }
      } catch {
        onImageSelected(dataUrl, symptomNotes);
      }
    };
    img.onerror = () => {
      onImageSelected(dataUrl, symptomNotes);
    };
    img.src = dataUrl;
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (JPEG, PNG, WEBP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        checkQualityAndSubmit(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Client-Side Image Quality Check Warning Banner */}
      {qualityNotice && (
        <div className="bg-amber-900 text-amber-50 p-4 rounded-2xl border-2 border-amber-500 shadow-lg space-y-3 animate-fadeIn">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-300 shrink-0 mt-0.5 animate-bounce" />
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-amber-200">
                {t.qualityWarningTitle || "Photo Quality Warning"}
              </h4>
              <p className="text-xs text-amber-100 font-medium leading-relaxed">
                {t.qualityWarningDesc || "This photo appears a bit dark or low-contrast. For maximum diagnostic accuracy, ensure good lighting and clear leaf focus."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                setQualityNotice(null);
              }}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-all active:scale-95"
            >
              {t.retakePhoto || "Retake Clear Photo"}
            </button>

            <button
              type="button"
              onClick={() => {
                const uri = qualityNotice.rawImageUri;
                setQualityNotice(null);
                onImageSelected(uri, symptomNotes);
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-600 transition-all active:scale-95"
            >
              {t.analyzeAnyway || "Analyze Photo Anyway"}
            </button>
          </div>
        </div>
      )}

      {/* Optional Observed Symptom Notes */}
      <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-3.5 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Observed Symptoms (Optional Notes)</span>
          </label>
          {symptomNotes && (
            <button
              type="button"
              onClick={() => setSymptomNotes("")}
              className="text-[11px] font-bold text-amber-800 underline hover:text-amber-950"
            >
              Clear
            </button>
          )}
        </div>

        <input
          type="text"
          value={symptomNotes}
          onChange={(e) => setSymptomNotes(e.target.value)}
          placeholder="e.g. Yellow spots on leaves or wilting stems..."
          className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        {/* Quick Symptom Chips */}
        <div className="pt-0.5">
          <div className="flex flex-wrap gap-1.5">
            {QUICK_SYMPTOM_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleAddSymptomTag(tag)}
                className="px-2.5 py-1 bg-white hover:bg-amber-100 border border-amber-300 rounded-lg text-[11px] font-bold text-amber-950 transition-all active:scale-95 shadow-2xs"
              >
                + {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Action Buttons for Farmers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Live Camera Button */}
        <button
          onClick={onOpenLiveCamera}
          className="group relative bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white p-6 rounded-2xl shadow-lg shadow-emerald-700/20 flex flex-col items-center text-center transition-all hover:-translate-y-0.5 border-2 border-emerald-500"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center mb-3 transition-colors">
            <Camera className="w-9 h-9 text-white" />
          </div>
          <span className="text-lg font-black">{t.takeLivePhoto}</span>
          <span className="text-xs text-emerald-100/90 font-medium mt-1">
            Scan live leaf using phone camera
          </span>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold bg-amber-400 text-slate-900 px-3 py-1 rounded-full shadow-sm">
            Recommended <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </button>

        {/* Gallery Upload Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="group bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 p-6 rounded-2xl shadow-md border-2 border-slate-200 hover:border-emerald-500 flex flex-col items-center text-center transition-all hover:-translate-y-0.5"
        >
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100 flex items-center justify-center mb-3 transition-colors">
            <Upload className="w-9 h-9 text-emerald-600" />
          </div>
          <span className="text-lg font-black text-slate-900">{t.uploadPhoto}</span>
          <span className="text-xs text-slate-500 font-medium mt-1">
            {t.selectFromGallery}
          </span>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            JPG, PNG, WEBP
          </span>
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-emerald-500 bg-emerald-50/80 scale-[1.01]"
            : "border-slate-300 bg-white hover:border-emerald-400 hover:bg-slate-50/50"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <ImageIcon className="w-8 h-8 text-slate-400" />
          <p className="text-sm font-semibold text-slate-700">{t.dragDropText}</p>
          <p className="text-xs text-slate-400">
            Click anywhere or drop photo here
          </p>
        </div>
      </div>

      {/* Quick Preset Samples Section */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900">{t.orTrySample}</h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">6 Test Cases</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {PRESET_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => onImageSelected(sample.imageUri)}
              className="group text-left bg-slate-50 hover:bg-emerald-50/80 p-2.5 rounded-xl border border-slate-200 hover:border-emerald-400 transition-all flex items-center gap-2.5 hover:shadow-sm"
            >
              <img
                src={sample.imageUri}
                alt={sample.diseaseName}
                className="w-11 h-11 rounded-lg object-cover bg-white border border-slate-200 shrink-0"
              />
              <div className="overflow-hidden">
                <span className="block text-xs font-bold text-slate-900 truncate">
                  {sample.crop}
                </span>
                <span className="block text-[11px] font-medium text-emerald-700 truncate">
                  {sample.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Photo Guide Tip Banner */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold">
          💡
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-bold text-amber-900">{t.photoGuideTitle}</h4>
          <p className="text-xs text-amber-800/90 mt-0.5 leading-relaxed">
            {t.photoGuideDesc}
          </p>
        </div>
        <button
          onClick={onOpenGuide}
          className="text-xs font-bold text-amber-900 underline shrink-0 hover:text-amber-950"
        >
          View Tips
        </button>
      </div>
    </div>
  );
};
