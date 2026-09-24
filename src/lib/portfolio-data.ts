export type VideoPlatform = "youtube" | "vimeo" | "direct" | null;
export type ProjectCategory = "real-estate" | "marketing" | "youtube";
export type AspectRatio = "16:9" | "9:16" | "4:3" | "1:1" | "2.39:1";

export type Project = {
  id: number;
  title: string;
  category: ProjectCategory;
  thumbnail: string;
  videoUrl: string;
  platform: VideoPlatform;
  aspectRatio: AspectRatio;
  description: string;
};

export const categoryLabels: Record<ProjectCategory, string> = {
  "real-estate": "Real Estate",
  marketing: "Marketing",
  youtube: "YouTube",
};

// Place the original logo file path/URL here (e.g. an imported asset).
export const brandLogo = "";
export const brandUrl = "https://cinenestmedia.com";

export const vsl = {
  title: "CineNest Media — Video Post-Production",
  thumbnail: "",
  videoUrl: "",
  platform: null as VideoPlatform,
  aspectRatio: "16:9" as AspectRatio,
};

const make = (
  id: number,
  category: ProjectCategory,
  n: number,
  aspectRatio: AspectRatio,
): Project => ({
  id,
  title: `${categoryLabels[category]} ${String(n).padStart(2, "0")}`,
  category,
  thumbnail: "",
  videoUrl: "",
  platform: null,
  aspectRatio,
  description: "",
});

// Replace thumbnail, videoUrl and platform ("youtube" | "vimeo") on any item.
export const projects: Project[] = [
  make(1, "real-estate", 1, "16:9"),
  make(2, "real-estate", 2, "9:16"),
  make(3, "real-estate", 3, "9:16"),
  make(4, "real-estate", 4, "9:16"),
  make(5, "real-estate", 5, "16:9"),
  make(6, "real-estate", 6, "9:16"),
  make(7, "real-estate", 7, "9:16"),
  make(8, "real-estate", 8, "9:16"),
  ...Array.from({ length: 9 }, (_, i) => make(9 + i, "marketing", i + 1, "16:9")),
  ...Array.from({ length: 3 }, (_, i) => make(18 + i, "youtube", i + 1, "16:9")),
];
