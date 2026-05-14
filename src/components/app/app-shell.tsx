import { useRouterState } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Bell, Search, Settings as SettingsIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  // Don't wrap API routes
  if (path.startsWith("/api")) return <>{children}</>;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center gap-3 border-b border-white/10 bg-background/60 backdrop-blur-xl sticky top-0 z-30 px-3 md:px-6">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="relative hidden md:flex items-center flex-1 max-w-md">
              <Search className="absolute left-3 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search workspace, tools, actions…"
                className="w-full h-9 rounded-lg bg-white/5 border border-white/10 pl-9 pr-3 text-xs placeholder:text-muted-foreground/60 outline-none focus:border-fuchsia-400/50 focus:bg-white/10 transition"
              />
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Notifications"
                className="relative h-9 w-9 grid place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                <Bell className="h-4 w-4 text-foreground/80" />
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-fuchsia-400 shadow-glow" />
              </button>
              <Link
                to="/settings"
                aria-label="Settings"
                className="h-9 w-9 grid place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                <SettingsIcon className="h-4 w-4 text-foreground/80" />
              </Link>
              <div
                className="h-9 w-9 rounded-lg grid place-items-center text-xs font-bold text-white shadow-glow"
                style={{ backgroundImage: "linear-gradient(135deg, oklch(0.6 0.28 305), oklch(0.7 0.28 350))" }}
                aria-label="Profile"
              >
                R
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-x-hidden">{children}</main>
          <footer className="border-t border-border/60 px-6 py-5 text-xs text-muted-foreground flex flex-col sm:flex-row gap-2 justify-between">
            <div>© {new Date().getFullYear()} Result Workplace AI. Built for professionals.</div>
            <div className="flex gap-4">
              <span>Privacy</span><span>Terms</span><span>Responsible AI</span>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
