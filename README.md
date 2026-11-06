# Sugarbills

An offline comedy demo: swipe past fictional bills, spend a fake fortune, and overtake Don Sergio. Built as one standalone HTML file with inline CSS, JavaScript, and SVG; no runtime dependencies.

## Open

Double-click `index.html` and open it in desktop Chrome. It works with Wi-Fi off, directly from `file://`. No install, build, server, account, or API key is needed.

Choose **I'm rich** or **I'm broke**, then **Keep swiping**. Pick a title and display name, then enter the app. Rich starts with a fake ₱1,000,000; Broke opens Post. The display name defaults to You. Navigation is a sidebar on desktop and a bottom bar on mobile.

## Interactive onboarding and refreshed UI

- A draggable practice bill with Skip preview, Pay preview, and Try again. Practice never spends money, changes the real feed, or creates receipts.
- Two-step role and persona selection. Going back preserves your name and title.
- A live membership card updates as you type your name and choose one of five titles.
- Matching theSVG outline/duotone icons, stronger bill cards, a dark wallet panel, and a leaderboard target showing your distance from Don Sergio.
- Existing users can see onboarding with **Me → Reset demo**; this intentionally clears local demo progress after confirmation.
- SVG artwork is embedded in the HTML. No network, library installation, or font downloads are required. Attribution is in `THIRD_PARTY_NOTICES.md` and inside the HTML.

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

1. Start fresh with **I'm rich** → **Keep swiping**, name You, and Old Money → **See my rundown** → **Okay, I’m thrilled and ready to pay all**.
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

The UI refresh additionally passed practice isolation, live name/title preview, back-navigation draft retention, onboarding validation, and responsive layout checks. Screenshot review covered desktop and mobile light/dark layouts. Icons are sourced from the cloned `glincker/thesvg` UI collection (MIT), using only selected inline assets.


## Laugh-to-pay: the pitch

Broke users write a witty plea in **Post → Your pitch. Make them laugh.** Rich users try not to smile. Open **Swipe → Try laugh-to-pay → Enable camera & auto-pay** and allow camera access. Start with a straight face, then read a pitch and hold a smile. A sustained high smile estimate pays the current bill once. After the receipt, press **Arm this bill** to play again.

Smile detection is a demo proxy for laughter, not proof that someone laughed. It can make mistakes. Only simulated money moves. **That got me. Pay this bill** is the manual fallback. Super Pay stays manual. The rundown's final button opens the feed; it never pays all bills automatically.

Camera processing runs entirely in your browser using bundled face-api.js 0.22.2 and tiny face/expression models. No images or video are recorded, saved, or uploaded; no microphone or face identification is used. Camera stops on leaving Swipe or hiding the page. HTTPS Chrome is recommended for the live demo; local-file camera support depends on browser permissions. Denied/unavailable cameras leave manual controls usable.

Verification: existing offline suite passes; actual model loading and blank-frame inference pass offline; controlled classifier-score tests cover sustained-smile single payment, initial-smile calibration, multiple-face blocking, receipt creation, re-arm requirement, camera stop, denial fallback, and manual pay. Physical-camera smile accuracy still needs a quick check on the presenting laptop.
