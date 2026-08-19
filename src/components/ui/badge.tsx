import { cn } from "@/lib/cn";
import type { BadgeId } from "@/data/types";
import { BADGE_LABELS } from "@/data/models";

const tone: Record<BadgeId, string> = {
  beginner: "border-gold/35 text-gold",
  pro: "border-paper/40 text-paper",
  fast: "border-safe/50 text-safe",
  heavy: "border-crash/50 text-crash",
  "audio-native": "border-gold-bright/40 text-gold-bright",
  "long-form": "border-muted/50 text-muted",
};

export function Badge({ id, className }: { id: BadgeId; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full border px-2 font-mono text-[10px] uppercase tracking-[0.14em]",
        tone[id],
        className,
      )}
    >
      {BADGE_LABELS[id]}
    </span>
  );
}

export function StatusDot({
  status,
}: {
  status: "comfortable" | "tight" | "crash";
}) {
  const map = {
    comfortable: "bg-safe text-bg",
    tight: "bg-warn text-bg",
    crash: "bg-crash text-fg",
  };
  const label = {
    comfortable: "Comfortable",
    tight: "Tight",
    crash: "Likely crash",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]", map[status])}>
      {label[status]}
    </span>
  );
}
