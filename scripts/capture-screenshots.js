import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import process from 'process';

const outDir = path.resolve(process.cwd(), 'public', 'screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const base = process.env.BASE_URL || 'http://localhost:5175'; // usar BASE_URL o puerto por defecto 5175

const pages = [
  { name: 'product-list', url: '/' },
  { name: 'product-detail', url: '/product/1' }
];

const viewports = [
  { name: 'desktop', width: 1200, height: 800 },
  { name: 'mobile', width: 375, height: 812 }
];

async function capture() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  try {
    for (const theme of ['light', 'dark']) {
      for (const vp of viewports) {
        const page = await browser.newPage();
        await page.setViewport({ width: vp.width, height: vp.height });
        // set theme preference
        await page.evaluateOnNewDocument((t) => {
          localStorage.setItem('theme', t);
          document.documentElement.setAttribute('data-theme', t === 'dark' ? 'dark' : 'light');
        }, theme);

        for (const p of pages) {
          const url = base + p.url;
          await page.goto(url, { waitUntil: 'networkidle2' });
          // small wait to ensure fonts loaded
          if (page.waitForTimeout) {
            await page.waitForTimeout(500);
          } else {
            await new Promise((r) => setTimeout(r, 500));
          }

          const filename = `${p.name}-${theme}-${vp.name}.png`;
          const filepath = path.join(outDir, filename);
          await page.screenshot({ path: filepath, fullPage: true });
          console.log('Saved', filename);
        }
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
}

capture().catch(err => { console.error(err); process.exit(1); });
