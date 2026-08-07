import React, { useState, useEffect, useRef } from "react";
import { ChatMessage, LanguageCode } from "../types";
import { UI_TRANSLATIONS } from "../data/translations";
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Bot,
  User,
  Image as ImageIcon,
  Loader2,
  Sparkles,
  HelpCircle,
  RefreshCw
} from "lucide-react";

interface AgriChatbotProps {
  currentLang: LanguageCode;
}

const QUICK_QUESTIONS: Record<string, string[]> = {
  en: [
    "How do I treat Late Blight on Tomatoes organically?",
    "What is the recommended fertilizer schedule for Wheat?",
    "Am I eligible for the PM-KISAN ₹6,000 subsidy?",
    "How to control Aphids and Whiteflies naturally?"
  ],
  hi: [
    "टमाटर में अगेती/पछेती झुलसा का जैविक इलाज क्या है?",
    "गेहूं फसल के लिए खाद व उर्वरक की सही मात्रा क्या है?",
    "पीएम-किसान योजना के लिए पात्रता की जांच कैसे करें?",
    "फसल में कीट नियंत्रण के आसान देसी उपाय बताएं"
  ],
  te: [
    "టమోటాలో లేట్ బ్లైట్ నివారణకు సేంద్రీయ పద్ధతులు ఏవి?",
    "వరి పంటకు ఎరువుల మోతాదు మరియు సమయం చెప్పండి",
    "పిఎమ్ కిసాన్ పథకానికి అర్హతలు ఏమిటి?",
    "పురుగుల నివారణకు సహజ కాషాయాలు ఎలా తయారు చేయాలి?"
  ]
};

