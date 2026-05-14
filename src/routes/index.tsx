import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  Mail,
  FileText,
  CalendarCheck,
  MessagesSquare,
  ArrowRight,
  Sparkles,
  Zap,
  Clock,
  Bot,
  BarChart3,
  Activity,
  Cpu,
  Workflow,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant — Result" },
      {
        name: "description",
        content:
          "Automate workplace tasks using intelligent AI tools — emails, summaries, planning and chat in one futuristic dashboard.",
      },
    ],
  }),
  component: Home,
});

const features = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    desc: "Draft polished, on-brand emails in any tone in seconds.",
  },
  {
    to: "/notes",
    icon: FileText,
    title: "Meeting Notes Summarizer",
    desc: "Turn raw transcripts into crisp summaries and action items.",
  },
  {
    to: "/planner",
    icon: CalendarCheck,
    title: "AI Task Planner",
    desc: "Auto-prioritize your day with intelligent time blocking.",
  },
  {
    to: "/chat",
    icon: MessagesSquare,
    title: "AI Chatbot Assistant",
    desc: "Ask anything about workflows, comms, or productivity.",
  },
] as const;

const stats = [
  { value: 10000, suffix: "+", label: "Tasks Automated", icon: Workflow },
  { value: 98, suffix: "%", label: "Productivity Boost", icon: Activity },
  { value: 24, suffix: "/7", label: "AI Assistance", icon: Cpu },
] as const;

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20, mass: 1 });

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, to, mv]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) {
        const n = Math.round(v);
        ref.current.textContent =
          n >= 1000 ? `${Math.round(n / 100) / 10}K${suffix}` : `${n}${suffix}`;
      }
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

