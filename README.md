# Bluebird release site

Bluebird is a desktop-style Android launcher with floating windows, a taskbar, and built-in applications. This repository contains the public release site and distributed APK files. The application source is not included.

## Releases

APK files should be attached to GitHub Releases. The release site reads the generated `downloads.json` file and displays the total download count for all published APK assets.

The `Sync APK download counts` workflow:

- runs hourly and when a release is published or edited;
- reads each release asset's GitHub `download_count`;
- totals only assets ending in `.apk`;
- writes the result to `public/downloads.json`; and
- commits the updated data so GitHub Pages can serve it without a client-side API dependency.

The displayed number is an asset-download total. It does not represent unique users, installations, or active devices.

## Release checklist

1. Create a GitHub Release with a version tag such as `v2.2`.
2. Upload the APK as a release asset.
3. Publish the release.
4. The download-count workflow will update the release site automatically.

The APKs in `assets/apks/` are retained as fallback files for the release site while the corresponding GitHub Releases are being created.

## Site development

```bash
npm install
npm run dev
npm run build
```

The site is built with React and Vite. GitHub Pages uses the `react-pages` branch.
