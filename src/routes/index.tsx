import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FilmNav } from "@/components/film-nav";
import { Hero } from "@/components/hero";
import { ModelsGallery } from "@/components/models-gallery";
import { OverviewSection } from "@/components/overview-section";
import { StudioConsole } from "@/components/studio-console";
import { DirectorConsole } from "@/components/director-console";
import { EditSection } from "@/components/edit-section";
import { HardwareAdvisor } from "@/components/hardware-advisor";
import { CheatSheet } from "@/components/cheat-sheet";
import { useConsole, type SectionId } from "@/store/console-store";

export const Route = createFileRoute("/")({ component: Home });

const SECTIONS: SectionId[] = [
  "models",
  "overview",
  "studio",
  "director",
  "edit",
  "hardware",
  "cheat",
];

function QueueTicker() {
  const running = useConsole((s) => s.studio.queue.some((j) => j.status === "running"));
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => useConsole.getState().tickQueue(), 380);
    return () => window.clearInterval(id);
  }, [running]);
  return null;
}

function Home() {
  const lockPanel = useConsole((s) => s.lockPanel);
  const setHydrated = useConsole((s) => s.setHydrated);

  useEffect(() => {
    let cancelled = false;
    const done = () => {
      if (cancelled) return;
      setHydrated(true);
      const hash = window.location.hash.replace("#", "") as SectionId;
      if (SECTIONS.includes(hash)) {
        lockPanel(hash);
        document.getElementById(hash)?.scrollIntoView({ behavior: "auto" });
      }
    };
    const result = useConsole.persist.rehydrate();
    if (result && typeof result.then === "function") {
      void result.then(done);
    } else {
      done();
    }
    return () => {
      cancelled = true;
    };
  }, [setHydrated, lockPanel]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") useConsole.getState().closeInspector();
    };
    const onHash = () => {
      const hash = window.location.hash.replace("#", "") as SectionId;
      if (SECTIONS.includes(hash)) lockPanel(hash);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", onHash);
    };
  }, [lockPanel]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const y = window.scrollY + 110;
      let current: SectionId = "models";
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      useConsole.getState().setPanel(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div className="film-grain" aria-hidden />
      <a
        href="#models"
        className="absolute left-4 top-3 z-50 -translate-y-16 bg-gold px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-ink opacity-0 focus:translate-y-0 focus:opacity-100"
      >
        Skip to models
      </a>
      <FilmNav />
      <QueueTicker />
      <main>
        <Hero />
        <ModelsGallery />
        <OverviewSection />
        <StudioConsole />
        <DirectorConsole />
        <EditSection />
        <HardwareAdvisor />
        <CheatSheet />
      </main>
    </>
  );
}
