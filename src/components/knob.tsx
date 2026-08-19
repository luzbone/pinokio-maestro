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
        "rounded-md border border-transparent p-2 transition-colors duration-150",
        active ? "border-gold/40 bg-gold/5" : "hover:border-border",
        className,
      )}
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        {label ? (
          <button
            type="button"
            onClick={() => open(controlId)}
            className="text-left font-mono text-[10px] uppercase tracking-[0.14em] text-muted hover:text-gold"
          >
            {label}
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => open(controlId)}
          className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold/70 hover:text-gold"
        >
          Explain
        </button>
      </div>
      {children}
    </div>
  );
}
