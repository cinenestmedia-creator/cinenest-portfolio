import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Menu, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import logoAsset from "@/assets/cinenest-logo-trim.png.asset.json";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
  brandUrl,
  categoryDescriptions,
  categoryLabels,
  portfolioCategories,
  portfolioVideos,
  testimonialVideos,
  type AspectRatio,
  type PortfolioCategory,
  type VideoItem,
  type VideoPlatform,
} from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CineNest Media — Video Post-Production Portfolio" },
      { name: "description", content: "Watch video editing, color, storytelling and post-production work by CineNest Media." },
      { property: "og:title", content: "CineNest Media — Video Post-Production Portfolio" },
      { property: "og:description", content: "Watch video editing, color, storytelling and post-production work by CineNest Media." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CineNestPortfolio,
});

const ratioClasses: Record<AspectRatio, string> = {
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
};

function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={brandUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit CineNest Media"
      className={`block shrink-0 ${compact ? "h-14 w-32" : "h-16 w-36 sm:h-18 sm:w-44"}`}
    >
      <img src={logoAsset.url} alt="CineNest Media" className="h-full w-full object-contain object-left" />
    </a>
  );
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen && !dropdownOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setDropdownOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, dropdownOpen]);

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };
  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  };
  const closeMobile = () => setMobileOpen(false);
  const navClass = "text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:text-primary focus-visible:text-primary";

  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${scrolled || mobileOpen ? "border-border bg-background/95 backdrop-blur-md" : "border-transparent bg-background/85"}`}>
      <nav aria-label="Primary navigation" className="mx-auto grid h-20 max-w-[1500px] grid-cols-[minmax(0,1fr)_auto] items-center px-5 sm:px-8 lg:px-12">
        <div className="min-w-0"><BrandLogo /></div>
        <div className="hidden items-center gap-9 md:flex">
          <div className="relative" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
            <button type="button" aria-haspopup="true" aria-expanded={dropdownOpen} onClick={() => setDropdownOpen((value) => !value)} className={`${navClass} inline-flex items-center gap-1.5`}>
              Portfolio <ChevronDown className={`h-3 w-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-5 w-56 border border-border bg-background py-2 animate-in fade-in-0 slide-in-from-top-1">
                {portfolioCategories.map((category) => (
                  <a key={category} href={`#${category}`} onClick={() => setDropdownOpen(false)} className="group grid grid-cols-[minmax(0,1fr)_auto] items-center px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:text-primary">
                    <span>{categoryLabels[category]}</span><ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            )}
          </div>
          <a href="#contact" className={navClass}>Contact</a>
        </div>
        <Button variant="ghost" size="icon" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)} className="md:hidden">
          {mobileOpen ? <X /> : <Menu />}
        </Button>
      </nav>
      {mobileOpen && (
        <div className="border-t border-border bg-background px-5 pb-5 md:hidden">
          <button type="button" aria-expanded={mobilePortfolioOpen} onClick={() => setMobilePortfolioOpen((value) => !value)} className="grid min-h-12 w-full grid-cols-[minmax(0,1fr)_auto] items-center border-b border-border text-left text-xs font-semibold uppercase">
            <span>Portfolio</span><ChevronDown className={`h-4 w-4 text-primary transition-transform ${mobilePortfolioOpen ? "rotate-180" : ""}`} />
          </button>
          {mobilePortfolioOpen && portfolioCategories.map((category) => (
            <a key={category} href={`#${category}`} onClick={closeMobile} className="grid min-h-11 grid-cols-[auto_minmax(0,1fr)] items-center gap-4 border-b border-border pl-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              <span className="text-primary">0{portfolioCategories.indexOf(category) + 1}</span><span>{categoryLabels[category]}</span>
            </a>
          ))}
          <a href="#contact" onClick={closeMobile} className="grid min-h-12 grid-cols-[minmax(0,1fr)_auto] items-center text-xs font-semibold uppercase"><span>Contact</span><ArrowRight className="h-4 w-4 text-primary" /></a>
        </div>
      )}
    </header>
  );
}

