import { ShieldCheck } from "lucide-react";

export function AiDisclaimer({
  className = "",
  text = "AI output may be inaccurate. Review before sending, sharing, or acting on it. Avoid sharing sensitive or confidential information.",
}: {
  className?: string;
  text?: string;
}) {
  return (
    <div
      className={
        "flex items-start gap-2.5 rounded-xl border border-border/60 bg-muted/40 px-3.5 py-2.5 text-xs text-muted-foreground " +
        className
      }
    >
      <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
      <p>
        <span className="font-medium text-foreground">Responsible AI:</span> {text}
      </p>
    </div>
  );
}
