// Demo/mock AI client — returns realistic sample responses without external APIs.

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

const EMAIL_SAMPLES: Record<string, (ctx: { recipient: string; subject: string; intent: string }) => string> = {
  formal: ({ recipient, subject, intent }) => `Subject: ${subject || "Following up"}

Dear ${recipient || "Team"},

I hope this message finds you well. I am writing to follow up regarding ${intent || "our recent discussion"}.

After reviewing the relevant details, I believe a brief alignment would help us move forward efficiently. I would appreciate your thoughts and, if convenient, a 20–30 minute window this week to discuss next steps and confirm priorities.

Please let me know a time that works best for you, and I will send a calendar invitation accordingly.

Thank you for your time and consideration.

Kind regards,
[Your Name]`,
  friendly: ({ recipient, subject, intent }) => `Subject: ${subject || "Quick check-in"}

Hi ${recipient || "there"},

Hope you're having a good week! Wanted to circle back about ${intent || "what we talked about"} — I think we're really close to landing on something great.

If you have 15 minutes in the next couple of days, I'd love to walk through it together and lock in next steps. Totally happy to work around your schedule.

Thanks so much — looking forward to it!

Cheers,
[Your Name]`,
  persuasive: ({ recipient, subject, intent }) => `Subject: ${subject || "An opportunity worth a 15-minute conversation"}

Hi ${recipient || "there"},

I'll keep this short. Based on ${intent || "what we've been exploring"}, there's a clear opportunity to move faster, reduce risk, and unlock measurable impact this quarter.

A focused 15-minute call would let me show you exactly how — including two examples of teams who've already seen results within the first 30 days.

Are you open Tuesday or Thursday afternoon? I'll make it worth your time.

Best,
[Your Name]`,
};

const CHAT_RESPONSES: Array<{ match: RegExp; reply: string }> = [
  {
    match: /resign|quit|leave (the|my) (job|company|role)/i,
    reply: `Here's a clean structure for a professional resignation email:

**Subject:** Resignation — [Your Name]

1. **Open with the decision.** "I'm writing to formally resign from my position as [Title], effective [last day, typically two weeks out]."
2. **Express gratitude** briefly — one or two genuine sentences about what you valued.
3. **Offer a smooth transition.** "I'm happy to help train a replacement and document open work before my departure."
4. **Close warmly.** "Thank you for the opportunity. I wish the team continued success."

Keep it short, positive, and free of grievances — even if the role wasn't perfect.`,
  },
  {
    match: /standup|stand-up|daily.*meeting/i,
    reply: `A focused 30-minute standup usually means it's not really a standup. To keep it tight:

- **Timebox to 15 minutes.** If you need 30, split into a standup + a separate working session.
- **Three questions per person:** What did you ship? What's next? What's blocked?
- **Park discussions.** Use "let's take that offline" liberally — write parking-lot items in the chat.
- **Async-first updates.** Have folks post written updates 10 minutes before the call so the meeting is for blockers only.
- **Rotate the facilitator** weekly to keep ownership shared.`,
  },
  {
    match: /priorit|urgent|too much|overwhelm/i,
    reply: `When everything feels urgent, default to a simple frame:

1. **Eisenhower sort:** Urgent + Important → do now. Important not urgent → schedule. Urgent not important → delegate. Neither → drop.
2. **Pick three.** Choose the three things that, if done today, would make the day a win. Ignore the rest until those are moving.
3. **Surface trade-offs early.** Tell stakeholders: "I can deliver A and B today; C will slip to tomorrow — okay?" Most "urgent" requests have flex once named.
4. **Protect 90 minutes** of deep work before reacting to inboxes or chats.`,
  },
  {
    match: /feedback|difficult conversation|teammate/i,
    reply: `A reliable structure for difficult feedback is **SBI + ask**:

- **Situation:** "In yesterday's client call…"
- **Behavior:** "…you interrupted the client twice while they were explaining the issue."
- **Impact:** "It made it harder to understand their needs and felt dismissive to me."
- **Ask:** "Can we talk about how to handle moments like that next time?"

Deliver it privately, soon after the event, and lead with care for the person — not the verdict. End by inviting their perspective; you may learn something that changes yours.`,
  },
  {
    match: /email/i,
    reply: `For a strong workplace email, follow this pattern:

1. **Subject = the ask.** "Approval needed: Q3 budget by Friday" beats "Quick question."
2. **First sentence states the purpose.** Don't bury the lead.
3. **Bullet the details** if there are more than two.
4. **End with a clear next step** and deadline.

Keep it under 150 words when you can — busy readers skim, and clarity wins replies.`,
  },
  {
    match: /meeting|agenda/i,
    reply: `Great meetings come from preparation, not facilitation tricks:

- **Write a one-line purpose** at the top of the agenda. If you can't, cancel the meeting.
- **Distribute pre-reads** 24 hours in advance.
- **Assign a note-taker** so the organizer can think.
- **End 5 minutes early** to capture decisions, owners, and next steps in writing.
- **Send the recap** within the hour while context is fresh.`,
  },
  {
    match: /career|promotion|raise/i,
    reply: `For career growth conversations, prepare three things:

1. **Evidence.** A short list of measurable outcomes you've owned in the last 6–12 months — with numbers where possible.
2. **Scope.** What you're already doing at the next level, with examples.
3. **The ask.** Be explicit: title, scope, comp — pick the one that matters most and lead with it.

Frame it as a partnership: "Here's where I want to grow, here's what I've delivered, here's what I'd like us to plan toward." Avoid ultimatums unless you're prepared to act on them.`,
  },
];

