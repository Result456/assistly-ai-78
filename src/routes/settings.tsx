import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon, ShieldCheck, Sparkles, Bell } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/app/page-header";
import { AiDisclaimer } from "@/components/app/ai-disclaimer";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Result" },
      { name: "description", content: "Customize your AI workplace assistant." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [notif, setNotif] = useState(true);
  const [creative, setCreative] = useState(false);

  return (
    <div className="px-4 md:px-8 py-8 max-w-4xl mx-auto space-y-6">
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Personalize Result so it understands your role and preferences."
        icon={SettingsIcon}
      />

      <Section title="Profile" icon={Sparkles}>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="name">Display name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Alex Morgan" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="role">Role / context</Label>
            <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Product Manager at a fintech startup" />
          </div>
        </div>
      </Section>

      <Section title="Preferences" icon={Bell}>
        <Toggle
          label="In-app notifications"
          description="Toast updates when AI completes a task."
          checked={notif}
          onChange={setNotif}
        />
        <Toggle
          label="More creative responses"
          description="Trade a little precision for more variety in suggestions."
          checked={creative}
          onChange={setCreative}
        />
      </Section>

      <Section title="Responsible AI" icon={ShieldCheck}>
        <p className="text-sm text-muted-foreground">
          Result uses AI models that may produce inaccurate or biased output. Always review AI
          suggestions before sending or acting on them, and avoid sharing sensitive personal,
          financial, or confidential business information.
        </p>
        <AiDisclaimer />
      </Section>

      <div className="flex justify-end">
        <Button
          className="bg-gradient-brand text-white hover:opacity-95 shadow-glow"
          onClick={() => toast.success("Preferences saved")}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-card space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-gradient-brand-soft border border-border/60 grid place-items-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <h2 className="font-semibold tracking-tight">{title}</h2>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border bg-background/40 px-4 py-3">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{description}</div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
