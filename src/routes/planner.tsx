import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/app/page-header";
import { OutputCard } from "@/components/app/output-card";
import { AiDisclaimer } from "@/components/app/ai-disclaimer";
import { generateAi } from "@/lib/ai-client";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Result" },
      { name: "description", content: "Generate prioritized daily schedules with productivity tips." },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const [tasks, setTasks] = useState("");
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("18:00");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!tasks.trim()) {
      toast.error("Add a few tasks to plan.");
      return;
    }
    setLoading(true);
    try {
      const text = await generateAi(
        `Build a daily schedule from these tasks. Workday: ${start} to ${end}.

Tasks (one per line, optional notes):
${tasks}

Use this markdown structure:

## Today's Schedule
A time-blocked schedule from ${start} to ${end} as a markdown table with columns: Time | Task | Priority. Include short breaks and a lunch block.

## Priority Order
Numbered list (1 = highest). Brief reason for each.

## Productivity Tips
3-5 specific suggestions to make today successful.`,
        "You are an expert productivity coach. Build realistic, focused schedules using deep-work blocks, batching, and Eisenhower prioritization. Be concrete.",
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
        eyebrow="Planning"
        title="AI Task Planner"
        description="List today's tasks — Result prioritizes them and builds a focused schedule."
        icon={CalendarCheck}
      />

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="rounded-2xl border bg-card p-5 shadow-card space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="start">Day starts</Label>
              <Input id="start" type="time" value={start} onChange={(e) => setStart(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="end">Day ends</Label>
              <Input id="end" type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tasks">Tasks for today</Label>
            <Textarea
              id="tasks"
              rows={12}
              placeholder={"Finish Q2 report — due today\nReview 3 PRs\nClient call at 14:00 (60 min)\nDeep work: pricing page redesign\nReply to inbox"}
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
            />
          </div>
          <Button
            onClick={generate}
            disabled={loading}
            className="w-full bg-gradient-brand text-white hover:opacity-95 shadow-glow gap-2"
          >
            <Wand2 className="h-4 w-4" />
            {loading ? "Planning…" : "Plan my day"}
          </Button>
          <AiDisclaimer />
        </div>

        <OutputCard
          value={output}
          onChange={setOutput}
          loading={loading}
          onRegenerate={generate}
          renderMarkdown
          emptyTitle="Your plan will appear here"
          emptyHint="List tasks and pick your work hours."
        />
      </div>
    </div>
  );
}
