import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  FileText,
  CalendarCheck,
  MessagesSquare,
  ArrowRight,
  Sparkles,
  Zap,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { AiDisclaimer } from "@/components/app/ai-disclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Generate emails, summarize meetings, plan your day, and chat with an AI workplace assistant.",
      },
    ],
  }),
  component: Home,
});

const tools = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    desc: "Draft professional emails in any tone — formal, friendly, or persuasive.",
  },
  {
    to: "/notes",
    icon: FileText,
    title: "Meeting Notes Summarizer",
    desc: "Turn long notes into action items, decisions, and deadlines.",
  },
  {
    to: "/planner",
    icon: CalendarCheck,
    title: "AI Task Planner",
    desc: "Build prioritized daily schedules and get productivity suggestions.",
  },
  {
    to: "/chat",
    icon: MessagesSquare,
    title: "AI Chatbot Assistant",
    desc: "Ask anything about meetings, communication, or workflows.",
  },
] as const;

function Home() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh -z-10" />
        <div className="px-4 md:px-8 pt-10 md:pt-16 pb-12 md:pb-20 max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Your AI workplace co-pilot
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight max-w-3xl animate-slide-up">
            Do your best work,{" "}
            <span className="text-gradient-brand">faster than ever.</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl animate-slide-up">
            Lumen drafts emails, summarizes meetings, plans your day, and answers workplace
            questions — so you can focus on what matters.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/email"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand text-white px-5 py-3 text-sm font-semibold shadow-glow hover:opacity-95 transition"
            >
              Start with email <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-xl border bg-background px-5 py-3 text-sm font-semibold hover:bg-accent transition"
            >
              Try the assistant
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-xl">
            {[
              { icon: Zap, k: "10x", l: "faster drafts" },
              { icon: Clock, k: "30m", l: "saved daily" },
              { icon: ShieldCheck, k: "100%", l: "in your control" },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border bg-card/70 backdrop-blur p-4 shadow-card"
              >
                <s.icon className="h-4 w-4 text-primary" />
                <div className="mt-2 text-2xl font-bold tracking-tight">{s.k}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="px-4 md:px-8 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Your workspace</h2>
          <span className="text-sm text-muted-foreground hidden sm:inline">4 productivity tools</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {tools.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="group relative rounded-2xl border bg-card p-5 shadow-card hover:shadow-glow transition-all hover:-translate-y-0.5"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-brand opacity-0 group-hover:opacity-[0.04] transition" />
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-gradient-brand-soft border border-border/60 grid place-items-center group-hover:bg-gradient-brand transition">
                  <t.icon className="h-5 w-5 text-primary group-hover:text-white transition" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold tracking-tight">{t.title}</div>
                  <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                    Open tool <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <AiDisclaimer />
        </div>
      </section>
    </div>
  );
}
