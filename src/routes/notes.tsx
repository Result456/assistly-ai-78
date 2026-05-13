import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileText, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/app/page-header";
import { OutputCard } from "@/components/app/output-card";
import { AiDisclaimer } from "@/components/app/ai-disclaimer";
import { generateAi } from "@/lib/ai-client";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Result" },
      { name: "description", content: "Summarize meetings into action items, decisions, and deadlines." },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!notes.trim()) {
      toast.error("Paste your meeting notes first.");
      return;
    }
    setLoading(true);
    try {
      const text = await generateAi(
        `Summarize the following meeting notes. Use this exact markdown structure:

## Summary
A 2-3 sentence overview.

## Key Decisions
- bullet points

## Action Items
- [ ] Owner — task

## Deadlines
- Date — what is due

## Open Questions
- bullet points (omit section if none)

Meeting notes:
${notes}`,
        "You are an expert meeting analyst. Be precise, faithful to the notes, and concise. Never invent details that aren't in the notes.",
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
        eyebrow="Meetings"
        title="Notes Summarizer"
        description="Paste raw meeting notes — Result extracts action items, decisions, and deadlines."
        icon={FileText}
      />

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="rounded-2xl border bg-card p-5 shadow-card space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="notes">Meeting notes</Label>
            <Textarea
              id="notes"
              rows={16}
              placeholder="Paste full meeting transcript or your raw notes here…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">{notes.length.toLocaleString()} characters</p>
          </div>
          <Button
            onClick={generate}
            disabled={loading}
            className="w-full bg-gradient-brand text-white hover:opacity-95 shadow-glow gap-2"
          >
            <Wand2 className="h-4 w-4" />
            {loading ? "Summarizing…" : "Summarize notes"}
          </Button>
          <AiDisclaimer />
        </div>

        <OutputCard
          value={output}
          onChange={setOutput}
          loading={loading}
          onRegenerate={generate}
          renderMarkdown
          emptyTitle="Your summary will appear here"
          emptyHint="Paste meeting notes and click Summarize."
        />
      </div>
    </div>
  );
}
