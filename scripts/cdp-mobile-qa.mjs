import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const base = 'http://localhost:3002';
const target = await fetch('http://127.0.0.1:9222/json/new?about:blank', { method: 'PUT' }).then(r => r.json());
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
let id = 0;
const pending = new Map();
const errors = [];
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const callbacks = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) callbacks.reject(new Error(message.error.message));
    else callbacks.resolve(message.result);
  } else if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') errors.push(message.params.args.map(arg => arg.value ?? arg.description ?? '').join(' '));
  else if (message.method === 'Runtime.exceptionThrown') errors.push(JSON.stringify(message.params.exceptionDetails));
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
  for (let attempt = 0; attempt < 120; attempt++) {
    if (await evaluate(expression)) return;
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  console.log("Browser errors:", errors);
  console.log("Formula state:", await evaluate(`document.querySelector("#formula")?.innerText`));
  throw new Error(`Timed out: ${expression}`);
};
const viewport = (width, height) => send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 800 });
const navigate = async path => {
  await send('Page.navigate', { url: base + path });
  await until(`location.href === ${JSON.stringify(base + path)} && document.readyState === 'complete' && !!document.querySelector('h1')`);
  await evaluate('document.fonts.ready');
  await until(`!!document.querySelector('button[aria-label^="Open shopping bag,"]')`);
  await new Promise(resolve => setTimeout(resolve, 700));
};
const screenshot = async name => {
  await evaluate(`Promise.all(Array.from(document.images).filter(i => i.getBoundingClientRect().bottom > 0 && i.getBoundingClientRect().top < innerHeight).map(i => i.decode().catch(() => {})))`);
  const result = await send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(`/private/tmp/${name}.png`, Buffer.from(result.data, 'base64'));
};
const layout = async label => {
  const result = await evaluate(`({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, brokenImages: Array.from(document.images).filter(i => i.complete && i.naturalWidth === 0).map(i => i.src) })`);
  assert(result.scrollWidth <= result.width + 1, `${label}: horizontal overflow ${JSON.stringify(result)}`);
  assert.equal(result.brokenImages.length, 0, `${label}: broken images ${result.brokenImages}`);
  console.log(`${label}: layout and images passed`);
};
try {
  await send('Page.enable');
  await send('Runtime.enable');
  await viewport(1440, 1000);
  await navigate('/');
  await until(`Array.from(document.querySelectorAll('section[aria-labelledby="hero-heading"] *')).every(el => el.getAnimations().filter(a => a.effect.getTiming().iterations !== Infinity).every(a => a.playState === 'finished'))`);
  assert.notEqual(await evaluate(`getComputedStyle(document.querySelector('section[aria-labelledby="hero-heading"] img')).animationName`), 'none');
  await send('Emulation.setEmulatedMedia', { features: [{name:'prefers-reduced-motion',value:'reduce'}] });
  assert.equal(await evaluate(`getComputedStyle(document.querySelector('section[aria-labelledby="hero-heading"] img')).animationName`), 'none');
  assert.equal(await evaluate(`getComputedStyle(document.querySelector('h1')).opacity`), '1');
  console.log('Hero animation: active normally, disabled with visible content under reduced motion');
  await screenshot('sattva-lip-home-desktop');
  await send('Emulation.setEmulatedMedia', { features: [{name:'prefers-reduced-motion',value:'no-preference'}] });
  await layout('Desktop home');
  assert.equal(await evaluate(`document.querySelectorAll('#collection article').length`), 5);
  await evaluate(`document.querySelector('#formula').scrollIntoView({behavior:'instant'}); window.scrollBy({top:-100,behavior:'instant'})`);
  await evaluate(`Array.from(document.querySelectorAll('#formula button')).find(b=>b.textContent.includes('Lip scrub')).click()`);
  await until(`document.querySelectorAll('#formula ol li').length === 4`);
  await screenshot('sattva-lip-formula-desktop');
  await evaluate(`Array.from(document.querySelectorAll('#formula button')).find(b=>b.textContent.includes('Lip balm')).click()`);
  await until(`document.querySelectorAll('#formula ol li').length === 3`);
  console.log('Ingredient switcher: 3 balm ingredients, 4 scrub ingredients');

  await navigate('/shop?category=lip-scrub');
  await until(`document.querySelectorAll('#catalog article').length === 2`);
  await layout('Desktop scrub filter');
  await evaluate(`document.querySelector('#catalog').scrollIntoView({behavior:'instant'}); window.scrollBy({top:-100,behavior:'instant'})`);
  await screenshot('sattva-lip-shop-desktop');
  await evaluate(`const selects = document.querySelectorAll('#catalog select'); selects[1].value='Red Wine'; selects[1].dispatchEvent(new Event('change',{bubbles:true}));`);
  await until(`document.querySelectorAll('#catalog article').length === 1`);
  assert.match(await evaluate(`document.querySelector('#catalog article h3').textContent`), /Red Wine/);
  await evaluate(`Array.from(document.querySelectorAll('#catalog button')).find(b=>b.textContent.includes('Clear filters')).click()`);
  await until(`document.querySelectorAll('#catalog article').length === 13`);
  console.log('Shop filters: scrub category, signature and reset passed');
  await navigate('/shop?category=lip-balm');
  await until(`document.querySelectorAll('#catalog article').length === 3`);

  await viewport(390, 844);
  await navigate('/');
  await screenshot('sattva-lip-home-mobile');
  await layout('Mobile home');
  await evaluate(`document.querySelector('#collection').scrollIntoView({behavior:'instant'}); window.scrollBy({top:-100,behavior:'instant'})`);
  await screenshot('sattva-lip-products-mobile');
  await navigate('/shop?category=lip-scrub');
  await layout('Mobile shop');
  await evaluate(`document.querySelector('#catalog').scrollIntoView({behavior:'instant'}); window.scrollBy({top:-100,behavior:'instant'})`);
  await screenshot('sattva-lip-shop-mobile');

  for (const slug of ['strawberry-lip-balm', 'butterscotch-lip-balm', 'chocolate-lip-balm', 'strawberry-lip-scrub', 'red-wine-lip-scrub']) {
    await navigate(`/products/${slug}`);
    await layout(slug);
    assert.equal(await evaluate(`document.querySelectorAll('section[aria-label$="image gallery"] button').length`), 3);
  }
  await screenshot('sattva-lip-product-mobile');
  await evaluate(`document.querySelector('button[aria-label="Show ingredient story"]').click()`);
  await until(`document.querySelector('section[aria-label$="image gallery"] figure img').alt.includes('infographic')`);
  await screenshot('sattva-lip-gallery-mobile');
  await evaluate(`document.querySelector('button[aria-label="Show original photograph"]').click()`);
  await until(`document.querySelector('section[aria-label$="image gallery"] figure img').alt.startsWith('Original photograph')`);
  await evaluate(`Array.from(document.querySelectorAll('button')).find(b=>b.textContent==='Save to bag').click()`);
  await until(`!!document.querySelector('[role="dialog"]')`);
  assert.match(await evaluate(`document.querySelector('[role="dialog"]').textContent`), /Red Wine Lip Scrub/);
  console.log('Product gallery and bag: passed');

  await viewport(1440, 1000);
  await navigate('/products/strawberry-lip-balm');
  await layout('Desktop product');
  await screenshot('sattva-lip-product-desktop');
  await navigate('/pages/dry-lips');
  await layout('Lip-care concern');
  assert.equal(await evaluate(`document.querySelectorAll('#recommended-products article').length`), 5);
  await navigate('/ingredients/shea-butter');
  await layout('Ingredient page');
  assert.equal(errors.length, 0, `Browser errors: ${errors.join(', ')}`);
  console.log('All checks passed; screenshots saved to /private/tmp/sattva-lip-*.png');
} finally {
  await send('Page.close');
  ws.close();
}