export const AgriChatbot: React.FC<AgriChatbotProps> = ({ currentLang }) => {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: "1",
        sender: "bot",
        text: currentLang === "hi"
          ? "नमस्ते किसान भाई! मैं आपका CropDoc AI कृषि सलाहकार हूँ। आप मुझसे फसल की बीमारी, खाद की मात्रा, मौसम की जानकारी या सरकारी योजनाओं के बारे में पूछ सकते हैं।"
          : "Hello Farmer! I am your CropDoc AI Agricultural Consultant. Ask me anything about crop diseases, fertilizers, market prices, or government schemes.",
        timestamp: Date.now(),
        suggestedQuestions: QUICK_QUESTIONS[currentLang] || QUICK_QUESTIONS.en
      }
    ];
  });

  const [inputMessage, setInputMessage] = useState("");
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Speech Recognition (Speech-to-Text)
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Voice input is not supported in this browser. Please type your query.");
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      const langMap: Record<string, string> = {
        en: "en-IN",
        hi: "hi-IN",
        te: "te-IN",
        mr: "mr-IN",
        pb: "pa-IN",
        bn: "bn-IN",
        gu: "gu-IN",
        ta: "ta-IN",
        kn: "kn-IN",
        es: "es-ES"
      };

      recognition.lang = langMap[currentLang] || "en-IN";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputMessage(transcript);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.warn("Speech recognition error:", e);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  // Text-To-Speech (Speech synthesis)
  const handleSpeakText = (id: string, text: string) => {
    if (!("speechSynthesis" in window)) return;

    if (isSpeaking && activeSpeechId === id) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setActiveSpeechId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    const langMap: Record<string, string> = {
      en: "en-IN",
      hi: "hi-IN",
      te: "te-IN",
      mr: "mr-IN",
      pb: "pa-IN",
      bn: "bn-IN",
      gu: "gu-IN",
      ta: "ta-IN",
      kn: "kn-IN",
      es: "es-ES"
    };

    utterance.lang = langMap[currentLang] || "en-IN";
    utterance.rate = 0.95;

    utterance.onend = () => {
      setIsSpeaking(false);
      setActiveSpeechId(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setActiveSpeechId(null);
    };

    setIsSpeaking(true);
    setActiveSpeechId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || inputMessage;
    if (!messageText.trim() && !selectedImageBase64) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: messageText,
      timestamp: Date.now(),
      imageUri: selectedImageBase64 || undefined
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setSelectedImageBase64(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.text,
          language: currentLang === "hi" ? "Hindi" : currentLang === "te" ? "Telugu" : "English",
          history: messages,
          imageBase64: userMsg.imageUri
        })
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: data.reply || "I am here to help with your crop questions. Please ask specifically.",
        timestamp: Date.now()
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chatbot response error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Sorry, I am having trouble connecting right now. Please check your internet connection or try again.",
          timestamp: Date.now()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto bg-slate-50 rounded-3xl border border-emerald-100 shadow-xl overflow-hidden my-2">
      {/* Top Chat Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/30 border border-emerald-400/40 flex items-center justify-center text-white shadow-inner">
            <Bot className="w-6 h-6 text-emerald-200" />
          </div>
          <div>
            <h2 className="font-bold text-base flex items-center gap-2">
              CropDoc AI Advisor
              <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-400/30 font-medium">
                <Sparkles className="w-3 h-3 text-emerald-300" />
                24/7 Active
              </span>
            </h2>
            <p className="text-xs text-emerald-100/80">
              Voice & Multi-Language Farming Assistant
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: "1",
                sender: "bot",
                text: "Chat reset. How can I assist you with your crops today?",
                timestamp: Date.now()
              }
            ]);
          }}
          className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-700/50 rounded-xl transition-all"
          title="Reset Chat"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isBot = msg.sender === "bot";
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isBot ? "items-start" : "items-end"} space-y-1`}
            >
              <div className={`flex items-start gap-2 max-w-[85%] ${isBot ? "flex-row" : "flex-row-reverse"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    isBot ? "bg-emerald-700 text-white shadow" : "bg-teal-600 text-white"
                  }`}
                >
                  {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    isBot
                      ? "bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs"
                      : "bg-emerald-700 text-white rounded-tr-xs"
                  }`}
                >
                  {msg.imageUri && (
                    <img
                      src={msg.imageUri}
                      alt="Attached crop photo"
                      className="w-48 h-36 object-cover rounded-xl mb-2.5 border border-emerald-200"
                    />
                  )}
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Audio Speaker Button for Bot Responses */}
                  {isBot && (
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => handleSpeakText(msg.id, msg.text)}
                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors ${
                          isSpeaking && activeSpeechId === msg.id
                            ? "bg-emerald-100 text-emerald-800 animate-pulse"
                            : "text-slate-500 hover:text-emerald-700 hover:bg-slate-100"
                        }`}
                      >
                        {isSpeaking && activeSpeechId === msg.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" /> Stop Voice
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" /> Listen (आवाज़ सुनें)
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Questions Chips */}
              {isBot && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                <div className="ml-10 flex flex-wrap gap-1.5 pt-1 max-w-[85%]">
                  {msg.suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80 text-[11px] sm:text-xs px-2.5 py-1 rounded-full transition-all text-left flex items-center gap-1"
                    >
                      <HelpCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{q}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-500 text-xs italic bg-white p-3 rounded-2xl border border-slate-200 w-fit">
            <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
            CropDoc AI is analyzing and preparing recommendations...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Selected Image Preview */}
      {selectedImageBase64 && (
        <div className="px-4 py-2 bg-emerald-50 border-t border-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={selectedImageBase64}
              alt="Selected Preview"
              className="w-10 h-10 object-cover rounded-lg border border-emerald-300"
            />
            <span className="text-xs text-emerald-900 font-medium">
              Image attached for diagnosis
            </span>
          </div>
          <button
            onClick={() => setSelectedImageBase64(null)}
            className="text-xs text-rose-600 hover:underline font-bold"
          >
            Remove
          </button>
        </div>
      )}

      {/* Input Controls Bar */}
      <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all"
          title="Attach Leaf Photo"
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        <button
          onClick={isListening ? stopListening : startListening}
          className={`p-2.5 rounded-xl transition-all ${
            isListening
              ? "bg-rose-500 text-white animate-pulse shadow-md"
              : "text-slate-500 hover:text-emerald-700 hover:bg-emerald-50"
          }`}
          title={isListening ? "Listening... Speak now" : "Speak Voice Question"}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder={
            isListening
              ? "Listening... speak your question"
              : "Ask CropDoc AI (e.g. Tomato blight treatment)..."
          }
          className="flex-1 bg-slate-100 focus:bg-white text-slate-900 text-xs sm:text-sm px-3.5 py-2.5 rounded-2xl outline-none border border-slate-200 focus:border-emerald-500 transition-all"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={(!inputMessage.trim() && !selectedImageBase64) || isLoading}
          className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white p-2.5 rounded-2xl shadow-sm transition-all"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
