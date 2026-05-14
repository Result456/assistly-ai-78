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
  TrendingUp,
  CheckCircle2,
  Brain,
  Users,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

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
      <section className="px-4 md:px-8 max-w-6xl mx-auto pt-8 md:pt-14 pb-10 md:pb-16">
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
          className="mt-5 mx-auto text-center text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-4xl leading-[1.15]"
        >
          Work smarter, not harder.{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-400">
            Let AI handle the heavy lifting
          </span>{" "}
          while you focus on what truly matters.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-4 mx-auto text-center text-sm md:text-base text-muted-foreground/80 max-w-2xl leading-relaxed"
        >
          Empower your work with AI that handles the busywork. Create polished
          emails, clear summaries, and work with a smart AI co-pilot that helps
          you think smarter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-6 flex flex-wrap justify-center gap-3"
        >
          <Link
            to="/email"
            className="group relative inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
            style={{ backgroundImage: "linear-gradient(135deg, oklch(0.65 0.28 320), oklch(0.7 0.28 350))" }}
          >
            <Sparkles className="h-4 w-4" />
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 backdrop-blur px-5 py-2.5 text-sm font-semibold hover:bg-white/10 transition"
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

      {/* Greeting + Dashboard Widgets */}
      <section className="px-4 md:px-8 max-w-6xl mx-auto pb-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-fuchsia-400">Welcome back</div>
            <h2 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-300 via-pink-300 to-purple-300">
                Good Morning, Result
              </span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Ready to boost productivity today? You've saved 2h 14m this week.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs">
              <div className="text-muted-foreground">Streak</div>
              <div className="font-semibold text-foreground">12 days 🔥</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs">
              <div className="text-muted-foreground">Focus</div>
              <div className="font-semibold text-foreground">94%</div>
            </div>
          </div>
        </motion.div>

        <div className="mt-5 grid grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { label: "Emails Generated", value: "24", icon: Mail, trend: "+12%" },
            { label: "Tasks Completed", value: "18", icon: CheckCircle2, trend: "+8%" },
            { label: "Notes Summarized", value: "9", icon: FileText, trend: "+3" },
            { label: "Productivity", value: "94%", icon: TrendingUp, trend: "+5%" },
            { label: "AI Activity", value: "147", icon: Brain, trend: "+22%" },
          ].map((w, i) => (
            <motion.div
              key={w.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 hover:border-fuchsia-400/40 hover:shadow-glow transition-colors"
            >
              <div className="flex items-center justify-between">
                <div
                  className="h-7 w-7 rounded-md grid place-items-center"
                  style={{ backgroundImage: "linear-gradient(135deg, oklch(0.6 0.28 305), oklch(0.7 0.28 350))" }}
                >
                  <w.icon className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-[10px] font-semibold text-emerald-400">{w.trend}</span>
              </div>
              <div className="mt-3 text-2xl font-bold tracking-tight">{w.value}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{w.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 md:px-8 max-w-6xl mx-auto py-8">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-fuchsia-400">Quick actions</div>
            <h2 className="mt-1 text-xl md:text-2xl font-bold tracking-tight">Jump back in</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { to: "/email", label: "Generate Email", icon: Mail },
            { to: "/notes", label: "Summarize Notes", icon: FileText },
            { to: "/planner", label: "Create Task Plan", icon: CalendarCheck },
            { to: "/chat", label: "Open AI Chat", icon: MessagesSquare },
          ].map((a, i) => (
            <motion.div
              key={a.to}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link
                to={a.to}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl px-4 py-3 hover:border-fuchsia-400/40 hover:bg-white/[0.07] transition"
              >
                <div
                  className="h-8 w-8 rounded-md grid place-items-center shadow-glow"
                  style={{ backgroundImage: "linear-gradient(135deg, oklch(0.6 0.28 305), oklch(0.7 0.28 350))" }}
                >
                  <a.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium flex-1">{a.label}</span>
                <ArrowRight className="h-3.5 w-3.5 text-fuchsia-300 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 md:px-8 max-w-6xl mx-auto py-10 md:py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-fuchsia-400">
              Workspace
            </div>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">
              Everything you need, in one workspace
            </h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                className="group relative block h-full rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 overflow-hidden transition-all hover:-translate-y-1 hover:border-fuchsia-400/40 hover:shadow-glow"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                  style={{ background: "radial-gradient(600px circle at 50% 0%, oklch(0.7 0.28 330 / 0.15), transparent 60%)" }}
                />
                <div
                  className="relative h-9 w-9 rounded-lg grid place-items-center shadow-glow"
                  style={{ backgroundImage: "linear-gradient(135deg, oklch(0.6 0.28 305), oklch(0.7 0.28 350))" }}
                >
                  <f.icon className="h-4 w-4 text-white" />
                </div>
                <div className="relative mt-3 font-semibold text-base tracking-tight">{f.title}</div>
                <p className="relative mt-1.5 text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                <div className="relative mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-fuchsia-300">
                  Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 md:px-8 max-w-6xl mx-auto py-10 md:py-12">
        <div className="grid sm:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 hover:border-pink-400/40 hover:shadow-glow transition-colors"
            >
              <div className="flex items-center justify-between">
                <div
                  className="h-8 w-8 rounded-lg grid place-items-center"
                  style={{ backgroundImage: "linear-gradient(135deg, oklch(0.6 0.28 305), oklch(0.7 0.28 350))" }}
                >
                  <s.icon className="h-4 w-4 text-white" />
                </div>
                <Sparkles className="h-3.5 w-3.5 text-fuchsia-300/70" />
              </div>
              <div className="mt-3 text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-300 via-pink-300 to-purple-300">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dashboard preview */}
      <section className="px-4 md:px-8 max-w-6xl mx-auto py-10 md:py-14">
        <div className="text-center max-w-xl mx-auto mb-7">
          <div className="text-xs font-semibold uppercase tracking-widest text-fuchsia-400">Preview</div>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">
            Your futuristic AI command center
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A unified dashboard where every tool, insight, and action is one click away.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-2.5 md:p-3 shadow-glow"
        >
          <div className="grid grid-cols-12 gap-2.5 min-h-[340px]">
            {/* Mock sidebar */}
            <div className="col-span-3 lg:col-span-2 rounded-xl border border-white/10 bg-black/30 p-2">
              <div className="flex items-center gap-2 px-1.5 py-1.5">
                <div className="h-6 w-6 rounded-md grid place-items-center"
                  style={{ backgroundImage: "linear-gradient(135deg, oklch(0.6 0.28 305), oklch(0.7 0.28 350))" }}>
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
                <span className="text-xs font-bold hidden lg:inline">Result</span>
              </div>
              <div className="mt-2 space-y-0.5">
                {[Mail, FileText, CalendarCheck, MessagesSquare, BarChart3].map((Icon, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-1.5 py-1.5 rounded-md text-xs ${
                      i === 0 ? "bg-white/10 text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    <span className="hidden lg:inline">Item</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main */}
            <div className="col-span-9 lg:col-span-10 grid grid-cols-6 gap-2.5">
              <div className="col-span-6 lg:col-span-4 rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold">Productivity Trend</div>
                  <BarChart3 className="h-3.5 w-3.5 text-fuchsia-300" />
                </div>
                <div className="mt-4 flex items-end gap-1.5 h-24">
                  {[40, 65, 50, 80, 60, 92, 75, 88, 70, 95, 82, 98].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.6 }}
                      className="flex-1 rounded-sm"
                      style={{ backgroundImage: "linear-gradient(to top, oklch(0.55 0.25 305), oklch(0.75 0.28 350))" }}
                    />
                  ))}
                </div>
              </div>
              <div className="col-span-6 lg:col-span-2 rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs font-semibold">AI Assistant</div>
                <div className="mt-3 space-y-1.5 text-xs">
                  <div className="rounded-md bg-white/5 p-2">Summarize today's standup</div>
                  <div className="rounded-md bg-fuchsia-500/15 p-2 text-fuchsia-100">
                    3 blockers, 5 action items captured.
                  </div>
                  <div className="rounded-md bg-white/5 p-2">Draft a follow-up email</div>
                </div>
              </div>
              <div className="col-span-3 rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-muted-foreground">Tasks today</div>
                <div className="mt-1.5 text-2xl font-bold">12</div>
                <div className="text-xs text-emerald-400 mt-1">▲ 24% vs yesterday</div>
              </div>
              <div className="col-span-3 rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-muted-foreground">Time saved</div>
                <div className="mt-1.5 text-2xl font-bold">2h 14m</div>
                <div className="text-xs text-fuchsia-300 mt-1">AI-assisted</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Disclaimer footer band */}
      <section className="px-4 md:px-8 max-w-6xl mx-auto pb-12">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 flex items-start gap-3 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-fuchsia-300 shrink-0 mt-0.5" />
          <p>
            <span className="font-semibold text-foreground">Responsible AI:</span>{" "}
            AI-generated content may contain inaccuracies. Users should verify outputs before professional use.
          </p>
        </div>
      </section>
    </div>
  );
}
