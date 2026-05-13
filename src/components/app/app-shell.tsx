import { useRouterState } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  // Don't wrap API routes
  if (path.startsWith("/api")) return <>{children}</>;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center gap-3 border-b border-border/60 bg-background/70 backdrop-blur sticky top-0 z-30 px-3 md:px-6">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gradient-brand" />
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Powered by Lovable AI · Responsible use encouraged
              </span>
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
