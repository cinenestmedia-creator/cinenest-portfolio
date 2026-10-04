
export type VideoPlatform = "youtube" | "vimeo" | "direct";
export type PortfolioCategory = "real-estate" | "weddings" | "marketing" | "youtube";
export type VideoCategory = PortfolioCategory | "testimonials";
export type AspectRatio = "16:9" | "9:16";

export type VideoItem = {
  id: number;
  category: VideoCategory;
  url: string;
  platform: VideoPlatform;
  aspectRatio: AspectRatio;
  order: number;
  thumbnail: string;
};

export const brandUrl = "https://cinenestmedia.com";

export const categoryLabels: Record<PortfolioCategory, string> = {
  "real-estate": "Real Estate",
  weddings: "Weddings",
  marketing: "Marketing",
  youtube: "YouTube",
};

export const categoryDescriptions: Record<PortfolioCategory, string> = {
  "real-estate": "Real estate video post-production.",
  weddings: "Wedding film post-production.",
  marketing: "Marketing video post-production.",
  youtube: "YouTube video post-production.",
};

export const portfolioCategories: PortfolioCategory[] = [
  "real-estate",
  "weddings",
  "marketing",
  "youtube",
];

export const videos: VideoItem[] = [
  { id: 1, category: "real-estate", url: "https://youtu.be/Ayo2WasxSTM", platform: "youtube", aspectRatio: "16:9", order: 1, thumbnail: "/thumbnails/real-estate-01.jpg" },
  { id: 2, category: "real-estate", url: "https://youtube.com/shorts/ua_BPOPdA7g?feature=share", platform: "youtube", aspectRatio: "9:16", order: 2, thumbnail: "/thumbnails/real-estate-02.jpg" },
  { id: 3, category: "real-estate", url: "https://youtube.com/shorts/G872O_9lhHc?feature=share", platform: "youtube", aspectRatio: "9:16", order: 3, thumbnail: "/thumbnails/real-estate-03.jpg" },
  { id: 4, category: "real-estate", url: "https://youtube.com/shorts/yXU56INjo1c?feature=share", platform: "youtube", aspectRatio: "9:16", order: 4, thumbnail: "/thumbnails/real-estate-04.jpg" },
  { id: 5, category: "real-estate", url: "https://youtu.be/fisPanMJ3MQ", platform: "youtube", aspectRatio: "16:9", order: 5, thumbnail: "/thumbnails/real-estate-05.jpg" },
  { id: 6, category: "real-estate", url: "https://youtube.com/shorts/bFG2qiOogIM?feature=share", platform: "youtube", aspectRatio: "9:16", order: 6, thumbnail: "/thumbnails/real-estate-06.jpg" },
  { id: 7, category: "real-estate", url: "https://vimeo.com/1230197564", platform: "vimeo", aspectRatio: "9:16", order: 7, thumbnail: "/thumbnails/real-estate-07.jpg" },
  { id: 8, category: "real-estate", url: "https://youtube.com/shorts/MpwZTSdiML4?feature=share", platform: "youtube", aspectRatio: "9:16", order: 8, thumbnail: "/thumbnails/real-estate-08.jpg" },
  { id: 9, category: "real-estate", url: "https://youtu.be/CEUilh7fgnU", platform: "youtube", aspectRatio: "16:9", order: 9, thumbnail: "/thumbnails/real-estate-09.jpg" },
  { id: 10, category: "weddings", url: "https://youtu.be/RzKbwzr2eBs", platform: "youtube", aspectRatio: "16:9", order: 1, thumbnail: "/thumbnails/wedding-01.jpg" },
  { id: 11, category: "weddings", url: "https://youtu.be/UiuTtVdX3E0", platform: "youtube", aspectRatio: "16:9", order: 2, thumbnail: "/thumbnails/wedding-02.jpg" },
  { id: 12, category: "weddings", url: "https://youtu.be/RmxWvtwZ10c", platform: "youtube", aspectRatio: "16:9", order: 3, thumbnail: "/thumbnails/wedding-03.jpg" },
  { id: 13, category: "weddings", url: "https://youtu.be/FZxZW3ELkY4", platform: "youtube", aspectRatio: "16:9", order: 4, thumbnail: "/thumbnails/wedding-04.jpg" },
  { id: 14, category: "weddings", url: "https://youtu.be/cPtMXzGYod8", platform: "youtube", aspectRatio: "16:9", order: 5, thumbnail: "/thumbnails/wedding-05.jpg" },
  { id: 15, category: "weddings", url: "https://youtu.be/AUHBIrbpwmU", platform: "youtube", aspectRatio: "16:9", order: 6, thumbnail: "/thumbnails/wedding-06.jpg" },
  { id: 16, category: "marketing", url: "https://youtu.be/KgPpcdtpqsc", platform: "youtube", aspectRatio: "16:9", order: 1, thumbnail: "/thumbnails/marketing-01.jpg" },
  { id: 17, category: "marketing", url: "https://youtube.com/shorts/okAes13bf24?feature=share", platform: "youtube", aspectRatio: "9:16", order: 2, thumbnail: "/thumbnails/marketing-02.jpg" },
  { id: 18, category: "marketing", url: "https://youtube.com/shorts/DlZzQd3_MXY?feature=share", platform: "youtube", aspectRatio: "9:16", order: 3, thumbnail: "/thumbnails/marketing-03.jpg" },
  { id: 19, category: "marketing", url: "https://youtube.com/shorts/TdefTDVE_T4?feature=share", platform: "youtube", aspectRatio: "9:16", order: 4, thumbnail: "/thumbnails/marketing-04.jpg" },
  { id: 20, category: "marketing", url: "https://youtube.com/shorts/aHtq5gUxd8A?feature=share", platform: "youtube", aspectRatio: "9:16", order: 5, thumbnail: "/thumbnails/marketing-05.jpg" },
  { id: 21, category: "marketing", url: "https://youtube.com/shorts/pAXFgaj78eo?feature=share", platform: "youtube", aspectRatio: "9:16", order: 6, thumbnail: "/thumbnails/marketing-06.jpg" },
  { id: 22, category: "marketing", url: "https://youtube.com/shorts/etwMIDRf4ms?feature=share", platform: "youtube", aspectRatio: "9:16", order: 7, thumbnail: "/thumbnails/marketing-07.jpg" },
  { id: 23, category: "marketing", url: "https://youtube.com/shorts/wRba86ucevg?feature=share", platform: "youtube", aspectRatio: "9:16", order: 8, thumbnail: "/thumbnails/marketing-08.jpg" },
  { id: 24, category: "marketing", url: "https://youtube.com/shorts/qSZ1hOFBcbg?feature=share", platform: "youtube", aspectRatio: "9:16", order: 9, thumbnail: "/thumbnails/marketing-09.jpg" },
  { id: 25, category: "marketing", url: "https://youtube.com/shorts/de0LU2_jEx4?feature=share", platform: "youtube", aspectRatio: "9:16", order: 10, thumbnail: "/thumbnails/marketing-10.jpg" },
  { id: 26, category: "marketing", url: "https://youtube.com/shorts/NcfjPF3Is58?feature=share", platform: "youtube", aspectRatio: "9:16", order: 11, thumbnail: "/thumbnails/marketing-11.jpg" },
  { id: 27, category: "marketing", url: "https://youtube.com/shorts/3iJU7rGb6hc?feature=share", platform: "youtube", aspectRatio: "9:16", order: 12, thumbnail: "/thumbnails/marketing-12.jpg" },
  { id: 28, category: "youtube", url: "https://youtu.be/gCb0CZpYrJw", platform: "youtube", aspectRatio: "16:9", order: 1, thumbnail: "/thumbnails/youtube-01.jpg" },
  { id: 29, category: "youtube", url: "https://youtu.be/tPsrh2llR8Y", platform: "youtube", aspectRatio: "16:9", order: 2, thumbnail: "/thumbnails/youtube-02.jpg" },
  { id: 30, category: "youtube", url: "https://youtu.be/CUoz_sF7Z8I", platform: "youtube", aspectRatio: "16:9", order: 3, thumbnail: "/thumbnails/youtube-03.jpg" },
  { id: 31, category: "testimonials", url: "https://vimeo.com/1202075560", platform: "vimeo", aspectRatio: "9:16", order: 1, thumbnail: "/thumbnails/testimonial-01.jpg" },
  { id: 32, category: "testimonials", url: "https://vimeo.com/1202075547", platform: "vimeo", aspectRatio: "9:16", order: 2, thumbnail: "/thumbnails/testimonial-02.jpg" },
  { id: 33, category: "testimonials", url: "https://vimeo.com/1202075506", platform: "vimeo", aspectRatio: "9:16", order: 3, thumbnail: "/thumbnails/testimonial-03.jpg" },
];

export const portfolioVideos = videos.filter(
  (video): video is VideoItem & { category: PortfolioCategory } => video.category !== "testimonials",
);
export const testimonialVideos = videos.filter((video) => video.category === "testimonials");