function Home() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Animated background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full opacity-50 blur-3xl animate-blob"
          style={{ background: "radial-gradient(circle, oklch(0.6 0.28 320 / 0.7), transparent 60%)" }}
        />
        <div
          className="absolute top-40 -right-20 h-[32rem] w-[32rem] rounded-full opacity-50 blur-3xl animate-blob"
          style={{
            background: "radial-gradient(circle, oklch(0.65 0.28 350 / 0.7), transparent 60%)",
            animationDelay: "-6s",
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full opacity-40 blur-3xl animate-blob"
          style={{
            background: "radial-gradient(circle, oklch(0.55 0.25 290 / 0.6), transparent 60%)",
            animationDelay: "-12s",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07] animate-grid"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      {/* Hero */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto pt-12 md:pt-20 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-foreground/80"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500" />
          </span>
          New · Result Workplace AI v2
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 mx-auto text-center text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-4xl leading-[1.2]"
        >
          Work smarter, not harder —{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-400">
            let AI handle the heavy lifting
          </span>{" "}
          while you focus on what truly matters.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-6 mx-auto text-center text-base md:text-lg text-muted-foreground/80 max-w-2xl leading-relaxed"
        >
          Empower your work with AI that handles the busywork — polished emails,
          clear summaries, and a co-pilot that helps you think smarter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <Link
            to="/email"
            className="group relative inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
            style={{ backgroundImage: "linear-gradient(135deg, oklch(0.65 0.28 320), oklch(0.7 0.28 350))" }}
          >
            <Sparkles className="h-4 w-4" />
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 backdrop-blur px-6 py-3.5 text-sm font-semibold hover:bg-white/10 transition"
          >
            Explore Features
          </a>
        </motion.div>

        {/* Floating chips */}
        <div className="hidden md:block">
          <motion.div
            className="absolute right-12 top-40 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3 shadow-glow animate-float"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <div className="flex items-center gap-2 text-sm">
              <Bot className="h-4 w-4 text-fuchsia-400" />
              <span className="text-foreground/90">Drafting reply…</span>
            </div>
          </motion.div>
          <motion.div
            className="absolute right-44 top-72 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3 shadow-glow animate-float"
            style={{ animationDelay: "-3s" }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-pink-400" />
              <span className="text-foreground/90">Saved 32 mins today</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 md:px-8 max-w-7xl mx-auto py-12 md:py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-fuchsia-400">
              Workspace
            </div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              Everything you need, in one workspace
            </h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.to}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link
                to={f.to}
                className="group relative block h-full rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 overflow-hidden transition-all hover:-translate-y-1 hover:border-fuchsia-400/40 hover:shadow-glow"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                  style={{ background: "radial-gradient(600px circle at 50% 0%, oklch(0.7 0.28 330 / 0.15), transparent 60%)" }}
                />
                <div
                  className="relative h-12 w-12 rounded-xl grid place-items-center shadow-glow"
                  style={{ backgroundImage: "linear-gradient(135deg, oklch(0.6 0.28 305), oklch(0.7 0.28 350))" }}
                >
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <div className="relative mt-5 font-semibold text-lg tracking-tight">{f.title}</div>
                <p className="relative mt-2 text-sm text-muted-foreground">{f.desc}</p>
                <div className="relative mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-fuchsia-300">
                  Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto py-12 md:py-16">
        <div className="grid sm:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 hover:border-pink-400/40 hover:shadow-glow transition-colors"
            >
              <div className="flex items-center justify-between">
                <div
                  className="h-10 w-10 rounded-xl grid place-items-center"
                  style={{ backgroundImage: "linear-gradient(135deg, oklch(0.6 0.28 305), oklch(0.7 0.28 350))" }}
                >
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <Sparkles className="h-4 w-4 text-fuchsia-300/70" />
              </div>
              <div className="mt-5 text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-300 via-pink-300 to-purple-300">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dashboard preview */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto py-12 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-fuchsia-400">Preview</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
            Your futuristic AI command center
          </h2>
          <p className="mt-3 text-muted-foreground">
            A unified dashboard where every tool, insight, and action is one click away.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-3 md:p-4 shadow-glow"
        >
          <div className="grid grid-cols-12 gap-3 min-h-[420px]">
            {/* Mock sidebar */}
            <div className="col-span-3 lg:col-span-2 rounded-2xl border border-white/10 bg-black/30 p-3">
              <div className="flex items-center gap-2 px-2 py-2">
                <div className="h-7 w-7 rounded-lg grid place-items-center"
                  style={{ backgroundImage: "linear-gradient(135deg, oklch(0.6 0.28 305), oklch(0.7 0.28 350))" }}>
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-xs font-bold hidden lg:inline">Result</span>
              </div>
              <div className="mt-3 space-y-1">
                {[Mail, FileText, CalendarCheck, MessagesSquare, BarChart3].map((Icon, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-2 py-2 rounded-lg text-xs ${
                      i === 0 ? "bg-white/10 text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden lg:inline">Item</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main */}
            <div className="col-span-9 lg:col-span-10 grid grid-cols-6 gap-3">
              <div className="col-span-6 lg:col-span-4 rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Productivity Trend</div>
                  <BarChart3 className="h-4 w-4 text-fuchsia-300" />
                </div>
                <div className="mt-5 flex items-end gap-2 h-32">
                  {[40, 65, 50, 80, 60, 92, 75, 88, 70, 95, 82, 98].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.6 }}
                      className="flex-1 rounded-md"
                      style={{ backgroundImage: "linear-gradient(to top, oklch(0.55 0.25 305), oklch(0.75 0.28 350))" }}
                    />
                  ))}
                </div>
              </div>
              <div className="col-span-6 lg:col-span-2 rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-sm font-semibold">AI Assistant</div>
                <div className="mt-4 space-y-2 text-xs">
                  <div className="rounded-lg bg-white/5 p-2.5">Summarize today's standup</div>
                  <div className="rounded-lg bg-fuchsia-500/15 p-2.5 text-fuchsia-100">
                    3 blockers, 5 action items captured.
                  </div>
                  <div className="rounded-lg bg-white/5 p-2.5">Draft a follow-up email</div>
                </div>
              </div>
              <div className="col-span-3 rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-xs text-muted-foreground">Tasks today</div>
                <div className="mt-2 text-3xl font-bold">12</div>
                <div className="text-xs text-emerald-400 mt-1">▲ 24% vs yesterday</div>
              </div>
              <div className="col-span-3 rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-xs text-muted-foreground">Time saved</div>
                <div className="mt-2 text-3xl font-bold">2h 14m</div>
                <div className="text-xs text-fuchsia-300 mt-1">AI-assisted</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Disclaimer footer band */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto pb-16">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 flex items-start gap-3 text-sm text-muted-foreground">
          <ShieldCheck className="h-5 w-5 text-fuchsia-300 shrink-0 mt-0.5" />
          <p>
            <span className="font-semibold text-foreground">Responsible AI:</span>{" "}
            AI-generated content may contain inaccuracies. Users should verify outputs before professional use.
          </p>
        </div>
      </section>
    </div>
  );
}
