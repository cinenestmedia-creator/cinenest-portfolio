import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Menu, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  brandLogo,
  brandUrl,
  categoryLabels,
  projects,
  vsl,
  type AspectRatio,
  type Project,
  type ProjectCategory,
  type VideoPlatform,
} from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CineNest Media — Video Post-Production Portfolio" },
      {
        name: "description",
        content:
          "Watch selected video editing, color, motion and post-production work by CineNest Media.",
      },
      { property: "og:title", content: "CineNest Media — Video Post-Production Portfolio" },
      {
        property: "og:description",
        content:
          "Watch selected video editing, color, motion and post-production work by CineNest Media.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CineNestPortfolio,
});

type Filter = "all" | ProjectCategory;
const projectCategories: ProjectCategory[] = ["real-estate", "marketing", "youtube"];
const filterOptions: { value: Filter; label: string }[] = [
  { value: "all", label: "All Work" },
  ...projectCategories.map((c) => ({ value: c as Filter, label: categoryLabels[c] })),
];

function LogoSlot({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={brandUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="CineNest Media — visit cinenestmedia.com"
      className={`block h-9 ${compact ? "w-24" : "w-32 sm:w-40"}`}
    >
      {brandLogo ? (
        <img src={brandLogo} alt="CineNest Media" className="h-full w-auto object-contain" />
      ) : (
        <span className="sr-only">CineNest Media logo</span>
      )}
    </a>
  );
}

function Navigation({ filter, onSelect }: { filter: Filter; onSelect: (f: Filter) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open && !menu) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setMenu(false);
      }
    };
    const onClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenu(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, menu]);

  const pick = (f: Filter) => {
    setMenu(false);
    setOpen(false);
    onSelect(f);
  };

  const linkClass =
    "text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-border bg-background/95 backdrop-blur-md"
          : "border-transparent bg-background/80"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto grid h-16 max-w-[1500px] grid-cols-[minmax(0,1fr)_auto] items-center px-5 sm:h-18 sm:px-8 lg:px-12"
      >
        <div className="min-w-0">
          <LogoSlot />
        </div>
        <div className="hidden items-center gap-9 md:flex">
          <div ref={menuRef} className="relative">
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={menu}
              onClick={() => setMenu((v) => !v)}
              className={`${linkClass} inline-flex items-center gap-1.5 ${menu ? "text-primary" : ""}`}
            >
              Portfolio
              <ChevronDown className={`h-3 w-3 transition-transform ${menu ? "rotate-180" : ""}`} />
            </button>
            {menu && (
              <div className="absolute right-0 top-full mt-5 w-52 border border-border bg-background py-2 animate-in fade-in-0 slide-in-from-top-1">
                {filterOptions.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => pick(o.value)}
                    className={`group grid w-full grid-cols-[minmax(0,1fr)_auto] items-center px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors hover:text-primary ${
                      filter === o.value ? "text-primary" : "text-foreground/80"
                    }`}
                  >
                    <span>{o.label}</span>
                    <span
                      className={`h-px w-4 bg-primary transition-opacity ${
                        filter === o.value ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          <a href="#contact" className={linkClass}>
            Contact
          </a>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="md:hidden"
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>
      {open && (
        <div className="border-t border-border bg-background px-5 py-3 md:hidden">
          <p className="pb-1 pt-2 text-[9px] font-bold uppercase tracking-[0.16em] text-primary">
            Portfolio
          </p>
          {filterOptions.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => pick(o.value)}
              className={`grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto] items-center border-b border-border text-left text-xs font-semibold uppercase ${
                filter === o.value ? "text-primary" : ""
              }`}
            >
              <span className="min-w-0 truncate">{o.label}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-primary" />
            </button>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="grid min-h-11 grid-cols-[minmax(0,1fr)_auto] items-center text-xs font-semibold uppercase"
          >
            <span>Contact</span>
            <ArrowRight className="h-4 w-4 shrink-0 text-primary" />
          </a>
        </div>
      )}
    </header>
  );
}

function getYouTubeId(url: string) {
  return url.match(/(?:youtu\.be\/|v=|embed\/)([^&?]+)/)?.[1] ?? "";
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

const ratioClasses: Record<AspectRatio, string> = {
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
  "2.39:1": "aspect-[2.39/1]",
};

function VideoPlayer({
  title,
  videoUrl,
  platform,
  aspectRatio,
}: {
  title: string;
  videoUrl: string;
  platform: VideoPlatform;
  aspectRatio: AspectRatio;
}) {
  const ratioClass = ratioClasses[aspectRatio];
  if (!videoUrl || !platform) {
    return (
      <div
        className={`${ratioClass} cinematic-grid grid max-h-[78vh] w-full place-items-center border border-border bg-card`}
      >
        <div className="px-6 text-center">
          <Play className="mx-auto h-9 w-9 text-primary" />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em]">Video placeholder</p>
        </div>
      </div>
    );
  }

  const embedUrl = getEmbedUrl(videoUrl, platform);
  if (!embedUrl) return null;

  if (platform === "direct") {
    return (
      <video
        src={embedUrl}
        controls
        preload="metadata"
        className={`${ratioClass} max-h-[78vh] w-full bg-background object-contain`}
      />
    );
  }

  return (
    <iframe
      src={embedUrl}
      title={title}
      loading="lazy"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className={`${ratioClass} max-h-[78vh] w-full border-0 bg-background`}
    />
  );
}

function MediaDialog({
  open,
  onOpenChange,
  title,
  description,
  videoUrl,
  platform,
  aspectRatio,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  videoUrl: string;
  platform: VideoPlatform;
  aspectRatio: AspectRatio;
}) {
  const portrait = aspectRatio === "9:16";
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`max-h-[94vh] overflow-y-auto border-border bg-popover p-3 sm:p-4 ${
          portrait ? "max-w-[min(92vw,34rem)]" : "max-w-[min(94vw,1200px)]"
        }`}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>
        <VideoPlayer
          title={title}
          videoUrl={videoUrl}
          platform={platform}
          aspectRatio={aspectRatio}
        />
      </DialogContent>
    </Dialog>
  );
}

function VslSection() {
  const [open, setOpen] = useState(false);
  return (
    <section className="px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:px-12">
      <div className="mx-auto max-w-[1320px]">
        <Button
          variant="ghost"
          onClick={() => setOpen(true)}
          className="group relative h-auto w-full overflow-hidden rounded-none border border-border p-0 text-left hover:bg-card"
          aria-label="Open VSL video"
        >
          <div className="aspect-video w-full overflow-hidden bg-card">
            {vsl.thumbnail ? (
              <img
                src={vsl.thumbnail}
                alt="CineNest Media VSL"
                fetchPriority="high"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
              />
            ) : (
              <div className="cinematic-grid grid h-full place-items-center">
                <div className="text-center">
                  <span className="font-display text-4xl font-semibold uppercase text-foreground/20 sm:text-6xl">
                    VSL Video
                  </span>
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    Poster placeholder
                  </p>
                </div>
              </div>
            )}
          </div>
          <span className="absolute inset-0 grid place-items-center bg-background/10 transition-colors group-hover:bg-background/20">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16">
              <Play className="h-5 w-5 fill-current sm:h-6 sm:w-6" />
            </span>
          </span>
        </Button>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border py-4">
          <p className="min-w-0 truncate text-sm font-semibold sm:text-base">{vsl.title}</p>
          <p className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-primary">VSL Video</p>
        </div>
      </div>
      <MediaDialog
        open={open}
        onOpenChange={setOpen}
        title={vsl.title}
        description="CineNest Media video sales letter"
        videoUrl={vsl.videoUrl}
        platform={vsl.platform}
        aspectRatio={vsl.aspectRatio}
      />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  className = "",
}: {
  project: Project;
  index: number;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const label = categoryLabels[project.category];
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className={`group min-w-0 ${className}`}>
      <Button
        variant="ghost"
        onClick={() => setOpen(true)}
        className="h-auto w-full justify-start rounded-none p-0 text-left hover:bg-transparent"
        aria-label={`Watch ${project.title}`}
      >
        <span
          className={`${ratioClasses[project.aspectRatio]} relative block w-full overflow-hidden border border-border bg-card transition-colors duration-300 group-hover:border-primary/60`}
        >
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <span className="cinematic-grid absolute inset-0 block bg-card transition-transform duration-500 group-hover:scale-[1.02]">
              <span className="absolute left-4 top-3 font-display text-5xl font-semibold leading-none text-foreground/15 sm:text-6xl">
                {number}
              </span>
              <span className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Video placeholder
                </span>
              </span>
              <span className="absolute bottom-4 right-4 border border-border px-1.5 py-0.5 text-[9px] font-bold tracking-[0.1em] text-primary">
                {project.aspectRatio}
              </span>
            </span>
          )}
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-12 w-12 scale-90 place-items-center rounded-full bg-primary text-primary-foreground opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
              <Play className="h-4 w-4 fill-current" />
            </span>
          </span>
        </span>
      </Button>
      <div className="py-3">
        <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-primary">{label}</p>
        <h3 className="mt-1 font-display text-lg font-medium uppercase leading-tight transition-transform duration-300 group-hover:translate-x-1">
          {project.title}
        </h3>
        {project.description && (
          <p className="mt-1.5 max-w-xl text-xs leading-6 text-muted-foreground">
            {project.description}
          </p>
        )}
      </div>
      <MediaDialog
        open={open}
        onOpenChange={setOpen}
        title={project.title}
        description={project.description || `${label} video project`}
        videoUrl={project.videoUrl}
        platform={project.platform}
        aspectRatio={project.aspectRatio}
      />
    </article>
  );
}

function CategoryGrid({ category, items }: { category: ProjectCategory; items: Project[] }) {
  if (category === "real-estate") {
    // Landscape clips span the full row; portrait clips sit three across.
    return (
      <div className="mx-auto mt-6 grid max-w-[1100px] grid-cols-1 gap-x-5 gap-y-8 sm:mt-8 sm:grid-cols-3">
        {items.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            className={
              p.aspectRatio === "9:16" ? "mx-auto w-full max-w-sm sm:max-w-none" : "sm:col-span-3"
            }
          />
        ))}
      </div>
    );
  }
  return (
    <div
      className={`mt-6 grid grid-cols-1 gap-x-5 gap-y-8 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 ${
        category === "youtube" ? "lg:gap-x-7" : ""
      }`}
    >
      {items.map((p, i) => (
        <ProjectCard key={p.id} project={p} index={i} />
      ))}
    </div>
  );
}

function WorkSection({ filter, onFilter }: { filter: Filter; onFilter: (f: Filter) => void }) {
  const visibleCategories = filter === "all" ? projectCategories : [filter];

  return (
    <section id="work" className="scroll-mt-20 px-5 pb-24 pt-12 sm:px-8 sm:pb-32 lg:px-12">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-4 border-t border-border pt-5 md:grid-cols-[1fr_1.2fr] md:gap-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
            01 / Selected Work
          </p>
          <div>
            <h1 className="font-display text-4xl font-semibold uppercase leading-none sm:text-5xl lg:text-6xl">
              Selected Work
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Editing, color, motion and post-production crafted to make every frame count.
            </p>
          </div>
        </div>

        <div aria-label="Filter projects" className="mt-8 flex gap-2 overflow-x-auto pb-2 sm:mt-10">
          {filterOptions.map((o) => (
            <Button
              key={o.value}
              variant={filter === o.value ? "cinematic" : "cinematicOutline"}
              size="sm"
              onClick={() => onFilter(o.value)}
              aria-pressed={filter === o.value}
              className="shrink-0 uppercase"
            >
              {o.label}
            </Button>
          ))}
        </div>

        <div className="mt-12 space-y-20 sm:mt-16 sm:space-y-24">
          {visibleCategories.map((cat) => {
            const items = projects.filter((p) => p.category === cat);
            return (
              <section
                key={cat}
                id={`portfolio-${cat}`}
                aria-labelledby={`category-${cat}`}
                className="scroll-mt-24"
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-b border-border pb-4">
                  <h2
                    id={`category-${cat}`}
                    className="min-w-0 truncate font-display text-3xl font-medium uppercase sm:text-4xl"
                  >
                    {categoryLabels[cat]}
                  </h2>
                  <span className="shrink-0 text-[10px] text-muted-foreground">
                    {String(items.length).padStart(2, "0")}
                  </span>
                </div>
                <CategoryGrid category={cat} items={items} />
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-border px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-[1500px]">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
          02 / Start a project
        </p>
        <div className="mt-7 grid items-end gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <h2 className="font-display text-4xl font-semibold uppercase leading-none sm:text-5xl lg:text-6xl">
              Have a project in mind?
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Let&apos;s turn your footage into work you&apos;re proud to put your name on.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="cinematic" size="cinematic">
              Start a project <ArrowRight />
            </Button>
            <Button asChild variant="cinematicOutline" size="cinematic">
              <a href="#work">Back to work</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-5 py-9 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[1500px] grid-cols-[minmax(0,1fr)_auto] items-center gap-6">
        <div className="flex min-w-0 items-center gap-4">
          <LogoSlot compact />
          <span className="truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            CineNest Media
          </span>
        </div>
        <div className="hidden items-center gap-6 text-[10px] font-semibold uppercase sm:flex">
          <a href="#work" className="hover:text-primary">Work</a>
          <a href="#contact" className="hover:text-primary">Contact</a>
          <span className="text-muted-foreground">Instagram</span>
          <span className="text-muted-foreground">LinkedIn</span>
        </div>
      </div>
    </footer>
  );
}

function CineNestPortfolio() {
  const [filter, setFilter] = useState<Filter>("all");

  const selectFromNav = (f: Filter) => {
    setFilter(f);
    requestAnimationFrame(() => {
      const target = document.getElementById(f === "all" ? "work" : `portfolio-${f}`);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <main id="top" className="overflow-hidden">
      <Navigation filter={filter} onSelect={selectFromNav} />
      <VslSection />
      <WorkSection filter={filter} onFilter={setFilter} />
      <ContactSection />
      <Footer />
    </main>
  );
}
