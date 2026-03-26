"use client";
import { useState } from "react";
import Image from "next/image";

export default function ImagePicker({
  imageFiles,
  currentImage,
}: {
  imageFiles: string[];
  currentImage: string;
}) {
  const [selected, setSelected] = useState(currentImage);

  return (
    <div>
      {/* Current selection preview */}
      {selected && (
        <div className="flex items-center gap-3 mb-4 bg-slate-700/50 rounded-xl p-3">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-600">
            <Image src={selected} alt="Selected" fill className="object-contain p-1" sizes="64px" />
          </div>
          <div>
            <p className="text-slate-300 text-xs font-bold uppercase tracking-wide mb-0.5">Selected image</p>
            <p className="text-slate-400 text-xs font-mono">{selected.replace("/images/", "")}</p>
          </div>
        </div>
      )}

      {/* Hidden input carries the value into the form */}
      <input type="hidden" name="primary_image" value={selected} />

      {/* Scrollable thumbnail grid */}
      <div className="overflow-y-auto max-h-72 rounded-xl border border-slate-700 p-3 bg-slate-900/40">
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {imageFiles.map((src) => {
            const isSelected = src === selected;
            return (
              <button
                key={src}
                type="button"
                title={src.replace("/images/", "")}
                onClick={() => setSelected(src)}
                className={`relative cursor-pointer rounded-lg overflow-hidden aspect-square border-2 transition-all hover:scale-105 ${
                  isSelected
                    ? "border-cyan-400 ring-2 ring-cyan-400/50"
                    : "border-slate-600 hover:border-slate-400"
                }`}
              >
                <Image
                  src={src}
                  alt={src.replace("/images/", "")}
                  fill
                  className="object-contain p-1 bg-slate-700"
                  sizes="80px"
                />
              </button>
            );
          })}
        </div>
      </div>
      <p className="text-slate-500 text-xs mt-2">{imageFiles.length} images available</p>
    </div>
  );
}
