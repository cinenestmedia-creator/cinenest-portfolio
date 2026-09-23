import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Menu, Play, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { projects, type Project } from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CineNest Media — Cinematic Video Post-Production" },
      { name: "description", content: "Cinematic video editing, color grading and post-production for creators, brands and filmmakers." },
      { property: "og:title", content: "CineNest Media — Cinematic Video Post-Production" },
      { property: "og:description", content: "Cinematic video editing, color grading and post-production for creators, brands and filmmakers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CineNestPortfolio,
});

const navItems = ["Work", "Services", "About", "Contact"] as const;
const categories = ["All", "Real Estate", "Weddings", "Marketing", "Social Content"] as const;

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" aria-label="CineNest Media home" className="group inline-flex items-center gap-3">
      <span className="grid h-8 w-8 place-items-center border border-primary text-xs font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">CN</span>
      {!compact && <span className="text-xs font-bold uppercase tracking-[0.18em]">CineNest Media</span>}
    </a>
  );
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-500 ${scrolled ? "border-border bg-background/95 backdrop-blur-md" : "border-transparent bg-background/60"}`}>
      <nav aria-label="Primary navigation" className="mx-auto grid h-20 max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center px-5 sm:px-8 lg:px-12">
        <div className="min-w-0"><Wordmark /></div>
        <div className="hidden items-center gap-9 md:flex">
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">{item}</a>)}
        </div>
        <Button variant="ghost" size="icon" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="md:hidden">
          {open ? <X /> : <Menu />}
        </Button>
      </nav>
      {open && (
        <div className="border-t border-border bg-background px-5 py-5 md:hidden">
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="flex min-h-12 items-center justify-between border-b border-border text-sm font-semibold uppercase"><span>{item}</span><ArrowRight className="h-4 w-4 text-primary" /></a>)}
        </div>
      )}
    </header>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="reveal grid gap-5 border-t border-border pt-6 md:grid-cols-[1fr_1.3fr] md:gap-12">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <div>
        <h2 className="font-display text-4xl font-semibold uppercase leading-none sm:text-6xl lg:text-7xl">{title}</h2>
        {description && <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>}
      </div>
    </div>
  );
}

function ProjectPlaceholder({ project }: { project: Project }) {
  const tones = {
    light: "bg-foreground text-background",
    lime: "bg-primary text-primary-foreground",
    deep: "bg-card text-foreground",
    outline: "bg-background text-foreground",
  };
  return (
    <div className={`cinematic-grid absolute inset-0 grid place-items-center border border-border ${tones[project.tone]}`}>
      <div className="text-center">
        <span className="font-display text-5xl font-semibold opacity-20 sm:text-7xl">{project.id.slice(-2)}</span>
        <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">Thumbnail placeholder</p>
      </div>
    </div>
  );
}

function VideoPlayer({ project }: { project: Project }) {
  if (!project.videoUrl || !project.videoProvider) {
    return <div className="cinematic-grid grid aspect-video place-items-center border border-border bg-card"><div className="text-center"><Play className="mx-auto h-10 w-10 text-primary" /><p className="mt-4 text-xs font-bold uppercase tracking-[0.16em]">Video will appear here</p><p className="mt-2 text-xs text-muted-foreground">Add a YouTube, Vimeo or direct video URL</p></div></div>;
  }
  if (project.videoProvider === "direct") return <video src={project.videoUrl} controls preload="metadata" className="aspect-video w-full bg-background" />;
  const embedUrl = project.videoProvider === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${getYouTubeId(project.videoUrl)}`
    : `https://player.vimeo.com/video/${getVimeoId(project.videoUrl)}`;
  return <iframe src={embedUrl} title={project.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="aspect-video w-full border-0" />;
}

function getYouTubeId(url: string) { return url.match(/(?:youtu\.be\/|v=|embed\/)([^&?]+)/)?.[1] ?? ""; }
function getVimeoId(url: string) { return url.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1] ?? ""; }

