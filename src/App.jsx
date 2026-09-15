import { useEffect, useState } from 'react';

const asset = (path) => (import.meta.env.BASE_URL + path).replace('//assets', '/assets');
const repo = 'https://github.com/trebronwayne/bluebird-release';
const latestVersion = '2.1';
const apkUrl = (version) => asset('assets/apks/Bluebird-v' + version + '.apk');

const releases = [
  { version: '2.1', status: 'Current release', note: 'Latest improvements and fixes', date: 'September 2026' },
  { version: '2.0', status: 'Previous release', note: 'The desktop-styled launcher, refreshed', date: 'August 2026' }
];

const screenshots = [
  { src: 'assets/img/screenshots/desktop.png', title: 'Desktop', eyebrow: 'The home screen', description: 'A taskbar, app shortcuts, wallpaper, and floating windows — all on your Android home screen.', className: 'landscape wide' },
  { src: 'assets/img/screenshots/startmenu.png', title: 'Start menu', eyebrow: 'Find anything quickly', description: 'Search apps, settings, and documents from one familiar starting point.', className: 'landscape' },
  { src: 'assets/img/screenshots/explorer.png', title: 'File Explorer', eyebrow: 'Your files, organized', description: 'A clean file browser for folders, quick access, and recent files.', className: 'landscape' },
  { src: 'assets/img/screenshots/editor.png', title: 'Widgets', eyebrow: 'Useful at a glance', description: 'Time, photos, tasks, alarms, and network details in one side panel.', className: 'portrait' },
  { src: 'assets/img/screenshots/settings.png', title: 'Settings', eyebrow: 'Make it yours', description: 'Personalize the background, appearance, and quick settings.', className: 'landscape' }
];

