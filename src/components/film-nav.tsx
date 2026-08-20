import { cn } from "@/lib/cn";
import { useConsole, type SectionId } from "@/store/console-store";

const ITEMS: { id: SectionId; label: string }[] = [
  { id: "models", label: "Models" },
  { id: "overview", label: "Overview" },
  { id: "studio", label: "Studio" },
  { id: "director", label: "Director" },
  { id: "edit", label: "Edit" },
  { id: "hardware", label: "Hardware Advisor" },
  { id: "cheat", label: "Cheat Sheet" },
];

export function FilmNav({ active }: { active: SectionId }) {
  const setPanel = useConsole((s) => s.setPanel);

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-bg/92 backdrop-blur-md">
      <div className="film-perf h-2 w-full opacity-80" />
      <nav
        className="mx-auto flex max-w-[1600px] items-center gap-3 px-3 py-2 md:px-6"
        aria-label="Studio sections"
      >
        <a
          href="#top"
          className="shrink-0 font-display text-lg tracking-wide text-gold md:text-xl"
          onClick={() => setPanel("models")}
        >
          Maestro
          <span className="ml-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">
            v1.9.0
          </span>
        </a>
        <ul className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto py-1">
          {ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setPanel(item.id)}
                aria-current={active === item.id ? "location" : undefined}
                className={cn(
                  "chip whitespace-nowrap rounded-sm md:px-3",
                  active === item.id && "chip-on",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="film-perf h-2 w-full opacity-80" />
    </div>
  );
}
