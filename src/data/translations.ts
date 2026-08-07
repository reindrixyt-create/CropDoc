import { LanguageCode, LanguageConfig, DiseaseCategory } from "../types";

export const LANGUAGES: LanguageConfig[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
  { code: "pb", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇮🇳" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", flag: "🇮🇳" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া", flag: "🇮🇳" },
];

export interface UITranslations {
  appTitle: string;
  appSubtitle: string;
  tagline: string;
  tabScanner: string;
  tabHistory: string;
  tabSamples: string;
  uploadPhoto: string;
  takeLivePhoto: string;
  dragDropText: string;
  selectFromGallery: string;
  orTrySample: string;
  analyzingImage: string;
  analyzingSubtitle: string;
  resultsTitle: string;
  confidence: string;
  severity: string;
  cropDetected: string;
  symptomsTitle: string;
  treatmentsTitle: string;
  preventionTitle: string;
  listenAudio: string;
  stopAudio: string;
  scanAnother: string;
  saveToHistory: string;
  savedToHistory: string;
  shareResult: string;
  noHistory: string;
  clearHistory: string;
  searchHistory: string;
  photoGuideTitle: string;
  photoGuideDesc: string;
  prototypeNotice: string;
  categoryHealthy: string;
  categoryEarlyBlight: string;
  categoryLateBlight: string;
  categoryLeafSpot: string;
  categoryPowderyMildew: string;
  categoryNutrientDeficiency: string;
  categoryUnknown: string;
  flipCamera: string;
  capturePhoto: string;
  closeCamera: string;
  cameraPermissionError: string;
  farmSizeLabel?: string;
  voiceInputLabel?: string;
  voiceListening?: string;
  whatsappShare?: string;
  lowCostOption?: string;
  chemicalOption?: string;
  estimatedCost?: string;
  callExpert?: string;
  expertHelpline?: string;
  offlineBanner?: string;
  downloadReport?: string;
  downloadReportDesc?: string;
  confirmWithExpertTitle?: string;
  confirmWithExpertDesc?: string;
  findKvk?: string;
  outdoorMode?: string;
  selectLanguage?: string;
  searchLanguagePlaceholder?: string;
  qualityWarningTitle?: string;
  qualityWarningDesc?: string;
  retakePhoto?: string;
  analyzeAnyway?: string;
  scanFirstLeaf?: string;
  onboardingSkip?: string;
  onboardingNext?: string;
  onboardingFinish?: string;
  stepPhoto?: string;
  stepAnalyzing?: string;
  stepResult?: string;
  riskDetectedBannerTitle?: string;
  riskDetectedBannerSub?: string;
  confidenceMeterTitle?: string;
  confidenceHighLevel?: string;
  confidenceModerateLevel?: string;
  confidenceLowLevel?: string;
}

export const UI_TRANSLATIONS: Record<LanguageCode, UITranslations> = {
  en: {
    appTitle: "CropDoc",
    appSubtitle: "AI Plant & Crop Health Doctor",
    tagline: "Know what to spray, how much it costs, and whether you can skip the chemicals",
    tabScanner: "Scan Leaf",
    tabHistory: "Scan History",
    tabSamples: "Sample Leaves",
    uploadPhoto: "Upload Photo",
    takeLivePhoto: "Camera Scan",
    dragDropText: "Drop leaf photo here or browse",
    selectFromGallery: "Choose from Gallery",
    orTrySample: "Or try a sample leaf",
    analyzingImage: "Analyzing leaf photo...",
    analyzingSubtitle: "Detecting crop health & disease patterns with AI",
    resultsTitle: "Diagnosis Result",
    confidence: "AI Confidence",
    severity: "Severity Level",
    cropDetected: "Crop",
    symptomsTitle: "Observed Symptoms",
    treatmentsTitle: "Recommended Treatments",
    preventionTitle: "Prevention Guidelines",
    listenAudio: "Listen to Result",
    stopAudio: "Stop Voice",
    scanAnother: "Scan Another Leaf",
    saveToHistory: "Save to History",
    savedToHistory: "Saved in History",
    shareResult: "Share Diagnosis",
    noHistory: "No saved scans yet. Take a photo of a plant leaf to begin!",
    clearHistory: "Clear All History",
    searchHistory: "Search by crop or disease...",
    photoGuideTitle: "How to Take a Clear Leaf Photo",
    photoGuideDesc: "Place a single leaf on a clean background under good sunlight. Focus closely on spots or yellowing.",
    prototypeNotice: "Prototype demo — AI decision support tool for agricultural guidance.",
    categoryHealthy: "Healthy Crop",
    categoryEarlyBlight: "Early Blight",
    categoryLateBlight: "Late Blight",
    categoryLeafSpot: "Leaf Spot",
    categoryPowderyMildew: "Powdery Mildew",
    categoryNutrientDeficiency: "Nutrient Deficiency (Yellowing)",
    categoryUnknown: "Unknown / Unclear Photo",
    flipCamera: "Switch Camera",
    capturePhoto: "Take Photo",
    closeCamera: "Close Camera",
    cameraPermissionError: "Unable to access camera. Please allow camera permissions in browser settings or upload a saved photo.",
    farmSizeLabel: "Farm Size (Acres)",
    voiceInputLabel: "Describe Symptoms (Voice)",
    voiceListening: "Listening... Speak now",
    whatsappShare: "Share on WhatsApp",
    lowCostOption: "🌱 Low-Cost / Eco-Friendly",
    chemicalOption: "🧪 Chemical Medicine",
    estimatedCost: "Estimated Cost",
    callExpert: "Talk to Kisan Helpline (Toll-Free)",
    expertHelpline: "Kisan Call Centre: 1800-180-1551",
    offlineBanner: "You are Offline — Using Local AI Analyzer",
    confirmWithExpertTitle: "Confirm with Agri Expert",
    confirmWithExpertDesc: "Consult your regional Krishi Vigyan Kendra (KVK) officer before applying heavy chemical pesticides.",
    findKvk: "Find Nearby KVK Center",
    outdoorMode: "Outdoor Sun Mode",
    selectLanguage: "Select Language",
    searchLanguagePlaceholder: "Search language or script...",
    qualityWarningTitle: "Photo Quality Notice",
    qualityWarningDesc: "This photo appears a bit dark or low-contrast. For maximum diagnostic accuracy, ensure good lighting and clear leaf focus.",
    retakePhoto: "Retake Clear Photo",
    analyzeAnyway: "Analyze Photo Anyway",
    scanFirstLeaf: "Scan Your First Leaf",
    onboardingSkip: "Skip Intro",
    onboardingNext: "Next Step",
    onboardingFinish: "Start Doctor Scan",
    stepPhoto: "1. Photo",
    stepAnalyzing: "2. Analyzing",
    stepResult: "3. Diagnosis",
    riskDetectedBannerTitle: "HIGH CROP DISEASE RISK DETECTED",
    riskDetectedBannerSub: "Leaf scan identified active infection or pest threat — immediate action recommended.",
    confidenceMeterTitle: "AI Diagnosis Confidence Meter",
    confidenceHighLevel: "High Accuracy Match",
    confidenceModerateLevel: "Moderate Match",
    confidenceLowLevel: "Low Accuracy - Verify with Expert",
  },
  hi: {
    appTitle: "CropDoc (फसल डॉक्टर)",
    appSubtitle: "एआई पौधा और फसल रोग जांच",
    tagline: "जानें क्या छिड़कना है, कितना खर्च आएगा, और क्या जैविक उपाय काफी है",
    tabScanner: "पत्ती स्कैन करें",
    tabHistory: "पुराना रिकॉर्ड",
    tabSamples: "नमूना पत्तियां",
    uploadPhoto: "फोटो अपलोड करें",
    takeLivePhoto: "कैमरा से फोटो लें",
    dragDropText: "पत्ती की फोटो यहां डालें या चुनें",
    selectFromGallery: "गैलरी से चुनें",
    orTrySample: "या नमूना पत्ती आजमाएं",
    analyzingImage: "पत्ती की जांच हो रही है...",
    analyzingSubtitle: "एआई द्वारा फसल स्वास्थ्य और बीमारी के लक्षणों की पहचान जारी है",
    resultsTitle: "जांच का परिणाम",
    confidence: "सटीकता दर",
    severity: "गंभीरता का स्तर",
    cropDetected: "फसल का नाम",
    symptomsTitle: "देखे गए लक्षण",
    treatmentsTitle: "उपचार और दवा",
    preventionTitle: "बचाव के उपाय",
    listenAudio: "परिणाम सुनें (आवाज में)",
    stopAudio: "आवाज बंद करें",
    scanAnother: "दूसरी पत्ती स्कैन करें",
    saveToHistory: "रिकॉर्ड में सहेजें",
    savedToHistory: "सहेजा गया",
    shareResult: "शेयर करें",
    noHistory: "अभी तक कोई स्कैन सहेजा नहीं गया है। पौधे की पत्ती की फोटो लेकर शुरुआत करें!",
    clearHistory: "सभी रिकॉर्ड हटाएं",
    searchHistory: "फसल या बीमारी खोजें...",
    photoGuideTitle: "सही फोटो कैसे लें?",
    photoGuideDesc: "एक पत्ती को साफ जगह पर अच्छी धूप में रखें। धब्बों और पीलेपन पर ध्यान केंद्रित करें।",
    prototypeNotice: "प्रोटोटाइप डेमो — कृषि मार्गदर्शन के लिए एआई सहायक उपकरण।",
    categoryHealthy: "स्वस्थ फसल",
    categoryEarlyBlight: "अगेती झुलसा (Early Blight)",
    categoryLateBlight: "पछेती झुलसा (Late Blight)",
    categoryLeafSpot: "पत्ती धब्बा रोग (Leaf Spot)",
    categoryPowderyMildew: "सफेद चूर्णी रोग (Powdery Mildew)",
    categoryNutrientDeficiency: "पोषक तत्वों की कमी (पीलापन)",
    categoryUnknown: "अस्पष्ट या अज्ञात फोटो",
    flipCamera: "कैमरा बदलें",
    capturePhoto: "फोटो खींचें",
    closeCamera: "कैमरा बंद करें",
    cameraPermissionError: "कैमरा चालू नहीं हो पा रहा है। कृपया ब्राउज़र में कैमरा अनुमति दें या गैलरी से फोटो अपलोड करें।",
    farmSizeLabel: "खेत का आकार (एकड़)",
    voiceInputLabel: "बोलकर लक्षण बताएं",
    voiceListening: "सुन रहा है... अब बोलिए",
    whatsappShare: "व्हाट्सएप पर शेयर करें",
    lowCostOption: "🌱 कम खर्च / जैविक उपाय",
    chemicalOption: "🧪 रासायनिक दवा उपाय",
    estimatedCost: "अनुमानित खर्च",
    callExpert: "किसान हेल्पलाइन से बात करें (टोल-फ्री)",
    expertHelpline: "किसान कॉल सेंटर: 1800-180-1551",
    offlineBanner: "आप ऑफ़लाइन हैं — स्थानीय एआई से जांच जारी है",
  },
  es: {
    appTitle: "CropDoc",
    appSubtitle: "Doctor de Cultivos con IA",
    tagline: "Diagnóstico instantáneo de enfermedades de hojas para agricultores",
    tabScanner: "Escanear Hoja",
    tabHistory: "Historial",
    tabSamples: "Muestras",
    uploadPhoto: "Subir Foto",
    takeLivePhoto: "Escanear con Cámara",
    dragDropText: "Arrastra la foto de la hoja aquí",
    selectFromGallery: "Elegir de Galería",
    orTrySample: "O prueba una hoja de muestra",
    analyzingImage: "Analizando la hoja...",
    analyzingSubtitle: "Detectando patrones con IA",
    resultsTitle: "Resultado del Diagnóstico",
    confidence: "Confianza IA",
    severity: "Nivel de Severidad",
    cropDetected: "Cultivo",
    symptomsTitle: "Síntomas Observados",
    treatmentsTitle: "Tratamientos Recomendados",
    preventionTitle: "Medidas Preventivas",
    listenAudio: "Escuchar Resultado",
    stopAudio: "Detener Voz",
    scanAnother: "Escanear Otra Hoja",
    saveToHistory: "Guardar en Historial",
    savedToHistory: "Guardado",
    shareResult: "Compartir",
    noHistory: "No hay escaneos guardados. ¡Toma una foto para comenzar!",
    clearHistory: "Borrar Historial",
    searchHistory: "Buscar cultivo o enfermedad...",
    photoGuideTitle: "Cómo tomar una buena foto",
    photoGuideDesc: "Coloca una sola hoja con buena luz solar enfocando las manchas.",
    prototypeNotice: "Demostración prototipo — Herramienta de asistencia agrícola.",
    categoryHealthy: "Cultivo Sano",
    categoryEarlyBlight: "Tizón Temprano",
    categoryLateBlight: "Tizón Tardío",
    categoryLeafSpot: "Mancha Foliar",
    categoryPowderyMildew: "Oídio o Cenicilla",
    categoryNutrientDeficiency: "Deficiencia de Nutrientes",
    categoryUnknown: "Imagen No Clara",
    flipCamera: "Cambiar Cámara",
    capturePhoto: "Tomar Foto",
    closeCamera: "Cerrar Cámara",
    cameraPermissionError: "No se puede acceder a la cámara. Revisa las autorizaciones de tu navegador.",
  },
  te: {
    appTitle: "CropDoc (పంట డాక్టర్)",
    appSubtitle: "AI మొక్కల & పంటల వ్యాధి నిర్ధారణ",
    tagline: "రైతుల కోసం తక్షణ ఆకు తెగుళ్ళ గుర్తింపు & చికిత్స మార్గదర్శి",
    tabScanner: "ఆకు స్కాన్ చేయండి",
    tabHistory: "పాత చరిత్ర",
    tabSamples: "నమూనా ఆకులు",
    uploadPhoto: "ఫోటో అప్‌లోడ్ చేయండి",
    takeLivePhoto: "కెమెరాతో ఫోటో తీయండి",
    dragDropText: "ఆకు ఫోటోను ఇక్కడ ఉంచండి",
    selectFromGallery: "గ్యాలరీ నుండి ఎంచుకోండి",
    orTrySample: "లేదా నమూనా ఆకును ప్రయత్నించండి",
    analyzingImage: "ఆకును విశ్లేషిస్తోంది...",
    analyzingSubtitle: "AI ద్వారా పంట ఆరోగ్యం గుర్తించబడుతోంది",
    resultsTitle: "నిర్ధారణ ఫలితం",
    confidence: "ఖచ్చితత్వం",
    severity: "తీవ్రత స్థాయి",
    cropDetected: "పంట పేరు",
    symptomsTitle: "కనిపించిన లక్షణాలు",
    treatmentsTitle: "సిఫార్సు చేసిన చికిత్సలు",
    preventionTitle: "నివారణ చర్యలు",
    listenAudio: "చదివి వినిపించు",
    stopAudio: "ఆపు",
    scanAnother: "మరొక ఆకు స్కాన్ చేయండి",
    saveToHistory: "చరిత్రలో సేవ్ చేయి",
    savedToHistory: "సేవ్ చేయబడింది",
    shareResult: "షేర్ చేయి",
    noHistory: "ఇంకా సేవ్ చేసిన స్కాన్‌లు లేవు. ప్రారంభించడానికి ఆకు ఫోటో తీయండి!",
    clearHistory: "చరిత్రను తీసివేయి",
    searchHistory: "పంట లేదా తెగులు కోసం వెతకండి...",
    photoGuideTitle: "మంచి ఫోటో ఎలా తీయాలి?",
    photoGuideDesc: "మంచి వెలుతురులో స్పష్టమైన ఆకు ఫోటో తీయండి.",
    prototypeNotice: "ప్రోటోటైప్ డెమో — వ్యవసాయ మార్గదర్శకత్వం కోసం AI సాధనం.",
    categoryHealthy: "ఆరోగ్యకరమైన పంట",
    categoryEarlyBlight: "తొందర మచ్చ తెగులు (Early Blight)",
    categoryLateBlight: "లేట్ బ్లైట్ తెగులు (Late Blight)",
    categoryLeafSpot: "ఆకుమచ్చ తెగులు (Leaf Spot)",
    categoryPowderyMildew: "బూడిద తెగులు (Powdery Mildew)",
    categoryNutrientDeficiency: "పోషకాల లోపం (పసుపు రంగు)",
    categoryUnknown: "అస్పష్టమైన ఫోటో",
    flipCamera: "కెమెరా మార్చు",
    capturePhoto: "ఫోటో తీయి",
    closeCamera: "కెమెరా మూసివేయి",
    cameraPermissionError: "కెమెరా అందుబాటులో లేదు. బ్రౌజర్ అనుమతులను తనిఖీ చేయండి.",
  },
  mr: {
    appTitle: "CropDoc (पिक डॉक्टर)",
    appSubtitle: "एआय वनस्पती आणि पीक रोग निदान",
    tagline: "शेतकऱ्यांसाठी त्वरित पान रोग ओळख आणि उपचार मार्गदर्शक",
    tabScanner: "पान स्कॅन करा",
    tabHistory: "जुना इतिहास",
    tabSamples: "नमूना पाने",
    uploadPhoto: "फोटो अपलोड करा",
    takeLivePhoto: "कॅमेराने फोटो घ्या",
    dragDropText: "पानाचा फोटो येथे टाका किंवा निवडा",
    selectFromGallery: "गॅलरीमधून निवडा",
    orTrySample: "किंवा नमुना पान वापरा",
    analyzingImage: "पानाची तपासणी सुरू आहे...",
    analyzingSubtitle: "एआय द्वारे रोगाची लक्षणे ओळखली जात आहेत",
    resultsTitle: "निदान निकाल",
    confidence: "अचूकता दर",
    severity: "तीव्रता पातळी",
    cropDetected: "पिकाचे नाव",
    symptomsTitle: "आढळलेली लक्षणे",
    treatmentsTitle: "उपाय आणि औषधे",
    preventionTitle: "प्रतिबंधात्मक उपाय",
    listenAudio: "निकाल ऐका",
    stopAudio: "आवाज बंद करा",
    scanAnother: "दूसरे पान स्कॅन करा",
    saveToHistory: "इतिहासात जतन करा",
    savedToHistory: "जतन केले",
    shareResult: "शेअर करा",
    noHistory: "अद्याप कोणतेही स्कॅन जतन केलेले नाही. सुरुवात करण्यासाठी पानाचा फोटो घ्या!",
    clearHistory: "सर्व इतिहास पुसा",
    searchHistory: "पीक किंवा रोग शोधा...",
    photoGuideTitle: "योग्य फोटो कसा घ्यावा?",
    photoGuideDesc: "चांगल्या प्रकाशात एका पानाचा स्पष्ट फोटो घ्या.",
    prototypeNotice: "प्रोटोटाइप डेमो — कृषी मार्गदर्शनासाठी एआय साधन.",
    categoryHealthy: "निरोगी पीक",
    categoryEarlyBlight: "करपा रोग (Early Blight)",
    categoryLateBlight: "उशिरा येणारा करपा (Late Blight)",
    categoryLeafSpot: "पानावरील ठिपके (Leaf Spot)",
    categoryPowderyMildew: "भुरी रोग (Powdery Mildew)",
    categoryNutrientDeficiency: "पोषक तत्वांची कमतरता (पिवळेपणा)",
    categoryUnknown: "अस्पष्ट फोटो",
    flipCamera: "कॅमेरा बदला",
    capturePhoto: "फोटो काढा",
    closeCamera: "कॅमेरा बंद करा",
    cameraPermissionError: "कॅमेरा सुरू होऊ शकला नाही. ब्राउझरमध्ये परवानगी द्या किंवा फोटो अपलोड करा.",
  },
  pb: {
    appTitle: "CropDoc (ਫ਼ਸਲ ਡਾਕਟਰ)",
    appSubtitle: "ਏਆਈ ਪੌਦਾ ਅਤੇ ਫ਼ਸਲ ਬਿਮਾਰੀ ਜਾਂਚ",
    tagline: "ਕਿਸਾਨਾਂ ਲਈ ਤੁਰੰਤ ਪੱਤਾ ਬਿਮਾਰੀ ਪਛਾਣ ਅਤੇ ਇਲਾਜ",
    tabScanner: "ਪੱਤਾ ਸਕੈਨ ਕਰੋ",
    tabHistory: "ਪੁਰਾਣਾ ਰਿਕਾਰਡ",
    tabSamples: "ਨਮੂਨਾ ਪੱਤੇ",
    uploadPhoto: "ਫੋਟੋ ਅੱਪਲੋਡ ਕਰੋ",
    takeLivePhoto: "ਕੈਮਰੇ ਨਾਲ ਫੋਟੋ ਲਵੋ",
    dragDropText: "ਪੱਤੇ ਦੀ ਫੋਟੋ ਇੱਥੇ ਪਾਓ",
    selectFromGallery: "ਗੈਲਰੀ ਤੋਂ ਚੁਣੋ",
    orTrySample: "ਜਾਂ ਨਮੂਨਾ ਪੱਤਾ ਵਰਤੋ",
    analyzingImage: "ਪੱਤੇ ਦੀ ਜਾਂਚ ਹੋ ਰਹੀ ਹੈ...",
    analyzingSubtitle: "ਏਆਈ ਦੁਆਰਾ ਲੱਛਣਾਂ ਦੀ ਪਛਾਣ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ",
    resultsTitle: "ਜਾਂਚ ਦਾ ਨਤੀਜਾ",
    confidence: "ਸਟੀਕਤਾ",
    severity: "ਗੰਭੀਰਤਾ",
    cropDetected: "ਫ਼ਸਲ",
    symptomsTitle: "ਵੇਖੇ ਗਏ ਲੱਛਣ",
    treatmentsTitle: "ਇਲਾਜ ਅਤੇ ਸੁਝਾਅ",
    preventionTitle: "ਬਚਾਅ ਦੇ ਉਪਾਅ",
    listenAudio: "ਨਤੀਜਾ ਸੁਣੋ",
    stopAudio: "ਆਵਾਜ਼ ਬੰਦ ਕਰੋ",
    scanAnother: "ਹੋਰ ਪੱਤਾ ਸਕੈਨ ਕਰੋ",
    saveToHistory: "ਸੰਭਾਲੋ",
    savedToHistory: "ਸੰਭਾਲਿਆ ਗਿਆ",
    shareResult: "ਸਾਂਝਾ ਕਰੋ",
    noHistory: "ਅਜੇ ਕੋਈ ਸਕੈਨ ਨਹੀਂ ਹੈ। ਪੱਤੇ ਦੀ ਫੋਟੋ ਖਿੱਚ ਕੇ ਸ਼ੁਰੂ ਕਰੋ!",
    clearHistory: "ਸਭ ਮਿਟਾਓ",
    searchHistory: "ਫ਼ਸਲ ਜਾਂ ਬਿਮਾਰੀ ਲੱਭੋ...",
    photoGuideTitle: "ਚੰਗੀ ਫੋਟੋ ਕਿਵੇਂ ਖਿੱਚੀਏ?",
    photoGuideDesc: "ਚੰਗੀ ਧੁੱਪ ਵਿੱਚ ਇਕ ਪੱਤੇ ਦੀ ਸਾਫ਼ ਫੋਟੋ ਲਵੋ।",
    prototypeNotice: "ਪ੍ਰੋਟੋਟਾਈਪ ਡੈਮੋ — ਖੇਤੀਬਾੜੀ ਮਾਰਗਦਰਸ਼ਨ ਲਈ ਏਆਈ ਟੂਲ।",
    categoryHealthy: "ਤੰਦਰੁਸਤ ਫ਼ਸਲ",
    categoryEarlyBlight: "ਅਗੇਤਾ ਝੁਲਸ ਰੋਗ (Early Blight)",
    categoryLateBlight: "ਪਛੇਤਾ ਝੁਲਸ ਰੋਗ (Late Blight)",
    categoryLeafSpot: "ਪੱਤਿਆਂ 'ਤੇ ਧੱਬੇ (Leaf Spot)",
    categoryPowderyMildew: "ਚਿੱਟਾ ਪਾਊਡਰ ਰੋਗ (Powdery Mildew)",
    categoryNutrientDeficiency: "ਖੁਰਾਕੀ ਤੱਤਾਂ ਦੀ ਘਾਟ (ਪੀਲਾਪਨ)",
    categoryUnknown: "ਅਸਪਸ਼ਟ ਫੋਟੋ",
    flipCamera: "ਕੈਮਰਾ ਬਦਲੋ",
    capturePhoto: "ਫੋਟੋ ਲਵੋ",
    closeCamera: "ਕੈਮਰਾ ਬੰਦ ਕਰੋ",
    cameraPermissionError: "ਕੈਮਰਾ ਨਹੀਂ ਚੱਲ ਸਕਿਆ। ਬ੍ਰਾਊਜ਼ਰ ਦੀ ਇਜਾਜ਼ਤ ਦੀ ਜਾਂਚ ਕਰੋ।",
  },
  bn: {
    appTitle: "CropDoc (ফসল ডাক্তার)",
    appSubtitle: "এআই উদ্ভিদ ও ফসল রোগ নির্ণয়",
    tagline: "কৃষকদের জন্য দ্রুত পাতা রোগ শনাক্তকরণ ও চিকিৎসা নির্দেশিকা",
    tabScanner: "পাতা স্ক্যান করুন",
    tabHistory: "পুরানো ইতিহাস",
    tabSamples: "নমুনা পাতা",
    uploadPhoto: "ছবি আপলোড করুন",
    takeLivePhoto: "ক্যামেরা দিয়ে ছবি তুলুন",
    dragDropText: "পাতার ছবি এখানে রাখুন",
    selectFromGallery: "গ্যালারি থেকে নির্বাচন করুন",
    orTrySample: "বা একটি নমুনা পাতা চেষ্টা করুন",
    analyzingImage: "পাতার পরীক্ষা করা হচ্ছে...",
    analyzingSubtitle: "এআই দ্বারা স্বাস্থ্য ও রোগ নির্ণয় চলছে",
    resultsTitle: "রোগ নির্ণয়ের ফলাফল",
    confidence: "নির্ভুলতা",
    severity: "মাত্রার তীব্রতা",
    cropDetected: "ফসলের নাম",
    symptomsTitle: "পর্যবেক্ষিত লক্ষণ",
    treatmentsTitle: "সুপারিশকৃত চিকিৎসা",
    preventionTitle: "প্রতিরোধমূলক ব্যবস্থা",
    listenAudio: "ফলাফল শুনুন",
    stopAudio: "কণ্ঠ বন্ধ করুন",
    scanAnother: "অন্য পাতা স্ক্যান করুন",
    saveToHistory: "সংরক্ষণ করুন",
    savedToHistory: "সংরক্ষিত",
    shareResult: "শেয়ার করুন",
    noHistory: "এখনও কোনও স্ক্যান সংরক্ষিত হয়নি। শুরু করতে পাতার ছবি তুলুন!",
    clearHistory: "ইতিহাস মুছুন",
    searchHistory: "ফসল বা রোগ অনুসন্ধান করুন...",
    photoGuideTitle: "কীভাবে পরিষ্কার ছবি তুলবেন?",
    photoGuideDesc: "ভালো আলোতে একটি পাতার পরিষ্কার ছবি তুলুন।",
    prototypeNotice: "প্রোটোটাইপ ডেমো — কৃষি নির্দেশনার জন্য এআই সরঞ্জাম।",
    categoryHealthy: "সুস্থ ফসল",
    categoryEarlyBlight: "আাম আগাম ধসা রোগ (Early Blight)",
    categoryLateBlight: "নাবি ধসা রোগ (Late Blight)",
    categoryLeafSpot: "পাতার দাগ রোগ (Leaf Spot)",
    categoryPowderyMildew: "পাউডারি মিলডিউ (Powdery Mildew)",
    categoryNutrientDeficiency: "পুষ্টির ঘাটতি (হলদে ভাব)",
    categoryUnknown: "অস্পষ্ট ছবি",
    flipCamera: "ক্যামেরা পরিবর্তন করুন",
    capturePhoto: "ছবি তুলুন",
    closeCamera: "ক্যামেরা বন্ধ করুন",
    cameraPermissionError: "ক্যামেরা চালুর অনুমতি পাওয়া যায়নি। ব্রাউজার পারমিশন পরীক্ষা করুন।",
  },
  gu: {
    appTitle: "CropDoc (પાક ડોક્ટર)",
    appSubtitle: "AI છોડ અને પાક રોગ નિદાન",
    tagline: "ખેડૂતો માટે ત્વરિત પાંદડાના રોગની ઓળખ અને સારવાર માર્ગદર્શિકા",
    tabScanner: "પાંદડું સ્કેન કરો",
    tabHistory: "જૂનો ઇતિહાસ",
    tabSamples: "નમૂના પાંદડાં",
    uploadPhoto: "ફોટો અપલોડ કરો",
    takeLivePhoto: "કેમેરાથી ફોટો લો",
    dragDropText: "પાંદડાનો ફોટો અહીં મૂકો",
    selectFromGallery: "ગેલેરીમાંથી પસંદ કરો",
    orTrySample: "અથવા નમૂના પાંદડું વાપરો",
    analyzingImage: "પાંદડાની તપાસ થઈ રહી છે...",
    analyzingSubtitle: "AI દ્વારા રોગના લક્ષણો ઓળખવામાં આવી રહ્યા છે",
    resultsTitle: "નિદાન પરિણામ",
    confidence: "ચોકસાઈ દર",
    severity: "ગંભીરતાનું સ્તર",
    cropDetected: "પાકનું નામ",
    symptomsTitle: "જોયેલા લક્ષણો",
    treatmentsTitle: "સારવાર અને દવા",
    preventionTitle: "બચાવના ઉપાયો",
    listenAudio: "પરિણામ સાંભળો",
    stopAudio: "અવાજ બંધ કરો",
    scanAnother: "બીજું પાંદડું સ્કેન કરો",
    saveToHistory: "ઇતિહાસમાં સાચવો",
    savedToHistory: "સાચવવામાં આવ્યું",
    shareResult: "શેર કરો",
    noHistory: "હજુ સુધી કોઈ સ્કેન સાચવેલ નથી. પાંદડાનો ફોટો લઈને શરૂઆત કરો!",
    clearHistory: "બધો ઇતિહાસ ભૂંસી નાખો",
    searchHistory: "પાક અથવા રોગ શોધો...",
    photoGuideTitle: "સાચો ફોટો કેવી રીતે લેવો?",
    photoGuideDesc: "સારા સૂર્યપ્રકાશમાં પાંદડાનો સ્પષ્ટ ફોટો લો.",
    prototypeNotice: "પ્રોટોટાઇપ ડેમો — કૃષિ માર્ગદર્શન માટે AI સાધન.",
    categoryHealthy: "તંદુરસ્ત પાક",
    categoryEarlyBlight: "અગેતરો સુકારો (Early Blight)",
    categoryLateBlight: "પછેતરો સુકારો (Late Blight)",
    categoryLeafSpot: "પાનના ટપકાંનો રોગ (Leaf Spot)",
    categoryPowderyMildew: "છારો / ભૂકી છારો (Powdery Mildew)",
    categoryNutrientDeficiency: "પોષક તત્વોની ઉણપ (પીળાશ)",
    categoryUnknown: "અસ્પષ્ટ ફોટો",
    flipCamera: "કેમેરો બદલો",
    capturePhoto: "ફોટો પાડો",
    closeCamera: "કેમેરો બંધ કરો",
    cameraPermissionError: "કેમેરો શરૂ થઈ શક્યો નથી. બ્રાઉઝર પરમિશન ચકાસો.",
  },
  ta: {
    appTitle: "CropDoc (பயிர் மருத்துவர்)",
    appSubtitle: "AI தாவர நோய் கண்டறிதல்",
    tagline: "விவசாயிகளுக்கான உடனடி இலை நோய் கண்டறிதல் & சிகிச்சை வழிகாட்டி",
    tabScanner: "இலையை ஸ்கேன் செய்",
    tabHistory: "வரலாறு",
    tabSamples: "மாதிரி இலைகள்",
    uploadPhoto: "படம் பதிவேற்று",
    takeLivePhoto: "கேமரா மூலம் படம் எடு",
    dragDropText: "இலை படத்தை இங்கே விடவும்",
    selectFromGallery: "கேலரியில் தேர்வு செய்",
    orTrySample: "மாதிரி இலையை முயல்க",
    analyzingImage: "இலை பகுப்பாய்வு செய்யப்படுகிறது...",
    analyzingSubtitle: "AI மூலம் பயிர் நோய் கண்டறியப்படுகிறது",
    resultsTitle: "கண்டறிந்த முடிவு",
    confidence: "துல்லியம்",
    severity: "பாதிப்பு நிலை",
    cropDetected: "பயிர் பெயர்",
    symptomsTitle: "கண்டறியப்பட்ட அறிகுறிகள்",
    treatmentsTitle: "பரிந்துரைக்கப்பட்ட சிகிச்சைகள்",
    preventionTitle: "தடுப்பு முறைகள்",
    listenAudio: "முடிவை கேட்க",
    stopAudio: "ஒலியை நிறுத்து",
    scanAnother: "மற்றொரு இலையை ஸ்கேன் செய்",
    saveToHistory: "வரலாற்றில் சேமி",
    savedToHistory: "சேமிக்கப்பட்டது",
    shareResult: "பகிர்",
    noHistory: "இன்னும் சேமிக்கப்பட்ட ஸ்கேன்கள் இல்லை. இலையின் படம் எடுத்து தொடங்கவும்!",
    clearHistory: "வரலாற்றை அழி",
    searchHistory: "பயிர் அல்லது நோயை தேடுக...",
    photoGuideTitle: "சரியான படம் எடுப்பது எப்படி?",
    photoGuideDesc: "நல்ல வெளிச்சத்தில் இலையின் தெளிவான படத்தை எடுக்கவும்.",
    prototypeNotice: "முன்மாதிரி டெமோ — விவசாய வழிகாட்டுதலுக்கான AI கருவி.",
    categoryHealthy: "ஆரோக்கியமான பயிர்",
    categoryEarlyBlight: "முன் கருகல் நோய் (Early Blight)",
    categoryLateBlight: "பின் கருகல் நோய் (Late Blight)",
    categoryLeafSpot: "இலைப்புள்ளி நோய் (Leaf Spot)",
    categoryPowderyMildew: "சாம்பல் நோய் (Powdery Mildew)",
    categoryNutrientDeficiency: "ஊட்டச்சத்து குறைபாடு (மஞ்சள் நிறம்)",
    categoryUnknown: "தெளிவற்ற படம்",
    flipCamera: "கேமராவை மாற்று",
    capturePhoto: "படம் எடு",
    closeCamera: "கேமராவை மூடு",
    cameraPermissionError: "கேமராவை இயக்க முடியவில்லை. உலாவியின் அனுமதி அமைப்புகளை சரிபார்க்கவும்.",
    farmSizeLabel: "நில அளவு (এக்கர்)",
    voiceInputLabel: "அறிகுறிகளை பேசுங்கள்",
    voiceListening: "கேட்கிறது... பேசுங்கள்",
    whatsappShare: "வாட்ஸ்அப்பில் பகிரவும்",
    lowCostOption: "🌱 குறைந்த செலவு / இயற்கை மருந்து",
    chemicalOption: "🧪 ரசாயன மருந்து",
    estimatedCost: "தோராய செலவு",
    callExpert: "கிசான் உதவி மையத்திற்கு அழைக்கவும்",
    expertHelpline: "கிசான் கால் சென்டர்: 1800-180-1551",
    offlineBanner: "நீங்கள் ஆஃப்லைனில் உள்ளீர்கள்",
  },
  kn: {
    appTitle: "CropDoc (ಬೆಳೆ ಡಾಕ್ಟರ್)",
    appSubtitle: "ಎಐ ಬೆಳೆ ರೋಗ ಪತ್ತೆ ಮತ್ತು ಚಿಕಿತ್ಸೆ",
    tagline: "ರೈತರಿಗೆ ತಕ್ಷಣದ ಎಲೆ ರೋಗ ಪತ್ತೆ ಮತ್ತು ಔಷಧ ಮಾರ್ಗದರ್ಶನ",
    tabScanner: "ಎಲೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    tabHistory: "ಹಿಂದಿನ ದಾಖಲೆ",
    tabSamples: "ಮಾದರಿ ಎಲೆಗಳು",
    uploadPhoto: "ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    takeLivePhoto: "ಕ್ಯಾಮೆರಾದಿಂದ ಫೋಟೋ ತೆಗೆಯಿರಿ",
    dragDropText: "ಎಲೆಯ ಫೋಟೋ ಇಲ್ಲಿ ಹಾಕಿ",
    selectFromGallery: "ಗ್ಯಾಲರಿಯಿಂದ ಆಯ್ಕೆಮಾಡಿ",
    orTrySample: "ಅಥವಾ ಮಾದರಿ ಎಲೆ ಬಳಸಿ",
    analyzingImage: "ಎಲೆ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...",
    analyzingSubtitle: "ಎಐ ಬೆಳೆ ರೋಗದ ಲಕ್ಷಣಗಳನ್ನು ಪತ್ತೆಹಚ್ಚುತ್ತಿದೆ",
    resultsTitle: "ಪರಿಶೀಲನೆ ಫಲಿತಾಂಶ",
    confidence: "ನಿಖರತೆ",
    severity: "ತೀವ್ರತೆ",
    cropDetected: "ಬೆಳೆ",
    symptomsTitle: "ಕಂಡುಬಂದ ಲಕ್ಷಣಗಳು",
    treatmentsTitle: "ಔಷಧ ಮತ್ತು ಚಿಕಿತ್ಸೆ",
    preventionTitle: "ಮುನ್ನೆಚ್ಚರಿಕೆ ಕ್ರಮಗಳು",
    listenAudio: "ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ",
    stopAudio: "ಧ್ವನಿ ನಿಲ್ಲಿಸಿ",
    scanAnother: "ಮತ್ತೊಂದು ಎಲೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    saveToHistory: "ಸಂಗ್ರಹಿಸಿ",
    savedToHistory: "ಸಂಗ್ರಹಿಸಲಾಗಿದೆ",
    shareResult: "ಹಂಚಿಕೊಳ್ಳಿ",
    noHistory: "ಯಾವುದೇ ಇತಿಹಾಸವಿಲ್ಲ.",
    clearHistory: "ಎಲ್ಲವನ್ನೂ ಅಳಿಸಿ",
    searchHistory: "ಹುಡುಕಿ...",
    photoGuideTitle: "ಸ್ಪಷ್ಟ ಫೋಟೋ ತೆಗೆಯುವುದು ಹೇಗೆ",
    photoGuideDesc: "ಬೆಳಕಿನಲ್ಲಿ ಎಲೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋ ತೆಗೆಯಿರಿ.",
    prototypeNotice: "ರೈತರ ಸಹಾಯಕ್ಕಾಗಿ ಎಐ ಮಾರ್ಗದರ್ಶಿ.",
    categoryHealthy: "ಆರೋಗ್ಯಕರ ಬೆಳೆ",
    categoryEarlyBlight: "ಅಗಲ ಎಲೆ ರೋಗ",
    categoryLateBlight: "ಲೇಟ್ ಬ್ಲೈಟ್",
    categoryLeafSpot: "ಎಲೆ ಚುಕ್ಕೆ ರೋಗ",
    categoryPowderyMildew: "ಬೂದಿ ರೋಗ",
    categoryNutrientDeficiency: "ಪೋಷಕಾಂಶ ಕೊರತೆ",
    categoryUnknown: "ಅಸ್ಪಷ್ಟ ಫೋಟೋ",
    flipCamera: "ಕ್ಯಾಮೆರಾ ಬದಲಾಯಿಸಿ",
    capturePhoto: "ಫೋಟೋ ತೆಗೆಯಿರಿ",
    closeCamera: "ಕ್ಯಾಮೆರಾ ಮುಚ್ಚಿ",
    cameraPermissionError: "ಕ್ಯಾಮೆರಾ ಅನುಮತಿ ನೀಡಿ.",
    farmSizeLabel: "ಜಮೀನಿನ ಗಾತ್ರ (ಎಕರೆ)",
    voiceInputLabel: "ಮಾತನಾಡಿ ಲಕ್ಷಣ ಹೇಳಿ",
    voiceListening: "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ...",
    whatsappShare: "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ",
    lowCostOption: "🌱 ಕಡಿಮೆ ವೆಚ್ಚ / ಜೈವಿಕ ಔಷಧ",
    chemicalOption: "🧪 ರಾಸಾಯನಿಕ ಔಷಧ",
    estimatedCost: "ಅಂದಾಜು ವೆಚ್ಚ",
    callExpert: "ಕಿಸಾನ್ ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ",
    expertHelpline: "ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್: 1800-180-1551",
    offlineBanner: "ನೀವು ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿದ್ದೀರಿ",
  },
  or: {
    appTitle: "CropDoc (ଫସଲ ଡାକ୍ତର)",
    appSubtitle: "ଏଆଇ ପତ୍ର ରୋଗ ଚିହ୍ନଟ",
    tagline: "କୃଷକମାନଙ୍କ ପାଇଁ ତୁରନ୍ତ ରୋଗ ଚିହ୍ନଟ ଓ ଚିକିତ୍ସା",
    tabScanner: "ପତ୍ର ସ୍କାନ୍ କରନ୍ତୁ",
    tabHistory: "ପୁରୁଣା ରେକର୍ଡ",
    tabSamples: "ନମୁନା ପତ୍ର",
    uploadPhoto: "ଫୋଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ",
    takeLivePhoto: "କ୍ୟାମେରାରୁ ଫୋଟୋ ଉଠାନ୍ତୁ",
    dragDropText: "ପତ୍ର ଫୋଟୋ ଏଠାରେ ରଖନ୍ତୁ",
    selectFromGallery: "ଗ୍ୟାଲେରୀରୁ ବାଛନ୍ତୁ",
    orTrySample: "କିମ୍ବା ନମୁନା ପତ୍ର ଚେଷ୍ଟା କରନ୍ତୁ",
    analyzingImage: "ପତ୍ର ଯାଞ୍ଚ ହେଉଛି...",
    analyzingSubtitle: "ଏଆଇ ଦ୍ୱାରା ରୋଗ ଚିହ୍ନଟ ଚାଲିଛି",
    resultsTitle: "ଯାଞ୍ଚ ଫଳାଫଳ",
    confidence: "ସଠିକତା",
    severity: "ଗାମ୍ଭୀର୍ଯ୍ୟ",
    cropDetected: "ଫସଲ",
    symptomsTitle: "ଲକ୍ଷଣ",
    treatmentsTitle: "ଚିକିତ୍ସା ଓ ଔଷଧ",
    preventionTitle: "ପୂର୍ବ ସାବଧାନତା",
    listenAudio: "ଶୁଣନ୍ତୁ",
    stopAudio: "ବନ୍ଦ କରନ୍ତୁ",
    scanAnother: "ଅନ୍ୟ ପତ୍ର ସ୍କାନ୍ କରନ୍ତୁ",
    saveToHistory: "ସଞ୍ଚୟ କରନ୍ତୁ",
    savedToHistory: "ସଞ୍ଚିତ ହେଲା",
    shareResult: "ସେୟାର କରନ୍ତୁ",
    noHistory: "କୌଣସି ରେକର୍ଡ ନାହିଁ।",
    clearHistory: "ସବୁ ସଫା କରନ୍ତୁ",
    searchHistory: "ଖୋଜନ୍ତୁ...",
    photoGuideTitle: "ସଫା ଫୋଟୋ କିପରି ଉଠାଇବେ",
    photoGuideDesc: "ଆଲୋକରେ ପତ୍ରର ସଫା ଫୋଟୋ ଉଠାନ୍ତୁ।",
    prototypeNotice: "କୃଷକ ସହାୟତା ପାଇଁ ଏଆଇ ସାଥୀ।",
    categoryHealthy: "ସୁସ୍ଥ ଫସଲ",
    categoryEarlyBlight: "ପ୍ରାରମ୍ଭିକ ଦାଗ ରୋଗ",
    categoryLateBlight: "ବିଳମ୍ବିତ ଦାଗ ରୋଗ",
    categoryLeafSpot: "ପତ୍ର ଦାଗ ରୋଗ",
    categoryPowderyMildew: "ଗୁଣ୍ଡି ରୋଗ",
    categoryNutrientDeficiency: "ପୋଷକ ତତ୍ତ୍ୱ ଅଭାବ",
    categoryUnknown: "ଅସ୍ପଷ୍ଟ ଫୋଟୋ",
    flipCamera: "କ୍ୟାମେରା ବଦଳାନ୍ତୁ",
    capturePhoto: "ଫୋଟୋ ଉଠାନ୍ତୁ",
    closeCamera: "ବନ୍ଦ କରନ୍ତୁ",
    cameraPermissionError: "କ୍ୟାମେରା ଅନୁମତି ଦିଅନ୍ତୁ।",
    farmSizeLabel: "ଜମିର ଆକାର (ଏକର)",
    voiceInputLabel: "କହିକି ଲକ୍ଷଣ କୁହନ୍ତୁ",
    voiceListening: "ଶୁଣୁଛି...",
    whatsappShare: "ହ୍ୱାଟସଆପରେ ସେୟାର କରନ୍ତୁ",
    lowCostOption: "🌱 କମ୍ ଖର୍ଚ୍ଚ / ଜୈବିକ ଉପାୟ",
    chemicalOption: "🧪 ରାସାୟନିକ ଔଷଧ",
    estimatedCost: "ଆନୁମାନିକ ଖର୍ଚ୍ଚ",
    callExpert: "କିଷାନ ହେଲ୍ପଲାଇନକୁ କଲ୍ କରନ୍ତୁ",
    expertHelpline: "କିଷାନ କଲ୍ ସେଣ୍ଟର: 1800-180-1551",
    offlineBanner: "ଆପଣ ଅଫଲାଇନ ଅଛନ୍ତି",
  },
  as: {
    appTitle: "CropDoc (শস্য ডাক্তৰ)",
    appSubtitle: "এআই শস্য ৰোগ চিনাক্তকৰণ",
    tagline: "কৃষকসকলৰ বাবে খৰতকীয়া পাত ৰোগ চিনাক্তকৰণ আৰু চিকিৎসা",
    tabScanner: "পাত স্কেন কৰক",
    tabHistory: "পুৰণি ৰেকৰ্ড",
    tabSamples: "নমুনা পাত",
    uploadPhoto: "ফটো আপলোড কৰক",
    takeLivePhoto: "কেমেৰাৰে ফটো তুলক",
    dragDropText: "পাতৰ ফটো ইয়াতে ৰাখক",
    selectFromGallery: "গেলেৰীৰ পৰা বাছক",
    orTrySample: "বা নমুনা পাত চেষ্টা কৰক",
    analyzingImage: "পাত পৰীক্ষা কৰা হৈছে...",
    analyzingSubtitle: "এআই দ্বাৰা ৰোগ চিনাক্ত কৰা হৈছে",
    resultsTitle: "পৰীক্ষাৰ ফলাফল",
    confidence: "সঠিকতা",
    severity: "গুৰুত্ব",
    cropDetected: "শস্য",
    symptomsTitle: "লক্ষণসমূহ",
    treatmentsTitle: "চিকিৎসা আৰু ঔষধ",
    preventionTitle: "প্ৰতিষেধক ব্যৱস্থা",
    listenAudio: "শুনক",
    stopAudio: "বন্ধ কৰক",
    scanAnother: "আন এটা পাত স্কেন কৰক",
    saveToHistory: "সংৰক্ষণ কৰক",
    savedToHistory: "সংৰক্ষিত",
    shareResult: "শ্বেয়াৰ কৰক",
    noHistory: "কোনো সংৰক্ষিত ৰেকৰ্ড নাই।",
    clearHistory: "সকলো মচি পেলাওক",
    searchHistory: "বিচাৰক...",
    photoGuideTitle: "পৰিষ্কাৰ ফটো কেনেকৈ তুলিব",
    photoGuideDesc: "পোহৰত পাতৰ পৰিষ্কাৰ ফটো তুলক।",
    prototypeNotice: "কৃষকৰ সহায়ৰ বাবে এআই ডক্টৰ।",
    categoryHealthy: "সুস্থ শস্য",
    categoryEarlyBlight: "আগতীয়া ঝুলসা",
    categoryLateBlight: "পছতীয়া ঝুলসা",
    categoryLeafSpot: "পাতৰ দাগ ৰোগ",
    categoryPowderyMildew: "পাউডাৰী মিলডিউ",
    categoryNutrientDeficiency: "পোষক তত্ত্বৰ অভাৱ",
    categoryUnknown: "অস্পষ্ট ফটো",
    flipCamera: "কেমেৰা সলাওক",
    capturePhoto: "ফটো তুলক",
    closeCamera: "বন্ধ কৰক",
    cameraPermissionError: "কেমেৰা অনুমতি দিয়ক।",
    farmSizeLabel: "মাটিৰ পৰিমাণ (একৰ)",
    voiceInputLabel: "কথা কৈ লক্ষণ কওক",
    voiceListening: "শুনি আছো...",
    whatsappShare: "হোৱাটছএপত শ্বেয়াৰ কৰক",
    lowCostOption: "🌱 কম খৰচ / জৈৱিক উপায়",
    chemicalOption: "🧪 ৰাসায়নিক ঔষধ",
    estimatedCost: "আনুমানিক খৰচ",
    callExpert: "কিষাণ হেল্পলাইনলৈ কল কৰক",
    expertHelpline: "কিষাণ কল চেণ্টাৰ: 1800-180-1551",
    offlineBanner: "আপুনি অফলাইনত আছে",
  },
};

// Category localized details fallbacks for in-browser analysis
export const FALLBACK_CATEGORY_DETAILS: Partial<Record<DiseaseCategory, Partial<Record<LanguageCode, {
  diseaseName: string;
  description: string;
  symptoms: string[];
  treatmentSuggestions: string[];
  preventiveMeasures: string[];
}>>>> = {
  Healthy: {
    en: {
      diseaseName: "Healthy Crop Leaf",
      description: "The leaf appears dark green, vibrant, and free from pathogenic spots or fungal mildew.",
      symptoms: ["Uniform green tissue", "Intact leaf veins and margins", "No visible necrotic spots"],
      treatmentSuggestions: [
        "Maintain regular balanced irrigation based on soil moisture.",
        "Apply organic compost or recommended N-P-K fertilizer periodically.",
        "Inspect weekly for early pest or fungal signs."
      ],
      preventiveMeasures: [
        "Ensure proper plant spacing for sunlight and airflow.",
        "Practice crop rotation every season."
      ]
    },
    hi: {
      diseaseName: "स्वस्थ पौधा व पत्ती (Healthy Crop)",
      description: "पत्ती गहरे हरे रंग की, स्वस्थ और किसी भी फंगस या धब्बों से मुक्त दिखाई दे रही है।",
      symptoms: ["समान हरा रंग", "मजबूत नसें और किनारे", "कोई काले/पीले धब्बे नहीं"],
      treatmentSuggestions: [
        "नियमित और संतुलित सिंचाई बनाए रखें।",
        "समय-समय पर जैविक खाद या एनपीके (NPK) खाद डालें।",
        "साप्ताहिक रूप से कीटों की जांच करते रहें।"
      ],
      preventiveMeasures: [
        "पौधों के बीच उचित दूरी बनाकर रखें।",
        "फसल चक्र (Crop Rotation) अपनाएं।"
      ]
    },
    es: {
      diseaseName: "Hoja de Cultivo Sana",
      description: "La hoja muestra un color verde uniforme y está libre de manchas o hongos.",
      symptoms: ["Tejido verde uniforme", "Venas e bordes intactos", "Sin manchas necróticas"],
      treatmentSuggestions: [
        "Mantenga el riego adecuado según la humedad del suelo.",
        "Aplique composta orgánica periódicamente.",
        "Inspeccione semanalmente las plantas."
      ],
      preventiveMeasures: [
        "Asegure buena circulación de aire.",
        "Rotación de cultivos cada temporada."
      ]
    },
    te: {
      diseaseName: "ఆరోగ్యకరమైన ఆకు (Healthy Crop)",
      description: "ఆకు బాగా పచ్చగా ఉంది, ఎలాంటి తెగుళ్ళు లేదా మచ్చలు లేవు.",
      symptoms: ["సమానమైన పచ్చని రంగు", "ఆకు నాడులు బాగున్నాయి", "మచ్చలు లేవు"],
      treatmentSuggestions: [
        "సమయానుకూలంగా తగినంత నీరు అందివ్వండి.",
        "సేంద్రీయ ఎరువులు వేయండి.",
        "వారానికి ఒకసారి పరిశీలించండి."
      ],
      preventiveMeasures: [
        "మొక్కల మధ్య సరైన దూరం ఉంచండి.",
        "పంట మార్పిడి పద్ధతి పాటించండి."
      ]
    },
    mr: {
      diseaseName: "निरोगी पीक आणि पान",
      description: "पान छान हिरवेगार असून त्यावर कोणतेही डाग किंवा बुरशी दिसत नाही.",
      symptoms: ["एकसारखा हिरवा रंग", "सुदृढ शिरा", "कोणतेही डाग नाहीत"],
      treatmentSuggestions: [
        "वेळेवर आणि योग्य प्रमाणात पाणी द्या.",
        "सेंद्रिय खत किंवा एनपीके द्या.",
        "दर आठवड्याला पाहणी करा."
      ],
      preventiveMeasures: [
        "रोपांमध्ये योग्य अंतर ठेवा.",
        "पिकांची फेरपालट करा."
      ]
    },
    pb: {
      diseaseName: "ਤੰਦਰੁਸਤ ਪੌਦਾ (Healthy Crop)",
      description: "ਪੱਤਾ ਬਿਲਕੁਲ ਹਰਾ ਅਤੇ ਤੰਦਰੁਸਤ ਹੈ, ਕੋਈ ਬਿਮਾਰੀ ਨਹੀਂ ਹੈ।",
      symptoms: ["ਹਰਾ ਰੰਗ", "ਕੋਈ ਧੱਬਾ ਨਹੀਂ"],
      treatmentSuggestions: ["ਸਮੇਂ ਸਿਰ ਪਾਣੀ ਦਿਓ।", "ਰੂੜੀ ਦੀ ਖਾਦ ਪਾਓ।"],
      preventiveMeasures: ["ਫ਼ਸਲ ਚੱਕਰ ਅਪਣਾਓ।"]
    },
    bn: {
      diseaseName: "সুস্থ পাতা (Healthy Leaf)",
      description: "পাতাটি সম্পূর্ণ সবুজ এবং কোনো দাগ বা ছত্রাকমুক্ত।",
      symptoms: ["সুন্দর সবুজ রঙ", "কোনো দাগ নেই"],
      treatmentSuggestions: ["নিয়মিত সেচ দিন।", "জৈব সার প্রয়োগ করুন।"],
      preventiveMeasures: ["ফসলের পর্যায়ক্রম অনুসরণ করুন।"]
    },
    gu: {
      diseaseName: "તંદુરસ્ત પાકનું પાંદડું",
      description: "પાંદડું એકદમ લીલું અને સ્વસ્થ છે, કોઈ ડાઘ નથી.",
      symptoms: ["લીલો રંગ", "ડાઘ વગરનું પાંદડું"],
      treatmentSuggestions: ["નિયમિત પાણી આપો.", "દેશી ખાતર નાખો."],
      preventiveMeasures: ["પાકની ફેરબદલી કરો."]
    },
    ta: {
      diseaseName: "ஆரோக்கியமான இலை",
      description: "இலை சீரான பச்சை நிறத்தில் ஆரோக்கியமாக உள்ளது.",
      symptoms: ["சீரான பச்சை நிறம்", "புள்ளிகள் இல்லை"],
      treatmentSuggestions: ["சீரான நீர் பாசனம் செய்யவும்.", "இயற்கை உரம் இடவும்."],
      preventiveMeasures: ["பயிர் சுழற்சி முறையை பின்பற்றவும்."]
    }
  },
  "Early Blight": {
    en: {
      diseaseName: "Early Blight (Alternaria solani)",
      description: "Characterized by brown/black circular lesions with concentric target rings on older leaves, causing yellowing and premature dropping.",
      symptoms: ["Brown spots with target-like rings", "Yellow halo around lesions", "Lower leaves drying out first"],
      treatmentSuggestions: [
        "Prune and safely destroy heavily infected lower leaves.",
        "Apply copper-based fungicide or neem oil spray thoroughly on foliage.",
        "Avoid overhead watering; irrigate near the roots early in the morning."
      ],
      preventiveMeasures: [
        "Mulch soil around plants to block fungal spores in soil from splashing onto leaves.",
        "Practice 3-year crop rotation with non-solanaceous crops."
      ]
    },
    hi: {
      diseaseName: "अगेती झुलसा (Early Blight - Alternaria solani)",
      description: "निचली पत्तियों पर भूरे/काले गोल धब्बे बनते हैं जिनमें गोल छल्ले (Target Rings) दिखाई देते हैं। पत्तियां पीली होकर गिरने लगती हैं।",
      symptoms: ["गोल छल्ले वाले भूरे धब्बे", "धब्बों के आसपास पीला घेरा", "निचली पत्तियां पहले सूखना"],
      treatmentSuggestions: [
        "संक्रमित निचली पत्तियों को तोड़कर खेत से दूर नष्ट कर दें।",
        "कॉपर ऑक्सीक्लोराइड (3 ग्राम/लीटर) या नीम तेल का छिड़काव करें।",
        "पत्तियों पर सीधे पानी छिड़कने से बचें, जड़ों में सिंचाई करें।"
      ],
      preventiveMeasures: [
        "मिट्टी पर पुआल या मल्चिंग बिछाएं ताकि फंगस उड़कर पत्तियों पर न पहुंचे।",
        "हर साल फसल बदलकर बोएं।"
      ]
    },
    es: {
      diseaseName: "Tizón Temprano (Alternaria solani)",
      description: "Lesiones marrones con anillos concéntricos en hojas viejas que causan amarillamiento y caída.",
      symptoms: ["Manchas marrones con anillos", "Halo amarillo", "Hojas inferiores secas"],
      treatmentSuggestions: [
        "Pode y destruya las hojas muy infectadas.",
        "Rocíe fungicida a base de cobre o aceite de neem.",
        "Evite el riego por aspersión sobre las hojas."
      ],
      preventiveMeasures: [
        "Alique acolchado (mulch) alrededor de las plantas.",
        "Rotación de cultivos cada 3 años."
      ]
    },
    te: {
      diseaseName: "తొందర మచ్చ తెగులు (Early Blight)",
      description: "ఆకులపై గుండ్రటి గోధుమ రంగు మచ్చలు వలయాలుగా కనిపిస్తాయి. ఆకులు పసుపు రంగులోకి మారి రాలిపోతాయి.",
      symptoms: ["వలయాల గోధుమ మచ్చలు", "మచ్చ చుట్టూ పసుపు రంగు", "కింది ఆకులు ఎండిపోవడం"],
      treatmentSuggestions: [
        "వ్యాధి సోకిన కింది ఆకులను తొలగించి కాల్చివేయండి.",
        "కాపర్ ఆక్సీక్లోరైడ్ లేదా వేప నూనె స్ప్రే చేయండి.",
        "ఆకులపై పడకుండా మొదళ్లలో నీరు పెట్టండి."
      ],
      preventiveMeasures: [
        "మొక్కల చుట్టూ మల్చింగ్ వాడండి.",
        "పంట మార్పిడి చేయండి."
      ]
    },
    mr: {
      diseaseName: "अगेती करपा रोग (Early Blight)",
      description: "खालच्या पानांवर चक्राकार कडे असलेले तपकिरी डाग पडतात. पाने पिवळी पडून गळतात.",
      symptoms: ["चक्राकार तपकिरी डाग", "डागांभोवती पिवळसरपणा", "खालची पाने सुकणे"],
      treatmentSuggestions: [
        "बाधित पाने तोडून नष्ट करा.",
        "कॉपर ऑक्सिक्लोराईड किंवा कडुनिंब तेलाची फवारणी करा.",
        "झाडाच्या मुळांशी पाणी द्या."
      ],
      preventiveMeasures: [
        "मातीवर आच्छादन (Mulching) करा.",
        "पिकांची फेरपालट करा."
      ]
    },
    pb: {
      diseaseName: "ਅਗੇਤਾ ਝੁਲਸ ਰੋਗ (Early Blight)",
      description: "ਪੱਤਿਆਂ 'ਤੇ ਭੂਰੇ ਗੋਲ ਧੱਬੇ ਬਣਦੇ ਹਨ। ਪੱਤੇ ਪੀਲੇ ਹੋ ਕੇ ਡਿੱਗਣ ਲੱਗਦੇ ਹਨ।",
      symptoms: ["ਗੋਲ ਭੂਰੇ ਧੱਬੇ", "ਪੱਤੇ ਪੀਲੇ ਹੋਣਾ"],
      treatmentSuggestions: [
        "ਬਿਮਾਰ ਪੱਤੇ ਤੋੜ ਕੇ ਨਸ਼ਟ ਕਰੋ।",
        "ਕਾਪਰ ਆਕਸੀਕਲੋਰਾਈਡ ਦਾ ਸਪਰੇਅ ਕਰੋ।"
      ],
      preventiveMeasures: ["ਫ਼ਸਲ ਚੱਕਰ ਅਪਣਾਓ।"]
    },
    bn: {
      diseaseName: "আগম ধসা রোগ (Early Blight)",
      description: "পাতায় বাদামী রঙের গোল দাগ দেখা যায় এবং পাতা হলুদ হয়ে ঝরে পড়ে।",
      symptoms: ["বাদামী গোল দাগ", "পাতা হলুদ হওয়া"],
      treatmentSuggestions: [
        "আক্রান্ত পাতা ছিঁড়ে ফেলে দিন।",
        "কপার ফাঙ্গিসাইড বা নিম তেল স্প্রে করুন।"
      ],
      preventiveMeasures: ["মালচিং ব্যবহার করুন।"]
    },
    gu: {
      diseaseName: "અગેતરો સુકારો (Early Blight)",
      description: "પાંદડા પર ગોળ કથ્થાઈ ડાઘા પડે છે અને પાંદડાં પીળાં પડીને ખરી પડે છે.",
      symptoms: ["કથ્થાઈ ગોળ ડાઘા", "પાંદડા પીળા થવા"],
      treatmentSuggestions: [
        "રોગિષ્ટ પાંદડા તોડીને નાશ કરો.",
        "કોપર ઓક્સીક્લોરાઇડ છાંટો."
      ],
      preventiveMeasures: ["પાકની ફેરબદલી કરો."]
    },
    ta: {
      diseaseName: "முன் கருகல் நோய் (Early Blight)",
      description: "இலைகளில் வட்ட வடிவ பழுப்பு புள்ளிகள் தோன்றி இலைகள் உதிர்கின்றன.",
      symptoms: ["பழுப்பு வட்ட புள்ளிகள்", "இலைகள் மஞ்சள் நிறமாதல்"],
      treatmentSuggestions: [
        "பாதிக்கப்பட்ட இலைகளை அகற்றி அழிக்கவும்.",
        "காப்பர் பூஞ்சானக்கொல்லி தெளிக்கவும்."
      ],
      preventiveMeasures: ["பயிர் சுழற்சி செய்யவும்."]
    }
  },
  "Late Blight": {
    en: {
      diseaseName: "Late Blight (Phytophthora infestans)",
      description: "Rapidly expanding water-soaked dark gray/black lesions with white fungal downy growth under moist conditions. Highly destructive.",
      symptoms: ["Irregular dark water-soaked spots", "White fuzzy mold on leaf undersides", "Rapid leaf wilting and stem blackening"],
      treatmentSuggestions: [
        "Immediately destroy heavily infected plants to stop rapid field spread.",
        "Spray systemic fungicides like Metalaxyl + Mancozeb or Cymoxanil promptly.",
        "Keep canopy dry and improve aeration between crop rows."
      ],
      preventiveMeasures: [
        "Use certified disease-free seeds and resistant varieties.",
        "Avoid high humidity and waterlogging in the field."
      ]
    },
    hi: {
      diseaseName: "पछेती झुलसा (Late Blight - Phytophthora infestans)",
      description: "पत्तियों पर पानी से भीगे हुए काले/गहरे धब्बे बनते हैं और नमी में निचली सतह पर सफेद फफूंद दिखती है। यह फसल को बहुत तेजी से नष्ट करती है।",
      symptoms: ["पानी जैसे गहरे काले धब्बे", "पत्ती के पीछे सफेद फफूंद", "तना काला पड़ना और तेजी से सूखना"],
      treatmentSuggestions: [
        "ज्यादा संक्रमित पौधों को तुरंत उखाड़कर नष्ट कर दें।",
        "मेटालेक्सिल + मैंकोज़ेब (2 ग्राम/लीटर) या सिमोक्सानिल का तुरंत छिड़काव करें।",
        "खेत में जलभराव न होने दें और हवा का आवागमन बनाए रखें।"
      ],
      preventiveMeasures: [
        "केवल स्वस्थ बीज व प्रतिरोधी किस्मों का ही चयन करें।",
        "खेत में नमी बहुत ज्यादा न बढ़ने दें।"
      ]
    },
    es: {
      diseaseName: "Tizón Tardío (Phytophthora infestans)",
      description: "Manchas oscuras húmedas con moho blanco en el envés. Destruye cultivos rápidamente.",
      symptoms: ["Manchas oscuras acuosas", "Moho blanco debajo", "Marchitamiento rápido"],
      treatmentSuggestions: [
        "Destruya plantas muy infectadas inmediatamente.",
        "Rocíe fungicidas con Metalaxil o Mancozeb.",
        "Mejore el drenaje y flujo de aire."
      ],
      preventiveMeasures: [
        "Use semillas certificadas resistentes.",
        "Evite el exceso de humedad."
      ]
    },
    te: {
      diseaseName: "లేట్ బ్లైట్ తెగులు (Late Blight)",
      description: "ఆకులపై నల్లటి తడి మచ్చలు ఏర్పడి ఆకు కింద తెల్లటి బూజు వస్తుంది. పంటను త్వరగా నాశనం చేస్తుంది.",
      symptoms: ["నల్లటి తడి మచ్చలు", "ఆకు కింద తెల్లటి బూజు", "మొక్క త్వరగా ఎండిపోవడం"],
      treatmentSuggestions: [
        "ఎక్కువగా సోకిన మొక్కలను పీకి నాశనం చేయండి.",
        "మెటలాక్సిల్ + మ్యాంకోజెబ్ స్ప్రే చేయండి.",
        "పొలంలో నీరు నిలవకుండా చూడండి."
      ],
      preventiveMeasures: [
        "ఆరోగ్యకరమైన విత్తనాలను వాడండి.",
        "అధిక తేమ లేకుండా చూడండి."
      ]
    },
    mr: {
      diseaseName: "पछेती करपा (Late Blight)",
      description: "पानांवर काळे पाणथळ डाग पडतात आणि पानाखाली पांढरी बुरशी येते. हा रोग पीक वेगाने नष्ट करतो.",
      symptoms: ["काळे पाणथळ डाग", "पानाखाली पांढरी बुरशी", "झाड वेगाने वाळणे"],
      treatmentSuggestions: [
        "ज्यादा बाधित झाडे उपटून नष्ट करा.",
        "मेटालेक्सिल + मँकोझेब फवारा.",
        "शेतात पाणी साचू देऊ नका."
      ],
      preventiveMeasures: [
        "निरोगी बियाणे वापरा.",
        "हवा खेळती ठेवा."
      ]
    },
    pb: {
      diseaseName: "ਪਛੇਤਾ ਝੁਲਸ ਰੋਗ (Late Blight)",
      description: "ਪੱਤਿਆਂ 'ਤੇ ਕਾਲੇ ਗਿੱਲੇ ਧੱਬੇ ਬਣਦੇ ਹਨ। ਫ਼ਸਲ ਬਹੁਤ ਤੇਜ਼ੀ ਨਾਲ ਸੁੱਕਦੀ ਹੈ।",
      symptoms: ["ਕਾਲੇ ਗਿੱਲੇ ਧੱਬੇ", "ਪੱਤੇ ਸੁੱਕਣਾ"],
      treatmentSuggestions: ["ਮੈਟਾਲੈਕਸਿਲ + ਮੈਨਕੋਜ਼ੈਬ ਦਾ ਸਪਰੇਅ ਕਰੋ।"],
      preventiveMeasures: ["ਖੇਤ ਵਿੱਚ ਪਾਣੀ ਨਾ ਖੜ੍ਹਨ ਦਿਓ।"]
    },
    bn: {
      diseaseName: "নাবি ধসা রোগ (Late Blight)",
      description: "পাতায় কালো ভেজা দাগ হয় এবং নিচে সাদা ছত্রাক দেখা যায়।",
      symptoms: ["কালো ভেজা দাগ", "সাদা ছত্রাক"],
      treatmentSuggestions: ["মেটাল্যাক্সিল ফাঙ্গিসাইড স্প্রে করুন।"],
      preventiveMeasures: ["জল নিষ্কাশন ভালো রাখুন।"]
    },
    gu: {
      diseaseName: "પછેતરો સુકારો (Late Blight)",
      description: "પાંદડા પર કાળા ભીના ડાઘા પડે છે અને પાકની સુકાઈ જવાની ગતિ ઝડપી હોય છે.",
      symptoms: ["કાળા ભીના ડાઘા", "ઝડપથી સુકાવું"],
      treatmentSuggestions: ["મેટાલેક્સિલ + મેન્કોઝેબનો છંટકાવ કરો."],
      preventiveMeasures: ["ખેતરમાં પાણી ભરાવા ન દો."]
    },
    ta: {
      diseaseName: "பின் கருகல் நோய் (Late Blight)",
      description: "இலைகளில் கருமை நிற ஈரமான புள்ளிகள் தோன்றும். பயிர் வேகமாக கருகும்.",
      symptoms: ["கருப்பு ஈரப் புள்ளிகள்", "வேகமாக கழுகுதல்"],
      treatmentSuggestions: ["மெட்டாலாக்சில் + மேன்கோசெப் தெளிக்கவும்."],
      preventiveMeasures: ["நீர் தேங்காமல் பார்த்துக்கொள்ளவும்."]
    }
  },
  "Leaf Spot": {
    en: {
      diseaseName: "Fungal Leaf Spot (Cercospora / Septoria)",
      description: "Small angular or round yellow, purple, or gray lesions with dark borders scattered across the leaf blade.",
      symptoms: ["Multiple small dots or spots", "Dark purple/brown margins", "Shot-hole perforated appearance"],
      treatmentSuggestions: [
        "Remove heavily spotted leaves before spores spread.",
        "Apply Chlorothalonil, Mancozeb, or neem extract spray.",
        "Maintain good weed control around crop rows."
      ],
      preventiveMeasures: [
        "Avoid working in fields when plants are wet.",
        "Destroy crop residues after harvest."
      ]
    },
    hi: {
      diseaseName: "पत्ती धब्बा रोग (Fungal Leaf Spot)",
      description: "पत्तियों पर छोटे-छोटे भूरे, लाल या गहरे रंग के धब्बे बनते हैं। धीरे-धीरे पत्तियां कमजोर होकर सूखने लगती हैं।",
      symptoms: ["छोटे-छोटे भूरे/लाल धब्बे", "धब्बों का किनारा गहरा होना", "पत्तियों में छेद होना"],
      treatmentSuggestions: [
        "अधिक धब्बों वाली पत्तियों को तोड़कर हटा दें।",
        "मैंकोज़ेब (2.5 ग्राम/लीटर) या नीम के घोल का छिड़काव करें।",
        "खेत के आसपास खरपतवार साफ रखें।"
      ],
      preventiveMeasures: [
        "जब पत्तियां गीली हों तब खेत में काम न करें।",
        "कटाई के बाद अवशेषों को नष्ट कर दें।"
      ]
    },
    es: {
      diseaseName: "Mancha Foliar (Cercospora / Septoria)",
      description: "Manchas pequeñas amarillas o marrones dispersas con bordes oscuros.",
      symptoms: ["Puntos pequeños múltiples", "Bordes oscuros", "Perforaciones"],
      treatmentSuggestions: [
        "Elimine las hojas manchadas.",
        "Rocíe Clorotalonil o extracto de neem.",
        "Controle las malas hierbas."
      ],
      preventiveMeasures: [
        "No trabaje en el campo cuando las plantas estén mojadas.",
        "Elimine los restos de cultivo."
      ]
    },
    te: {
      diseaseName: "ఆకుమచ్చ తెగులు (Leaf Spot)",
      description: "ఆకులపై చిన్న చిన్న గోధుమ వర్ణ మచ్చలు ఏర్పడతాయి.",
      symptoms: ["చిన్న గోధుమ మచ్చలు", "ఆకులు రంధ్రాలు పడటం"],
      treatmentSuggestions: [
        "మచ్చలున్న ఆకులను తీసివేయండి.",
        "మ్యాంకోజెబ్ లేదా వేప కాషాయం పిచికారీ చేయండి."
      ],
      preventiveMeasures: ["కలుపు మొక్కలను నివారించండి."]
    },
    mr: {
      diseaseName: "पानावरील ठिपके (Leaf Spot)",
      description: "पानांवर लहान लहान तपकिरी किंवा लाल रंगाचे ठिपके पडतात.",
      symptoms: ["बारीक तपकिरी ठिपके", "पानांना छिद्रे पडणे"],
      treatmentSuggestions: [
        "डाग असलेली पाने तोडा.",
        "मँकोझेब किंवा कडुनिंब अर्काची फवारणी करा."
      ],
      preventiveMeasures: ["तण मुक्त शेत ठेवा."]
    },
    pb: {
      diseaseName: "ਪੱਤਿਆਂ 'ਤੇ ਧੱਬੇ (Leaf Spot)",
      description: "ਪੱਤਿਆਂ 'ਤੇ ਛੋਟੇ-ਛੋਟੇ ਭੂਰੇ ਧੱਬੇ ਬਣਦੇ ਹਨ।",
      symptoms: ["ਛੋਟੇ ਭੂਰੇ ਧੱਬੇ"],
      treatmentSuggestions: ["ਮੈਨਕੋਜ਼ੈਬ ਦਾ ਸਪਰੇਅ ਕਰੋ।"],
      preventiveMeasures: ["ਨਦੀਨ ਨਸ਼ਟ ਕਰੋ।"]
    },
    bn: {
      diseaseName: "পাতার দাগ রোগ (Leaf Spot)",
      description: " পাতায় ছোট ছোট বাদামী দাগ পড়ে।",
      symptoms: ["ছোট বাদামী দাগ"],
      treatmentSuggestions: ["ম্যানকোজেব স্প্রে করুন।"],
      preventiveMeasures: ["আগাছা পরিষ্কার রাখুন।"]
    },
    gu: {
      diseaseName: "પાનના ટપકાંનો રોગ (Leaf Spot)",
      description: "પાંદડા પર નાના કથ્થાઈ ટપકાં પડે છે.",
      symptoms: ["નાના કથ્થાઈ ટપકાં"],
      treatmentSuggestions: ["મેન્કોઝેબનો છંટકાવ કરો."],
      preventiveMeasures: ["ખેતર નીંદણ મુક્ત રાખો."]
    },
    ta: {
      diseaseName: "இலைப்புள்ளி நோய் (Leaf Spot)",
      description: "இலைகளில் சிறிய பழுப்பு புள்ளிகள் தோன்றும்.",
      symptoms: ["சிறிய பழுப்பு புள்ளிகள்"],
      treatmentSuggestions: ["மேன்கோசெப் தெளிக்கவும்."],
      preventiveMeasures: ["களைகளை அகற்றவும்."]
    }
  },
  "Powdery Mildew": {
    en: {
      diseaseName: "Powdery Mildew (Erysiphe / Podosphaera)",
      description: "White or grayish talcum powder-like fungal patches covering the upper or lower leaf surface, causing curling and stunted growth.",
      symptoms: ["White flour-like dusty coating", "Leaf distortion and crispiness", "Early leaf yellowing and drop"],
      treatmentSuggestions: [
        "Spray sulfur dust or wettable sulfur (2-3g/liter) evenly.",
        "Use a potassium bicarbonate or neem oil organic formulation.",
        "Thin foliage to increase sunlight penetration."
      ],
      preventiveMeasures: [
        "Avoid shady, overcrowded growing spots.",
        "Water early in the day."
      ]
    },
    hi: {
      diseaseName: "सफेद चूर्णी रोग / भुरी (Powdery Mildew)",
      description: "पत्तियों की सतह पर सफेद पाउडर या आटा छिड़के जाने जैसी फफूंद जम जाती है। पत्तियां मुड़ने और सूखने लगती हैं।",
      symptoms: ["सफेद पाउडर जैसा परत", "पत्तियों का मुड़ना और सूखना", "विकास रुक जाना"],
      treatmentSuggestions: [
        "घुलनशील सल्फर (Wettable Sulfur 2-3 ग्राम/लीटर) का छिड़काव करें।",
        "नीम के तेल या बेकिंग सोडा (1 चम्मच/लीटर पानी) का घोल छिड़कें।",
        "हवा और धूप के लिए घनी टहनियों की छंटाई करें।"
      ],
      preventiveMeasures: [
        "पौधों को बहुत छायादार या घनी जगह पर न लगाएं।",
        "सुबह के समय ही सिंचाई करें।"
      ]
    },
    es: {
      diseaseName: "Oídio / Cenicilla (Powdery Mildew)",
      description: "Capa blanca similar a polvo en las hojas que causa deformación.",
      symptoms: ["Polvo blanco en hojas", "Hojas enrolladas", "Crecimiento deficiente"],
      treatmentSuggestions: [
        "Rocíe azufre humectable o aceite de neem.",
        "Use bicarbonato de potasio diluido.",
        "Mejore la aireación."
      ],
      preventiveMeasures: [
        "Evite lugares sombreados y congestionados."
      ]
    },
    te: {
      diseaseName: "బూడిద తెగులు (Powdery Mildew)",
      description: "ఆకులపై తెల్లటి పొడి చల్లినట్లు బూజు పడుతుంది.",
      symptoms: ["తెల్లటి పొడి పౌడర్ వలే ఉండటం", "ఆకులు ముడుచుకుపోవడం"],
      treatmentSuggestions: [
        "సల్ఫర్ మందు లేదా వేప నూనె స్ప్రే చేయండి.",
        "బేకింగ్ సోడా నీటిలో కలిపి చల్లండి."
      ],
      preventiveMeasures: ["ఎండ సరిగ్గా తగిలేలా చూడండి."]
    },
    mr: {
      diseaseName: "भुई / भुरी रोग (Powdery Mildew)",
      description: "पानांवर पांढरा पावडरसारखा थर साचतो. पाने सुकतात.",
      symptoms: ["पांढरी पावडर साचणे", "पाने गुंडाळणे"],
      treatmentSuggestions: [
        "विद्राव्य गंधक (Sulfur) फवारा.",
        "कडुनिंब तेल किंवा बेकिंग सोड्याचे पाणी फवारा."
      ],
      preventiveMeasures: ["भरपूर सूर्यप्रकाश मिळेल याची काळजी घ्या."]
    },
    pb: {
      diseaseName: "ਚਿੱਟਾ ਪਾਊਡਰ ਰੋਗ (Powdery Mildew)",
      description: "ਪੱਤਿਆਂ 'ਤੇ ਚਿੱਟਾ ਪਾਊਡਰ ਜਮ੍ਹਾਂ ਹੋ ਜਾਂਦਾ ਹੈ।",
      symptoms: ["ਚਿੱਟਾ ਪਾਊਡਰ layer"],
      treatmentSuggestions: ["ਸਲਫਰ ਦਾ ਸਪਰੇਅ ਕਰੋ।"],
      preventiveMeasures: ["ਧੁੱਪ ਯਕੀਨੀ ਬਣਾਓ।"]
    },
    bn: {
      diseaseName: "পাউডারি মিলডিউ (Powdery Mildew)",
      description: "পাতায় সাদা পাউডারের মতো আবরণ তৈরি হয়।",
      symptoms: ["সাদা পাউডার লেয়ার"],
      treatmentSuggestions: ["সালফার ফাঙ্গিসাইড স্প্রে করুন।"],
      preventiveMeasures: ["সূর্যালোকের ব্যবস্থা রাখুন।"]
    },
    gu: {
      diseaseName: "ભૂકી છારો (Powdery Mildew)",
      description: "પાંદડા પર સફેદ પાવડર જેવી ફૂગ જામી જાય છે.",
      symptoms: ["સફેદા પાવડર"],
      treatmentSuggestions: ["સલ્ફરનો છંટકાવ કરો."],
      preventiveMeasures: ["તડકો પૂરો મળે તેમ રાખો."]
    },
    ta: {
      diseaseName: "சாம்பல் நோய் (Powdery Mildew)",
      description: "இலைகளில் வெள்ளை பவுடர் போன்ற படலம் தோன்றும்.",
      symptoms: ["வெள்ளை பவுடர் படலம்"],
      treatmentSuggestions: ["சல்பர் மருந்து தெளிக்கவும்."],
      preventiveMeasures: ["சூரிய ஒளி படுமாறு வைக்கவும்."]
    }
  },
  "Nutrient Deficiency": {
    en: {
      diseaseName: "Nutrient Deficiency (Nitrogen / Potassium Chlorosis)",
      description: "Yellowing of leaf blade (interveinal or tip yellowing) caused by inadequate essential nutrients in soil, restricted root absorption, or incorrect pH.",
      symptoms: ["Pale yellow leaves with green veins", "Brown scorching on leaf tips/edges", "Slender stem growth"],
      treatmentSuggestions: [
        "Apply well-decomposed farmyard manure or vermicompost around root zone.",
        "Apply balanced N-P-K (19-19-19) or micronutrient foliar spray.",
        "Check soil drainage and avoid excess waterlogging."
      ],
      preventiveMeasures: [
        "Conduct soil health card testing every 2 years.",
        "Maintain adequate organic carbon in soil."
      ]
    },
    hi: {
      diseaseName: "पोषक तत्वों की कमी / पीलापन (Nutrient Deficiency)",
      description: "नाइट्रोजन, जिंक या आयरन की कमी से पत्तियां पीली पड़ जाती हैं। नसें हरी रह सकती हैं या किनारे झुलस सकते हैं।",
      symptoms: ["पत्तियों का पीला पड़ना", "किनारों पर भूरापन/झुलसन", "पौधे का धीमा विकास"],
      treatmentSuggestions: [
        "अच्छी तरह सड़ी हुई गोबर की खाद या वर्मीकंपोस्ट डालें।",
        "एनपीके (19:19:19) या माइक्रोन्यूट्रिएंट (सूक्ष्म पोषक तत्व) का छिड़काव करें।",
        "मिट्टी में नमी का सही स्तर रखें, पानी न रुकने दें।"
      ],
      preventiveMeasures: [
        "मिट्टी की जांच (Soil Health Test) जरूर करवाएं।",
        "जैविक खाद का प्रयोग बढ़ाएं।"
      ]
    },
    es: {
      diseaseName: "Deficiencia de Nutrientes (Clorosis)",
      description: "Amarillamiento de las hojas por falta de nitrógeno, hierro o potasio.",
      symptoms: ["Hojas amarillas", "Bordes quemados", "Crecimiento lento"],
      treatmentSuggestions: [
        "Aplique compost o estiércol maduro.",
        "Rocíe fertilizante foliar N-P-K o micronutrientes.",
        "Asegure un buen drenaje."
      ],
      preventiveMeasures: [
        "Realice análisis de suelo periódicos."
      ]
    },
    te: {
      diseaseName: "పోషకాల లోపం (Nutrient Deficiency)",
      description: "నత్రజని లేదా ఇనుము లోపం వల్ల ఆకులు పసుపు రంగులోకి మారతాయి.",
      symptoms: ["ఆకులు పసుపుపచ్చగా మారడం", "మొక్క ఎదుగుదల తగ్గడం"],
      treatmentSuggestions: [
        "పశువుల ఎరువు లేదా వర్మీ కంపోస్ట్ వేయండి.",
        "19-19-19 NPK లేదా సూక్ష్మ పోషకాలు పిచికారీ చేయండి."
      ],
      preventiveMeasures: ["నేల పరీక్ష చేయించండి."]
    },
    mr: {
      diseaseName: "पोषक द्रव्यांची कमतरता (Yellowing)",
      description: "अन्नद्रव्यांच्या अभावामुळे पाने पिवळी पडतात.",
      symptoms: ["पाने पिवळी पडणे", "वाढ खुंटणे"],
      treatmentSuggestions: [
        "शेणखत किंवा गांडूळ खत द्या.",
        "19:19:19 सूक्ष्म अन्नद्रव्ये फवारा."
      ],
      preventiveMeasures: ["माती परीक्षण करून घ्या."]
    },
    pb: {
      diseaseName: "ਖੁਰਾਕੀ ਤੱਤਾਂ ਦੀ ਘਾਟ (Nutrient Deficiency)",
      description: "ਤੱਤਾਂ ਦੀ ਘਾਟ ਕਾਰਨ ਪੱਤੇ ਪੀਲੇ ਪੈ ਜਾਂਦੇ ਹਨ।",
      symptoms: ["ਪੱਤੇ ਪੀਲੇ ਹੋਣਾ"],
      treatmentSuggestions: ["ਰੂੜੀ ਖਾਦ ਅਤੇ NPK ਦਾ ਛਿੜਕਾਅ ਕਰੋ।"],
      preventiveMeasures: ["ਮਿੱਟੀ ਦੀ ਜਾਂਚ ਕਰਵਾਓ।"]
    },
    bn: {
      diseaseName: "পুষ্টির ঘাটতি (Nutrient Deficiency)",
      description: "নাইট্রোজেন বা অনুখাদ্যের অভাবে পাতা হলুদ হয়ে যায়।",
      symptoms: ["পাতা হলুদ হওয়া"],
      treatmentSuggestions: ["জৈব সার ও অনুখাদ্য স্প্রে করুন।"],
      preventiveMeasures: ["মাটি পরীক্ষা করান।"]
    },
    gu: {
      diseaseName: "પોષક તત્વોની ઉણપ (Yellowing)",
      description: "તત્વોની ખાતરી વગર પાંદડા પીળા પડી જાય છે.",
      symptoms: ["પાંદડા પીળા પડવા"],
      treatmentSuggestions: ["દેશી ખાતર અને NPK ખાતર નાખો."],
      preventiveMeasures: ["જમીન પરીક્ષણ કરાવો."]
    },
    ta: {
      diseaseName: "ஊட்டச்சத்து குறைபாடு",
      description: "சத்து குறைபாட்டால் இலைகள் மஞ்சள் நிறமாக மாறும்.",
      symptoms: ["இலைகள் மஞ்சள் நிறமாதல்"],
      treatmentSuggestions: ["இயற்கை உரம் மற்றும் NPK தெளிக்கவும்."],
      preventiveMeasures: ["மண் பரிசோதனை செய்யவும்."]
    }
  },
  "Unknown/Unclear": {
    en: {
      diseaseName: "Unclear or Non-Leaf Image",
      description: "The image is either too blurry, shadowed, or does not clearly show a single crop leaf.",
      symptoms: ["Image out of focus", "Multiple overlapping items", "Insufficient light"],
      treatmentSuggestions: [
        "Retake photo under bright natural daylight.",
        "Place a single leaf against a neutral background (hand, paper, or soil).",
        "Ensure camera focus is sharp on the damaged leaf section."
      ],
      preventiveMeasures: [
        "Hold phone steady while taking the photo."
      ]
    },
    hi: {
      diseaseName: "अस्पष्ट या अज्ञात फोटो (Unclear Image)",
      description: "फोटो बहुत धुंधली है या इसमें पौधे की पत्ती स्पष्ट नहीं दिख रही है।",
      symptoms: ["फोटो में धुंधलापन", "रोशनी कम होना", "पत्ती सही न दिखना"],
      treatmentSuggestions: [
        "अच्छी धूप में पत्ती की साफ फोटो दोबारा लें।",
        "पत्ती को अपने हाथ या सफेद कागज पर रखकर फोटो खींचें।",
        "कैमरे का फोकस पत्ती के धब्बों पर रखें।"
      ],
      preventiveMeasures: [
        "फोटो लेते समय हाथ को स्थिर रखें।"
      ]
    },
    es: {
      diseaseName: "Imagen No Clara o Desconocida",
      description: "La imagen está borrosa o no muestra claramente una hoja de planta.",
      symptoms: ["Fuera de foco", "Poca luz"],
      treatmentSuggestions: [
        "Tome la foto con buena luz natural.",
        "Coloque la hoja sobre un fondo limpio."
      ],
      preventiveMeasures: ["Sostenga el teléfono con firmeza."]
    },
    te: {
      diseaseName: "అస్పష్టమైన ఫోటో (Unclear Image)",
      description: "ఫోటో మసకగా ఉంది లేదా ఆకు సరిగ్గా కనిపించడం లేదు.",
      symptoms: ["మసకగా ఉండటం"],
      treatmentSuggestions: ["మంచి వెలుతురులో మళ్లీ ఫోటో తీయండి."],
      preventiveMeasures: ["కెమెరాను స్థిరంగా ఉంచండి."]
    },
    mr: {
      diseaseName: "अस्पष्ट फोटो",
      description: "फोटो अस्पष्ट आहे किंवा पान नीट दिसत नाही.",
      symptoms: ["अस्पष्टता"],
      treatmentSuggestions: ["उजेडात पुन्हा फोटो काढा."],
      preventiveMeasures: ["कॅमेरा स्थिर ठेवा."]
    },
    pb: {
      diseaseName: "ਅਸਪਸ਼ਟ ਫੋਟੋ",
      description: "ਫੋਟੋ ਸਾਫ਼ ਨਹੀਂ ਹੈ।",
      symptoms: ["ਧੁੰਦਲਾਪਣ"],
      treatmentSuggestions: ["ਚੰਗੀ ਧੁੱਪ ਵਿੱਚ ਦੁਬਾਰਾ ਫੋਟੋ ਲਵੋ।"],
      preventiveMeasures: ["ਕੈਮਰਾ ਹਿਲਾਓ ਨਾ।"]
    },
    bn: {
      diseaseName: "অস্পষ্ট ছবি",
      description: "ছবিটি স্পষ্ট নয় বা পাতা বোঝা যাচ্ছে না।",
      symptoms: ["ঝাপসা ছবি"],
      treatmentSuggestions: ["আলোতে নতুন ছবি তুলুন।"],
      preventiveMeasures: ["ক্যামেরা স্থির রাখুন।"]
    },
    gu: {
      diseaseName: "અસ્પષ્ટ ફોટો",
      description: "ફોટો સ્પષ્ટ નથી.",
      symptoms: ["ઝાંખો ફોટો"],
      treatmentSuggestions: ["અજવાળામાં ફરીથી ફોટો લો."],
      preventiveMeasures: ["કેમેરો સ્થિર રાખો."]
    },
    ta: {
      diseaseName: "தெளிவற்ற படம்",
      description: "படம் தெளிவாக இல்லை.",
      symptoms: ["மங்கலான படம்"],
      treatmentSuggestions: ["வெளிச்சத்தில் மீண்டும் படம் எடுக்கவும்."],
      preventiveMeasures: ["கேமராவை நிலையாக வைக்கவும்."]
    }
  }
};
