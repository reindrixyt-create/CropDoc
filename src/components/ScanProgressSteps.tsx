import React from "react";
import { Camera, Sparkles, CheckCircle2, FileText, Loader2, AlertTriangle } from "lucide-react";
import { LanguageCode } from "../types";
import { UI_TRANSLATIONS } from "../data/translations";

interface ScanProgressStepsProps {
  currentStep: "photo" | "analyzing" | "result";
  currentLang: LanguageCode;
  isRisk?: boolean;
}

export const ScanProgressSteps: React.FC<ScanProgressStepsProps> = ({
  currentStep,
  currentLang,
  isRisk = false,
}) => {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  const steps = [
    {
      id: "photo",
      label: t.stepPhoto || "1. Photo",
      icon: Camera,
    },
    {
      id: "analyzing",
      label: t.stepAnalyzing || "2. Analyzing",
      icon: Sparkles,
    },
    {
      id: "result",
      label: t.stepResult || "3. Diagnosis",
      icon: FileText,
    },
  ];

  const getStepStatus = (stepId: string) => {
    if (currentStep === stepId) return "current";
    if (currentStep === "result") return "completed";
    if (currentStep === "analyzing" && stepId === "photo") return "completed";
    return "upcoming";
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-xs rounded-2xl p-3 border border-emerald-200/80 shadow-xs mb-4">
      <div className="flex items-center justify-between relative">
        {/* Connecting Background Line */}
        <div className="absolute top-1/2 left-8 right-8 h-1 bg-slate-200 -translate-y-1/2 z-0" />

        {steps.map((step) => {
          const status = getStepStatus(step.id);
          const Icon = step.icon;
          const isResultStepWithRisk = step.id === "result" && currentStep === "result" && isRisk;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm ${
                  isResultStepWithRisk
                    ? "bg-rose-600 text-white ring-4 ring-rose-300 font-extrabold animate-pulse"
                    : status === "completed"
                    ? "bg-emerald-600 text-white ring-4 ring-emerald-100"
                    : status === "current"
                    ? "bg-amber-400 text-slate-950 ring-4 ring-amber-200 font-extrabold animate-pulse"
                    : "bg-slate-100 text-slate-400 border border-slate-300"
                }`}
              >
                {isResultStepWithRisk ? (
                  <AlertTriangle className="w-5 h-5 text-amber-300 animate-bounce" />
                ) : status === "completed" ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : status === "current" && step.id === "analyzing" ? (
                  <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <span
                className={`text-[11px] font-extrabold whitespace-nowrap flex items-center gap-1 ${
                  isResultStepWithRisk
                    ? "text-rose-700 font-black"
                    : status === "current"
                    ? "text-amber-800"
                    : status === "completed"
                    ? "text-emerald-800"
                    : "text-slate-400"
                }`}
              >
                {step.label}
                {isResultStepWithRisk && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
