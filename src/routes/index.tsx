import { useEffect, useState } from "react";
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

function Home() {
  const lastPanel = useConsole((s) => s.lastPanel);
  const setPanel = useConsole((s) => s.setPanel);
  const setHydrated = useConsole((s) => s.setHydrated);
  const [active, setActive] = useState<SectionId>("models");

  useEffect(() => {
    let cancelled = false;
    const done = () => {
      if (cancelled) return;
      setHydrated(true);
      const hash = window.location.hash.replace("#", "") as SectionId;
      const stored = useConsole.getState().lastPanel;
      const target = SECTIONS.includes(hash) ? hash : stored;
      setActive(target);
      if (SECTIONS.includes(hash)) setPanel(hash);
      if (SECTIONS.includes(hash) || target !== "models") {
        document.getElementById(target)?.scrollIntoView({ behavior: "auto" });
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
  }, [setHydrated, setPanel]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") useConsole.getState().closeInspector();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target.id) return;
        const id = visible.target.id as SectionId;
        if (SECTIONS.includes(id)) {
          setActive(id);
          if (id !== lastPanel) setPanel(id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.35, 0.6] },
    );
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, [lastPanel, setPanel]);

  return (
    <>
      <div className="film-grain" aria-hidden />
      <a
        href="#models"
        className="absolute left-4 top-3 z-50 -translate-y-16 bg-gold px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-bg opacity-0 focus:translate-y-0 focus:opacity-100"
      >
        Skip to models
      </a>
      <FilmNav active={active} />
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