const features = [
  { number: '01', title: 'Desktop, not clutter', text: 'Open apps in floating windows and keep your shortcuts, taskbar, and wallpaper within reach.' },
  { number: '02', title: 'A real launcher', text: 'Set Bluebird as your Android home screen. No root, no extra hardware, no complicated setup.' },
  { number: '03', title: 'Small apps, built in', text: 'Explorer, terminal, word processor, media player, and an app store for lightweight web apps.' }
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function DownloadButton({ version = latestVersion, secondary = false, children }) {
  return (
    <a className={'button ' + (secondary ? 'button-secondary' : 'button-primary')} href={apkUrl(version)} download>
      {children || 'Download v' + version} <Arrow />
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
        <p className="eyebrow">{shot.eyebrow}</p>
        <h3>{shot.title}</h3>
        <p>{shot.description}</p>
      </div>
    </article>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = 'Bluebird — Android, with a desktop feel';
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <div className="ambient ambient-one"></div>
      <div className="ambient ambient-two"></div>
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-mark"><img src={asset('assets/img/logo_1.png')} alt="" /></span>
          <span><strong>Bluebird</strong><small>desktop-styled launcher</small></span>
        </a>
        <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span>
        </button>
        <nav className={menuOpen ? 'site-nav open' : 'site-nav'} aria-label="Main navigation">
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#showcase" onClick={closeMenu}>Showcase</a>
          <a href="#releases" onClick={closeMenu}>Releases</a>
          <a href="#docs" onClick={closeMenu}>Docs</a>
          <a className="nav-download" href={apkUrl(latestVersion)} download onClick={closeMenu}>Download <Arrow /></a>
        </nav>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="hero-copy">
            <p className="kicker"><span className="status-dot"></span> Bluebird v{latestVersion} is ready</p>
            <h1>Android, with a <span>desktop feel.</span></h1>
            <p className="hero-lede">A calm, capable launcher that brings windows, a taskbar, and a little more room to your phone.</p>
            <div className="hero-actions">
              <DownloadButton />
              <a className="text-link" href="#showcase">See it in action <Arrow /></a>
            </div>
            <div className="hero-meta"><span>Android 8.0+</span><i></i><span>No root required</span><i></i><span>Free download</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-glow"></div>
            <div className="hero-frame">
              <div className="window-bar"><span></span><span></span><span></span><em>bluebird / desktop</em></div>
              <img src={asset('assets/img/screenshots/desktop.png')} alt="Bluebird desktop-styled Android home screen" />
            </div>
            <div className="floating-note"><strong>01</strong><span>Make your phone<br />feel like a computer.</span></div>
          </div>
        </section>

        <section className="stats section-compact" aria-label="Bluebird facts">
          <div><strong>2.1</strong><span>Latest version</span></div>
          <div><strong>26+</strong><span>Android API</span></div>
          <div><strong>5</strong><span>Built-in tools</span></div>
          <div><strong>0</strong><span>Root permissions</span></div>
        </section>

        <section className="section showcase" id="showcase">
          <div className="section-heading">
            <div><p className="kicker">A closer look</p><h2>Everything where<br /><span>you expect it.</span></h2></div>
            <p className="section-intro">Bluebird keeps the familiar parts of a desktop and leaves the clutter behind. The result is a launcher that feels useful from the first tap.</p>
          </div>
          <div className="showcase-grid">
            {screenshots.map((shot, index) => <ScreenshotCard key={shot.title} shot={shot} featured={index === 0} />)}
          </div>
        </section>

        <section className="section features" id="about">
          <div className="section-heading split-heading"><div><p className="kicker">Why Bluebird</p><h2>More space to<br /><span>do your thing.</span></h2></div><p className="section-intro">It is still Android underneath. Bluebird just gives it a more deliberate surface — one that works for people who think in windows, files, and shortcuts.</p></div>
          <div className="feature-grid">
            {features.map((feature) => <article className="feature" key={feature.number}><span className="feature-number">{feature.number}</span><h3>{feature.title}</h3><p>{feature.text}</p></article>)}
          </div>
        </section>

        <section className="section release-section" id="releases">
          <div className="section-heading"><div><p className="kicker">Release history</p><h2>Pick a version.<br /><span>Make it yours.</span></h2></div><p className="section-intro">Release builds live in the GitHub repository. The download buttons below point to the APKs that are actually available — no dead links.</p></div>
          <div className="release-list">
            {releases.map((release) => <div className={release.version === latestVersion ? 'release-row current' : 'release-row'} key={release.version}><div className="release-version"><span>v{release.version}</span>{release.version === latestVersion && <b>current</b>}</div><div className="release-note"><strong>{release.status}</strong><span>{release.note} · {release.date}</span></div><a className="release-download" href={apkUrl(release.version)} download>Download <Arrow /></a></div>)}
          </div>
          <div className="repo-note"><span className="repo-icon">⌘</span><span>Want the source and release files? <a href={repo} target="_blank" rel="noreferrer">Open the GitHub repository <Arrow /></a></span></div>
        </section>

        <section className="section docs-section" id="docs">
          <div className="docs-panel">
            <div className="section-heading"><div><p className="kicker">Quick start</p><h2>Up and running<br /><span>in a minute.</span></h2></div><p className="section-intro">Install the APK, then choose Bluebird as your default home app. That is it.</p></div>
            <div className="steps"><div><b>01</b><strong>Download</strong><p>Grab the latest APK from the releases above.</p></div><div><b>02</b><strong>Install</strong><p>Install it from your file manager or with ADB.</p></div><div><b>03</b><strong>Set as home</strong><p>Settings → Apps → Default Apps → Home App → Bluebird.</p></div></div>
            <div className="code-line"><span>adb install bluebird-v2.1.apk</span><button type="button" onClick={() => navigator.clipboard?.writeText('adb install bluebird-v2.1.apk')}>Copy</button></div>
          </div>
        </section>

        <section className="legal section-compact" id="privacy">
          <div><p className="kicker">Privacy</p><h2>Offline by default.</h2></div><p>Bluebird does not collect personal data or telemetry from inside the app. Your files, settings, and app data stay on your device. Downloads and visits to GitHub remain subject to GitHub's own privacy policy.</p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main"><a className="brand" href="#home"><span className="brand-mark"><img src={asset('assets/img/logo_1.png')} alt="" /></span><span><strong>Bluebird</strong><small>desktop-styled launcher</small></span></a><p>Android, with a desktop feel.</p><div className="footer-links"><a href={repo} target="_blank" rel="noreferrer">GitHub</a><a href="#privacy">Privacy</a><a href="#docs">Docs</a></div></div>
        <div className="footer-bottom"><span>© 2024–2026 Bluebird</span><span>Built for Android · Made in Uganda</span></div>
      </footer>
    </div>
  );
}

export default App;
