import { useEffect, useMemo, useState } from 'react';

const asset = (path) => (import.meta.env.BASE_URL + path).replace('//assets', '/assets');
const repo = 'https://github.com/trebronwayne/bluebird-release';
const releasesUrl = repo + '/releases';
const latestVersion = '2.1';

const releases = [
  {
    version: '2.1',
    status: 'Latest',
    note: 'Latest improvements and fixes',
    date: 'September 2026',
    releaseUrl: releasesUrl + '/tag/v2.1',
    fallbackUrl: asset('assets/apks/Bluebird-v2.1.apk')
  },
  {
    version: '2.0',
    status: 'Previous',
    note: 'Desktop-style launcher, refreshed',
    date: 'August 2026',
    releaseUrl: releasesUrl + '/tag/v2.0',
    fallbackUrl: asset('assets/apks/Bluebird-v2.0.apk')
  }
];

const screenshots = [
  { src: 'assets/img/screenshots/desktop.png', title: 'Desktop', description: 'The Android home screen with a taskbar, application shortcuts, wallpaper, and floating windows.', className: 'landscape wide' },
  { src: 'assets/img/screenshots/startmenu.png', title: 'Start menu', description: 'Application, settings, and document search from one location.', className: 'landscape' },
  { src: 'assets/img/screenshots/explorer.png', title: 'File Explorer', description: 'File browsing with folders, quick access, and recent files.', className: 'landscape' },
  { src: 'assets/img/screenshots/editor.png', title: 'Widgets', description: 'Time, photos, tasks, alarms, and network information.', className: 'portrait' },
  { src: 'assets/img/screenshots/settings.png', title: 'Settings', description: 'Controls for the background, appearance, and quick settings.', className: 'landscape' }
];

