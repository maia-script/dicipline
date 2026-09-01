import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { SubjectTone } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uid() {
  return crypto.randomUUID();
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function toneDot(tone?: SubjectTone) {
  if (!tone) return "bg-muted-foreground/50";
  return `tone-dot-${tone}`;
}
