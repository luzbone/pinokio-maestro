import { Link } from "@tanstack/react-router";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="h-8 w-20 animate-pulse rounded-sm bg-elevated" aria-hidden />;
  }
  if (user) return <UserButton />;
  return (
    <Link
      to="/login"
      className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-gold"
    >
      Sign in
    </Link>
  );
}
