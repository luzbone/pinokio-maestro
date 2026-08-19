import { Button } from "@/components/ui/button";
import { useConsole } from "@/store/console-store";

export function Hero() {
  const setPanel = useConsole((s) => s.setPanel);

  const go = (id: "studio" | "director" | "hardware") => {
    setPanel(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative min-h-[88vh] overflow-hidden">
      <img
        src="/hero.jpg"
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40" />
      <div className="relative mx-auto flex min-h-[88vh] max-w-[1600px] flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
          Local NVIDIA studio · Golden Hour
        </p>
        <h1 className="mt-3 max-w-4xl font-display text-6xl leading-[0.92] text-fg md:text-8xl">
          Maestro
          <span className="block text-gold">v1.8.7.1</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted md:text-xl">
          Interactive studio — models, every control, and hardware-aware settings.
        </p>
        <p className="mt-3 max-w-xl text-sm text-subtle">
          Maestro is typically launched as a Pinokio app. This console stays inside the product.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" onClick={() => go("studio")}>
            Enter Studio
          </Button>
          <Button size="lg" variant="secondary" onClick={() => go("director")}>
            Enter Director
          </Button>
          <Button size="lg" variant="ghost" onClick={() => go("hardware")}>
            Open Hardware Advisor
          </Button>
        </div>
      </div>
    </section>
  );
}
