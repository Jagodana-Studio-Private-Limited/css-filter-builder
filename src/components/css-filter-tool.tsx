"use client";

import { useState, useCallback, useMemo } from "react";
import { Copy, Check, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ToolEvents } from "@/lib/analytics";

interface FilterState {
  blur: number;
  brightness: number;
  contrast: number;
  grayscale: number;
  hueRotate: number;
  invert: number;
  opacity: number;
  saturate: number;
  sepia: number;
}

const DEFAULTS: FilterState = {
  blur: 0,
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  hueRotate: 0,
  invert: 0,
  opacity: 100,
  saturate: 100,
  sepia: 0,
};

interface SliderConfig {
  key: keyof FilterState;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
  format: (v: number) => string;
}

const SLIDERS: SliderConfig[] = [
  { key: "blur",       label: "Blur",        min: 0,   max: 20,  step: 0.5, unit: "px",  format: (v) => `blur(${v}px)` },
  { key: "brightness", label: "Brightness",  min: 0,   max: 200, step: 1,   unit: "%",   format: (v) => `brightness(${v}%)` },
  { key: "contrast",   label: "Contrast",    min: 0,   max: 200, step: 1,   unit: "%",   format: (v) => `contrast(${v}%)` },
  { key: "grayscale",  label: "Grayscale",   min: 0,   max: 100, step: 1,   unit: "%",   format: (v) => `grayscale(${v}%)` },
  { key: "hueRotate",  label: "Hue Rotate",  min: 0,   max: 360, step: 1,   unit: "deg", format: (v) => `hue-rotate(${v}deg)` },
  { key: "invert",     label: "Invert",      min: 0,   max: 100, step: 1,   unit: "%",   format: (v) => `invert(${v}%)` },
  { key: "opacity",    label: "Opacity",     min: 0,   max: 100, step: 1,   unit: "%",   format: (v) => `opacity(${v}%)` },
  { key: "saturate",   label: "Saturate",    min: 0,   max: 300, step: 1,   unit: "%",   format: (v) => `saturate(${v}%)` },
  { key: "sepia",      label: "Sepia",       min: 0,   max: 100, step: 1,   unit: "%",   format: (v) => `sepia(${v}%)` },
];

function isDefault(key: keyof FilterState, value: number): boolean {
  return value === DEFAULTS[key];
}

