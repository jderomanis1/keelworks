# Deromanis self-hosted OFL fonts

Source: Fontsource Fraunces + IBM Plex Sans/Mono (OFL-1.1).

- License texts: `OFL-*.txt`
- Font binaries: committed as `*.woff2.b64` (base64 text) because GitHub MCP cannot push binary woff2 intact (UTF-8 corruption).
- `pages.yml` decodes `*.woff2.b64` → `*.woff2` into the Pages `_site` artifact and strips the `.b64` from the deploy.

No Google Fonts CDN.
