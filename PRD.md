# Sugarbills — Codex-Ready MVP PRD

**Tagline:** Swipe right if you're rich.  
**Event:** DevDay Exchange Manila · November 6, 2026  
**Genre:** Comedy hackathon demo · fake currency only  
**Delivery:** One self-contained `index.html` that works offline when opened directly in Chrome (`file://`).

> **Source intent:** Preserve the original Sugarbills concept, Taglish humour, minimalist aesthetic, swipe/match interaction, and live leaderboard. This revision clarifies ambiguous behaviours and makes the brief directly executable by a coding agent. Never represent simulated payments as real.

## 1. Agent contract — do this, don't just plan it

You are the implementation agent. **Implement the working app** in this repository. Do not stop after making a plan, a mockup, a component skeleton, or pseudocode.

1. Inspect the repository. Read this `PRD.md` and the root `AGENTS.md` first.
2. If `design-taste-frontend` / `frontend-design` skills are available in the current Codex environment, read and apply them. **Do not assume they are installed.** If unavailable, follow the visual constraints in this PRD without blocking delivery.
3. Implement all **P0** features before any **P1** extras. Make safe implementation choices without requesting clarification.
4. Test what you can in the environment. If browser automation is available, exercise the full demo flow; otherwise provide precise manual checks. Never claim a test you did not run.
5. Finish by reporting changed files, what works, how to run it, tests run, and remaining limitations.

**Deliverables:**
- `index.html` — all HTML, CSS, JS, SVG icons, data, and effects inline. No runtime dependencies, imports, fetched assets, fonts, images, framework, backend, or build step.
- `README.md` — open/run instructions, keyboard controls, demo walkthrough, reset procedure, and known limitations.
- Optionally, lightweight static tests or a test report, only if these do not compromise the no-build runtime requirement.

**Stop condition:** All P0 acceptance checks in §12 pass. If there is a trade-off, prioritize a reliable working demo over additional polish.

## 2. Concept and non-goals

Sugarbills is a dating app where profiles are unpaid bills. **Rich** users skip or simulate paying bills to move up a fake public leaderboard. **Broke** users create bill profiles. The visuals are premium and understated; the comedy is in the copy.

**Non-goals:** Actual money movement; collecting real payment credentials or bill account numbers; login; database; server; real-time sync; real generative AI; native mobile build; integration with Meralco, GCash, banks, or other providers.

**Always make the simulation clear:** A small persistent footer or clear contextual text says **“Demo only — no real money moved.”** All receipts repeat that sentence. Never show a real payment-success claim without a nearby demo disclaimer.

## 3. Technical requirements (strict)

- Standalone `index.html`; vanilla JavaScript and CSS inside the document. No build tools and no npm dependencies.
- App must work by double-clicking `index.html` in Chrome with Wi-Fi turned off. Do **not** rely on fetch, ES module imports, remote fonts, icons, CDN assets, or a local web server.
- Persist app state to `localStorage` with keys starting `tb_`. Wrap reads/writes in `try/catch` and fail gracefully to in-memory state if local storage is unavailable.
- Store fake demo data only. **No OpenAI API keys in frontend code or `localStorage`.** The “Make it irresistible” feature must use deterministic local text templates. Network-based AI is out of scope for this offline MVP; it can later be added through a backend and safe secret handling.
- Browser support target: current desktop Chrome; usable mobile Chrome with touch events. Test using `file://` specifically.
- No event listener leaks, duplicate actions, or double wallet deductions after fast clicks or repeated keys.
- Use `textContent`/DOM construction for all user input. No insertion of raw user-entered HTML. Validate all amounts and names.
- App should remain usable with JavaScript exceptions avoided, keyboard focus visible, and motion reduction respected.

## 4. Visual direction

**Style:** clean, editorial, understated, expensive-looking, with hilarious deadpan Taglish text.

- Light: background `#FAFAF9`, foreground `#111111`, secondary `#6B6B6B`, border `#E7E5E4`.
- Dark via `prefers-color-scheme: dark`: background `#0E0E0E`, foreground `#F5F5F4`, border `#262626`.
- One accent: red-orange `#FF4D2E` for actions, key amounts, top rank, and match details. Use no second accent colour.
- System sans font; 17px base font; generous spacing on an 8px rhythm; heading tracking `-0.02em`; tabular numerals for pesos.
- Desktop appearance: centred, max-width 420px app column, min-height filling the viewport, 24px horizontal spacing. Fit 360px mobile screens without horizontal scrolling. Bottom tab navigation must remain reachable.
- Cards 16px radius, pill buttons 999px radius, mostly 1px hairlines. At most one soft shadow on the active swipe card.
- Inline SVG **line** icons for UI buttons and navigation; emojis only in profile/avatar or bill-content areas.
- Motion: ~300ms swipe fling, ~150ms press states, restrained count-up or reordering for leaderboard updates. Respect `prefers-reduced-motion`.
- Celebration: optional short monochrome/accent squares (not rainbow confetti). Never let effects block interaction.
- **Banned:** gradients (especially purple/pink), glassmorphism, neon, stock illustrations, rainbow effects, wall-to-wall shadows, excessive rounded cards, fake AI badges, lorem ipsum.

