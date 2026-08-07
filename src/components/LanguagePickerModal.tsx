import React, { useState } from "react";
import { Search, X, Check, Languages, Globe } from "lucide-react";
import { LanguageCode } from "../types";
import { LANGUAGES, UI_TRANSLATIONS } from "../data/translations";

interface LanguagePickerModalProps {
  isOpen: boolean;
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  onClose: () => void;
}

export const LanguagePickerModal: React.FC<LanguagePickerModalProps> = ({
  isOpen,
  currentLang,
  onSelectLang,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  if (!isOpen) return null;

  const filteredLanguages = LANGUAGES.filter((lang) => {
    const q = searchTerm.toLowerCase().trim();
    return (
      lang.name.toLowerCase().includes(q) ||
      lang.nativeName.toLowerCase().includes(q) ||
      lang.code.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="bg-emerald-800 text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-700/80 flex items-center justify-center text-amber-300">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold leading-tight">
                {t.selectLanguage || "Select Language"}
              </h2>
              <p className="text-xs text-emerald-200 font-medium">
                12 Regional & Global Languages Supported
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-emerald-700 text-emerald-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchLanguagePlaceholder || "Search language or script..."}
              autoFocus
              className="w-full bg-white border border-slate-300 rounded-2xl pl-10 pr-9 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-slate-400 shadow-2xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Language Grid / List */}
        <div className="p-3 overflow-y-auto space-y-2 divide-y divide-slate-100 flex-1">
          {filteredLanguages.length === 0 ? (
            <div className="py-8 text-center space-y-2">
              <Globe className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-bold text-slate-600">No languages match "{searchTerm}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {filteredLanguages.map((lang) => {
                const isSelected = lang.code === currentLang;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLang(lang.code);
                      onClose();
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between group active:scale-98 ${
                      isSelected
                        ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-950 font-bold shadow-2xs"
                        : "bg-white hover:bg-slate-50 border-slate-200 text-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                        {lang.flag}
                      </span>
                      <div>
                        <p className="text-sm font-extrabold leading-snug">{lang.nativeName}</p>
                        <p className="text-[11px] font-medium text-slate-500">{lang.name}</p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center shrink-0">
          <p className="text-[11px] text-slate-500 font-medium">
            AI Diagnosis and Voice Readouts adapt automatically to your selected language.
          </p>
        </div>
      </div>
    </div>
  );
};
