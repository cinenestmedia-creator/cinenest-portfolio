export type VideoProvider = "youtube" | "vimeo" | "direct" | null;

export type Project = {
  id: string;
  title: string;
  category: "Real Estate" | "Weddings" | "Marketing" | "Social Content";
  thumbnail: string;
  videoUrl: string;
  videoProvider: VideoProvider;
  description: string;
  client?: string;
  services: string[];
  tone: "lime" | "light" | "deep" | "outline";
};

// Replace each empty thumbnail and videoUrl with the real project assets.
export const projects: Project[] = [
  {
    id: "project-01",
    title: "Project 01",
    category: "Real Estate",
    thumbnail: "",
    videoUrl: "",
    videoProvider: null,
    description: "Project details will be added here.",
    services: ["Editing", "Color grading"],
    tone: "light",
  },
  {
    id: "project-02",
    title: "Project 02",
    category: "Weddings",
    thumbnail: "",
    videoUrl: "",
    videoProvider: null,
    description: "Project details will be added here.",
    services: ["Editing", "Sound design"],
    tone: "lime",
  },
  {
    id: "project-03",
    title: "Project 03",
    category: "Marketing",
    thumbnail: "",
    videoUrl: "",
    videoProvider: null,
    description: "Project details will be added here.",
    services: ["Editing", "Motion & VFX"],
    tone: "deep",
  },
  {
    id: "project-04",
    title: "Project 04",
    category: "Social Content",
    thumbnail: "",
    videoUrl: "",
    videoProvider: null,
    description: "Project details will be added here.",
    services: ["Short-form edit", "Color grading"],
    tone: "outline",
  },
];
