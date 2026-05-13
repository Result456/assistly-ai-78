import { useEffect, useState } from "react";
import { Check, Copy, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

interface OutputCardProps {
  value: string;
  onChange: (v: string) => void;
  loading?: boolean;
  emptyTitle?: string;
  emptyHint?: string;
  onRegenerate?: () => void;
  renderMarkdown?: boolean;
}

export function OutputCard({
  value,
  onChange,
  loading,
  emptyTitle = "Your AI output will appear here",
  emptyHint = "Fill in the inputs and click Generate.",
  onRegenerate,
  renderMarkdown = false,
}: OutputCardProps) {
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!value) setEditing(false);
  }, [value]);

  const copy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-2xl border bg-card shadow-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          AI Output
        </div>
        <div className="flex items-center gap-1.5">
          {value && !loading && (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setEditing((e) => !e)}
                className="h-8 text-xs"
              >
                {editing ? "Preview" : "Edit"}
              </Button>
              {onRegenerate && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onRegenerate}
                  className="h-8 text-xs gap-1.5"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Regenerate
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={copy}
                className="h-8 text-xs gap-1.5"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="p-4 md:p-5 min-h-[260px]">
        {loading ? (
          <LoadingSkeleton />
        ) : !value ? (
          <EmptyState title={emptyTitle} hint={emptyHint} />
        ) : editing || !renderMarkdown ? (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[260px] font-[inherit] text-sm leading-relaxed border-0 focus-visible:ring-0 resize-none p-0 shadow-none bg-transparent"
            readOnly={!editing && !renderMarkdown}
          />
        ) : (
          <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-p:leading-relaxed">
            <ReactMarkdown>{value}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="h-2 w-2 rounded-full bg-gradient-brand animate-pulse" />
        <span
          className="bg-clip-text text-transparent bg-[linear-gradient(90deg,oklch(0.5_0.15_310),oklch(0.7_0.22_350),oklch(0.5_0.15_310))] bg-[length:200%_100%] animate-shimmer"
        >
          Result is thinking…
        </span>
      </div>
      {[80, 95, 70, 88, 60].map((w, i) => (
        <div
          key={i}
          className="h-3 rounded-full bg-gradient-to-r from-muted via-accent/40 to-muted bg-[length:200%_100%] animate-shimmer"
          style={{ width: `${w}%` }}
        />
      ))}
    </div>
  );
}

function EmptyState({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="h-full min-h-[220px] grid place-items-center text-center px-6">
      <div className="space-y-3">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-brand-soft border border-border/60 grid place-items-center">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-sm text-muted-foreground mt-1">{hint}</div>
        </div>
      </div>
    </div>
  );
}
