import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, Wand2, Sparkles, Briefcase, Smile, Megaphone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/app/page-header";
import { OutputCard } from "@/components/app/output-card";
import { AiDisclaimer } from "@/components/app/ai-disclaimer";
import { generateAi } from "@/lib/ai-client";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Lumen" },
      { name: "description", content: "Generate professional emails in any tone." },
    ],
  }),
  component: EmailPage,
});

const TONES = [
  { value: "formal", label: "Formal", icon: Briefcase, hint: "Professional & precise" },
  { value: "friendly", label: "Friendly", icon: Smile, hint: "Warm & conversational" },
  { value: "persuasive", label: "Persuasive", icon: Megaphone, hint: "Compelling & confident" },
];

const LENGTHS = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Detailed" },
];

const EXAMPLES = [
  "Follow up after a job interview",
  "Request a deadline extension",
  "Introduce myself to a new client",
  "Decline a meeting politely",
];

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [tone, setTone] = useState("formal");
  const [length, setLength] = useState("medium");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!context.trim()) {
      toast.error("Please describe what the email should say.");
      return;
    }
    setLoading(true);
    try {
      const text = await generateAi(
        `Recipient: ${recipient || "(unspecified)"}
Subject hint: ${subject || "(none)"}
Tone: ${tone}
Length: ${length}
Context / message intent:
${context}

Write a complete, ready-to-send email.`,
        "You are an expert workplace communication assistant. Write polished, on-brand emails. Output only the email itself, including a subject line on the first line as 'Subject: ...', then a blank line, then the email body with greeting and sign-off. Match the requested tone precisely.",
      );
      setOutput(text.trim());
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to generate");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-mesh -z-10 pointer-events-none" />
      <div className="px-4 md:px-8 py-8 max-w-6xl mx-auto space-y-6">
      <PageHeader
        eyebrow="Communication"
        title="Smart Email Generator"
        description="Describe the email and pick a tone. Lumen drafts a polished message you can edit and send."
        icon={Mail}
      />

      <div className="grid lg:grid-cols-5 gap-5">
        <div className="lg:col-span-2 rounded-2xl border bg-card/80 backdrop-blur p-5 md:p-6 shadow-card space-y-5 animate-slide-up">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                id="recipient"
                placeholder="e.g. Sarah, Head of Marketing"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="e.g. Project kickoff"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tone</Label>
            <div className="grid grid-cols-3 gap-2">
              {TONES.map((t) => {
                const Icon = t.icon;
                const active = tone === t.value;
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setTone(t.value)}
                    className={`group rounded-xl border p-3 text-left transition-all ${
                      active
                        ? "border-transparent bg-gradient-brand text-white shadow-glow"
                        : "bg-background hover:border-primary/40 hover:bg-accent/40"
                    }`}
                  >
                    <Icon className={`h-4 w-4 mb-1.5 ${active ? "text-white" : "text-primary"}`} />
                    <div className="text-sm font-semibold">{t.label}</div>
                    <div className={`text-[11px] mt-0.5 ${active ? "text-white/80" : "text-muted-foreground"}`}>
                      {t.hint}
                    </div>
                  </button>
                );
              })}
            </div>
            {/* Accessible dropdown alternative */}
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="sr-only" aria-label="Tone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TONES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Length</Label>
            <Select value={length} onValueChange={setLength}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {LENGTHS.map((l) => (
                  <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="ctx">What should the email say?</Label>
              <span className="text-[11px] text-muted-foreground">{context.length} chars</span>
            </div>
            <Textarea
              id="ctx"
              rows={7}
              placeholder="e.g. Follow up on yesterday's design review, request approval for the new homepage, propose a 30-min call this week."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="resize-none"
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => setContext(ex)}
                  className="text-[11px] rounded-full border border-border/70 bg-background px-2.5 py-1 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-accent/40 transition-colors inline-flex items-center gap-1"
                >
                  <Sparkles className="h-3 w-3 text-primary" /> {ex}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={generate}
            disabled={loading}
            className="w-full h-11 bg-gradient-brand text-white hover:opacity-95 shadow-glow gap-2 text-sm font-semibold"
          >
            <Wand2 className="h-4 w-4" />
            {loading ? "Generating…" : "Generate email"}
          </Button>
          <AiDisclaimer />
        </div>

        <div className="lg:col-span-3 lg:sticky lg:top-20 lg:self-start animate-slide-up">
          <OutputCard
            value={output}
            onChange={setOutput}
            loading={loading}
            onRegenerate={generate}
            emptyTitle="Your email draft will appear here"
            emptyHint="Add the recipient, tone, and what you want to say — then hit Generate."
          />
        </div>
      </div>
      </div>
    </div>
  );
}
