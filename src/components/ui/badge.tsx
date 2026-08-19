import { cn } from "@/lib/cn";
import type { BadgeId } from "@/data/types";
import { BADGE_LABELS } from "@/data/models";

const tone: Record<BadgeId, string> = {
  beginner: "bg-safe-bg text-safe",
  pro: "bg-pro-bg text-pro",
  fast: "bg-inset text-gold",
  heavy: "bg-pro-bg text-pro",
  "audio-native": "bg-audio-bg text-audio",
  "long-form": "bg-long-bg text-muted",
};

export function Badge({ id, className }: { id: BadgeId; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full px-2.5 font-mono text-xs uppercase tracking-[0.14em]",
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
    comfortable: "bg-safe text-ink",
    tight: "bg-warn text-ink",
    crash: "bg-crash text-ink",
  };
  const label = {
    comfortable: "Comfortable",
    tight: "Tight",
    crash: "Likely crash",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 font-mono text-xs uppercase tracking-[0.14em]",
        map[status],
      )}
    >
      {label[status]}
    </span>
  );
}
