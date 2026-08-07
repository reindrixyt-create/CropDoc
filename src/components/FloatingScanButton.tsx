import React from "react";
import { Camera, Sparkles } from "lucide-react";

interface FloatingScanButtonProps {
  onClick: () => void;
  activeTab: string;
}

export const FloatingScanButton: React.FC<FloatingScanButtonProps> = ({ onClick, activeTab }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-30 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all border-2 border-amber-200 flex items-center gap-2 group active:scale-95 animate-bounce-short"
      title="Scan Leaf Now"
    >
      <div className="w-8 h-8 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center group-hover:rotate-12 transition-transform">
        <Camera className="w-4 h-4" />
      </div>
      <span className="text-xs font-black tracking-tight pr-1">
        {activeTab === "scanner" ? "Quick Scan" : "Scan Leaf"}
      </span>
      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
    </button>
  );
};
