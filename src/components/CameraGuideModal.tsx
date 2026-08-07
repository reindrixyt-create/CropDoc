import React from "react";
import { X, Sun, Target, Focus, CheckCircle, ShieldAlert } from "lucide-react";
import { LanguageCode } from "../types";
import { UI_TRANSLATIONS } from "../data/translations";

interface CameraGuideModalProps {
  currentLang: LanguageCode;
  onClose: () => void;
}

export const CameraGuideModal: React.FC<CameraGuideModalProps> = ({
  currentLang,
  onClose,
}) => {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  const tips = [
    {
      icon: <Target className="w-6 h-6 text-emerald-600" />,
      title: "1. Focus on a Single Leaf",
      desc: "Select a single leaf that clearly shows symptoms or spots instead of taking a photo of the entire plant or bush.",
    },
    {
      icon: <Sun className="w-6 h-6 text-amber-500" />,
      title: "2. Good Natural Lighting",
      desc: "Take the photo under bright daylight. Avoid heavy dark shadows or direct blinding glare.",
    },
    {
      icon: <Focus className="w-6 h-6 text-sky-600" />,
      title: "3. Clean Background & Macro Focus",
      desc: "Place the leaf on your hand, paper, or soil. Hold phone 6-8 inches away so spots are in sharp focus.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              📷
            </div>
            <h3 className="text-base font-black text-slate-900">
              {t.photoGuideTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tips List */}
        <div className="space-y-3.5">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-start gap-3"
            >
              <div className="p-2 rounded-xl bg-white shadow-xs shrink-0">
                {tip.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{tip.title}</h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed font-medium">
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm shadow-md transition-colors"
        >
          Got It, Start Scan
        </button>
      </div>
    </div>
  );
};