## 5. Navigation and user roles [P0]

Four persistent bottom tabs with icon + text: **Swipe · Post · Leaderboard · Me**. The active tab is visually indicated and programmatically exposed (e.g., `aria-current`).

**First launch:** Show wordmark “Sugarbills”, tagline “Swipe right if you're rich.”, and “Who are you tonight?”

- **I'm rich:** collect nonempty display name (default suggested: “You”) and one title: Old Money / Crypto Bro / Tech CEO / Tita with 5 Condos / Nepo Baby. Initialize **fake wallet ₱1,000,000** and open Swipe.
- **I'm broke:** collect nonempty name, initialize a user profile with fake wallet `0`, open Post. They may view cards/leaderboard but must switch to Rich in Me before paying.
- Role switch in Me changes access without erasing posts or payment history. First switch from broke to rich adds the fake ₱1,000,000 starter wallet **once**; switching back and forth never refills it.
- Persist onboarding; refreshing reopens the last tab and stored state rather than onboarding again. Reset demo returns to first-launch state.
- Must be completable in under 10 seconds with sensible defaults.

## 6. Swipe experience [P0]

**Card stack:** One interactive front card; two scaled/offset peeking cards behind. Only the front card accepts pointer actions.

Each card shows emoji avatar in neutral circle, first name and age, biller / bill category, **large peso amount**, 1–2 sentence Taglish story, “Desperation” accent progress bar (1–100), and small “Match {60–99}%” copy.

**Inputs:**
- Mouse and touch via Pointer Events (`pointerdown`, `pointermove`, `pointerup`, `pointercancel`); when dragging, translate horizontally and rotate at most 12°.
- A drag released beyond **30% of the card's actual width** acts; shorter gestures snap back. Right = Pay; left = Skip.
- Show outlined “BAYAD.” overlay during right drag and “NEXT.” during left drag.
- Buttons: **Skip**, **Pay**, **Super Pay**. Keyboard: `ArrowLeft` skip; `ArrowRight` pay; `ArrowUp` super pay. Do not fire keyboard shortcuts while focus is in inputs, selects, textareas, buttons, a modal, or contenteditable elements.
- Disable input while a card is processing/flinging; exactly one action per card. A processed bill cannot be processed again in the current feed cycle.

**Economics:**
- Pay deducts `bill.amount` from fake wallet, increases current user's total fake amount paid by the same value, increments bills-paid count once, removes the bill from the active stack, then shows match/receipt.
- Super Pay deducts **2 × bill.amount**, increments amount paid by 2 × the bill amount, increments bills-paid count **once**, removes the bill, and shows match/receipt. The receipt must clearly label the second bill amount as a **fake bonus**; it must not imply a real biller received twice the bill amount.
- Skip increments skip count once and removes the bill without deducting money.
- Insufficient fake wallet: **“Declined. You're not that rich.”**; do not remove the card or alter counters.
- Broke role attempting Pay/Super Pay: explain that paying requires switching to Rich; no changes to state.
- Give a 2-second toast after action using one of: “Your accountant felt that.” / “Tax deductible? Probably not.” / “Mama mo proud.” / “Judging is free. Paying isn't.” / “Bless you, Don/Doña.”
- Empty deck: “You've paid or judged everyone. Touch grass.” + **“Load more bills”**. Reseeding creates *new unique IDs* so the user can keep demoing, but **never** resets wallet, leaderboard, history, or counters. Existing custom posts must not disappear.

### Deterministic seed bills

Seed the exact 12 **fictional** profiles below on fresh state. Preserve this order, deliberately putting Mark first and Jhoanna second so the scripted skip → pay demo works:

