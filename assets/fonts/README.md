# Deromanis self-hosted OFL fonts

Source: Fontsource Fraunces + IBM Plex Sans/Mono (OFL-1.1).

- License texts: `OFL-*.txt`
- Font binaries: committed as ASCII base64 because GitHub MCP cannot push binary woff2 intact (UTF-8 corruption).
  - Full file: `*.woff2.b64`
  - Or split: `*.woff2.b64.part1` + `*.woff2.b64.part2` (concat then decode)
- `pages.yml` decodes into real `.woff2` in the Pages `_site` artifact and strips `.b64` / `.part*` from deploy.

No Google Fonts CDN. System font stacks in `tokens.css` cover missing faces until all parts are shipped.