function getYouTubeId(url: string) {
  return url.match(/(?:youtu\.be\/|shorts\/|v=|embed\/)([A-Za-z0-9_-]+)/)?.[1] ?? "";
}
function getVimeoId(url: string) {
  return url.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1] ?? "";
}
function getEmbedUrl(url: string, platform: VideoPlatform) {
  if (platform === "youtube") {
    const id = getYouTubeId(url);
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : "";
  }
  if (platform === "vimeo") {
    const id = getVimeoId(url);
    return id ? `https://player.vimeo.com/video/${id}` : "";
  }
  return url;
}

function VideoModal({ video, open, onOpenChange }: { video: VideoItem; open: boolean; onOpenChange: (open: boolean) => void }) {
  const embedUrl = getEmbedUrl(video.url, video.platform);
  const portrait = video.aspectRatio === "9:16";
  useEffect(() => {
    if (!open) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onEscape, true);
    return () => window.removeEventListener("keydown", onEscape, true);
  }, [open, onOpenChange]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`max-h-[94vh] overflow-y-auto border-border bg-popover p-3 sm:p-4 ${portrait ? "max-w-[min(92vw,46vh)]" : "max-w-[min(94vw,145vh,1200px)]"}`}>
        <DialogTitle className="sr-only">{video.category} video {video.order}</DialogTitle>
        <DialogDescription className="sr-only">CineNest Media portfolio video</DialogDescription>
        {video.platform === "direct" ? (
          <video src={embedUrl} controls preload="metadata" className={`${ratioClasses[video.aspectRatio]} max-h-[82vh] w-full bg-background object-contain`} />
        ) : (
          <iframe src={embedUrl} title={`${video.category} video ${video.order}`} loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen className={`${ratioClasses[video.aspectRatio]} max-h-[82vh] w-full border-0 bg-background`} />
        )}
      </DialogContent>
    </Dialog>
  );
}

function VideoCard({ video, position }: { video: VideoItem; position: number }) {
  const [open, setOpen] = useState(false);
  const label = video.category === "testimonials" ? "Testimonial" : categoryLabels[video.category];
  return (
    <article className="group min-w-0">
      <Button variant="ghost" onClick={() => setOpen(true)} className="h-auto w-full justify-start rounded-none p-0 text-left hover:bg-transparent" aria-label={`Play ${label} video ${position}`}>
        <span className={`${ratioClasses[video.aspectRatio]} relative block w-full overflow-hidden border border-border bg-card transition-colors duration-300 group-hover:border-primary/60`}>
          <img src={video.thumbnail} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
          <span className="absolute inset-0 bg-background/10 transition-colors group-hover:bg-background/25" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110">
              <Play className="h-4 w-4 fill-current" />
            </span>
          </span>
          <span className="absolute bottom-3 left-3 border border-foreground/25 bg-background/80 px-2 py-1 text-[9px] font-semibold uppercase text-foreground">{video.aspectRatio}</span>
        </span>
      </Button>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3">
        <p className="min-w-0 truncate text-[9px] font-bold uppercase tracking-[0.14em] text-primary">{label}</p>
        <span className="text-[9px] text-muted-foreground">{String(position).padStart(2, "0")}</span>
      </div>
      <VideoModal video={video} open={open} onOpenChange={setOpen} />
    </article>
  );
}

function EditorialGrid({ category, videos }: { category: PortfolioCategory; videos: VideoItem[] }) {
  if (category === "real-estate") {
    return (
      <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-7 sm:mt-9 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-6">
        {videos.map((video, index) => (
          <div key={video.id} className={video.aspectRatio === "16:9" ? "col-span-2 sm:col-span-3 lg:col-span-6" : "col-span-1 sm:col-span-1 lg:col-span-2"}>
            <VideoCard video={video} position={index + 1} />
          </div>
        ))}
      </div>
    );
  }
  if (category === "marketing") {
    const [feature, ...verticals] = videos;
    return (
      <div className="mt-7 space-y-7 sm:mt-9 sm:space-y-9">
        {feature && <div><VideoCard video={feature} position={1} /></div>}
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 xl:grid-cols-5">
          {verticals.map((video, index) => <VideoCard key={video.id} video={video} position={index + 2} />)}
        </div>
      </div>
    );
  }
  return (
    <div className={`mt-7 grid grid-cols-1 gap-x-5 gap-y-7 sm:mt-9 sm:grid-cols-2 ${category === "youtube" ? "lg:grid-cols-3" : ""}`}>
      {videos.map((video, index) => <VideoCard key={video.id} video={video} position={index + 1} />)}
    </div>
  );
}

