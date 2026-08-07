import React, { useState } from "react";
import { Sprout, Camera, Sparkles, ShieldCheck, IndianRupee, ArrowRight, X, CheckCircle2 } from "lucide-react";
import { LanguageCode } from "../types";
import { UI_TRANSLATIONS } from "../data/translations";

interface OnboardingModalProps {
  isOpen: boolean;
  currentLang: LanguageCode;
  onComplete: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  currentLang,
  onComplete,
}) => {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  if (!isOpen) return null;

  const slides = [
    {
      icon: <Camera className="w-10 h-10 text-emerald-600" />,
      bgIcon: "bg-emerald-100",
      title: "1. Snap a Leaf Photo",
      subtitle: "Place a single diseased leaf in good light. Focus closely on yellowing, brown spots, or wilting.",
      badge: "Easy Camera & Gallery Upload",
      highlights: [
        "Works offline with built-in Mobile AI model",
        "Supports camera or photo gallery uploads",
        "Sample leaves included for quick practice",
      ],
    },
    {
      icon: <Sparkles className="w-10 h-10 text-amber-600" />,
      bgIcon: "bg-amber-100",
      title: "2. Instant AI Diagnosis",
      subtitle: "Get immediate crop health diagnosis in 12 regional and global languages with voice readout.",
      badge: "Multilingual AI Doctor",
      highlights: [
        "Supports Hindi, Telugu, Marathi, Tamil & 8 more",
        "Voice audio readout for easy listening",
        "Identifies 20+ common fungal, bacterial & viral pests",
      ],
    },
    {
      icon: <IndianRupee className="w-10 h-10 text-sky-600" />,
      bgIcon: "bg-sky-100",
      title: "3. Know Dosage & Cost",
      subtitle: "Compare low-cost organic remedies with chemical options and calculate exact treatment cost in ₹.",
      badge: "Save Money on Chemicals",
      highlights: [
        "Exact per-acre spray dosage calculator",
        "Biological / Neem alternative recommendations",
        "Direct connection to regional Kisan Helpline",
      ],
    },
  ];

  const currentSlide = slides[slideIndex];

  const handleNext = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        {/* Top Header */}
        <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-amber-300">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="text-sm font-extrabold tracking-tight">Welcome to CropDoc AI</span>
          </div>
          <button
            onClick={onComplete}
            className="text-xs font-bold text-emerald-200 hover:text-white px-2 py-1 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
          >
            {t.onboardingSkip || "Skip Intro"}
          </button>
        </div>

        {/* Slide Content */}
        <div className="p-6 text-center space-y-4">
          <div className={`w-20 h-20 rounded-3xl ${currentSlide.bgIcon} flex items-center justify-center mx-auto shadow-inner`}>
            {currentSlide.icon}
          </div>

          <div>
            <span className="inline-block bg-emerald-100 text-emerald-900 text-[11px] uppercase font-black px-2.5 py-0.5 rounded-full mb-2 border border-emerald-200">
              {currentSlide.badge}
            </span>
            <h2 className="text-xl font-black text-slate-900 leading-tight">
              {currentSlide.title}
            </h2>
            <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed max-w-xs mx-auto">
              {currentSlide.subtitle}
            </p>
          </div>

          {/* Highlights List */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-left space-y-2">
            {currentSlide.highlights.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlideIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  slideIndex === idx ? "w-7 bg-emerald-600" : "w-2 bg-slate-200 hover:bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          {slideIndex > 0 ? (
            <button
              onClick={() => setSlideIndex((prev) => prev - 1)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-all"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="flex-1 max-w-[200px] ml-auto bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs py-3 px-5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <span>{slideIndex === slides.length - 1 ? (t.onboardingFinish || "Start Doctor Scan") : (t.onboardingNext || "Next Step")}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
