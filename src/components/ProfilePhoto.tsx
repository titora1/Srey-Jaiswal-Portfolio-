import React, { useState, useEffect, useRef } from 'react';
import { CV_DATA } from '../data/cvData';
import { Camera, RefreshCw, Upload, Check } from 'lucide-react';

interface ProfilePhotoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
  className = '',
  size = 'md',
}) => {
  const [photoSrc, setPhotoSrc] = useState<string>(CV_DATA.personal.photoUrl);
  const [isCustom, setIsCustom] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const savedPhoto = localStorage.getItem('srey_custom_photo');
      if (savedPhoto) {
        setPhotoSrc(savedPhoto);
        setIsCustom(true);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setPhotoSrc(result);
          setIsCustom(true);
          setUploadSuccess(true);
          try {
            localStorage.setItem('srey_custom_photo', result);
          } catch (err) {
            // storage limit
          }
          setTimeout(() => setUploadSuccess(false), 2500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoSrc(CV_DATA.personal.photoUrl);
    setIsCustom(false);
    try {
      localStorage.removeItem('srey_custom_photo');
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className={`relative group select-none ${className}`}>
      {/* Silicon wafer styled border container */}
      <div className="relative border border-zinc-800 bg-[#090d16] p-1.5 overflow-hidden transition-all duration-300 group-hover:border-cyan-500/60 shadow-xl shadow-black/60">
        {/* Technical Corner Brackets */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400 z-10" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400 z-10" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400 z-10" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400 z-10" />

        {/* Photo Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-zinc-950">
          <img
            src={photoSrc}
            alt="Srey Jaiswal — Electronics Engineering (VLSI & FPGA)"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
            onError={(e) => {
              // Fallback if image fails to load
              (e.target as HTMLElement).style.display = 'none';
            }}
          />

          {/* Fallback container underneath in case of any loading failure */}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-[#0a0f1d] to-[#04060a] -z-10 flex flex-col items-center justify-center p-4 text-center">
            <span className="text-cyan-400 font-mono text-2xl font-bold tracking-tight">SJ</span>
            <span className="text-[10px] font-mono text-zinc-500 mt-1 uppercase">Srey Jaiswal</span>
          </div>

          {/* Measured gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

          {/* Bottom Identity Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between text-[11px] font-mono pointer-events-none">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-200 font-bold uppercase tracking-wider text-[10px]">
                Srey Jaiswal
              </span>
            </div>
            <span className="text-cyan-300 text-[9px] tracking-wide">VLSI · SRM IST</span>
          </div>

          {/* Hover Action Overlay: Upload / Replace Photo */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4 text-center cursor-pointer">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-400 text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-cyan-300 transition-colors shadow-lg cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{isCustom ? 'Change Photo' : 'Upload Your Photo'}</span>
            </button>

            {isCustom && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 hover:text-slate-100 underline transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset to default</span>
              </button>
            )}

            {uploadSuccess && (
              <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-mono">
                <Check className="w-3 h-3" />
                <span>Photo updated!</span>
              </div>
            )}
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Frame Status Subtext */}
      <div className="flex items-center justify-between mt-2 px-1 text-[10px] font-mono text-zinc-500">
        <span>ENGINEER PORTRAIT</span>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-cyan-400/80 hover:text-cyan-300 hover:underline cursor-pointer flex items-center gap-1"
        >
          <Camera className="w-3 h-3" />
          <span>Upload photo</span>
        </button>
      </div>
    </div>
  );
};
