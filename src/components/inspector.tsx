import { X } from "lucide-react";
import { controlById } from "@/data/controls";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useConsole } from "@/store/console-store";

export function Inspector() {
  const id = useConsole((s) => s.inspectorId);
  const close = useConsole((s) => s.closeInspector);
  const control = id ? controlById(id) : undefined;

  if (!control) return null;

  return (
    <aside
      className="shutter-open flex h-full min-h-0 flex-col border-l border-border bg-surface"
      role="dialog"
      aria-labelledby="inspector-title"
    >
      <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
            Inspector
          </p>
          <h3 id="inspector-title" className="mt-1 font-display text-2xl text-fg">
            {control.maestroName}
          </h3>
          {control.typical ? (
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Typical Studio control
            </p>
          ) : null}
        </div>
        <Button variant="ghost" size="sm" onClick={close} aria-label="Close inspector">
          <X className="size-4" />
        </Button>
      </div>
      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-4">
        <div className="flex flex-wrap gap-1.5">
          {control.badges.map((b) => (
            <Badge key={b} id={b} />
          ))}
        </div>
        <Block title="What this does" body={control.what} />
        <Block title="Beginner" body={`${control.beginner} Default: ${control.beginnerDefault}`} />
        {control.low || control.mid || control.high ? (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
              Low / mid / high
            </p>
            <dl className="mt-2 space-y-2 text-sm text-muted">
              {control.low ? (
                <div>
                  <dt className="font-medium text-fg">Low</dt>
                  <dd>{control.low}</dd>
                </div>
              ) : null}
              {control.mid ? (
                <div>
                  <dt className="font-medium text-fg">Mid</dt>
                  <dd>{control.mid}</dd>
                </div>
              ) : null}
              {control.high ? (
                <div>
                  <dt className="font-medium text-fg">High</dt>
                  <dd>{control.high}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        ) : null}
        <Block title="When to leave it alone" body={control.leaveAlone} />
      </div>
    </aside>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