| # | Name / age | Biller | PHP | Story |
|---|---|---|---:|---|
| 1 | Mark, 30 | Grab Food | 689 | 3 AM Jollibee again. Self-care is expensive. |
| 2 | Jhoanna, 24 | Meralco | 6,420 | Aircon ran 24/7 all summer. Hindi ako sorry. |
| 3 | Paolo, 21 | Tuition | 38,000 | 3rd year BS Engineering. Please. Calculus is already hurting me. |
| 4 | Kristine, 27 | Shopee | 3,299 | 47 items in my cart. I need none of them. I want all of them. |
| 5 | Bea, 25 | Maynilad | 1,250 | My tita does laundry daily. Daily. |
| 6 | Jun, 33 | Globe | 1,799 | Postpaid plan for 'work'. It's TikTok. |
| 7 | Andrea, 22 | Meralco | 2,180 | Three electric fans and a rice cooker that's always on. |
| 8 | Rico, 28 | Hospital | 12,500 | Tried to do a backflip at a reunion. Didn't. |
| 9 | Camille, 26 | PLDT | 1,699 | Wi-Fi so slow I paid for it twice out of spite. |
| 10 | Nico, 19 | Tuition | 22,000 | Shifted courses 3 times. This is the one. Probably. |
| 11 | Liza, 31 | Grab Food | 1,120 | Ordered milk tea for the whole office to be liked. |
| 12 | Ben, 29 | Meralco | 4,999 | Gaming PC runs 18 hours a day. It's a career. |

Add tasteful fixed emojis, desperation levels, and match percentages for each as local constants. Use stable unique IDs (e.g., seed generation + record index). Do not use personally identifiable bills or photographs.

## 7. Match and receipt [P0]

On successful Pay or Super Pay, show an accessible full-viewport overlay:

- Large **“It's a match.”** heading, both fake avatars, paid recipient and biller, amount; e.g., “You just paid Jhoanna's Meralco.”
- A clean, non-branded sample receipt within the same overlay (no required wait): **“Payment successful · SIMULATION”**; bill amount, fake amount deducted, and Super Pay fake bonus line if applicable.
- 13-digit pseudo-random numeric reference; time formatted in `Asia/Manila` (`Intl.DateTimeFormat` with explicit timezone). Generated receipt metadata remains stable for the transaction if it is reopened.
- Exactly the disclaimer **“Demo only — no real money moved.”** in the receipt.
- **Keep swiping** closes overlay to Swipe. **View leaderboard** closes overlay and opens Leaderboard.
- Optional short Web Audio API tone only after user gesture, default muted or with a clear sound toggle. Failure to play audio cannot block match flow.

## 8. Post a bill [P0]