const features = [
  { number: '01', title: 'Floating windows', text: 'Open supported applications in resizable windows while keeping the home screen and taskbar available.' },
  { number: '02', title: 'Android launcher', text: 'Set Bluebird as the Android home application. Root access and additional hardware are not required.' },
  { number: '03', title: 'Built-in applications', text: 'Includes Explorer, terminal, word processor, media player, and an application store for lightweight web apps.' }
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function DownloadButton({ release, secondary = false }) {
  const href = release.downloadUrl || release.fallbackUrl;
  return (
    <a className={'button ' + (secondary ? 'button-secondary' : 'button-primary')} href={href} download={!release.downloadUrl}>
      Download APK <Arrow />
    </a>
  );
}

function ScreenshotCard({ shot, featured = false }) {
  return (
    <article className={'screenshot-card ' + (featured ? 'featured' : '')}>
      <div className={'screenshot-frame ' + shot.className}>
        <div className="window-bar" aria-hidden="true"><span></span><span></span><span></span><em>{'bluebird / ' + shot.title.toLowerCase()}</em></div>
        <div className="image-wrap"><img src={asset(shot.src)} alt={'Bluebird ' + shot.title + ' screenshot'} loading="lazy" /></div>
      </div>
      <div className="screenshot-copy">
        <h3>{shot.title}</h3>
        <p>{shot.description}</p>
      </div>
    </article>
  );
}

function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(value);
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [downloadData, setDownloadData] = useState(null);

  useEffect(() => {
    document.title = 'Bluebird — Android launcher releases';
    fetch(asset('downloads.json'), { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => setDownloadData(data))
      .catch(() => setDownloadData(null));
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const releaseData = downloadData?.releases || [];
  const mergedReleases = useMemo(() => releases.map((release) => {
    const current = releaseData.find((item) => item.version === release.version);
    return { ...release, ...(current || {}) };
  }), [releaseData]);
  const latestRelease = mergedReleases.find((release) => release.version === latestVersion) || mergedReleases[0];
  const totalDownloads = downloadData?.totalApkDownloads;
  const updatedDate = downloadData?.updatedAt ? new Date(downloadData.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : null;

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-mark"><img src={asset('assets/img/logo_1.png')} alt="" /></span>
          <span><strong>Bluebird</strong><small>Android launcher</small></span>
        </a>
        <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span>
        </button>
        <nav className={menuOpen ? 'site-nav open' : 'site-nav'} aria-label="Main navigation">
          <a href="#releases" onClick={closeMenu}>Releases</a>
          <a href="#installation" onClick={closeMenu}>Installation</a>
          <a href="#privacy" onClick={closeMenu}>Privacy</a>
          <a href={repo} target="_blank" rel="noreferrer" onClick={closeMenu}>Source</a>
          <a className="nav-download" href={latestRelease.downloadUrl || latestRelease.fallbackUrl} download={!latestRelease.downloadUrl} onClick={closeMenu}>Download APK</a>
        </nav>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="hero-copy">
            <p className="kicker">Official release site</p>
            <h1>Bluebird for <span>Android.</span></h1>
            <p className="hero-lede">A desktop-style Android launcher with floating windows, a taskbar, and built-in applications.</p>
            <div className="hero-actions">
              <DownloadButton release={latestRelease} />
              <a className="text-link" href="#releases">View release history <Arrow /></a>
            </div>
            <div className="hero-meta"><span>Latest v{latestVersion}</span><i></i><span>Android 8.0+</span><i></i><span>No root required</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-frame">
              <div className="window-bar"><span></span><span></span><span></span><em>bluebird / desktop</em></div>
              <img src={asset('assets/img/screenshots/desktop.png')} alt="Bluebird desktop-style Android home screen" />
            </div>
          </div>
        </section>

        <section className="stats section-compact" aria-label="Release information">
          <div><strong>v{latestVersion}</strong><span>Latest release</span></div>
          <div><strong>26+</strong><span>Android API</span></div>
          <div><strong>{totalDownloads === undefined ? '—' : formatNumber(totalDownloads)}</strong><span>Total APK downloads</span></div>
          <div><strong>0</strong><span>Root permissions</span></div>
        </section>

        <section className="section release-section" id="releases">
          <div className="section-heading">
            <div><p className="kicker">Release history</p><h2>Available <span>releases.</span></h2></div>
            <p className="section-intro">APK files and release information for Bluebird. Download counts are provided by GitHub release assets.</p>
          </div>
          <div className="release-summary">
            <div><span className="summary-label">Total APK downloads</span><strong>{totalDownloads === undefined ? '—' : formatNumber(totalDownloads)}</strong><span className="summary-detail">{updatedDate ? 'Updated ' + updatedDate : 'Download data pending first release sync'}</span></div>
            <div><span className="summary-label">Latest version</span><strong>v{latestVersion}</strong><span className="summary-detail">Android 8.0 or later · No root access</span></div>
          </div>
          <div className="release-table" role="table" aria-label="Bluebird releases">
            <div className="release-table-head" role="row"><span>Version</span><span>Release date</span><span>Status</span><span>Downloads</span><span aria-label="Actions"></span></div>
            {mergedReleases.map((release) => <div className="release-row" role="row" key={release.version}>
              <strong>v{release.version}</strong>
              <span>{release.date}</span>
              <span><b className={release.version === latestVersion ? 'status-latest' : 'status-previous'}>{release.status}</b></span>
              <span className="release-count">{release.downloads === undefined ? '—' : formatNumber(release.downloads)}</span>
              <span className="release-actions"><a href={release.downloadUrl || release.fallbackUrl} download={!release.downloadUrl}>Download</a><a href={release.releaseUrl} target="_blank" rel="noreferrer">Notes</a></span>
            </div>)}
          </div>
          <p className="data-note">Download counts are asset-download totals, not unique users or installations. <a href={repo + '/releases'} target="_blank" rel="noreferrer">View releases on GitHub <Arrow /></a></p>
        </section>

        <section className="section showcase" id="showcase">
          <div className="section-heading">
            <div><p className="kicker">Application overview</p><h2>Included <span>features.</span></h2></div>
            <p className="section-intro">A visual overview of the launcher and its included applications.</p>
          </div>
          <div className="showcase-grid">
            {screenshots.map((shot, index) => <ScreenshotCard key={shot.title} shot={shot} featured={index === 0} />)}
          </div>
        </section>

        <section className="section features" id="features">
          <div className="section-heading split-heading"><div><p className="kicker">Functionality</p><h2>Launcher <span>features.</span></h2></div><p className="section-intro">Bluebird provides a desktop-style surface while remaining an Android home application.</p></div>
          <div className="feature-grid">
            {features.map((feature) => <article className="feature" key={feature.number}><span className="feature-number">{feature.number}</span><h3>{feature.title}</h3><p>{feature.text}</p></article>)}
          </div>
        </section>

        <section className="section docs-section" id="installation">
          <div className="docs-panel">
            <div className="section-heading"><div><p className="kicker">Installation</p><h2>Install <span>Bluebird.</span></h2></div><p className="section-intro">Download the APK, install it on an Android device, and select Bluebird as the default home application.</p></div>
            <div className="steps"><div><b>01</b><strong>Download the APK</strong><p>Choose a release from the table above.</p></div><div><b>02</b><strong>Install the package</strong><p>Use the file manager or install with ADB.</p></div><div><b>03</b><strong>Select the home app</strong><p>Settings → Apps → Default Apps → Home App → Bluebird.</p></div></div>
            <div className="code-line"><span>adb install Bluebird-v{latestVersion}.apk</span><button type="button" onClick={() => navigator.clipboard?.writeText('adb install Bluebird-v' + latestVersion + '.apk')}>Copy</button></div>
          </div>
        </section>

        <section className="legal section-compact" id="privacy">
          <div><p className="kicker">Privacy</p><h2>Privacy and<br /><span>data handling.</span></h2></div>
          <p>Bluebird does not collect personal data or telemetry from inside the application. Files, settings, and application data remain on the device. Downloads and visits to GitHub are subject to GitHub's privacy policy.</p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main"><a className="brand" href="#home"><span className="brand-mark"><img src={asset('assets/img/logo_1.png')} alt="" /></span><span><strong>Bluebird</strong><small>Android launcher</small></span></a><p>Official release information</p><div className="footer-links"><a href={repo} target="_blank" rel="noreferrer">Source</a><a href="#privacy">Privacy</a><a href="#installation">Installation</a></div></div>
        <div className="footer-bottom"><span>© 2024–2026 Bluebird</span><span>Android launcher · Uganda</span></div>
      </footer>
    </div>
  );
}

export default App;