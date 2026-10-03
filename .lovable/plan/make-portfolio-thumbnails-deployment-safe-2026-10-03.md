# Make portfolio thumbnails deployment-safe

## Build
- Replace the 33 Lovable-only thumbnail pointer URLs with local image files bundled by Vite.
- Keep the typed portfolio catalogue, video order, aspect ratios, cards, overlays, and visual design unchanged.
- Update the deployment architecture note so future thumbnails follow the same production-safe pattern.

## Verification
- Run the production build used by GitHub Pages.
- Inspect the generated site to confirm every thumbnail URL resolves to an emitted image file.
- Serve the production output locally and verify all portfolio categories show thumbnails with centered play buttons.
