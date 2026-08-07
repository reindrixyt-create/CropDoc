import React, { useState } from "react";
import {
  History,
  Trash2,
  Search,
  Calendar,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  Info,
  Filter,
  X,
  Sparkles,
} from "lucide-react";
import { DiseaseCategory, DiseaseResult, LanguageCode } from "../types";
import { UI_TRANSLATIONS } from "../data/translations";

interface HistoryListProps {
  history: DiseaseResult[];
  currentLang: LanguageCode;
  onSelectScan: (result: DiseaseResult) => void;
  onClearHistory: () => void;
  onDeleteItem: (id: string) => void;
  onStartScan?: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  history,
  currentLang,
  onSelectScan,
  onClearHistory,
  onDeleteItem,
  onStartScan,
}) => {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Healthy",
    "Early Blight",
    "Late Blight",
    "Leaf Spot",
    "Powdery Mildew",
    "Nutrient Deficiency",
  ];

  const getSeverityBorderColor = (category: string, severity?: string) => {
    if (category === "Healthy" || severity === "Low" || severity === "None") {
      return "border-l-emerald-500";
    }
    if (severity === "Moderate" || category === "Early Blight" || category === "Nutrient Deficiency") {
      return "border-l-amber-500";
    }
    if (category === "Leaf Spot" || category === "Powdery Mildew") {
      return "border-l-orange-500";
    }
    return "border-l-rose-600";
  };

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.diseaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.diseaseCategory.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || item.diseaseCategory === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5 animate-fadeIn">
      {/* Search & Header */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-700" />
            <h2 className="text-base font-bold text-slate-900">{t.tabHistory}</h2>
            <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-full">
              {history.length}
            </span>
          </div>

          {history.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to clear all scan history?")) {
                  onClearHistory();
                }
              }}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.clearHistory}</span>
            </button>
          )}
        </div>

        {history.length > 0 && (
          <div className="space-y-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.searchHistory}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 transition-colors ${
                    selectedCategory === cat
                      ? "bg-emerald-700 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* History Items List */}
      {filteredHistory.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-4 shadow-2xs">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
            <History className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-extrabold text-slate-800">
              {history.length === 0 ? "No Crop Scans Saved Yet" : "No Scans Match Your Search"}
            </h3>
            <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto leading-relaxed">
              {history.length === 0
                ? t.noHistory || "Take a photo of a plant leaf to get your first instant diagnosis and treatment plan!"
                : "Try clearing search keywords or selecting 'All' categories."}
            </p>
          </div>

          {history.length === 0 && onStartScan && (
            <button
              onClick={onStartScan}
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold px-5 py-2.5 rounded-2xl shadow-md transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t.scanFirstLeaf || "Scan Your First Leaf"}</span>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className={`group bg-white rounded-2xl p-3.5 border border-slate-200/80 border-l-[6px] ${getSeverityBorderColor(
                item.diseaseCategory,
                item.severityLevel
              )} hover:border-emerald-400 shadow-xs hover:shadow-md transition-all flex items-center gap-3`}
            >
              {/* Thumbnail */}
              <div
                onClick={() => onSelectScan(item)}
                className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 cursor-pointer"
              >
                <img
                  src={item.imageUri}
                  alt={item.diseaseName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Scan Info */}
              <div
                onClick={() => onSelectScan(item)}
                className="flex-1 min-w-0 cursor-pointer space-y-1"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-900 truncate">
                    {item.cropName}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                    {item.confidence}% Match
                  </span>
                </div>

                <p className="text-xs font-bold text-emerald-700 truncate">
                  {item.diseaseName}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(item.timestamp)}
                  </span>
                </div>
              </div>

              {/* Delete Button & Open Chevron */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteItem(item.id);
                  }}
                  className="p-2 text-slate-300 hover:text-rose-600 transition-colors rounded-lg hover:bg-rose-50"
                  title="Delete scan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onSelectScan(item)}
                  className="p-1 text-slate-400 group-hover:text-emerald-600"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
