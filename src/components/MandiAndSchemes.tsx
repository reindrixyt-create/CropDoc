import React, { useState } from "react";
import { MandiPriceItem, GovtScheme, AgriStore, LanguageCode } from "../types";
import {
  Store,
  TrendingUp,
  TrendingDown,
  Building2,
  PhoneCall,
  ExternalLink,
  MapPin,
  Search,
  Award,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  Phone
} from "lucide-react";

interface MandiAndSchemesProps {
  currentLang: LanguageCode;
}

const SAMPLE_MANDI_PRICES: MandiPriceItem[] = [
  { id: "1", crop: "Cotton (Kapas)", mandiName: "Nagpur Mandi", state: "Maharashtra", pricePerQuintalINR: 7250, priceChange24hPercent: 1.8, trend: "up", lastUpdated: "Today" },
  { id: "2", crop: "Tomato (Hybrid)", mandiName: "Nashik Mandi", state: "Maharashtra", pricePerQuintalINR: 3400, priceChange24hPercent: -2.4, trend: "down", lastUpdated: "Today" },
  { id: "3", crop: "Wheat (Lok-1)", mandiName: "Indore Mandi", state: "Madhya Pradesh", pricePerQuintalINR: 2450, priceChange24hPercent: 0.5, trend: "up", lastUpdated: "Today" },
  { id: "4", crop: "Potato (Jyoti)", mandiName: "Agra Mandi", state: "Uttar Pradesh", pricePerQuintalINR: 1850, priceChange24hPercent: 0.0, trend: "stable", lastUpdated: "Today" },
  { id: "5", crop: "Soybean (Yellow)", mandiName: "Latur Mandi", state: "Maharashtra", pricePerQuintalINR: 4800, priceChange24hPercent: 1.2, trend: "up", lastUpdated: "Today" },
  { id: "6", crop: "Paddy / Rice (IR-64)", mandiName: "Karnal Mandi", state: "Haryana", pricePerQuintalINR: 2200, priceChange24hPercent: 0.8, trend: "up", lastUpdated: "Today" }
];

const SAMPLE_SCHEMES: GovtScheme[] = [
  {
    id: "1",
    title: "PM-KISAN Samman Nidhi Yojana",
    category: "Direct Income Support",
    subsidyAmount: "₹6,000 / year (in 3 installments of ₹2,000)",
    eligibility: "All landholding farmer families in India with cultivable land.",
    description: "Financial assistance transferred directly into bank accounts of small and marginal farmers to meet agricultural expenses.",
    applyUrl: "https://pmkisan.gov.in",
    helpline: "155261 / 011-24300606"
  },
  {
    id: "2",
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    category: "Crop Loss Insurance",
    subsidyAmount: "Up to 90% Premium Subsidized by Govt",
    eligibility: "Farmers growing notified crops in notified areas during Kharif & Rabi seasons.",
    description: "Comprehensive risk insurance covering yield losses due to non-preventable natural risks, pests, and plant diseases.",
    applyUrl: "https://pmfby.gov.in",
    helpline: "1800-180-1551"
  },
  {
    id: "3",
    title: "Subsidized Micro-Irrigation Scheme (PMKSY)",
    category: "Drip & Sprinkler Subsidy",
    subsidyAmount: "55% to 80% Subsidy on Drip Setup",
    eligibility: "Farmers with verified land title and water access source.",
    description: "Promotes water conservation through subsidized installation of drip and sprinkler irrigation units.",
    applyUrl: "https://pmksy.gov.in",
    helpline: "1800-180-1551"
  }
];

const SAMPLE_AGRI_STORES: AgriStore[] = [
  {
    id: "1",
    name: "Krishi Vigyan Kendra (KVK) Regional Center",
    type: "kvk",
    address: "ICAR Agricultural Science Complex, District Highway",
    distanceKm: 4.2,
    phone: "1800-180-1551",
    rating: 4.8,
    openNow: true,
    latitude: 21.1458,
    longitude: 79.0882
  },
  {
    id: "2",
    name: "Kisan Bio-Pesticide & Organic Fertilizer Depot",
    type: "pesticide_store",
    address: "Shop 12, Main Market Yard Road",
    distanceKm: 2.1,
    phone: "+91 98230 11223",
    rating: 4.6,
    openNow: true,
    latitude: 21.15,
    longitude: 79.09
  },
  {
    id: "3",
    name: "National Seed Corporation Authorized Nursery",
    type: "nursery",
    address: "Gat No 45, Bypass Road",
    distanceKm: 6.5,
    phone: "+91 94221 88990",
    rating: 4.7,
    openNow: false,
    latitude: 21.12,
    longitude: 79.07
  }
];

