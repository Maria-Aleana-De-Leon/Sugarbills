# Codex repository instructions — Sugarbills

## Mission
Implement the offline single-file Sugarbills hackathon MVP described in `PRD.md`. This is a **build task**, not a request for a plan or PRD rewrite. Produce working software first.

## Read first
1. `PRD.md`, especially §1 (agent contract), §3 (constraints), §12 (acceptance tests), and §13 (demo script).
2. Any installed `design-taste-frontend` and `frontend-design` skills, if discoverable. These are optional references, not mandatory runtime dependencies. If unavailable, follow the PRD's explicit design system.

## Hard constraints
- Browser-deliverable code goes in **one `index.html`**, with inline HTML/CSS/JS and inline SVG. `README.md` and docs are okay; no runtime dependencies.
- Must work offline from Chrome `file://` without a build command, server, fonts, or assets from the internet.
- No API keys, real payments, credentials, PII, external scripts, or remote API calls.
- Preserve the clean off-white/black/red-orange brand, Taglish copy, and accessible keyboard/mouse/touch interactions.
- Do not edit or destroy unrelated project files if working in an existing repository.

## Working protocol
1. Inspect existing files, and reuse compatible work if present.
2. Implement P0 features in small, coherent passes: state/navigation → swipe → receipt → leaderboard → post → hardening.
3. Test and repair. Browser testing is preferred; if absent, document unverified checks rather than claiming success.
4. Don't stop at a TODO list, pseudocode, or a pretty static page.
5. Finish with concise summary of changed files, checks run, and known limitations.

## Scope order
P0: onboarding + rich/broke roles, offline persistence, swipes (mouse/touch/keyboard), safe fake wallet, match + receipt, deterministic ranked leaderboard with Don Sergio overtake, local Post with preview, reset. 
P1: sound, Hall of Shame, Wrapped, decorative motion.

## Demo-critical arithmetic
Fresh rich user starts with fake ₱1,000,000. Skip Mark → Pay Jhoanna ₱6,420 → Super Pay Paolo ₱38,000 (deduct ₱76,000). Balance ₱917,580, paid ₱82,420, 2 bills paid, outranks Don Sergio's ₱48,000. Keep this reproducible even if a custom post is inserted, by clearing it first via Skip.

## Final response expectations
Explain how to open `index.html`, describe what you tested, state any unverified browser cases, and mention that no real money moves. Do not claim production readiness.
