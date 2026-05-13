import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  MessagesSquare,
  Send,
  Sparkles,
  User as UserIcon,
  Copy,
  Check,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/app/page-header";
import { AiDisclaimer } from "@/components/app/ai-disclaimer";
import { generateChatReply } from "@/lib/ai-client";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot Assistant — Result" },
      { name: "description", content: "Chat with your AI workplace assistant." },
    ],
  }),
  component: ChatPage,
});

const SUGGESTIONS = [
  "How do I write a professional resignation email?",
  "Tips to run a focused 30-minute standup",
  "How should I prioritize when everything feels urgent?",
  "Help me give difficult feedback to a teammate",
];

function ChatPage() {
  type Msg = { id: string; role: "user" | "assistant"; text: string };
  const [messages, setMessages] = useState<Msg[]>([]);
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "submitted";
  const cancelRef = useRef(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isLoading) inputRef.current?.focus();
  }, [isLoading]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  async function send(text?: string) {
    const t = (text ?? input).trim();
    if (!t || isLoading) return;
    const userMsg: Msg = { id: `u-${Date.now()}`, role: "user", text: t };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setStatus("submitted");
    cancelRef.current = false;
    try {
      const reply = await generateChatReply(t);
      if (cancelRef.current) return;
      setMessages((m) => [...m, { id: `a-${Date.now()}`, role: "assistant", text: reply }]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Chat failed");
    } finally {
      setStatus("idle");
    }
  }

  function stop() {
    cancelRef.current = true;
    setStatus("idle");
  }

  return (
    <div className="px-4 md:px-8 py-8 max-w-5xl mx-auto space-y-5 flex flex-col h-[calc(100vh-7.5rem)]">
      <PageHeader
        eyebrow="Assistant"
        title="AI Chatbot"
        description="Your workplace co-pilot. Ask anything about emails, meetings, planning, or career."
        icon={MessagesSquare}
      />

      <div className="flex-1 rounded-2xl border bg-card shadow-card overflow-hidden flex flex-col min-h-0">
        <div ref={scrollerRef} className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
          {messages.length === 0 ? (
            <EmptyChat onPick={(s) => send(s)} suggestions={SUGGESTIONS} />
          ) : (
            <div className="space-y-6 max-w-3xl mx-auto">
              {messages.map((m) => (
                <Bubble key={m.id} role={m.role}>
                  <MessageBody text={m.text} />
                </Bubble>
              ))}
              {status === "submitted" && (
                <Bubble role="assistant">
                  <ThinkingDots />
                </Bubble>
              )}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="border-t border-border/60 bg-background/60 backdrop-blur p-3 md:p-4"
        >
          <div className="max-w-3xl mx-auto flex items-end gap-2">
            <Textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Ask about emails, meetings, productivity…"
              rows={1}
              className="min-h-[48px] max-h-40 resize-none flex-1"
            />
            {isLoading ? (
              <Button type="button" variant="secondary" onClick={stop} className="h-12">
                Stop
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!input.trim()}
                className="h-12 w-12 shrink-0 rounded-xl bg-gradient-brand text-white hover:opacity-95 shadow-glow grid place-items-center"
              >
                <Send className="h-5 w-5" />
              </Button>
            )}
          </div>
          <div className="max-w-3xl mx-auto mt-3">
            <AiDisclaimer />
          </div>
        </form>
      </div>
    </div>
  );
}

function MessageBody({ text }: { text: string }) {
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert prose-p:leading-relaxed prose-headings:font-display">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}

function Bubble({ role, children }: { role: string; children: React.ReactNode }) {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);
  if (isUser) {
    return (
      <div className="flex gap-3 justify-end animate-fade-in">
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary text-primary-foreground px-4 py-2.5 text-sm leading-relaxed shadow-card">
          {children}
        </div>
        <div className="h-8 w-8 rounded-full bg-secondary grid place-items-center shrink-0">
          <UserIcon className="h-4 w-4 text-secondary-foreground" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-3 group animate-fade-in">
      <div className="h-8 w-8 rounded-full bg-gradient-brand grid place-items-center shrink-0 shadow-glow">
        <Sparkles className="h-4 w-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        {children}
        <button
          onClick={async (e) => {
            const text = (e.currentTarget.parentElement?.querySelector(".prose") as HTMLElement)
              ?.innerText;
            if (text) {
              await navigator.clipboard.writeText(text);
              setCopied(true);
              toast.success("Copied");
              setTimeout(() => setCopied(false), 1500);
            }
          }}
          className="opacity-0 group-hover:opacity-100 transition mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
      <span className="h-2 w-2 rounded-full bg-gradient-brand animate-bounce [animation-delay:-0.3s]" />
      <span className="h-2 w-2 rounded-full bg-gradient-brand animate-bounce [animation-delay:-0.15s]" />
      <span className="h-2 w-2 rounded-full bg-gradient-brand animate-bounce" />
      <span className="ml-1">Thinking…</span>
    </div>
  );
}

function EmptyChat({
  suggestions,
  onPick,
}: {
  suggestions: readonly string[];
  onPick: (s: string) => void;
}) {
  return (
    <div className="h-full grid place-items-center text-center">
      <div className="max-w-xl space-y-5 animate-fade-in">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-brand grid place-items-center shadow-glow">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-tight">How can I help you at work today?</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Ask anything — drafting messages, navigating tough conversations, planning your week.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-2 text-left">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => onPick(s)}
              className="rounded-xl border bg-card hover:bg-accent transition px-3.5 py-3 text-sm shadow-card hover:shadow-glow"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
