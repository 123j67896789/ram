# Carbon Chromium Privacy Browser

A custom grey/white/black desktop browser prototype built on **Electron (Chromium)** with:

- A fully custom monochrome browser UI
- Built-in proxy rule controls (`direct://`, HTTP proxy rules, SOCKS rules)
- Privacy-oriented defaults (reduced background networking, denied runtime permission prompts, stricter WebRTC proxy handling)

## Quick start

```bash
npm install
npm run start
```

## Proxy examples

- `direct://`
- `http=127.0.0.1:8080;https=127.0.0.1:8080`
- `socks5://127.0.0.1:9050`

You can also start with an environment default:

```bash
CARBON_PROXY_RULE="socks5://127.0.0.1:9050" npm run start
```

## Important privacy disclaimer

This project improves privacy posture but does **not** guarantee anonymity or “extreme privacy” by itself.
Traffic privacy still depends on your proxy/VPN/Tor trust model, endpoint hygiene, and operational security.
# Carbon UI Chromium Concept

A custom, cool monochrome browser concept inspired by Chromium with a grey/white/black visual style.

## Run locally

Open `index.html` in any browser.
