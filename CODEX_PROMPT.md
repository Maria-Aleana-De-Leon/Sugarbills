# Prompt to paste into Codex

Read `AGENTS.md` and `PRD.md` in the repository root. Build **Sugarbills** exactly as the offline hackathon MVP described there.

I want working code, not a plan or a UI mockup. Create or update `index.html` with all CSS/JavaScript/SVG inline, plus a short `README.md`. It must work by double-clicking the HTML file in Chrome while offline. No React, build step, CDN, API key, payments, backend, or external assets.

Prioritize P0: onboarding, all four tabs, mouse/touch/keyboard swipes, fake wallet, match and receipt, seeded leaderboard with a reproducible Don Sergio overtake, local Post + preview, localStorage persistence, validation, and reset. Implement P1 only if P0 is reliable. Follow the minimalist one-accent design in the PRD. If optional design skills are missing, proceed using the PRD instead of stopping.

Verify the scripted flow: Skip Mark → Pay Jhoanna ₱6,420 → Super Pay Paolo ₱38,000 → wallet ₱917,580 and paid ₱82,420 → rank above Don Sergio ₱48,000 in All-time with a visible overtake message. Also verify posting to the top of the stack and refreshing without data loss. Run available tests or browser checks; tell me exactly which checks you ran versus couldn't run.

**Do the implementation now.** At the end, summarize files changed, how to launch the demo, test results, and any limitations.
