import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="relative grid min-h-screen place-items-center px-6">
      <div className="film-grain" aria-hidden />
      <img src="/hero.jpg" alt="" className="absolute inset-0 size-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-bg/80" />
      <div className="relative w-full max-w-sm rounded-xl border border-border bg-surface p-6 bezel">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Maestro Console</p>
        <h1 className="mt-2 font-display text-3xl text-fg">Sign in</h1>
        <p className="mt-2 text-sm text-muted">
          Optional. The studio replica is open without an account.
        </p>
        <div className="mt-6 space-y-2">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                variant="secondary"
                className="w-full"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              >
                Continue with {p.label}
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted">Sign-in is disabled.</p>
          )}
        </div>
        <Link
          to="/"
          className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-gold"
        >
          Back to studio
        </Link>
      </div>
    </main>
  );
}
