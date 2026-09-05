# Sattva Skin website

Editorial, mobile-first ecommerce prototype for Sattva Skin, built from the supplied UI/UX specification and visual reference.

## Stack

- Next.js 16 App Router
- React 19 + TypeScript
- Tailwind CSS 4 processing with component-scoped CSS Modules
- Lucide icons
- Data-driven preview catalog
- Vercel-ready SEO metadata, sitemap and robots routes

## Local development

Use Node.js 22 (the project requires Node 20.9 or newer):

```bash
nvm use
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Configuration

Copy `.env.example` to `.env.local` and configure only verified public values:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_INSTAGRAM_HANDLE=
```

## Vercel deployment

1. Put this directory in its own Git repository and push it to GitHub, GitLab or Bitbucket.
2. Import the repository in Vercel. Framework detection should select Next.js automatically.
3. Select Node.js 22 in project settings.
4. Add the production environment values above.
5. Deploy. The package build command uses the stable webpack path for Next.js 16.

Vercel Hobby is restricted to personal, non-commercial use. A live Sattva Skin business storefront requires an eligible paid plan or a host whose free plan permits commercial use.

## Before a commercial launch

The current products, imagery and educational copy form a clearly labelled design prototype. Before enabling checkout:

- replace preview catalog entries with verified products, prices, stock, labels and usage information;
- provide genuine product photography, policies, support details, brand facts and customer reviews;
- select and integrate the commerce, inventory, payment, shipping, tax and analytics providers;
- configure the official WhatsApp number, social handle and production domain;
- complete legal, accessibility, performance and end-to-end checkout review;
- set `catalogIsPreview` to `false` only after those systems are ready.

The current lip-care catalog contains Strawberry, Butterscotch and Chocolate Lip Balms (5 g), plus Strawberry and Red Wine Lip Scrubs (8 g). Base ingredients were supplied by the brand: shea butter, coconut oil and beeswax; scrubs also contain sugar. The pink balm's Strawberry name is inferred from the supplied filenames and should be confirmed. Prices, availability and complete label details remain unconfirmed.

Styled product images, ingredient infographics and the collection hero are in `public/images/lip-care/`. Original product photographs are preserved in its `originals/` folder. Generation prompts and source references are recorded in `docs/lip-care-image-prompts.json` and `docs/lip-care-product-infographic-prompts.json`; the images were made with the built-in image generation tool and optimized to WebP for the site.

The shop supports lip balm, lip scrub and signature filters. Product pages have selectable galleries and downloadable ingredient infographics. The homepage ingredient switcher compares the three-ingredient balm base with the four-ingredient scrub base.

Browser checks are in `scripts/cdp-mobile-qa.mjs`. They expect the development server at `http://localhost:3002` and a headless Chrome debugging endpoint at port 9222. Run them with Node 22 or later.
# sattva_skin
