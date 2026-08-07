import React, { useRef, useState, useEffect, useCallback } from "react";
import { Camera, RefreshCw, X, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";
import { LanguageCode } from "../types";
import { UI_TRANSLATIONS } from "../data/translations";

interface CameraCaptureProps {
  currentLang: LanguageCode;
  onCapture: (base64Image: string) => void;
  onClose: () => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  currentLang,
  onCapture,
  onClose,
}) => {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFallbackFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          stopCurrentStream();
          onCapture(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const activeStreamRef = useRef<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  const stopCurrentStream = useCallback(() => {
    if (activeStreamRef.current) {
      activeStreamRef.current.getTracks().forEach((track) => track.stop());
      activeStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const initCamera = useCallback(async () => {
    setIsInitializing(true);
    setErrorMsg(null);
    stopCurrentStream();

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      activeStreamRef.current = newStream;

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        try {
          await videoRef.current.play();
        } catch (playErr: any) {
          // Gracefully ignore play interruption errors (e.g., component unmounted or media replaced)
          if (
            playErr.name !== "AbortError" &&
            !playErr.message?.includes("interrupted")
          ) {
            console.warn("Video play exception:", playErr);
          }
        }
      }
      setIsInitializing(false);
    } catch (err: any) {
      if (err.name !== "AbortError" && !err.message?.includes("interrupted")) {
        console.warn("Camera access permission denied or unavailable:", err.name || err.message);
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          setErrorMsg(
            "Camera permission was denied. Please allow camera access in your browser settings, or select a leaf photo from your gallery."
          );
        } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
          setErrorMsg(
            "No camera device was detected on your device. Please upload a photo from your gallery."
          );
        } else {
          setErrorMsg(t.cameraPermissionError || "Unable to access camera. Please check browser permissions or select a photo.");
        }
      }
      setIsInitializing(false);
    }
  }, [facingMode, stopCurrentStream, t.cameraPermissionError]);

  useEffect(() => {
    initCamera();
    return () => {
      stopCurrentStream();
    };
  }, [facingMode, initCamera, stopCurrentStream]);

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  const handleTakeSnapshot = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 800;
    canvas.height = video.videoHeight || 600;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUri = canvas.toDataURL("image/jpeg", 0.92);

    stopCurrentStream();
    onCapture(dataUri);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-between p-4 sm:p-6 select-none animate-fadeIn">
      {/* Header Bar */}
      <div className="w-full max-w-lg flex items-center justify-between text-white py-2">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold text-white">{t.takeLivePhoto}</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          aria-label={t.closeCamera}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Viewfinder Box */}
      <div className="relative w-full max-w-2xl flex-1 my-2 bg-slate-900 rounded-3xl overflow-hidden border-2 border-emerald-500/40 flex items-center justify-center shadow-2xl min-h-[280px]">
        {errorMsg ? (
          <div className="p-6 text-center max-w-sm text-white space-y-4">
            <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto" />
            <p className="text-sm font-semibold leading-relaxed text-slate-200">{errorMsg}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
              <button
                onClick={initCamera}
                className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/40 font-bold text-xs rounded-xl transition-colors"
              >
                Upload Photo from Gallery
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFallbackFileSelect}
              accept="image/*"
              className="hidden"
            />
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              playsInline
              muted
              className="w-full h-full max-h-[70vh] object-cover bg-black"
            />

            {/* Viewfinder Overlay Box */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-8">
              <div className="w-64 h-64 border-2 border-dashed border-emerald-400 rounded-3xl relative shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] flex items-center justify-center">
                {/* Corner markers */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg" />
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-lg" />

                <span className="bg-emerald-950/80 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/50 backdrop-blur-sm">
                  Center leaf here
                </span>
              </div>
              <p className="text-emerald-200 text-xs font-medium mt-4 bg-slate-900/80 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
                <span>Good sunlight & single leaf focus</span>
              </p>
            </div>
          </>
        )}
      </div>

      {/* Camera Controls Footer */}
      <div className="w-full max-w-lg py-4 flex items-center justify-around gap-4 bg-slate-900/90 rounded-2xl px-6 border border-slate-800">
        {/* Flip Camera Button */}
        <button
          onClick={toggleFacingMode}
          disabled={!!errorMsg || isInitializing}
          className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all disabled:opacity-40"
          title={t.flipCamera}
        >
          <RefreshCw className="w-6 h-6" />
        </button>

        {/* Shutter Capture Button */}
        <button
          onClick={handleTakeSnapshot}
          disabled={!!errorMsg || isInitializing}
          className="w-20 h-20 rounded-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-emerald-500/30 transition-all border-4 border-white disabled:opacity-40"
          aria-label={t.capturePhoto}
        >
          <div className="w-14 h-14 rounded-full border-2 border-slate-950 flex items-center justify-center">
            <Camera className="w-7 h-7 text-slate-950" />
          </div>
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
