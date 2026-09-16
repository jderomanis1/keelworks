# DeRomanis AI: launch and next steps

## Brand and positioning

Public brand: **DeRomanis AI**. Preserve the surname's capital D and R in the wordmark, titles, prose, proposals, and correspondence. Use lowercase for URLs and email. The repository name `keelworks` is historical; no domain registration or DNS change is implied.

Primary promise: **You imagine it. We make it real.**

Supporting position: A human-led AI studio for websites, apps, automation, assistants, connected knowledge, and practical AI enablement. Joe directs and reviews the work. Tools are capabilities, not staff headcount, partners, or a guarantee of quality. Do not add invented client results, certifications, budgets, team size, or testimonials.

## What's implemented

- Responsive dark/ivory visual system with lime accents, original browser-rendered particle sculpture, and a pause control. The sculpture respects reduced-motion settings and stops scheduling animation when off-screen or the page is hidden.
- Correctly cased DeRomanis identity, accessible navigation, focus states, skip link, native FAQs, and a real Cimo project link.
- Possibility Studio: six explicit project categories, editable input, tailored template/priority combinations, editable output, copy, text download, and email handoff. No language model, prompt interpretation, or inferred feasibility is claimed. The selected category and priority determine the template. Original input is inserted as literal text.
- Time calculator: repetitions × minutes × assumed percentage reduction ÷ 60. All values are hypothetical user assumptions. Gross time, not net savings or a guaranteed return. No monetary ROI claim.
- No artificial five-question lock. No analytics or browser-storage persistence. The website does not submit messages to a backend. Email opens the user's email app; the user must review and send. Long briefs are excerpted to keep the mailto URI practical. Save/attach or copy/paste the full brief.
- Optional prerecorded cloned-voice intro and an optional hosted ElevenLabs widget. Both are OFF until configured. No keys, accounts, subscriptions, or paid services were activated.

## Files and deployment

Active files:

- `index.html`
- `css/deromanis.css`
- `js/deromanis.js`
- `js/deromanis-config.js`

The existing GitHub Pages workflow stages index.html, css/, js/, and assets/. It does not deploy this Markdown document or the repository README. Legacy styles/scripts/fonts are preserved for rollback but are not referenced by the new page. New typography uses the browser's system sans-serif stack; it does not claim an unloaded custom font. There is no package installation or build step for the new site.

Public contact details are preserved from the previous site: joe@deromanis.com and 602.568.5508. Text links now use `sms:` rather than mislabeled `tel:` links.

## Voice option 1: a polished introduction without a runtime API

1. In Joe's existing ElevenLabs account, use his authorized cloned voice to generate the approved introduction below.
2. Export an MP3. Review every word and the pronunciation of DeRomanis.
3. Add the audio file as `assets/joe-intro.mp3` through a binary-capable upload method.
4. Set `intro.audioPath` to `assets/joe-intro.mp3` and `intro.transcript` to the exact spoken text in `js/deromanis-config.js`.
5. Verify the player, transcript, phone playback, and visible synthetic-voice disclosure. Audio never autoplays.

Suggested script, subject to Joe's approval:

> Hi, I'm Joe's AI voice. The technology is artificial. The person behind the work is very real. At DeRomanis AI, we take the thing you've been imagining, a website, an app, or a better way to work, and turn it into something useful. You don't need to speak technology. Bring the idea. Joe will help you find the right place to start.

This is prerecorded media, not a live assistant. It has no per-visitor text-generation call, but creating the audio uses the ElevenLabs account and any applicable plan allowance. Do not substitute a generic browser voice and describe it as Joe's clone.

## Voice option 2: Joe's AI guide, live voice and text

Recommended next interactive upgrade once Joe approves the knowledge, behavior, and account settings.

1. Create an ElevenLabs Agent using Joe's authorized voice clone. Configure voice plus text input in the dashboard.
2. Use only approved public information: capabilities, process, the Cimo project, contact information, and the policy that scope, pricing, and commitments require Joe.
3. Keep the role bounded: help understand an idea and choose a next step. No autonomous email, booking, account access, payments, or contracts. No unsupported claims about completed work or credentials.
4. First message: "Hi, I'm Joe's AI guide, using his authorized voice clone. I'm not Joe live. What are you thinking about building?"
5. Review the provider's recording, retention, privacy, and disclosure settings. Set account-side usage limits, concurrency/duration restrictions where available, and spend notifications. Test out-of-scope prompts, uncertain questions, interruptions, mobile microphone permissions, and failure recovery.
6. The basic public widget uses a public Agent ID. Allowlist the actual website hostname, `jderomanis1.github.io`, and any future verified custom hostname. An allowlist is not strong authentication. If tighter control is required, use authenticated sessions minted by a backend and an SDK integration instead of assuming a static embed enforces private access.
7. Put only the public `agent_...` ID into `voice.agentId`. Never publish an ElevenLabs API key in JavaScript, HTML, a URL, this repository, or a chat message.
8. The site's Enable voice & chat button loads the provider's widget only after explicit visitor action. It does not automatically start a microphone session. The local studio remains usable if the provider fails.
9. Run a real voice/text acceptance test before advertising the agent as available. This integration scaffold has not been tested against Joe's account or a real agent.

No custom backend is needed for the basic public widget, but this is NOT an offline/no-API experience: it uses ElevenLabs' hosted services and applicable usage billing. Do not describe it as free or unlimited. The provider's widget code is loaded from the current official documented embed URL; review dependency/version changes before activation.

Primary documentation checked for this design:
- https://elevenlabs.io/docs/eleven-agents/customization/widget
- https://elevenlabs.io/docs/eleven-agents/customization/authentication
- https://elevenlabs.io/docs/eleven-agents/quickstart
- https://webllm.mlc.ai/docs/user/get_started.html

## A realistic talking Joe

Treat this as a separate phase, not a stock avatar silently presented as Joe. A voice clone is not a face/video avatar. Use Joe's own supplied, approved likeness and explicit provider consent/verification requirements. Review current live-avatar providers, latency, mobile performance, retention, and separate usage costs. Always identify the experience as AI, not Joe speaking live. Do not invent or generate his face from a name or substitute another person.

Start with a disclosed voice/orb experience or real portrait and voice. Move to a photorealistic live avatar only when it makes the conversation better, not just more novel.

## Verification and outstanding work

40 local Chromium checks passed: eight widths from 320 to 1920, six project templates, literal input handling, editable downloads, copy feedback, safe email excerpts, calculator default/zero/maximum cases, keyboard tabs, mobile menu, privacy disclosure, reduced-motion behavior, and no JavaScript errors. No default third-party requests were observed in the locally bundled tests. These are functional checks, not an independent accessibility or security certification.

Local rendering was tested by bundling the actual HTML/CSS/JS into Chromium because the execution environment blocked localhost network navigation. Production deployment status must be checked independently through GitHub Actions. A successful deployment is not the same as end-to-end testing in a real visitor's Safari or mobile device.

Still needed: Joe's intended personal-site URL for richer approved biography; an approved headshot for a real portrait; approved intro MP3 and exact transcript OR an approved configured public ElevenLabs Agent ID. Paid services and a live realistic avatar are not enabled.
