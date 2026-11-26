import {
  AudioLines,
  FolderSync,
  ListMusic,
  Tags,
  Volume2,
  type LucideIcon,
} from "lucide-react";

export interface TranslatedTool {
  name: string;
  tagline: string;
  description: string;
  bullets: string[];
  meta: string;
}

export interface Tool extends TranslatedTool {
  id: string;
  icon: LucideIcon;
}

export const TOOL_DEFS: Array<{ id: string; icon: LucideIcon }> = [
  { id: "organizer", icon: FolderSync },
  { id: "spectrum", icon: AudioLines },
  { id: "tagfix", icon: Tags },
  { id: "normalizer", icon: Volume2 },
  { id: "rekordbox", icon: ListMusic },
];
