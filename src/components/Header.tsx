import React from "react";
import { Sprout, Languages, History, HelpCircle, Sparkles, BarChart3, Sun, Bot, Store } from "lucide-react";
import { LanguageCode } from "../types";
import { LANGUAGES, UI_TRANSLATIONS } from "../data/translations";
import { TabType } from "./BottomTabBar";

interface HeaderProps {
  currentLang: LanguageCode;
  onOpenLangModal: () => void;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  historyCount: number;
  onOpenGuide: () => void;
  isOutdoorMode: boolean;
  onToggleOutdoorMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onOpenLangModal,
  activeTab,
  onTabChange,
  historyCount,
  onOpenGuide,
  isOutdoorMode,
  onToggleOutdoorMode,
}) => {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;
  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-emerald-800 text-white shadow-md">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-2">
        {/* Brand Logo & Name */}
        <div
          onClick={() => onTabChange("scanner")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-white text-emerald-800 flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
            <Sprout className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-black tracking-tight text-white leading-none">
                {t.appTitle}
              </h1>
              <span className="bg-emerald-600/80 text-emerald-100 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border border-emerald-500/40">
                AgriTech AI Doctor
              </span>
            </div>
            <p className="text-xs text-emerald-200/90 font-medium hidden sm:block mt-0.5">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Right Actions: Outdoor Sun Mode, Language Picker & Camera Guide */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap justify-end">
          {/* Outdoor High-Contrast Mode Toggle */}
          <button
            onClick={onToggleOutdoorMode}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-2xs ${
              isOutdoorMode
                ? "bg-yellow-400 text-slate-950 border-yellow-300 ring-2 ring-yellow-300/60 font-black"
                : "bg-emerald-700/80 hover:bg-emerald-700 text-emerald-100 border-emerald-600/50"
            }`}
            title={t.outdoorMode || "Outdoor Sunlight Mode"}
          >
            <Sun className={`w-3.5 h-3.5 ${isOutdoorMode ? "text-slate-950 animate-spin-slow" : "text-amber-300"}`} />
            <span className="hidden sm:inline">{t.outdoorMode || "Sun Mode"}</span>
          </button>

          {/* Photo Guide Button */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-emerald-700/80 hover:bg-emerald-700 text-xs font-semibold text-emerald-100 transition-colors border border-emerald-600/50"
            title={t.photoGuideTitle}
          >
            <HelpCircle className="w-4 h-4 text-emerald-300" />
            <span className="hidden md:inline">Guide</span>
          </button>

          {/* Searchable Language Modal Trigger */}
          <button
            type="button"
            onClick={onOpenLangModal}
            className="flex items-center gap-1 bg-emerald-900/90 hover:bg-emerald-950 px-2.5 py-1.5 rounded-xl border border-amber-400/60 transition-all text-xs font-bold text-amber-300 shadow-2xs active:scale-95"
            title={t.selectLanguage || "Select Language"}
          >
            <Languages className="w-3.5 h-3.5 text-amber-300" />
            <span>{currentLangObj.flag}</span>
            <span className="font-extrabold max-w-[70px] truncate">
              {currentLangObj.nativeName}
            </span>
          </button>
        </div>
      </div>

      {/* Desktop & Tablet Navigation Tabs (Hidden on mobile where BottomTabBar is active) */}
      <nav className="hidden sm:block bg-emerald-900/90 border-t border-emerald-700/60 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-start gap-1 sm:gap-2">
          <button
            onClick={() => onTabChange("scanner")}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition-all ${
              activeTab === "scanner"
                ? "border-amber-400 text-amber-300 bg-emerald-800/60"
                : "border-transparent text-emerald-200/80 hover:text-white hover:bg-emerald-800/30"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Scanner</span>
          </button>

          <button
            onClick={() => onTabChange("chatbot")}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition-all ${
              activeTab === "chatbot"
                ? "border-amber-400 text-amber-300 bg-emerald-800/60"
                : "border-transparent text-emerald-200/80 hover:text-white hover:bg-emerald-800/30"
            }`}
          >
            <Bot className="w-4 h-4 text-emerald-300" />
            <span>AI Advisor</span>
          </button>

          <button
            onClick={() => onTabChange("mandi")}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition-all ${
              activeTab === "mandi"
                ? "border-amber-400 text-amber-300 bg-emerald-800/60"
                : "border-transparent text-emerald-200/80 hover:text-white hover:bg-emerald-800/30"
            }`}
          >
            <Store className="w-4 h-4 text-orange-300" />
            <span>Mandi & Schemes</span>
          </button>

          <button
            onClick={() => onTabChange("history")}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition-all ${
              activeTab === "history"
                ? "border-amber-400 text-amber-300 bg-emerald-800/60"
                : "border-transparent text-emerald-200/80 hover:text-white hover:bg-emerald-800/30"
            }`}
          >
            <History className="w-4 h-4 text-slate-300" />
            <span>History ({historyCount})</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