Fields: name (pre-fill current user's name), age (optional, default 24, range 18–99), description textarea labelled **“Describe your bill. Be dramatic.”**, amount in PHP, category/biller from the seeded list. Never collect account numbers, addresses, or real bill images.

**Make it irresistible** constructs a preview locally (no API required):
- Validate name is 1–40 characters, description 5–240 characters, and amount is a finite number between ₱1 and ₱1,000,000 (at most 2 decimal places). Show inline errors; keep entered values.
- Produce an amusing Taglish rewrite with a deterministic template derived from the category and input. Preserve facts: do not fabricate diagnoses, financial hardship, account details, or identities. Allow small canned prefixes like “Pls. ” and clean punctuation.
- Use the same visual card renderer for preview as for Swipe. Determine valid `desperationLevel` (1–100) and `matchPercent` (60–99) locally.
- **Post to the feed** creates a new unique ID, inserts the previewed bill at the **top** of the remaining Swipe stack, persists it, clears preview, and navigates to Swipe.
- Prevent accidental double post (disable while submitting / unique action guard). User must be able to post then see the card immediately in the feed.

**Why no live OpenAI API:** A single offline `file://` page cannot safely hold a secret API key, and an online API would violate the no-network guarantee. Keep a named function boundary such as `generateStoryLocally()` so a future secure backend adapter can replace it without touching this MVP flow.

## 9. Leaderboard [P0]

- Show six fictional rivals and the current user; ranked by amount paid, descending; tie break by name for stable rendering.
- Toggle **All-time** (default) / **Tonight**. Use distinct seeded mock totals for rivals; user totals represent the current fake session and count in both filters. This is an explicit demo simplification, not a real date-based ledger.
- Seed rivals as follows:

| Rival | All-time PHP | Tonight PHP | Paid count | Skipped |
|---|---:|---:|---:|---:|
| Don Sergio of Forbes Park | 48,000 | 18,000 | 8 | 1 |
| Tita Baby BGC | 31,500 | 12,500 | 6 | 2 |
| CryptoKing69 | 22,000 | 9,000 | 4 | 5 |
| Nepo Baby Nico | 15,800 | 7,800 | 4 | 3 |
| Señorita Ayala-ish | 9,400 | 3,000 | 3 | 4 |
| Tech Bro from Makati | 4,200 | 1,200 | 1 | 14 |

- Row: rank number, emoji/avatar, name, muted flex title, formatted total, number of bills paid, and at most one badge. Badge precedence: rank #1 **Certified Sugar Daddy/Mommy**; else ≥ ₱100,000 **Philanthro-Pogi**; else paidCount ≥ 5 **Bayanihan Baller**; else skipped ≥ 10 **Kuripot**.
- Current user has a thin accent outline and is labelled **You** without hiding their name.
- Ranking updates immediately after each Pay/Super Pay. Compare user's previous and current ranks under the **active** filter; show “You just overtook {rival name}.” when passing someone; for multiple rivals, highlight the highest-ranked rival overtaken (e.g., Don Sergio) to make the climax land. No false overtake toast on first render, skips, reload, or switching leaderboard filters.
- Use subtle reorder transition or number count-up if practical; correctness > animation.
- **Hall of Shame [P1]** at bottom: fictional skippers, e.g., “Judged 14. Paid 0.”; optional.

**Demo guarantee:** In All-time view, from a fresh rich user, Skip Mark → Pay Jhoanna (₱6,420) → Super Pay Paolo (₱76,000) results in **₱82,420** total, moving the user above Don Sergio (₱48,000). This must reliably show the Don Sergio overtake toast at the next leaderboard visit or immediately when the payment occurs. If leaderboard was not visible during a transaction, queue one relevant pending overtake announcement and display it when the user visits it. Do not lose it between match → leaderboard.

## 10. Me [P1 except reset + role switch]

- Display fake wallet balance, total paid, bills paid, bills skipped, and **Generosity Score** `round(100 * paidCount / (paidCount + skipped))`, with zero denominator = 0. (*Here “paid” in the score means bills paid count, not peso amount.*)
- Role switch **[P0]**, sound toggle **[P1]**, **Reset demo [P0]** with confirmation; reset deletes only `tb_` keys created by this app, preserving unrelated localStorage.
- **End night [P1]** renders a tasteful “Sugarbills Wrapped” card using a deterministic Taglish roast derived from paid count, skipped count, and score /10, with a **Copy text** button. Use `navigator.clipboard` if supported; on `file://` failure, offer a selectable fallback; do not claim successful copy if it fails.
- Do not show an API key input. No secret should be requested or saved.

## 11. State model and lifecycle

Store plain JSON values under these names (the examples below describe shapes, not literal JSON to paste into source):

```js
// localStorage keys; JSON.parse/JSON.stringify with validation and fallback.
tb_user = {
  name: "You", role: "rich", title: "Old Money", wallet: 1000000,
  starterWalletClaimed: true, paid: 0, paidCount: 0, skipped: 0
};
tb_bills = [{
  id: "seed-1-01", name: "Mark", age: 30, emoji: "🍗",
  billType: "Grab Food", amount: 689, story: "3 AM Jollibee again. Self-care is expensive.",
  desperationLevel: 73, matchPercent: 94
}];
tb_rivals = [{
  id: "rival-don-sergio", name: "Don Sergio of Forbes Park", title: "Old Money",
  emoji: "🕴️", allTime: 48000, tonight: 18000, count: 8, skipped: 1
}];
tb_history = [{
  id: "txn-unique", billId: "seed-1-02", action: "pay", billAmount: 6420,
  deducted: 6420, bonus: 0, receiptRef: "1234567890123", isoTimestamp: "2026-11-06T00:00:00.000Z"
}];
tb_settings = { sound: false, lastTab: "swipe", leaderboardFilter: "allTime" };
tb_meta = { version: 1, seedGeneration: 1, pendingOvertakeName: null };
```

**Important invariants:**
- The wallet is always a finite nonnegative number; money is PHP, calculated in integer **centavos** internally if helpful to avoid floating-point errors. Render ₱ with `Intl.NumberFormat('en-PH', {style: 'currency', currency: 'PHP'})` or equivalent clear formatting.
- No duplicates or double-charges when dragging and tapping quickly.
- Bills in the active `tb_bills` stack are unpaid/unskipped; action removes one and creates one history record (skip records may have zero deduction) atomically in the in-memory state before persisting.
- Leaderboard's user row is always **derived from `tb_user`**; do not store a second mutable copy of user totals in rival rows.
- Rehydrate validated storage on load; if corrupt or a schema mismatch, restore safe defaults. On initial setup seed fake bills/rivals exactly once. Reseeding replenishes only demo bills and increases generation ID; no duplicate bill IDs.
- `Reset demo` clears the app's owned keys and reloads the onboarding state.

## 12. Acceptance and test matrix [must complete P0]

| Priority | Test | Expected result |
|---|---|---|
| P0 | Open `index.html` directly with network disabled | Onboarding loads; no missing assets, runtime errors, or API calls |
| P0 | Choose Rich / refresh | Name/title/wallet remain; no repeated bonus |
| P0 | Choose Broke / post / switch to Rich | Post works; rich role enables pay; starter wallet granted once |
| P0 | Use mouse to drag left Mark | “NEXT.” feedback; skip increments by exactly one; next card Jhoanna |
| P0 | Use right drag or → on Jhoanna | Wallet becomes ₱993,580; one match with receipt, Jhoanna removed |
| P0 | Super Pay Paolo | Wallet becomes ₱917,580; paid total ₱82,420; paidCount 2; receipt labels fake bonus |
| P0 | Open All-time leaderboard | User ranked #1 over Don Sergio; correct overtake toast, once |
| P0 | Post custom valid bill then view Swipe | It becomes top card and persists after refresh |
| P0 | Invalid/empty amount and rapid repeated action | Error shown; no double posting, double deduction, or broken card |
| P0 | Use keyboard arrow keys / mobile touch | All three actions operate; form fields do not trigger shortcuts |
| P0 | Insufficient wallet (e.g. drain with more bills) | Declined toast; same card, no wallet/count mutation |
| P0 | Exhaust deck / load more | New unique bills show; user stats and wallet remain |
| P0 | Reset demo | App-owned localStorage keys cleared; onboarding appears |
| P0 | 360px mobile, desktop projector, dark mode, reduced motion | Legible, navigable, no horizontal overflow, accessible interactions |
| P1 | Tonight/All-time switch | Rivals show different totals; current user remains correct |
| P1 | Wrapped/Copy | Roast reflects correct stats; copy fallback works |

**Testing evidence:** At finish, list the checks you personally ran and the checks requiring manual browser verification. Avoid inventing Playwright or screenshot results. If a browser/testing tool is present, exercise the 60-second path and fix observed issues.

## 13. Demo script (60–90 seconds; follows actual UI)

1. Introduce: “Everyone has bills. Some people have too much money. This is Sugarbills — swipe right if you're rich.” Choose Rich (display name “You”, title “Old Money”).
2. Skip Mark: “NEXT.” Then Pay Jhoanna's Meralco (₱6,420). Show “It's a match.” + fake receipt.
3. Say “Anyone here have a bill?” Open Post, enter a tiny sample (or ask a judge), tap “Make it irresistible”, preview, then post. Return to Swipe; show newly created card at the top. (You may skip paying the custom card to keep the ranking arithmetic deterministic.)
4. To show the climax, pay or skip the custom post, then **Super Pay Paolo's ₱38,000 tuition bill**, which counts as ₱76,000 simulated generosity. Open **All-time** Leaderboard. User now has **₱82,420**, overtakes Don Sergio's ₱48,000, and the overtake toast appears.
5. If P1 Wrapped is present, show “End night” roast. Close: “Rich people don't donate. They compete. Sugarbills.”

If asked whether a real version is possible, describe payment integrations as a **future, subject-to-regulatory-review concept**, not an existing integration or legal claim. Never suggest the demo has BSP or DSWD approval.

## 14. Implementation order

1. **P0 shell + state:** single HTML file, CSS tokens, navigation, storage, seed data, onboarding.
2. **P0 core:** swipe stack, button/keyboard/pointer gestures, single-action state transitions.
3. **P0 payoff:** match overlay, stable receipt, fake wallet, demo disclaimer.
4. **P0 climax:** leaderboard, ranks, overtake detection and queued notification.
5. **P0 creation:** post form, local story generation, preview, insert on top.
6. **P0 hardening:** input validation, browser offlining, keyboard guarding, reset, responsiveness, reduced motion, manual tests.
7. **P1 only if P0 passes:** sound, Hall of Shame, Wrapped, animations.

**Do not implement real API calls, backend endpoints, analytics trackers, authentication, or actual payments.**

## 15. Definition of done

- [ ] App is **implemented**, not only described, in `index.html` and opens via `file://` offline.
- [ ] Onboarding, all four tabs, working swipe controls, match receipt, wallet, and leaderboard operate end-to-end.
- [ ] Overtake of Don Sergio is reproducible using the deterministic script.
- [ ] Post bill uses local generation; preview and posting work without an API key.
- [ ] UI follows the strict minimalist one-accent design.
- [ ] Fake-payment disclaimer is unmistakable.
- [ ] State survives reloads, has no double-pay loophole, and resets cleanly.
- [ ] `README.md` documents run and manual demo/testing steps.
