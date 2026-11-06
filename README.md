# Sugarbills

An offline comedy demo: swipe past fictional bills, spend a fake fortune, and overtake Don Sergio. Built as one standalone HTML file with inline CSS, JavaScript, and SVG; no runtime dependencies.

## Open

Double-click `index.html` and open it in desktop Chrome. It works with Wi-Fi off, directly from `file://`. No install, build, server, account, or API key is needed.

Choose **I'm rich** to start with a fake ₱1,000,000, or **I'm broke** to open the Post tab. The display name defaults to You. The bottom navigation has Swipe, Post, Leaderboard, and Me.

**Demo only — no real money moved.** All profiles and payments are fictional.

## Deploy on Vercel

Repository: https://github.com/Maria-Aleana-De-Leon/Sugarbills

1. In Vercel, choose **Add New → Project** and import **Maria-Aleana-De-Leon/Sugarbills**.
2. Keep the root directory at the repository root and the framework preset at **Other**.
3. Click **Deploy**. The included `vercel.json` skips dependency installation, copies the standalone app to `dist/index.html`, and serves `dist`.

No environment variables are needed. The copy step packages only the app for hosting; opening the original `index.html` offline still requires no build. Future pushes to the connected production branch can deploy through Vercel's Git integration.

Browser storage belongs to each origin: the hosted site starts a separate demo from the local file. The existing `tb_state` key is retained so renaming the app does not clear local progress.

Configuration reference: https://vercel.com/docs/builds/configure-a-build

## Controls

- Drag a bill left to Skip or right to Pay; release past 30% of its width to commit. Short drags return the card.
- Use the Skip, Pay, and Super Pay buttons, or keyboard **← / → / ↑** respectively. Shortcuts are inactive in form controls, buttons, and dialogs.
- Super Pay deducts twice the bill amount, counts as one bill paid, and labels the additional amount as a fake bonus.
- Me contains role switching, receipts, End night / Wrapped, and Reset demo. Reset requires confirmation.

## 60-second demo

1. Start fresh with **I'm rich**, name You, and Old Money.
2. Skip Mark's ₱689 bill.
3. Pay Jhoanna's ₱6,420 Meralco bill. Show the simulated receipt, then Keep swiping.
4. Optionally open Post, enter a fictional name, amount, and short description. Select Make it irresistible, then Post to the feed. It appears first; **skip this custom bill** to preserve the demo arithmetic.
5. Super Pay Paolo's ₱38,000 tuition bill: ₱38,000 bill + ₱38,000 fake bonus.
6. View leaderboard in All-time: **₱82,420 paid, two bills paid, wallet ₱917,580, rank #1**, above Don Sergio's ₱48,000. His overtake announcement appears once.
7. Open Me → End night to show your Wrapped roast.

## Persistence and reset

State is stored as a validated JSON snapshot under `tb_state`. A single snapshot keeps wallet, feed, and history together. Reload restores your current tab and demo progress. When browser storage is blocked, the app displays a warning and continues in memory. Moving the file, changing browser profiles, or clearing browser data can change/remove its storage.

Switching roles preserves posts and receipts. The rich starter wallet is granted only once. Loading more bills creates new IDs without refilling the wallet. Reset clears only this app's `tb_state` key and returns to onboarding.

## Verification

`tests/browser-check.cjs` runs acceptance checks in headless installed Chrome, with networking disabled and the page loaded via `file://`. The optional developer test requires Node, Playwright, and Chrome; the app itself requires none of these dependencies beyond Chrome.

```sh
# If Playwright is already resolvable in your environment:
node tests/browser-check.cjs

# Alternatively, point to an existing Playwright installation:
PLAYWRIGHT_MODULE=/absolute/path/to/node_modules/playwright node tests/browser-check.cjs
```

The suite passed on November 6, 2026: offline launch; onboarding and reload; mouse and emulated touch swipes; keyboard pay; exact demo arithmetic; duplicate action and post protection; receipt metadata; ranking/overtake; filters; validation and literal rendering of HTML-like input; posting and persistence; role gating and one-time wallet; insufficient funds; exhaustion/reseed; 360px layout, dark theme, reduced motion; Wrapped; reset; corrupt state and blocked-storage fallback. No runtime errors or network requests were observed. Screenshots were reviewed and mobile spacing corrected.

## Limitations

- Hackathon demo, not a production payments product. No backend, synchronization, real bill submission, or real money.
- Touch was checked using Chrome device emulation; a physical phone, screen reader, and projector were not tested.
- Clipboard availability depends on the browser. Wrapped offers selectable text if copying fails; physical-device clipboard behavior is unverified.
- Rivals are fixed fictional data. Your running demo total counts in both Tonight and All-time.
- Sound and Hall of Shame are not included. Wrapped and receipt reopening are included.
- Local story generation only adds deterministic Taglish text. It never calls an AI service.

## Design reference

Used `Leonxlnx/taste-skill`, cloned into `../taste-skill`, for typography, spacing, restrained color, and interaction guidance. The supplied PRD's single-file/offline constraints, compact app layout, seed data, and explicit design system take precedence over the skill's marketing-page templates and asset pipeline. Its marketing-site checkers were not used; app-specific offline acceptance checks were used instead.