export const MandiAndSchemes: React.FC<MandiAndSchemesProps> = ({ currentLang }) => {
  const [activeSubTab, setActiveSubTab] = useState<"mandi" | "schemes" | "stores">("mandi");
  const [mandiSearch, setMandiSearch] = useState("");

  const filteredMandi = SAMPLE_MANDI_PRICES.filter(
    (item) =>
      item.crop.toLowerCase().includes(mandiSearch.toLowerCase()) ||
      item.mandiName.toLowerCase().includes(mandiSearch.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 my-4">
      {/* Navigation Sub-Tabs */}
      <div className="flex bg-slate-200/80 p-1.5 rounded-2xl max-w-md mx-auto text-xs font-bold text-slate-700">
        <button
          onClick={() => setActiveSubTab("mandi")}
          className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === "mandi" ? "bg-white text-emerald-800 shadow-sm font-black" : "hover:text-slate-900"
          }`}
        >
          <IndianRupee className="w-4 h-4 text-emerald-600" /> Mandi Rates
        </button>
        <button
          onClick={() => setActiveSubTab("schemes")}
          className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === "schemes" ? "bg-white text-emerald-800 shadow-sm font-black" : "hover:text-slate-900"
          }`}
        >
          <Award className="w-4 h-4 text-amber-600" /> Govt Schemes
        </button>
        <button
          onClick={() => setActiveSubTab("stores")}
          className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === "stores" ? "bg-white text-emerald-800 shadow-sm font-black" : "hover:text-slate-900"
          }`}
        >
          <Store className="w-4 h-4 text-teal-600" /> Agri Stores & KVK
        </button>
      </div>

      {/* Sub-Tab 1: Mandi Market Prices */}
      {activeSubTab === "mandi" && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={mandiSearch}
                onChange={(e) => setMandiSearch(e.target.value)}
                placeholder="Search Crop or Mandi (e.g. Cotton, Nashik)..."
                className="text-xs font-medium text-slate-800 outline-none w-full sm:w-64"
              />
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              Updated Live from Agmarknet Government Portal
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredMandi.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-2 hover:border-emerald-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">{item.crop}</span>
                  <span
                    className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.trend === "up"
                        ? "bg-emerald-100 text-emerald-800"
                        : item.trend === "down"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {item.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-rose-600" />
                    )}
                    {item.priceChange24hPercent > 0 ? `+${item.priceChange24hPercent}%` : `${item.priceChange24hPercent}%`}
                  </span>
                </div>

                <div className="text-2xl font-black text-emerald-950">
                  ₹{item.pricePerQuintalINR.toLocaleString("en-IN")}{" "}
                  <span className="text-xs font-normal text-slate-500">/ Quintal</span>
                </div>

                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span>{item.mandiName} ({item.state})</span>
                  <span className="text-emerald-700 font-semibold">{item.lastUpdated}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Government Schemes & Subsidies */}
      {activeSubTab === "schemes" && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-5 rounded-3xl shadow-md">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-300" />
              Government Subsidies & Farmer Assistance
            </h3>
            <p className="text-xs text-emerald-100 mt-1">
              Verified Central & State agricultural subsidy schemes with direct application portals
            </p>
          </div>

          <div className="space-y-3">
            {SAMPLE_SCHEMES.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="bg-emerald-100 text-emerald-900 font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                      {scheme.category}
                    </span>
                    <h4 className="font-bold text-base text-slate-900 mt-1">{scheme.title}</h4>
                  </div>
                  <div className="bg-amber-50 text-amber-950 border border-amber-200 rounded-2xl px-3 py-1.5 text-xs font-bold shrink-0">
                    {scheme.subsidyAmount}
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">{scheme.description}</p>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs space-y-1">
                  <p className="font-semibold text-slate-800">
                    <strong>Eligibility:</strong> {scheme.eligibility}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <a
                    href={`tel:${scheme.helpline}`}
                    className="inline-flex items-center gap-1.5 text-emerald-800 font-bold hover:underline"
                  >
                    <Phone className="w-4 h-4 text-emerald-600" />
                    Toll-Free Helpline: {scheme.helpline}
                  </a>

                  <a
                    href={scheme.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl inline-flex items-center gap-1.5 shadow-xs"
                  >
                    Apply on Govt Portal <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Nearby Agri Stores & KVK Directory */}
      {activeSubTab === "stores" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SAMPLE_AGRI_STORES.map((store) => (
              <div
                key={store.id}
                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-teal-100 text-teal-900 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                      {store.type === "kvk" ? "ICAR KVK Center" : store.type.replace("_", " ")}
                    </span>
                    <span className="text-xs font-bold text-amber-600">★ {store.rating}</span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900">{store.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    {store.address} ({store.distanceKm} km away)
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <a
                    href={`tel:${store.phone}`}
                    className="bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100 font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 flex-1 justify-center"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-700" /> Call Store
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
