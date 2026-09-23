export type VideoPlatform = "youtube" | "vimeo" | "direct" | null;
export type ProjectCategory = "Real Estate" | "Marketing" | "YouTube";
export type AspectRatio = "16:9" | "9:16" | "4:3" | "1:1" | "2.39:1";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  thumbnail: string;
  videoUrl: string;
  platform: VideoPlatform;
  aspectRatio: AspectRatio;
  description?: string;
  featured?: boolean;
};

export const vsl = {
  title: "CineNest Media — Video Post-Production",
  thumbnail: "",
  videoUrl: "",
  platform: null as VideoPlatform,
  aspectRatio: "16:9" as AspectRatio,
};

// Replace the empty thumbnail and videoUrl values with final media. Add another
// object to this array and the filters and responsive layout update automatically.
export const projects: Project[] = [
  {
    id: "real-estate-feature",
    title: "Property Film — Featured Placeholder",
    category: "Real Estate",
    thumbnail: "",
    videoUrl: "",
    platform: null,
    aspectRatio: "16:9",
    description: "Final project details will appear here.",
    featured: true,
  },
  {
    id: "real-estate-portrait",
    title: "Property Reel — Portrait Placeholder",
    category: "Real Estate",
    thumbnail: "",
    videoUrl: "",
    platform: null,
    aspectRatio: "9:16",
    description: "Final project details will appear here.",
  },
  {
    id: "real-estate-cinematic",
    title: "Property Film — Cinematic Placeholder",
    category: "Real Estate",
    thumbnail: "",
    videoUrl: "",
    platform: null,
    aspectRatio: "2.39:1",
  },
  {
    id: "real-estate-standard",
    title: "Property Tour — Placeholder",
    category: "Real Estate",
    thumbnail: "",
    videoUrl: "",
    platform: null,
    aspectRatio: "16:9",
  },
  {
    id: "marketing-feature",
    title: "Brand Film — Featured Placeholder",
    category: "Marketing",
    thumbnail: "",
    videoUrl: "",
    platform: null,
    aspectRatio: "16:9",
    description: "Final project details will appear here.",
    featured: true,
  },
  {
    id: "marketing-portrait",
    title: "Campaign Reel — Portrait Placeholder",
    category: "Marketing",
    thumbnail: "",
    videoUrl: "",
    platform: null,
    aspectRatio: "9:16",
  },
  {
    id: "marketing-square",
    title: "Social Campaign — Placeholder",
    category: "Marketing",
    thumbnail: "",
    videoUrl: "",
    platform: null,
    aspectRatio: "1:1",
  },
  {
    id: "youtube-documentary",
    title: "Documentary Edit — Placeholder",
    category: "YouTube",
    thumbnail: "",
    videoUrl: "",
    platform: null,
    aspectRatio: "16:9",
    description: "Final project details will appear here.",
    featured: true,
  },
  {
    id: "youtube-editorial",
    title: "Editorial Edit — Placeholder",
    category: "YouTube",
    thumbnail: "",
    videoUrl: "",
    platform: null,
    aspectRatio: "16:9",
  },
];
