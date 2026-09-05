import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const base = 'http://localhost:3002';
const { assets } = JSON.parse(await fs.readFile('docs/face-hair-image-prompts.json', 'utf8'));
const target = await fetch('http://127.0.0.1:9222/json/new?about:blank', { method: 'PUT' }).then(r => r.json());
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
let id = 0;
const pending = new Map();
const errors = [];
ws.onmessage = event => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const callbacks = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) callbacks.reject(new Error(message.error.message));
    else callbacks.resolve(message.result);
  } else if (message.method === 'Runtime.exceptionThrown') errors.push(JSON.stringify(message.params.exceptionDetails));
};
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const requestId = ++id;
  pending.set(requestId, { resolve, reject });
  ws.send(JSON.stringify({ id: requestId, method, params }));
});
const evaluate = async expression => {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
};
const until = async expression => {
  for (let attempt = 0; attempt < 150; attempt++) {
    if (await evaluate(expression)) return;
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  throw new Error(`Timed out: ${expression}`);
};
const navigate = async route => {
  await send('Page.navigate', { url: base + route });
  await until(`location.href === ${JSON.stringify(base + route)} && document.readyState === 'complete' && !!document.querySelector('h1')`);
  await until(`!!document.querySelector('button[aria-label^="Open shopping bag,"]')`);
  await evaluate('document.fonts.ready');
  await new Promise(resolve => setTimeout(resolve, 700));
};
const layout = async label => {
  await evaluate(`Promise.all(Array.from(document.images).filter(i => i.getBoundingClientRect().bottom > 0 && i.getBoundingClientRect().top < innerHeight).map(i => { i.loading = 'eager'; return i.decode().catch(() => {}); }))`);
  const result = await evaluate(`({width: innerWidth, scrollWidth: document.documentElement.scrollWidth, broken: Array.from(document.images).filter(i=>i.complete && !i.naturalWidth).map(i=>i.src)})`);
  assert(result.scrollWidth <= result.width + 1, `${label}: overflow ${JSON.stringify(result)}`);
  assert.equal(result.broken.length, 0, `${label}: broken images ${result.broken}`);
};
const screenshot = async name => {
  await layout(name);
  const result = await send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(`/private/tmp/${name}.png`, Buffer.from(result.data, 'base64'));
};
try {
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  for (const asset of assets) {
    await navigate(`/products/${asset.slug}`);
    await layout(asset.slug);
    assert(await evaluate(`!!document.querySelector('#product-guide')`));
    assert.equal(await evaluate(`document.body.innerText.includes('What is the difference between balm and scrub?')`), false);
    await evaluate(`document.querySelector('button[aria-label="Show product guide"]').click()`);
    await until(`document.querySelector('section[aria-label$="image gallery"] figure img').alt.includes('infographic')`);
    const href = await evaluate(`document.querySelector('#product-guide a[download]').href`);
    const response = await fetch(href);
    assert(response.ok && response.headers.get('content-type').includes('image/png'), `${asset.slug}: download`);
    await evaluate(`document.querySelector('button[aria-label="Show original photograph"]').click()`);
    await until(`document.querySelector('section[aria-label$="image gallery"] figure img').alt.startsWith('Original photograph')`);
    console.log(`${asset.slug}: mobile layout, gallery and guide download passed`);
  }
  await navigate('/products/neem-acne-control-face-wash');
  await screenshot('sattva-range-product-mobile');
  await evaluate(`document.querySelector('#product-guide').scrollIntoView({behavior:'instant'}); window.scrollBy(0,-100)`);
  await screenshot('sattva-range-guide-mobile');
  await evaluate(`Array.from(document.querySelectorAll('button')).find(b=>b.textContent==='Save to bag').click()`);
  await until(`!!document.querySelector('[role="dialog"]')`);
  assert.match(await evaluate(`document.querySelector('[role="dialog"]').innerText`), /Neem Acne Control Face Wash/);
  for (const [category, count] of [['face-care', 7], ['hair-care', 1], ['lip-care', 5], ['face-wash', 3], ['lip-balm', 3], ['lip-scrub', 2]]) {
    await navigate(`/shop?category=${category}`);
    await until(`document.querySelectorAll('#catalog article').length === ${count}`);
    await layout(category);
    assert(await evaluate(`!!document.querySelector('#catalog select:nth-of-type(1)')`));
    console.log(`${category}: ${count} products, mobile layout passed`);
  }
  await evaluate(`Array.from(document.querySelectorAll('#catalog button')).find(b=>b.textContent.includes('Clear filters')).click()`);
  await until(`document.querySelectorAll('#catalog article').length === 13`);
  await navigate('/products/strawberry-lip-balm');
  assert(await evaluate(`!!document.querySelector('#formula')`));
  assert.equal(await evaluate(`document.querySelectorAll('section[aria-label$="image gallery"] button').length`), 3);
  await navigate('/pages/dry-lips');
  assert.equal(await evaluate(`document.querySelectorAll('#recommended-products article').length`), 5);
  await navigate('/');
  await layout('Home');
  assert.equal(await evaluate(`document.querySelectorAll('#botanical-collection article').length`), 8);
  assert.equal(await evaluate(`document.querySelectorAll('#collection article').length`), 5);
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  for (const slug of ['neem-acne-control-face-wash', 'ayurvedic-herbal-hair-mask', 'skin-repair-night-gel']) {
    await navigate(`/products/${slug}`);
    await layout(`Desktop ${slug}`);
  }
  await screenshot('sattva-range-product-desktop');
  await evaluate(`document.querySelector('#product-guide').scrollIntoView({behavior:'instant'}); window.scrollBy(0,-100)`);
  await screenshot('sattva-range-guide-desktop');
  await navigate('/shop');
  await layout('Desktop shop');
  await screenshot('sattva-range-shop-desktop');
  assert.equal(errors.length, 0, errors.join('\n'));
  console.log('All product-range browser checks passed.');
} finally {
  await send('Page.close');
  ws.close();
}
