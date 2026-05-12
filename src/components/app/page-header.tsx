export function PageHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-start gap-4 animate-fade-in">
      {Icon && (
        <div className="h-12 w-12 shrink-0 rounded-2xl bg-gradient-brand grid place-items-center shadow-glow">
          <Icon className="h-5 w-5 text-white" />
        </div>
      )}
      <div className="space-y-1">
        {eyebrow && (
          <div className="text-xs font-semibold uppercase tracking-widest text-gradient-brand">
            {eyebrow}
          </div>
        )}
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground max-w-2xl">{description}</p>}
      </div>
    </div>
  );
}
