import React from "react";
import { Sparkles, Bot, Store, History } from "lucide-react";
import { LanguageCode } from "../types";
import { UI_TRANSLATIONS } from "../data/translations";

export type TabType =
  | "scanner"
  | "chatbot"
  | "mandi"
  | "history"
  | "samples";

interface BottomTabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  historyCount: number;
  currentLang: LanguageCode;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabChange,
  historyCount,
  currentLang,
}) => {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  const tabs = [
    {
      id: "scanner" as const,
      label: "Scanner",
      icon: Sparkles,
    },
    {
      id: "chatbot" as const,
      label: "AI Advisor",
      icon: Bot,
    },
    {
      id: "mandi" as const,
      label: "Mandi",
      icon: Store,
    },
    {
      id: "history" as const,
      label: "History",
      icon: History,
      badge: historyCount > 0 ? historyCount : undefined,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 text-white shadow-2xl overflow-x-auto pb-safe">
      <div className="flex items-center justify-between min-w-max px-2 py-1.5 gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => {
                onTabChange(tab.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl transition-all relative min-h-[44px] ${
                isActive
                  ? "text-amber-300 font-black bg-emerald-900/80"
                  : "text-slate-300 hover:text-white font-semibold"
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? "text-amber-400 scale-110" : ""}`} />
                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-400 text-slate-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