function CategoryNavigation() {
  return (
    <nav aria-label="Portfolio categories" className="mt-8 grid grid-cols-2 border border-border sm:grid-cols-4">
      {portfolioCategories.map((category, index) => (
        <a key={category} href={`#${category}`} className="group grid min-h-14 grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-border px-3 text-[9px] font-semibold uppercase tracking-[0.1em] transition-colors hover:bg-muted hover:text-primary [&:nth-child(odd)]:border-r sm:border-r sm:[&:last-child]:border-r-0">
          <span className="text-primary">0{index + 1}</span><span className="truncate">{categoryLabels[category]}</span>
        </a>
      ))}
    </nav>
  );
}

function PortfolioSection() {
  return (
    <section id="portfolio" className="px-5 pb-24 pt-28 sm:px-8 sm:pb-32 sm:pt-32 lg:px-12">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-4 border-t border-border pt-5 md:grid-cols-[1fr_1.2fr] md:gap-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Selected Work</p>
          <div>
            <h1 className="font-display text-5xl font-semibold uppercase leading-none sm:text-6xl lg:text-7xl">Our Work</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">A selection of edits crafted through storytelling, pacing, color and post-production.</p>
          </div>
        </div>
        <CategoryNavigation />
        <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
          {portfolioCategories.map((category, index) => {
            const videos = portfolioVideos.filter((video) => video.category === category);
            return (
              <section key={category} id={category} aria-labelledby={`${category}-heading`} className="scroll-mt-24 reveal">
                <div className="grid gap-3 border-b border-border pb-5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-end sm:gap-6">
                  <span className="font-display text-2xl text-primary">0{index + 1}</span>
                  <div className="min-w-0">
                    <h2 id={`${category}-heading`} className="font-display text-4xl font-medium uppercase leading-none sm:text-5xl">{categoryLabels[category]}</h2>
                    <p className="mt-2 text-xs text-muted-foreground">{categoryDescriptions[category]}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{String(videos.length).padStart(2, "0")} videos</span>
                </div>
                <EditorialGrid category={category} videos={videos} />
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section id="testimonials" className="border-y border-border bg-card px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Testimonials</p>
        <h2 className="mt-4 font-display text-4xl font-semibold uppercase leading-none sm:text-5xl">What Clients Say</h2>
        <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {testimonialVideos.map((video, index) => <VideoCard key={video.id} video={video} position={index + 1} />)}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-[1500px]">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Start a project</p>
        <div className="mt-6 grid items-end gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <h2 className="font-display text-4xl font-semibold uppercase leading-none sm:text-5xl lg:text-6xl">Have a project in mind?</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">Let&apos;s turn your footage into something worth watching.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="cinematic" size="cinematic"><a href={brandUrl} target="_blank" rel="noopener noreferrer">Start a project <ArrowRight /></a></Button>
            <Button asChild variant="cinematicOutline" size="cinematic"><a href={brandUrl} target="_blank" rel="noopener noreferrer">CineNest Media</a></Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[1500px] gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="flex min-w-0 items-center gap-4"><BrandLogo compact /><span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">CineNest Media</span></div>
        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 text-[10px] font-semibold uppercase">
          <a href="#portfolio" className="hover:text-primary">Portfolio</a><a href="#contact" className="hover:text-primary">Contact</a><a href={brandUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">Website</a>
        </nav>
      </div>
    </footer>
  );
}

function CineNestPortfolio() {
  return <main id="top" className="overflow-hidden"><Navigation /><PortfolioSection /><TestimonialSection /><CTA /><Footer /></main>;
}
