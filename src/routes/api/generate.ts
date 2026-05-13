import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { generateText } from "ai";
import { env as cfEnv } from "cloudflare:workers";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway";

export const Route = createFileRoute("/api/generate")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const { system, prompt } = (await request.json()) as {
            system?: string;
            prompt?: string;
          };
          if (!prompt) return new Response("Missing prompt", { status: 400 });
          const key =
            (cfEnv as Record<string, string | undefined>).LOVABLE_API_KEY ??
            process.env.LOVABLE_API_KEY;
          if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });
          const gateway = createLovableAiGatewayProvider(key);
          const { text } = await generateText({
            model: gateway("google/gemini-3-flash-preview"),
            system,
            prompt,
          });
          return Response.json({ text });
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Unknown error";
          const status = /429/.test(msg) ? 429 : /402/.test(msg) ? 402 : 500;
          return new Response(msg, { status });
        }
      },
    },
  },
});