const DEFAULT_CHAT_REPLY = `Happy to help. Here's a practical way to think about it:

- **Clarify the outcome.** What does "done well" look like in one sentence?
- **Name the constraints.** Time, people, budget, dependencies.
- **Pick the smallest next step** you can take in the next 30 minutes.
- **Share a draft early.** Feedback on something concrete beats discussion in the abstract.

If you share a bit more context — who's involved, what's at stake, what's tried — I can tailor this further.`;

function pickEmail(prompt: string): string {
  const recipient = /Recipient:\s*(.*)/i.exec(prompt)?.[1]?.replace(/\(unspecified\)/i, "").trim() || "";
  const subject = /Subject hint:\s*(.*)/i.exec(prompt)?.[1]?.replace(/\(none\)/i, "").trim() || "";
  const tone = /Tone:\s*(\w+)/i.exec(prompt)?.[1]?.toLowerCase() || "formal";
  const intent = /Context \/ message intent:\s*([\s\S]*?)Write a complete/i
    .exec(prompt)?.[1]
    ?.trim() || "";
  const fn = EMAIL_SAMPLES[tone] ?? EMAIL_SAMPLES.formal;
  return fn({ recipient, subject, intent });
}

function pickNotesSummary(prompt: string): string {
  const notes = prompt.split(/Meeting notes:\s*/i)[1]?.trim() || "";
  const firstLine = notes.split("\n")[0]?.slice(0, 120) || "the meeting";
  return `## Summary
The team reviewed ${firstLine}, aligned on next milestones, and agreed on ownership for the most pressing items. A follow-up sync was scheduled to confirm progress.

## Key Decisions
- Move forward with the proposed approach as the working baseline.
- Defer non-critical scope to the following sprint to protect the launch date.
- Consolidate status updates into a single weekly digest going forward.

## Action Items
- [ ] Alex — Draft the updated project brief and circulate for review.
- [ ] Priya — Coordinate with Design on the revised mockups.
- [ ] Jordan — Schedule the stakeholder check-in and share the agenda.
- [ ] Sam — Update the tracking dashboard with the new milestones.

## Deadlines
- Friday — Updated brief shared with the team.
- Next Wednesday — Design review complete.
- End of next week — Stakeholder check-in held and recap distributed.

## Open Questions
- Do we need additional QA capacity for the launch window?
- Should the customer success team be looped in earlier than planned?`;
}

function pickPlanner(prompt: string): string {
  const start = /Workday:\s*(\d{1,2}:\d{2})/i.exec(prompt)?.[1] || "09:00";
  const end = /to\s*(\d{1,2}:\d{2})/i.exec(prompt)?.[1] || "18:00";
  return `## Today's Schedule
| Time | Task | Priority |
|------|------|----------|
| ${start}–${shift(start, 30)} | Plan the day, review inbox triage | Medium |
| ${shift(start, 30)}–${shift(start, 120)} | Deep work — most important task | High |
| ${shift(start, 120)}–${shift(start, 135)} | Short break | — |
| ${shift(start, 135)}–${shift(start, 210)} | Focused project work | High |
| ${shift(start, 210)}–${shift(start, 270)} | Lunch & walk | — |
| ${shift(start, 270)}–${shift(start, 330)} | Meetings / calls block | Medium |
| ${shift(start, 330)}–${shift(start, 420)} | Collaboration & code/PR reviews | Medium |
| ${shift(start, 420)}–${endMinus(end, 30)} | Admin, replies, follow-ups | Low |
| ${endMinus(end, 30)}–${end} | Wrap-up & plan tomorrow | — |

## Priority Order
1. **Most important task** — direct impact on this week's goal; do it while energy is highest.
2. **Time-sensitive commitments** — meetings and items with external dependencies.
3. **Project work that unblocks others** — reviews, approvals, and handoffs.
4. **Admin & inbox** — batch into a single afternoon block.
5. **Nice-to-haves** — only if everything above is done.

## Productivity Tips
- Protect the first 90 minutes for deep work — no chat, no email.
- Batch shallow work (replies, approvals, admin) into one afternoon block.
- Take a real lunch break away from the screen — afternoon focus depends on it.
- End the day with a 5-minute review: what shipped, what slipped, what's next.
- Default meetings to 25 or 50 minutes to build in transition time.`;
}

function shift(time: string, addMin: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + addMin;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}
function endMinus(time: string, sub: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m - sub;
  const hh = Math.floor(total / 60) % 24;
  const mm = ((total % 60) + 60) % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export async function generateAi(prompt: string, system?: string): Promise<string> {
  await delay(700 + Math.random() * 600);
  const ctx = `${system ?? ""}\n${prompt}`;
  if (/email/i.test(ctx) && /Recipient:/i.test(prompt)) return pickEmail(prompt);
  if (/meeting analyst|Meeting notes:/i.test(ctx)) return pickNotesSummary(prompt);
  if (/productivity coach|daily schedule|Workday:/i.test(ctx)) return pickPlanner(prompt);
  return DEFAULT_CHAT_REPLY;
}

export async function generateChatReply(userMessage: string): Promise<string> {
  await delay(600 + Math.random() * 700);
  for (const { match, reply } of CHAT_RESPONSES) {
    if (match.test(userMessage)) return reply;
  }
  return DEFAULT_CHAT_REPLY;
}
