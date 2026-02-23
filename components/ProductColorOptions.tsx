"use client";

import { useState } from "react";
import { Palette } from "lucide-react";

/** Işık sıcaklığına göre yaklaşık renk (görsel swatch) */
const KELVIN_COLORS: Record<number, string> = {
  2700: "#f0d8a8",
  3000: "#f5e6c8",
  4000: "#e8e4d9",
  6500: "#e0e6f0",
};

interface BodyOption {
  label: string;
  value: "black" | "white" | "ral";
}

interface LightOption {
  label: string;
  kelvin: number;
}

interface ProductColorOptionsProps {
  bodyColorOptions?: BodyOption[];
  lightColorOptions?: LightOption[];
}

export default function ProductColorOptions({
  bodyColorOptions = [],
  lightColorOptions = [],
}: ProductColorOptionsProps) {
  const [selectedBody, setSelectedBody] = useState<string | null>(null);
  const [selectedLight, setSelectedLight] = useState<string | null>(null);

  if (bodyColorOptions.length === 0 && lightColorOptions.length === 0) return null;

  return (
    <div className="space-y-8">
      {/* Gövde Renk Seçenekleri */}
      {bodyColorOptions.length > 0 && (
      <div>
        <h3 className="text-sm font-semibold text-dark-800 mb-3">
          Gövde Renk Seçenekleri
        </h3>
        <div className="flex flex-wrap gap-4">
          {bodyColorOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setSelectedBody(selectedBody === opt.value ? null : opt.value)}
              className="flex flex-col items-center gap-2 group"
              aria-pressed={selectedBody === opt.value}
            >
              <span
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedBody === opt.value
                    ? "ring-2 ring-primary-500 ring-offset-2 border-primary-600"
                    : "border-gray-300 group-hover:border-gray-400"
                } ${
                  opt.value === "black"
                    ? "bg-gray-900"
                    : opt.value === "white"
                      ? "bg-white"
                      : "bg-gradient-to-br from-red-400 via-yellow-400 to-blue-500"
                }`}
              >
                {opt.value === "ral" && (
                  <Palette className="w-5 h-5 text-white drop-shadow-md" />
                )}
              </span>
              <span className="text-xs font-medium text-dark-700">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
      )}

      {/* Işık Renk Seçenekleri */}
      {lightColorOptions.length > 0 && (
      <div>
        <h3 className="text-sm font-semibold text-dark-800 mb-3">
          Işık Renk Seçenekleri
        </h3>
        <div className="flex flex-wrap gap-4">
          {lightColorOptions.map((opt) => (
            <button
              key={opt.kelvin}
              type="button"
              onClick={() =>
                setSelectedLight(selectedLight === opt.label ? null : opt.label)
              }
              className="flex flex-col items-center gap-2 group"
              aria-pressed={selectedLight === opt.label}
            >
              <span
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedLight === opt.label
                    ? "ring-2 ring-primary-500 ring-offset-2 border-primary-600"
                    : "border-gray-300 group-hover:border-gray-400"
                }`}
                style={{
                  backgroundColor: KELVIN_COLORS[opt.kelvin] ?? "#e8e4d9",
                  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)",
                }}
              />
              <span className="text-xs font-medium text-dark-700">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
      )}
    </div>
  );
}
