import { PresetSample } from "../types";

// SVG data URIs designed to simulate characteristic plant leaf pathologies
const createLeafSvg = (type: "healthy" | "early_blight" | "late_blight" | "leaf_spot" | "powdery_mildew" | "yellowing"): string => {
  let svgContent = "";

  switch (type) {
    case "healthy":
      svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
          <rect width="400" height="400" fill="#f0fdf4"/>
          <!-- Leaf base stem -->
          <path d="M200 370 Q195 280 200 40" stroke="#15803d" stroke-width="8" fill="none"/>
          <!-- Leaf body -->
          <path d="M200 40 C100 120 70 240 200 370 C330 240 300 120 200 40 Z" fill="#16a34a" stroke="#15803d" stroke-width="4"/>
          <!-- Veins -->
          <path d="M200 120 Q150 100 120 90 M200 170 Q140 150 100 140 M200 230 Q150 210 120 200 M200 290 Q160 270 140 260" stroke="#4ade80" stroke-width="4" fill="none"/>
          <path d="M200 120 Q250 100 280 90 M200 170 Q260 150 300 140 M200 230 Q250 210 280 200 M200 290 Q240 270 260 260" stroke="#4ade80" stroke-width="4" fill="none"/>
          <text x="200" y="388" font-family="sans-serif" font-size="14" font-weight="bold" fill="#15803d" text-anchor="middle">HEALTHY CROP LEAF</text>
        </svg>
      `;
      break;

    case "early_blight":
      svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
          <rect width="400" height="400" fill="#fefce8"/>
          <!-- Leaf stem -->
          <path d="M200 370 Q195 280 200 40" stroke="#15803d" stroke-width="8" fill="none"/>
          <!-- Leaf body with yellowing background -->
          <path d="M200 40 C100 120 70 240 200 370 C330 240 300 120 200 40 Z" fill="#65a30d" stroke="#3f6212" stroke-width="4"/>
          <!-- Veins -->
          <path d="M200 120 Q150 100 120 90 M200 170 Q140 150 100 140 M200 230 Q150 210 120 200" stroke="#a3e635" stroke-width="3" fill="none"/>
          <path d="M200 120 Q250 100 280 90 M200 170 Q260 150 300 140 M200 230 Q250 210 280 200" stroke="#a3e635" stroke-width="3" fill="none"/>
          <!-- Early blight target rings lesions -->
          <circle cx="150" cy="180" r="35" fill="#ca8a04" opacity="0.4"/>
          <circle cx="150" cy="180" r="28" fill="#713f12"/>
          <circle cx="150" cy="180" r="20" fill="#451a03"/>
          <circle cx="150" cy="180" r="10" fill="#1c1917"/>

          <circle cx="260" cy="240" r="28" fill="#ca8a04" opacity="0.4"/>
          <circle cx="260" cy="240" r="22" fill="#713f12"/>
          <circle cx="260" cy="240" r="14" fill="#451a03"/>

          <circle cx="180" cy="100" r="22" fill="#ca8a04" opacity="0.4"/>
          <circle cx="180" cy="100" r="16" fill="#713f12"/>

          <text x="200" y="388" font-family="sans-serif" font-size="14" font-weight="bold" fill="#854d0e" text-anchor="middle">EARLY BLIGHT LESIONS</text>
        </svg>
      `;
      break;

    case "late_blight":
      svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
          <rect width="400" height="400" fill="#fafaf9"/>
          <!-- Stem -->
          <path d="M200 370 Q195 280 200 40" stroke="#3f6212" stroke-width="8" fill="none"/>
          <!-- Leaf body -->
          <path d="M200 40 C100 120 70 240 200 370 C330 240 300 120 200 40 Z" fill="#4d7c0f" stroke="#3f6212" stroke-width="4"/>
          <!-- Dark water soaked rotting spots -->
          <path d="M120 120 Q190 140 160 220 Q100 200 120 120 Z" fill="#1c1917" opacity="0.85"/>
          <path d="M120 120 Q190 140 160 220 Q100 200 120 120 Z" stroke="#ca8a04" stroke-width="6" fill="none"/>

          <path d="M210 210 Q280 200 270 290 Q200 300 210 210 Z" fill="#1c1917" opacity="0.85"/>
          <path d="M210 210 Q280 200 270 290 Q200 300 210 210 Z" stroke="#ca8a04" stroke-width="5" fill="none"/>

          <!-- White downy mold texture overlay -->
          <circle cx="150" cy="180" r="12" fill="#ffffff" opacity="0.75"/>
          <circle cx="130" cy="160" r="8" fill="#ffffff" opacity="0.75"/>
          <circle cx="230" cy="250" r="10" fill="#ffffff" opacity="0.75"/>

          <text x="200" y="388" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1c1917" text-anchor="middle">LATE BLIGHT WATER-SOAKED</text>
        </svg>
      `;
      break;

    case "leaf_spot":
      svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
          <rect width="400" height="400" fill="#f0fdf4"/>
          <path d="M200 370 Q195 280 200 40" stroke="#15803d" stroke-width="8" fill="none"/>
          <path d="M200 40 C100 120 70 240 200 370 C330 240 300 120 200 40 Z" fill="#22c55e" stroke="#15803d" stroke-width="4"/>
          <!-- Scattered black/brown leaf spots -->
          <circle cx="140" cy="110" r="8" fill="#451a03"/>
          <circle cx="170" cy="140" r="10" fill="#451a03"/>
          <circle cx="120" cy="180" r="7" fill="#451a03"/>
          <circle cx="150" cy="220" r="12" fill="#451a03"/>
          <circle cx="130" cy="270" r="9" fill="#451a03"/>
          <circle cx="260" cy="130" r="11" fill="#451a03"/>
          <circle cx="230" cy="180" r="8" fill="#451a03"/>
          <circle cx="270" cy="220" r="10" fill="#451a03"/>
          <circle cx="240" cy="260" r="7" fill="#451a03"/>
          <circle cx="190" cy="300" r="10" fill="#451a03"/>
          <circle cx="210" cy="160" r="6" fill="#451a03"/>

          <text x="200" y="388" font-family="sans-serif" font-size="14" font-weight="bold" fill="#451a03" text-anchor="middle">LEAF SPOT LESIONS</text>
        </svg>
      `;
      break;

    case "powdery_mildew":
      svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
          <rect width="400" height="400" fill="#fafafa"/>
          <path d="M200 370 Q195 280 200 40" stroke="#15803d" stroke-width="8" fill="none"/>
          <path d="M200 40 C100 120 70 240 200 370 C330 240 300 120 200 40 Z" fill="#15803d" stroke="#166534" stroke-width="4"/>
          <!-- White powder coating patches -->
          <ellipse cx="160" cy="140" rx="35" ry="25" fill="#ffffff" opacity="0.85"/>
          <ellipse cx="240" cy="180" rx="45" ry="30" fill="#ffffff" opacity="0.85"/>
          <ellipse cx="170" cy="250" rx="40" ry="35" fill="#ffffff" opacity="0.85"/>
          <ellipse cx="230" cy="280" rx="30" ry="20" fill="#ffffff" opacity="0.85"/>
          <ellipse cx="190" cy="90" rx="25" ry="18" fill="#ffffff" opacity="0.85"/>

          <text x="200" y="388" font-family="sans-serif" font-size="14" font-weight="bold" fill="#3f3f46" text-anchor="middle">POWDERY MILDEW COATING</text>
        </svg>
      `;
      break;

    case "yellowing":
      svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
          <rect width="400" height="400" fill="#fefce8"/>
          <path d="M200 370 Q195 280 200 40" stroke="#854d0e" stroke-width="8" fill="none"/>
          <!-- Bright yellow leaf tissue -->
          <path d="M200 40 C100 120 70 240 200 370 C330 240 300 120 200 40 Z" fill="#eab308" stroke="#ca8a04" stroke-width="4"/>
          <!-- Green vein contrast (Interveinal Chlorosis) -->
          <path d="M200 40 L200 370" stroke="#15803d" stroke-width="6"/>
          <path d="M200 120 Q150 100 120 90 M200 170 Q140 150 100 140 M200 230 Q150 210 120 200 M200 290 Q160 270 140 260" stroke="#15803d" stroke-width="4" fill="none"/>
          <path d="M200 120 Q250 100 280 90 M200 170 Q260 150 300 140 M200 230 Q250 210 280 200 M200 290 Q240 270 260 260" stroke="#15803d" stroke-width="4" fill="none"/>

          <text x="200" y="388" font-family="sans-serif" font-size="14" font-weight="bold" fill="#854d0e" text-anchor="middle">NUTRIENT DEFICIENCY (YELLOWING)</text>
        </svg>
      `;
      break;
  }

  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent.trim())}`;
};

export const PRESET_SAMPLES: PresetSample[] = [
  {
    id: "sample_healthy_tomato",
    crop: "Tomato",
    category: "Healthy",
    diseaseName: "Healthy Leaf",
    imageUri: createLeafSvg("healthy"),
    shortDesc: "Vibrant green leaf with uniform structure and no lesions.",
  },
  {
    id: "sample_early_blight",
    crop: "Tomato / Potato",
    category: "Early Blight",
    diseaseName: "Early Blight (Alternaria)",
    imageUri: createLeafSvg("early_blight"),
    shortDesc: "Brown lesions with concentric target-like rings surrounded by yellow halo.",
  },
  {
    id: "sample_late_blight",
    crop: "Potato / Tomato",
    category: "Late Blight",
    diseaseName: "Late Blight (Phytophthora)",
    imageUri: createLeafSvg("late_blight"),
    shortDesc: "Dark water-soaked rot spots with white downy mold underneath.",
  },
  {
    id: "sample_leaf_spot",
    crop: "Chilli / Rose / Brinjal",
    category: "Leaf Spot",
    diseaseName: "Fungal Leaf Spot (Cercospora)",
    imageUri: createLeafSvg("leaf_spot"),
    shortDesc: "Multiple small dark brown spots scattered across leaf blade.",
  },
  {
    id: "sample_powdery_mildew",
    crop: "Cucumber / Squash / Grape",
    category: "Powdery Mildew",
    diseaseName: "Powdery Mildew",
    imageUri: createLeafSvg("powdery_mildew"),
    shortDesc: "White flour-like dusty coating on upper and lower surfaces.",
  },
  {
    id: "sample_yellowing",
    crop: "Corn / Rice / Wheat",
    category: "Nutrient Deficiency",
    diseaseName: "Nitrogen / Iron Chlorosis",
    imageUri: createLeafSvg("yellowing"),
    shortDesc: "Interveinal leaf yellowing due to lack of essential soil nutrients.",
  },
];