function WorkSection() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const filtered = category === "All" ? projects : projects.filter((project) => project.category === category);
  return (
    <section id="work" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading eyebrow="01 / Portfolio" title="Selected Work" description="A selection of projects crafted through editing, color and post-production." />
        <div aria-label="Filter projects" className="mt-12 flex gap-2 overflow-x-auto pb-3">
          {categories.map((item) => <Button key={item} variant={category === item ? "cinematic" : "cinematicOutline"} size="sm" onClick={() => setCategory(item)} className="shrink-0">{item}</Button>)}
        </div>
        <div className="mt-8 grid gap-x-5 gap-y-12 md:grid-cols-2">
          {filtered.map((project, index) => (
            <button key={project.id} type="button" onClick={() => setSelected(project)} className={`group text-left ${index % 3 === 0 ? "md:col-span-2" : ""}`} aria-label={`Open ${project.title}`}>
              <div className={`relative overflow-hidden ${index % 3 === 0 ? "aspect-[16/7]" : "aspect-[4/3]"}`}>
                {project.thumbnail ? <img src={project.thumbnail} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" /> : <ProjectPlaceholder project={project} />}
                <span className="absolute right-5 top-5 grid h-12 w-12 place-items-center border border-current bg-background/70 text-primary backdrop-blur-sm transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><Play className="h-4 w-4 fill-current" /></span>
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-b border-border py-5">
                <div className="min-w-0"><h3 className="truncate font-display text-2xl uppercase sm:text-3xl">{project.title}</h3><p className="mt-1 text-sm text-muted-foreground">{project.description}</p></div>
                <span className="shrink-0 pt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">{project.category}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <Dialog open={Boolean(selected)} onOpenChange={(isOpen) => !isOpen && setSelected(null)}>
        <DialogContent className="max-h-[94vh] max-w-[1200px] overflow-y-auto border-border bg-popover p-3 sm:p-5">
          {selected && <><DialogTitle className="sr-only">{selected.title}</DialogTitle><DialogDescription className="sr-only">{selected.description}</DialogDescription><VideoPlayer project={selected} /><div className="grid gap-6 p-3 sm:p-5 md:grid-cols-[1fr_auto]"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">{selected.category}</p><h3 className="mt-2 font-display text-4xl uppercase sm:text-5xl">{selected.title}</h3><p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">{selected.description}</p></div><div className="md:min-w-52"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Services</p><ul className="mt-3 space-y-2 text-sm">{selected.services.map((service) => <li key={service}>{service}</li>)}</ul>{selected.client && <><p className="mt-6 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Client</p><p className="mt-2 text-sm">{selected.client}</p></>}</div></div></>}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function Comparison({ label, before, after }: { label: string; before: string; after: string }) {
  const [position, setPosition] = useState(50);
  return (
    <div className="reveal">
      <div className="relative aspect-video overflow-hidden border border-border bg-card">
        <div className="cinematic-grid absolute inset-0 grid place-items-center"><span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">{after} placeholder</span></div>
        <div className="absolute inset-y-0 left-0 overflow-hidden bg-foreground text-background" style={{ width: `${position}%` }}><div className="cinematic-grid grid h-full place-items-center" style={{ width: `${10000 / position}%` }}><span className="text-xs font-bold uppercase tracking-[0.16em]">{before} placeholder</span></div></div>
        <div className="pointer-events-none absolute inset-y-0 w-px bg-primary" style={{ left: `${position}%` }}><span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">↔</span></div>
        <input type="range" min="10" max="90" value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-label={`${label} before and after comparison`} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
        <span className="absolute bottom-3 left-3 bg-background px-2 py-1 text-[9px] font-bold uppercase">{before}</span><span className="absolute bottom-3 right-3 bg-background px-2 py-1 text-[9px] font-bold uppercase">{after}</span>
      </div>
      <h3 className="mt-4 text-sm font-bold uppercase">{label}</h3>
    </div>
  );
}

const services = [
  ["Video Editing", "Story-driven editing designed around pacing, emotion and retention."],
  ["Color Grading", "Professional color correction and cinematic finishing."],
  ["Motion & VFX", "Masking, tracking, compositing, transitions and visual effects."],
  ["Short-Form Content", "High-retention reels and social content designed for modern platforms."],
];

function CineNestPortfolio() {
  return (
    <main id="top" className="overflow-hidden">
      <Navigation />
      <section className="cinematic-grid relative flex min-h-[92vh] items-end px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-12">
        <div className="mx-auto w-full max-w-[1600px]">
          <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Video post-production studio</p>
          <h1 className="max-w-7xl font-display text-[clamp(3.5rem,9vw,9rem)] font-semibold uppercase leading-[0.88]">We turn raw footage<br />into stories <span className="text-primary">worth watching.</span></h1>
          <div className="mt-10 grid items-end gap-8 border-t border-border pt-7 md:grid-cols-[1fr_auto]">
            <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">Cinematic video editing, color grading & post-production for creators, brands and filmmakers.</p>
            <div className="flex flex-col gap-3 sm:flex-row"><Button asChild variant="cinematic" size="cinematic"><a href="#work">Explore our work <ArrowDown /></a></Button><Button asChild variant="cinematicOutline" size="cinematic"><a href="#contact">Start a project <ArrowRight /></a></Button></div>
          </div>
        </div>
      </section>

      <WorkSection />

      <section className="bg-foreground px-5 py-24 text-background sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-[1600px]"><div className="grid gap-5 border-t border-background/20 pt-6 md:grid-cols-[1fr_1.3fr] md:gap-12"><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">02 / Transformation</p><div><h2 className="font-display text-4xl font-semibold uppercase leading-none sm:text-6xl lg:text-7xl">From Raw to Refined</h2><p className="mt-5 max-w-xl text-sm leading-7 opacity-60">Move each divider to preview where original material and final craft will live.</p></div></div><div className="mt-14 grid gap-8 lg:grid-cols-3"><Comparison label="Color Grading" before="Raw" after="Final" /><Comparison label="Editing" before="Raw Footage" after="Final Cut" /><Comparison label="Post Production" before="Raw" after="Cinematic" /></div></div>
      </section>

      <section id="services" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32 lg:px-12"><div className="mx-auto max-w-[1600px]"><SectionHeading eyebrow="03 / Services" title="What We Do" /><div className="mt-14 border-t border-border">{services.map(([title, text], index) => <div key={title} className="reveal grid gap-3 border-b border-border py-8 sm:grid-cols-[4rem_1fr_1fr] sm:items-center sm:gap-8"><span className="text-xs text-primary">0{index + 1}</span><h3 className="font-display text-3xl uppercase sm:text-4xl">{title}</h3><p className="max-w-md text-sm leading-7 text-muted-foreground">{text}</p></div>)}</div></div></section>

      <section id="about" className="scroll-mt-24 bg-primary px-5 py-24 text-primary-foreground sm:px-8 sm:py-32 lg:px-12"><div className="mx-auto max-w-[1600px]"><p className="text-[11px] font-bold uppercase tracking-[0.18em]">04 / About</p><div className="mt-16 grid gap-12 md:grid-cols-2"><div><h2 className="font-display text-4xl uppercase leading-none sm:text-6xl">Built for creators who care about their work.</h2><p className="mt-7 max-w-lg text-sm leading-7 opacity-75 sm:text-base">CineNest Media is a post-production partner helping videographers, creators and brands turn their footage into polished, cinematic content.</p></div><p className="self-end border-t border-primary-foreground/30 pt-6 font-display text-4xl uppercase leading-tight sm:text-5xl">You capture the story.<br />We shape the final experience.</p></div></div></section>

      <section aria-label="Client and testimonial placeholders" className="px-5 py-16 sm:px-8 lg:px-12"><div className="mx-auto grid max-w-[1600px] gap-8 border-y border-border py-10 md:grid-cols-[1fr_2fr]"><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Selected collaborations</p><p className="text-sm text-muted-foreground">Client logos, selected client work and testimonials can be added here when ready.</p></div></section>

      <section id="contact" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-36 lg:px-12"><div className="mx-auto max-w-[1600px]"><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">05 / Start a project</p><h2 className="mt-10 max-w-6xl font-display text-5xl uppercase leading-[0.95] sm:text-7xl lg:text-8xl">Have footage waiting to become something <span className="text-primary">great?</span></h2><div className="mt-10 grid items-end gap-8 border-t border-border pt-7 md:grid-cols-[1fr_auto]"><p className="text-base text-muted-foreground">Let&apos;s turn it into content you&apos;re proud to put your name on.</p><div className="flex flex-col gap-3 sm:flex-row"><Button variant="cinematic" size="cinematic">Start a project <ArrowRight /></Button><Button asChild variant="cinematicOutline" size="cinematic"><a href="#work">View our work</a></Button></div></div></div></section>

      <footer className="border-t border-border px-5 py-12 sm:px-8 lg:px-12"><div className="mx-auto max-w-[1600px]"><div className="grid gap-10 md:grid-cols-2"><div><Wordmark /><p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">Cinematic video post-production for creators, brands and filmmakers.</p></div><div className="grid grid-cols-2 gap-4 text-xs font-semibold uppercase sm:grid-cols-3">{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-primary">{item}</a>)}<span className="text-muted-foreground">Instagram</span><span className="text-muted-foreground">LinkedIn</span></div></div><p className="mt-16 border-t border-border pt-6 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">© CineNest Media. All rights reserved.</p></div></footer>
    </main>
  );
}