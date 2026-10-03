import thumb01 from "@/assets/portfolio/video-01.jpg";
import thumb02 from "@/assets/portfolio/video-02.jpg";
import thumb03 from "@/assets/portfolio/video-03.jpg";
import thumb04 from "@/assets/portfolio/video-04.jpg";
import thumb05 from "@/assets/portfolio/video-05.jpg";
import thumb06 from "@/assets/portfolio/video-06.jpg";
import thumb07 from "@/assets/portfolio/video-07.jpg";
import thumb08 from "@/assets/portfolio/video-08.jpg";
import thumb09 from "@/assets/portfolio/video-09.jpg";
import thumb10 from "@/assets/portfolio/video-10.jpg";
import thumb11 from "@/assets/portfolio/video-11.jpg";
import thumb12 from "@/assets/portfolio/video-12.jpg";
import thumb13 from "@/assets/portfolio/video-13.jpg";
import thumb14 from "@/assets/portfolio/video-14.jpg";
import thumb15 from "@/assets/portfolio/video-15.jpg";
import thumb16 from "@/assets/portfolio/video-16.jpg";
import thumb17 from "@/assets/portfolio/video-17.jpg";
import thumb18 from "@/assets/portfolio/video-18.jpg";
import thumb19 from "@/assets/portfolio/video-19.jpg";
import thumb20 from "@/assets/portfolio/video-20.jpg";
import thumb21 from "@/assets/portfolio/video-21.jpg";
import thumb22 from "@/assets/portfolio/video-22.jpg";
import thumb23 from "@/assets/portfolio/video-23.jpg";
import thumb24 from "@/assets/portfolio/video-24.jpg";
import thumb25 from "@/assets/portfolio/video-25.jpg";
import thumb26 from "@/assets/portfolio/video-26.jpg";
import thumb27 from "@/assets/portfolio/video-27.jpg";
import thumb28 from "@/assets/portfolio/video-28.jpg";
import thumb29 from "@/assets/portfolio/video-29.jpg";
import thumb30 from "@/assets/portfolio/video-30.jpg";
import thumb31 from "@/assets/portfolio/video-31.jpg";
import thumb32 from "@/assets/portfolio/video-32.jpg";
import thumb33 from "@/assets/portfolio/video-33.jpg";

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
  { id: 1, category: "real-estate", url: "https://youtu.be/Ayo2WasxSTM", platform: "youtube", aspectRatio: "16:9", order: 1, thumbnail: thumb01 },
  { id: 2, category: "real-estate", url: "https://youtube.com/shorts/ua_BPOPdA7g?feature=share", platform: "youtube", aspectRatio: "9:16", order: 2, thumbnail: thumb02 },
  { id: 3, category: "real-estate", url: "https://youtube.com/shorts/G872O_9lhHc?feature=share", platform: "youtube", aspectRatio: "9:16", order: 3, thumbnail: thumb03 },
  { id: 4, category: "real-estate", url: "https://youtube.com/shorts/yXU56INjo1c?feature=share", platform: "youtube", aspectRatio: "9:16", order: 4, thumbnail: thumb04 },
  { id: 5, category: "real-estate", url: "https://youtu.be/fisPanMJ3MQ", platform: "youtube", aspectRatio: "16:9", order: 5, thumbnail: thumb05 },
  { id: 6, category: "real-estate", url: "https://youtube.com/shorts/bFG2qiOogIM?feature=share", platform: "youtube", aspectRatio: "9:16", order: 6, thumbnail: thumb06 },
  { id: 7, category: "real-estate", url: "https://vimeo.com/1230197564", platform: "vimeo", aspectRatio: "9:16", order: 7, thumbnail: thumb07 },
  { id: 8, category: "real-estate", url: "https://youtube.com/shorts/MpwZTSdiML4?feature=share", platform: "youtube", aspectRatio: "9:16", order: 8, thumbnail: thumb08 },
  { id: 9, category: "real-estate", url: "https://youtu.be/CEUilh7fgnU", platform: "youtube", aspectRatio: "16:9", order: 9, thumbnail: thumb09 },
  { id: 10, category: "weddings", url: "https://youtu.be/RzKbwzr2eBs", platform: "youtube", aspectRatio: "16:9", order: 1, thumbnail: thumb10 },
  { id: 11, category: "weddings", url: "https://youtu.be/UiuTtVdX3E0", platform: "youtube", aspectRatio: "16:9", order: 2, thumbnail: thumb11 },
  { id: 12, category: "weddings", url: "https://youtu.be/RmxWvtwZ10c", platform: "youtube", aspectRatio: "16:9", order: 3, thumbnail: thumb12 },
  { id: 13, category: "weddings", url: "https://youtu.be/FZxZW3ELkY4", platform: "youtube", aspectRatio: "16:9", order: 4, thumbnail: thumb13 },
  { id: 14, category: "weddings", url: "https://youtu.be/cPtMXzGYod8", platform: "youtube", aspectRatio: "16:9", order: 5, thumbnail: thumb14 },
  { id: 15, category: "weddings", url: "https://youtu.be/AUHBIrbpwmU", platform: "youtube", aspectRatio: "16:9", order: 6, thumbnail: thumb15 },
  { id: 16, category: "marketing", url: "https://youtu.be/KgPpcdtpqsc", platform: "youtube", aspectRatio: "16:9", order: 1, thumbnail: thumb16 },
  { id: 17, category: "marketing", url: "https://youtube.com/shorts/okAes13bf24?feature=share", platform: "youtube", aspectRatio: "9:16", order: 2, thumbnail: thumb17 },
  { id: 18, category: "marketing", url: "https://youtube.com/shorts/DlZzQd3_MXY?feature=share", platform: "youtube", aspectRatio: "9:16", order: 3, thumbnail: thumb18 },
  { id: 19, category: "marketing", url: "https://youtube.com/shorts/TdefTDVE_T4?feature=share", platform: "youtube", aspectRatio: "9:16", order: 4, thumbnail: thumb19 },
  { id: 20, category: "marketing", url: "https://youtube.com/shorts/aHtq5gUxd8A?feature=share", platform: "youtube", aspectRatio: "9:16", order: 5, thumbnail: thumb20 },
  { id: 21, category: "marketing", url: "https://youtube.com/shorts/pAXFgaj78eo?feature=share", platform: "youtube", aspectRatio: "9:16", order: 6, thumbnail: thumb21 },
  { id: 22, category: "marketing", url: "https://youtube.com/shorts/etwMIDRf4ms?feature=share", platform: "youtube", aspectRatio: "9:16", order: 7, thumbnail: thumb22 },
  { id: 23, category: "marketing", url: "https://youtube.com/shorts/wRba86ucevg?feature=share", platform: "youtube", aspectRatio: "9:16", order: 8, thumbnail: thumb23 },
  { id: 24, category: "marketing", url: "https://youtube.com/shorts/qSZ1hOFBcbg?feature=share", platform: "youtube", aspectRatio: "9:16", order: 9, thumbnail: thumb24 },
  { id: 25, category: "marketing", url: "https://youtube.com/shorts/de0LU2_jEx4?feature=share", platform: "youtube", aspectRatio: "9:16", order: 10, thumbnail: thumb25 },
  { id: 26, category: "marketing", url: "https://youtube.com/shorts/NcfjPF3Is58?feature=share", platform: "youtube", aspectRatio: "9:16", order: 11, thumbnail: thumb26 },
  { id: 27, category: "marketing", url: "https://youtube.com/shorts/3iJU7rGb6hc?feature=share", platform: "youtube", aspectRatio: "9:16", order: 12, thumbnail: thumb27 },
  { id: 28, category: "youtube", url: "https://youtu.be/gCb0CZpYrJw", platform: "youtube", aspectRatio: "16:9", order: 1, thumbnail: thumb28 },
  { id: 29, category: "youtube", url: "https://youtu.be/tPsrh2llR8Y", platform: "youtube", aspectRatio: "16:9", order: 2, thumbnail: thumb29 },
  { id: 30, category: "youtube", url: "https://youtu.be/CUoz_sF7Z8I", platform: "youtube", aspectRatio: "16:9", order: 3, thumbnail: thumb30 },
  { id: 31, category: "testimonials", url: "https://vimeo.com/1202075560", platform: "vimeo", aspectRatio: "9:16", order: 1, thumbnail: thumb31 },
  { id: 32, category: "testimonials", url: "https://vimeo.com/1202075547", platform: "vimeo", aspectRatio: "9:16", order: 2, thumbnail: thumb32 },
  { id: 33, category: "testimonials", url: "https://vimeo.com/1202075506", platform: "vimeo", aspectRatio: "9:16", order: 3, thumbnail: thumb33 },
];

export const portfolioVideos = videos.filter(
  (video): video is VideoItem & { category: PortfolioCategory } => video.category !== "testimonials",
);
export const testimonialVideos = videos.filter((video) => video.category === "testimonials");
