import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, Wand2 } from "lucide-react";
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
  { value: "formal", label: "Formal" },
  { value: "friendly", label: "Friendly" },
  { value: "persuasive", label: "Persuasive" },
];

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [tone, setTone] = useState("formal");
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
    <div className="px-4 md:px-8 py-8 max-w-6xl mx-auto space-y-6">
      <PageHeader
        eyebrow="Communication"
        title="Smart Email Generator"
        description="Describe the email and pick a tone. Lumen drafts a polished message you can edit and send."
        icon={Mail}
      />

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="rounded-2xl border bg-card p-5 shadow-card space-y-4">
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
              <Label htmlFor="subject">Subject hint</Label>
              <Input
                id="subject"
                placeholder="e.g. Project kickoff"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {TONES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ctx">What should the email say?</Label>
            <Textarea
              id="ctx"
              rows={8}
              placeholder="e.g. Follow up on yesterday's design review, request approval for the new homepage, propose a 30-min call this week."
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </div>
          <Button
            onClick={generate}
            disabled={loading}
            className="w-full bg-gradient-brand text-white hover:opacity-95 shadow-glow gap-2"
          >
            <Wand2 className="h-4 w-4" />
            {loading ? "Generating…" : "Generate email"}
          </Button>
          <AiDisclaimer />
        </div>

        <OutputCard
          value={output}
          onChange={setOutput}
          loading={loading}
          onRegenerate={generate}
          emptyTitle="Your email draft will appear here"
          emptyHint="Add the recipient, tone, and what you want to say."
        />
      </div>
    </div>
  );
}
