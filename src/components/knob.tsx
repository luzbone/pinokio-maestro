import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useConsole } from "@/store/console-store";

export function Knob({
  controlId,
  label,
  children,
  className,
}: {
  controlId: string;
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  const open = useConsole((s) => s.openInspector);
  const active = useConsole((s) => s.inspectorId === controlId);

  return (
    <div
      className={cn(
        "rounded-md border p-2.5 transition-colors duration-150",
        active
          ? "border-gold bg-gold/10"
          : "border-transparent hover:border-border",
        className,
      )}
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        {label ? (
          <button
            type="button"
            onClick={() => open(controlId)}
            className="text-left font-mono text-xs uppercase tracking-[0.14em] text-muted hover:text-fg"
          >
            {label}
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => open(controlId)}
          className="inline-flex h-8 items-center rounded-sm border border-border bg-surface px-2.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-fg hover:border-gold hover:bg-gold hover:text-ink"
        >
          Explain
        </button>
      </div>
      {children}
    </div>
  );
}
