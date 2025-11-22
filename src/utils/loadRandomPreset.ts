import { type Preset, PRESETS } from "@/data/presets";

export const loadRandomPreset = (): Preset => {
  const numberOfPresets = PRESETS.length;
  const randomIndex = Math.floor(Math.random() * numberOfPresets);
  const randomPreset = PRESETS[randomIndex];

  return randomPreset;
};
