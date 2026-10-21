import { HtmlVibe } from '@/types/vibe';

export const INITIAL_VIBES: HtmlVibe[] = [
  {
    id: "vibe-cyberpunk-card",
    title: "Cyberpunk Neon Glow Card",
    description: "การ์ดสไตล์ไซเบอร์พังก์ พร้อมเส้นขอบไฟนีออนเคลื่อนไหวและเอฟเฟกต์ Glitch เท่ๆ",
    author_name: "NeoDev",
    file_name: "cyberpunk-card.html",
    file_size: 2450,
    tags: ["CSS Animation", "Neon", "Cyberpunk", "Card"],
    likes_count: 38,
    views_count: 142,
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    html_code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cyberpunk Neon Card</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0d0e15;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      overflow: hidden;
    }
    .neon-card {
      position: relative;
      width: 320px;
      background: #141724;
      border-radius: 16px;
      padding: 28px;
      color: #fff;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
      border: 1px solid rgba(118, 192, 236, 0.3);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .neon-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 15px 40px rgba(118, 192, 236, 0.4), 0 0 20px rgba(255, 149, 165, 0.4);
    }
    .neon-card::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: conic-gradient(transparent, #76C0EC, #FF95A5, transparent 40%);
      animation: rotate 4s linear infinite;
      z-index: 0;
    }
    .inner-card {
      position: relative;
      background: #151828;
      padding: 24px;
      border-radius: 12px;
      z-index: 1;
    }
    @keyframes rotate {
      100% { transform: rotate(360deg); }
    }
    .tag {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #FF95A5;
      background: rgba(255, 149, 165, 0.15);
      padding: 4px 10px;
      border-radius: 20px;
      margin-bottom: 12px;
    }
    h2 {
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 8px;
      text-shadow: 0 0 8px rgba(118, 192, 236, 0.6);
    }
    p {
      color: #94a3b8;
      font-size: 13.5px;
      line-height: 1.5;
      margin-bottom: 20px;
    }
    .action-btn {
      width: 100%;
      background: linear-gradient(135deg, #425B9A, #76C0EC);
      color: #ffffff;
      border: none;
      padding: 12px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s ease;
      box-shadow: 0 4px 15px rgba(66, 91, 154, 0.4);
    }
    .action-btn:hover {
      background: linear-gradient(135deg, #FF95A5, #76C0EC);
      transform: scale(1.02);
      box-shadow: 0 6px 20px rgba(255, 149, 165, 0.5);
    }
  </style>
</head>
<body>
  <div class="neon-card">
    <div class="inner-card">
      <span class="tag">Cyber Edition</span>
      <h2>NEO PROTOCOL</h2>
      <p>A reactive glowing UI container featuring rotating conic-gradients and fluid hover animations.</p>
      <button class="action-btn" onclick="alert('⚡ Cyberpunk Action Triggered!')">ENGAGE SYSTEM</button>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: "vibe-glass-weather",
    title: "Glassmorphism Weather Widget",
    description: "วิดเจ็ตพยากรณ์อากาศสไตล์กระจกฝ้า (Glassmorphism) มีพระอาทิตย์ลอยขยับได้",
    author_name: "Yui Designer",
    file_name: "glass-weather.html",
    file_size: 2890,
    tags: ["Glassmorphism", "Weather", "CSS Backdrop"],
    likes_count: 54,
    views_count: 220,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    html_code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Glassmorphism Weather</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #425B9A 0%, #76C0EC 60%, #FFF6DC 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 20px;
    }
    .weather-card {
      width: 310px;
      background: rgba(255, 255, 255, 0.22);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.45);
      border-radius: 24px;
      padding: 26px;
      color: #1e293b;
      box-shadow: 0 16px 36px rgba(66, 91, 154, 0.25);
      text-align: center;
    }
    .sun {
      width: 64px;
      height: 64px;
      background: #FFD166;
      border-radius: 50%;
      margin: 0 auto 16px;
      box-shadow: 0 0 35px #FFD166;
      animation: float 3s ease-in-out infinite;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    .temp {
      font-size: 52px;
      font-weight: 700;
      color: #ffffff;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
      line-height: 1;
      margin-bottom: 4px;
    }
    .city {
      font-size: 18px;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 4px;
    }
    .condition {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 20px;
    }
    .details {
      display: flex;
      justify-content: space-between;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 14px;
      padding: 12px 16px;
      font-size: 13px;
      color: #ffffff;
    }
    .details div span {
      display: block;
      font-size: 10px;
      opacity: 0.8;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="weather-card">
    <div class="sun"></div>
    <div class="temp">29°C</div>
    <div class="city">Bangkok, Thailand</div>
    <div class="condition">Sunny & Warm Atmosphere</div>
    <div class="details">
      <div>
        <span>Humidity</span>
        <strong>64%</strong>
      </div>
      <div>
        <span>Wind</span>
        <strong>12 km/h</strong>
      </div>
      <div>
        <span>UV Index</span>
        <strong>Moderate</strong>
      </div>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: "vibe-retro-arcade",
    title: "Retro 8-Bit Arcade Screen",
    description: "หน้าจอเกมตู้เรโทรยุค 8-bit พร้อมข้อความกระพริบ INSERT COIN และสเปซชิปพิกเซล",
    author_name: "PixelMaster",
    file_name: "retro-arcade.html",
    file_size: 2150,
    tags: ["Retro", "Pixel Art", "Gaming", "8-bit"],
    likes_count: 67,
    views_count: 310,
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    html_code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Retro 8-Bit Screen</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #000000;
      font-family: 'Courier New', monospace;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #00ff66;
      padding: 16px;
    }
    .cabinet-screen {
      width: 320px;
      background: #091209;
      border: 4px solid #00ff66;
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      box-shadow: 0 0 25px rgba(0, 255, 102, 0.4), inset 0 0 15px rgba(0, 255, 102, 0.2);
      position: relative;
    }
    .cabinet-screen::before {
      content: " ";
      display: block;
      position: absolute;
      top: 0; left: 0; bottom: 0; right: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.3) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.04));
      z-index: 2;
      background-size: 100% 3px, 6px 100%;
      pointer-events: none;
    }
    .score-bar {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      font-weight: bold;
      margin-bottom: 24px;
      color: #FF95A5;
    }
    .title {
      font-size: 24px;
      font-weight: bold;
      color: #76C0EC;
      letter-spacing: 2px;
      margin-bottom: 16px;
      text-shadow: 0 0 10px #76C0EC;
    }
    .spaceship {
      font-size: 38px;
      margin: 20px auto;
      animation: wiggle 1s infinite alternate ease-in-out;
    }
    @keyframes wiggle {
      from { transform: translateX(-12px); }
      to { transform: translateX(12px); }
    }
    .blink {
      font-size: 15px;
      font-weight: bold;
      color: #fff;
      animation: blink 0.9s infinite step-start;
      margin-top: 15px;
    }
    @keyframes blink {
      50% { opacity: 0; }
    }
    .btn-coin {
      margin-top: 20px;
      background: #00ff66;
      color: #000;
      font-weight: bold;
      font-family: inherit;
      border: none;
      padding: 8px 16px;
      cursor: pointer;
      border-radius: 4px;
      box-shadow: 0 0 10px #00ff66;
    }
    .btn-coin:hover {
      background: #fff;
    }
  </style>
