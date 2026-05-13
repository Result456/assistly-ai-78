export async function getLovableApiKey(): Promise<string | undefined> {
  try {
    // @ts-expect-error - cloudflare:workers is only available at runtime on Workers
    const mod = await import("cloudflare:workers");
    const cfEnv = (mod as { env?: Record<string, string | undefined> }).env;
    if (cfEnv?.LOVABLE_API_KEY) return cfEnv.LOVABLE_API_KEY;
  } catch {
    // not running on cloudflare workers
  }
  return process.env.LOVABLE_API_KEY;
}