export function CssFilterTool() {
  const [filters, setFilters] = useState<FilterState>({ ...DEFAULTS });
  const [copied, setCopied] = useState(false);

  const filterString = useMemo(() => {
    const parts = SLIDERS
      .filter(({ key }) => !isDefault(key, filters[key]))
      .map(({ key, format }) => format(filters[key]));
    return parts.length > 0 ? parts.join(" ") : "none";
  }, [filters]);

  const cssOutput = useMemo(() => {
    return filterString === "none" ? "filter: none;" : `filter: ${filterString};`;
  }, [filterString]);

  const handleChange = useCallback((key: keyof FilterState, value: number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    ToolEvents.toolUsed("adjust-filter");
  }, []);

  const handleReset = useCallback(() => {
    setFilters({ ...DEFAULTS });
    ToolEvents.toolUsed("reset");
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(cssOutput);
      setCopied(true);
      toast.success("CSS copied to clipboard!");
      ToolEvents.resultCopied();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy. Please copy manually.");
    }
  }, [cssOutput]);

  const hasChanges = useMemo(() => {
    return SLIDERS.some(({ key }) => !isDefault(key, filters[key]));
  }, [filters]);

  // Progress % for slider fill
  const fillPercent = (value: number, min: number, max: number) =>
    ((value - min) / (max - min)) * 100;

  return (
    <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
      <div className="grid lg:grid-cols-[1fr_360px]">
        {/* Left: Preview */}
        <div className="p-6 flex flex-col gap-4 border-b lg:border-b-0 lg:border-r border-border/50">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Preview</h2>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">100% client-side</span>
          </div>

          {/* Sample Image Preview */}
          <div className="rounded-xl overflow-hidden bg-muted/30 flex items-center justify-center min-h-[280px] relative">
            {/* Colorful SVG sample image */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 400 280"
              className="w-full h-auto max-h-[360px] object-contain rounded-lg"
              style={{ filter: filterString === "none" ? undefined : filterString }}
            >
              {/* Sky gradient */}
              <defs>
                <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#bfdbfe" />
                </linearGradient>
                <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#166534" />
                </linearGradient>
                <linearGradient id="sun" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              {/* Background sky */}
              <rect width="400" height="280" fill="url(#sky)" />
              {/* Sun */}
              <circle cx="320" cy="60" r="45" fill="url(#sun)" opacity="0.9" />
              {/* Clouds */}
              <ellipse cx="100" cy="70" rx="55" ry="22" fill="white" opacity="0.85" />
              <ellipse cx="130" cy="58" rx="40" ry="18" fill="white" opacity="0.9" />
              <ellipse cx="240" cy="90" rx="45" ry="18" fill="white" opacity="0.75" />
              {/* Ground */}
              <rect x="0" y="190" width="400" height="90" fill="url(#ground)" />
              {/* House body */}
              <rect x="130" y="140" width="120" height="70" fill="#f97316" rx="4" />
              {/* Roof */}
              <polygon points="120,145 190,95 260,145" fill="#dc2626" />
              {/* Door */}
              <rect x="177" y="175" width="26" height="35" fill="#92400e" rx="3" />
              {/* Window left */}
              <rect x="142" y="155" width="28" height="24" fill="#bae6fd" rx="3" />
              {/* Window right */}
              <rect x="210" y="155" width="28" height="24" fill="#bae6fd" rx="3" />
              {/* Tree trunk */}
              <rect x="58" y="175" width="14" height="30" fill="#78350f" rx="3" />
              {/* Tree top */}
              <circle cx="65" cy="158" r="30" fill="#16a34a" />
              {/* Tree 2 */}
              <rect x="322" y="180" width="12" height="25" fill="#78350f" rx="3" />
              <circle cx="328" cy="164" r="25" fill="#15803d" />
              {/* Path */}
              <ellipse cx="190" cy="220" rx="30" ry="10" fill="#d97706" opacity="0.6" />
              <rect x="180" y="210" width="20" height="20" fill="#d97706" opacity="0.5" rx="2" />
            </svg>
          </div>

          {/* CSS Output */}
          <div className="rounded-xl bg-muted/50 border border-border/40 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Generated CSS</span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  disabled={!hasChanges}
                  className="h-7 px-2 text-xs gap-1 text-muted-foreground"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset
                </Button>
                <Button
                  size="sm"
                  onClick={handleCopy}
                  className="h-7 px-3 text-xs gap-1 bg-gradient-to-r from-brand to-brand-accent text-white"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy CSS
                    </>
                  )}
                </Button>
              </div>
            </div>
            <code className="text-sm font-mono text-foreground break-all">
              {cssOutput}
            </code>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[640px]">
          <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Filter Controls</h2>

          {SLIDERS.map(({ key, label, min, max, step, unit }) => {
            const value = filters[key];
            const fill = fillPercent(value, min, max);
            const changed = !isDefault(key, value);

            return (
              <div key={key} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className={`text-sm font-medium ${changed ? "text-brand" : "text-foreground"}`}>
                    {label}
                  </label>
                  <span className={`text-xs font-mono tabular-nums px-2 py-0.5 rounded-full ${changed ? "bg-brand/10 text-brand" : "bg-muted text-muted-foreground"}`}>
                    {value}{unit}
                  </span>
                </div>
                <div className="relative h-5 flex items-center">
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => handleChange(key, parseFloat(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-muted"
                    style={{
                      background: `linear-gradient(to right, var(--color-brand) 0%, var(--color-brand) ${fill}%, var(--color-muted) ${fill}%, var(--color-muted) 100%)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