</head>
<body>
  <div class="cabinet-screen">
    <div class="score-bar">
      <span>1UP: 04290</span>
      <span>HIGH: 99990</span>
    </div>
    <div class="title">SPACE VIBE</div>
    <div class="spaceship">🚀</div>
    <div class="blink">INSERT COIN (1)</div>
    <button class="btn-coin" onclick="alert('👾 Coin Inserted! READY PLAYER ONE!')">INSERT COIN</button>
  </div>
</body>
</html>`
  },
  {
    id: "vibe-morphing-blob",
    title: "Liquid Morphing Card & Quote",
    description: "การ์ดข้อความแรงบันดาลใจ มีพื้นหลังเป็น Gradient Blob ไหลเคลื่อนไหวอย่างนุ่มนวล",
    author_name: "ArtVibe",
    file_name: "morphing-quote.html",
    file_size: 2600,
    tags: ["Animation", "Gradient", "Creativity", "Card"],
    likes_count: 42,
    views_count: 185,
    created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
    html_code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Liquid Morphing Quote</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #FFF6DC;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 20px;
    }
    .blob-card {
      position: relative;
      width: 320px;
      height: 340px;
      background: #ffffff;
      border-radius: 24px;
      box-shadow: 0 12px 30px rgba(66, 91, 154, 0.12);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 30px;
      text-align: center;
      border: 2px solid #76C0EC;
    }
    .blob {
      position: absolute;
      width: 190px;
      height: 190px;
      background: linear-gradient(135deg, #76C0EC, #FF95A5);
      border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
      filter: blur(28px);
      opacity: 0.55;
      animation: morph 6s ease-in-out infinite alternate;
      z-index: 1;
    }
    @keyframes morph {
      0% {
        border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
        transform: rotate(0deg) scale(1);
      }
      100% {
        border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        transform: rotate(180deg) scale(1.15);
      }
    }
    .content {
      position: relative;
      z-index: 2;
    }
    .quote-icon {
      font-size: 32px;
      color: #425B9A;
      margin-bottom: 8px;
    }
    .quote {
      font-size: 16px;
      font-weight: 600;
      color: #1e293b;
      line-height: 1.6;
      margin-bottom: 16px;
    }
    .author {
      font-size: 13px;
      color: #425B9A;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="blob-card">
    <div class="blob"></div>
    <div class="content">
      <div class="quote-icon">“</div>
      <p class="quote">Design is not just what it looks like and feels like. Design is how it works.</p>
      <span class="author">— Steve Jobs</span>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: "vibe-neumorphic-player",
    title: "Neumorphic Music Player",
    description: "เครื่องเล่นเพลงสไตล์ Neumorphic มีแผ่นเสียงหมุน และปุ่มกดนุ่มนวล",
    author_name: "SoundWave",
    file_name: "neumorphic-music.html",
    file_size: 3100,
    tags: ["Neumorphism", "Music Player", "Audio", "Soft UI"],
    likes_count: 83,
    views_count: 412,
    created_at: new Date(Date.now() - 3600000 * 96).toISOString(),
    html_code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Neumorphic Music Player</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #e8ecf4;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .player-card {
      width: 290px;
      background: #e8ecf4;
      border-radius: 28px;
      padding: 26px;
      text-align: center;
      box-shadow: 10px 10px 20px #c5c9d1, -10px -10px 20px #ffffff;
    }
    .disc-container {
      width: 120px;
      height: 120px;
      margin: 0 auto 20px;
      border-radius: 50%;
      background: #2b2d42;
      box-shadow: 6px 6px 12px #c5c9d1, -6px -6px 12px #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: spin 6s linear infinite;
    }
    @keyframes spin {
      100% { transform: rotate(360deg); }
    }
    .disc-inner {
      width: 44px;
      height: 44px;
      background: #FF95A5;
      border: 3px solid #ffffff;
      border-radius: 50%;
    }
    .track-title {
      font-size: 18px;
      font-weight: 700;
      color: #425B9A;
      margin-bottom: 4px;
    }
    .track-artist {
      font-size: 13px;
      color: #76C0EC;
      margin-bottom: 20px;
    }
    .controls {
      display: flex;
      justify-content: center;
      gap: 16px;
      align-items: center;
    }
    .btn {
      border: none;
      background: #e8ecf4;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 5px 5px 10px #c5c9d1, -5px -5px 10px #ffffff;
      color: #425B9A;
      font-weight: bold;
      transition: all 0.2s ease;
    }
    .btn:active {
      box-shadow: inset 4px 4px 8px #c5c9d1, inset -4px -4px 8px #ffffff;
    }
    .btn-sm { width: 38px; height: 38px; font-size: 14px; }
    .btn-lg {
      width: 54px;
      height: 54px;
      font-size: 20px;
      background: #425B9A;
      color: #fff;
      box-shadow: 5px 5px 10px #c5c9d1, -5px -5px 10px #ffffff;
    }
  </style>
</head>
<body>
  <div class="player-card">
    <div class="disc-container">
      <div class="disc-inner"></div>
    </div>
    <div class="track-title">Summer Vibes</div>
    <div class="track-artist">Chill Lounge Beats</div>
    <div class="controls">
      <button class="btn btn-sm">⏮</button>
      <button class="btn btn-lg" onclick="alert('🎵 Playing track...')">▶</button>
      <button class="btn btn-sm">⏭</button>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: "vibe-pricing-card",
    title: "Modern SaaS Feature Card",
    description: "การ์ดแสดงฟีเจอร์และราคา โมเดิร์น คลีน สวยงามด้วยสีประจำเว็บ",
    author_name: "SaaSBuilder",
    file_name: "saas-pricing.html",
    file_size: 2750,
    tags: ["SaaS", "Pricing", "Clean", "Responsive"],
    likes_count: 59,
    views_count: 278,
    created_at: new Date(Date.now() - 3600000 * 120).toISOString(),
    html_code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Modern Pricing Card</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #FFF6DC;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .pricing-card {
      width: 310px;
      background: #ffffff;
      border-radius: 20px;
      padding: 28px;
      border: 2px solid #76C0EC;
      box-shadow: 0 10px 25px rgba(66, 91, 154, 0.1);
      position: relative;
    }
    .popular-badge {
      position: absolute;
      top: -12px;
      right: 20px;
      background: #FF95A5;
      color: #ffffff;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(255, 149, 165, 0.4);
    }
    .plan-name {
      font-size: 18px;
      font-weight: 700;
      color: #425B9A;
      margin-bottom: 8px;
    }
    .price {
      font-size: 38px;
      font-weight: 800;
      color: #1e293b;
      margin-bottom: 16px;
    }
    .price span {
      font-size: 14px;
      color: #64748B;
      font-weight: normal;
    }
    .features {
      list-style: none;
      margin-bottom: 24px;
    }
    .features li {
      font-size: 13.5px;
      color: #475569;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .check {
      color: #425B9A;
      font-weight: bold;
    }
    .btn-upgrade {
      width: 100%;
      background: #425B9A;
      color: #ffffff;
      border: none;
      padding: 12px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-upgrade:hover {
      background: #FF95A5;
    }
  </style>
</head>
<body>
  <div class="pricing-card">
    <div class="popular-badge">POPULAR</div>
    <div class="plan-name">Pro Creator</div>
    <div class="price">$19 <span>/month</span></div>
    <ul class="features">
      <li><span class="check">✓</span> Unlimited HTML uploads</li>
      <li><span class="check">✓</span> Custom domains & sharing</li>
      <li><span class="check">✓</span> Sandboxed live preview</li>
      <li><span class="check">✓</span> Community analytics</li>
    </ul>
    <button class="btn-upgrade" onclick="alert('🎉 Upgraded to Pro!')">Get Started</button>
  </div>
</body>
</html>`
  }
];
