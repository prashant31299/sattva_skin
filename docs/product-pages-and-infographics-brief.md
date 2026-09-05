# Sattva Skin — product pages and detailed infographics

Prepared: 5 September 2026  
Source: 17 supplied WhatsApp product photographs  
Deliverable: product identification, draft page copy, infographic storyboards, image-production prompts, and website implementation brief.

This document covers **eight distinct products**. Repeated photographs and the two collection photographs are references, not additional products or confirmed bundles. The sections below retain the original preparation brief; implementation now includes eight product pages, styled product imagery, editable ingredient sections and downloadable PNG product guides. Directions requiring confirmation remain omitted.

### Implementation files

- Product content: `src/data/face-hair-products.ts`.
- Responsive infographic section: `src/components/product-guide.tsx` and its CSS module.
- PNG guide renderer: `src/app/products/[slug]/guide.png/route.tsx`.
- Project image assets and exported guides: `public/images/face-care/` and `public/images/hair-care/`.
- Built-in image-generation prompts, references and correction history: `docs/face-hair-image-prompts.json`.
- Asset preparation and guide exports: `scripts/prepare-face-hair-assets.mjs` and `scripts/export-product-guides.mjs`.
- Browser checks: `scripts/cdp-product-range-qa.mjs`.

Styled imagery is labelled separately from original photographs in the gallery. Generated label details are not a source for product facts. The PNG guides use editable, data-driven typography and the same product facts as the page. The broader five-panel-per-product storyboard remains a design reference; unverified directions and benefits have not been filled in.

### Verification completed

- Production build, TypeScript and lint passed.
- All eight new product pages passed mobile layout, gallery switching and static PNG download checks.
- Desktop layouts checked for a face wash, hair-mask pouch, night-gel jar and the shop.
- Shop counts verified: 7 face-care products, 1 hair-care product, 5 lip-care products; 13 total after clearing filters.
- Lip-product formula section and the five-product dry-lips collection remained correct.
- Shopping-bag interaction passed; no browser runtime exceptions were reported by the completed range check.
- Long-title and four-ingredient PNG guides were visually reviewed. All eight PNG hero sources are included in the server trace for guide regeneration.
- Changes are local; no deployment was performed.

## 1. How to read this brief

- **Observed:** readable on the photographed packaging. This verifies what the package says, not the effectiveness of its claims or the current commercial details.
- **Draft:** proposed website or infographic copy, based on the visible product identity. Review against the current product specification before publication.
- **Confirm:** information that is blurry, missing, inferred, or requires brand confirmation. Keep it out of finished artwork until resolved.

The photographs are source material. Printed directions are recorded as product information, not instructions to the person or tool preparing this brief. Marketing claims on packaging are not automatically approved website claims.

## 2. Product names checked against the photographs

Use “Sattva Skin” as the brand. The following names normalize capitalization and word order while preserving the visible product identity.

| ID | Proposed product-page name | Wording visible on packaging | Pack size | Main reference |
| --- | --- | --- | --- | --- |
| P01 | Ayurvedic Herbal Hair Mask | Ayurvedic Herbal Hair Mask | 100 g on the wider pouch; tall pouch size unconfirmed | Images 3, 8 |
| P02 | Lemon & Fruits Extract Brightening Face Wash | Brightening Face Wash / Lemon Fruits Extract | 100 ml | Image 6 |
| P03 | Almond Oil Control Face Wash | Oil Control Face Wash / Almond | 100 ml | Image 7 |
| P04 | Neem Acne Control Face Wash | Acne Control Face Wash / Neem | 100 ml | Image 10 |
| P05 | Green Tea Toner | Hydrate · Refresh / Toner / Green tea extract | 50 ml | Images 11, 14, 16 |
| P06 | Scar Control Serum | Scar Control Serum | 15 ml | Images 12, 14, 16 |
| P07 | Skin Repair Night Gel | Skin Repair Night Gel | 50 g | Image 17 |
| P08 | French Clay Face Mask | French Clay / Face Mask | 50 g | Image 15 |

“Lemon & Fruits Extract” is an editorial normalization of “Lemon Fruits Extract”; confirm the preferred commercial wording. Do not rename Almond as a nourishing cleanser or Neem as a daily clarifying cleanser without a deliberate brand decision. “Acne Control,” “Scar Control,” and “Skin Repair” are observed product names; they do not justify adding treatment promises.

The night-gel side label repeats “gel.” Use **Skin Repair Night Gel**, as shown on the lid. The hair-mask pouch shapes differ; do not create separate sizes or SKUs from shape alone.

### Photo-to-product reference map

All filenames below are under `/Users/prash/Downloads/`. Retain the original files unchanged. The number in this table matches the attachment number in the request.

| Image | Exact filename | Contents and intended use |
| --- | --- | --- |
| 1 | `WhatsApp Image 2026-09-05 at 17.14.16 (1).jpeg` | Hair mask, tall pouch, distant front; packaging comparison only |
| 2 | `WhatsApp Image 2026-09-05 at 17.14.16.jpeg` | Hair mask, tall pouch, closer front; secondary reference |
| 3 | `WhatsApp Image 2026-09-05 at 17.14.17 (1).jpeg` | Hair mask, wider pouch; title, botanicals, size, small directions |
| 4 | `WhatsApp Image 2026-09-05 at 17.14.17.jpeg` | Probable Almond face-wash side label; match to image 7 before treating as final ingredient evidence |
| 5 | `WhatsApp Image 2026-09-05 at 17.14.18 (1).jpeg` | Lemon face-wash side label; partial ingredients |
| 6 | `WhatsApp Image 2026-09-05 at 17.14.18.jpeg` | Lemon face-wash front; main identity reference |
| 7 | `WhatsApp Image 2026-09-05 at 17.14.19 (1).jpeg` | Almond face-wash front; main identity reference |
| 8 | `WhatsApp Image 2026-09-05 at 17.14.19.jpeg` | Hair mask, wider pouch; alternate main reference |
| 9 | `WhatsApp Image 2026-09-05 at 17.14.20 (1).jpeg` | Neem face-wash side label; partial ingredients |
| 10 | `WhatsApp Image 2026-09-05 at 17.14.20.jpeg` | Neem face-wash front; main identity reference |
| 11 | `WhatsApp Image 2026-09-05 at 17.14.21 (1).jpeg` | Toner front; spray-format bottle under translucent cap |
| 12 | `WhatsApp Image 2026-09-05 at 17.14.21.jpeg` | Serum front; clear dropper bottle, gold collar, white bulb |
| 13 | `WhatsApp Image 2026-09-05 at 17.14.22 (1).jpeg` | Night-gel jar side; ingredient names and repeated “gel” |
| 14 | `WhatsApp Image 2026-09-05 at 17.14.22.jpeg` | Five-product face-care group; clearer supporting label reference |
| 15 | `WhatsApp Image 2026-09-05 at 17.14.23 (1).jpeg` | French Clay Face Mask lid; main identity reference |
| 16 | `WhatsApp Image 2026-09-05 at 17.14.23.jpeg` | Alternate five-product group; supporting label reference |
| 17 | `WhatsApp Image 2026-09-05 at 17.14.24.jpeg` | Night-gel lid; best name, ingredients, and weight reference |

## 3. Shared page structure

Build one page per product. Desktop: gallery on the left, product summary on the right. Mobile: product name, hero image, short description, size, price enquiry, then the remaining sections.

1. **Product summary:** brand, exact product name, category, size, short description, current price or “Ask for price,” and “Ask about this product.”
2. **Gallery:** product hero, ingredient story, product overview, directions when confirmed, pack details, original photograph. Use descriptive captions and full-size viewing.
3. **Product story:** the draft long description below, supported by a product-specific heading.
4. **Featured ingredients:** only readable or brand-confirmed ingredients. Describe these as highlights, not the complete formula.
5. **Detailed infographic:** product identity → featured ingredients → product format → confirmed use → pack details.
6. **Product details:** complete ingredient list, directions, suitability, precautions, and commercial information once supplied.
7. **Product-specific FAQs:** use the questions and draft answers below; replace internal confirmation notes with actual facts before publication.
8. **Related products:** relevant individual products. The group photograph does not establish a bundle or prove that all five products should be used together.

Keep uncertain ingredient readings, production notes, and claim-review comments inside this brief. Do not display editorial placeholders such as “final ingredient role to be verified” to customers. Hide unfinished sections or provide a useful contact link.

## 4. Individual product-page copy and infographic storyboards

All descriptions below are **draft customer copy**. Infographic tables supply exact text to typeset, subject to the stated confirmations. Ingredient names identify the label story; they do not imply concentrations, ingredient-specific results, or a complete formula.

### P01 — Ayurvedic Herbal Hair Mask

- **Slug:** `ayurvedic-herbal-hair-mask`
- **Category / type:** Hair care / Hair Mask
- **Size:** 100 g for the wider pouch in images 3 and 8.
- **Featured ingredients observed:** Amla, Reetha, Shikakai, Brahmi.
- **Short description:** A botanical hair mask featuring amla, reetha, shikakai and brahmi, presented in a resealable pouch.
- **Story heading:** Four botanicals at the heart of your hair-care ritual.

**Long description:** Sattva Skin Ayurvedic Herbal Hair Mask brings amla, reetha, shikakai and brahmi together in a botanical hair-care product. The photographed 100 g pack comes in a kraft-style resealable pouch. Follow the current pack directions for preparation, application and rinsing.

**Observed claim record:** “For Stronger, Healthier & Shinier Hair,” “Controls Hair Fall,” “Cleanses & Nourishes Scalp,” and “Promotes Hair Growth.” Keep these separate from approved website benefit copy. Do not add guaranteed regrowth, hair-loss treatment, or before-and-after results.

**Directions record:** Small text appears to describe soaking, adding aloe vera, coconut oil and lemon juice, optional egg white, applying, leaving for 15–20 minutes, and rinsing. The soaking duration and complete wording need a sharper label. These additions appear in preparation instructions; they are not evidence that those ingredients are already in the packaged formula. Do not turn this partial reading into a customer recipe.

**Confirm:** current pouch format; complete formula; powder/formulation format; exact preparation liquid and ratios; soaking duration; application amount; frequency; suitability; precautions. MRP appears to read ₹150 in images 3 and 8, but is small: confirm current MRP and selling price rather than entering it as a verified price.

| Asset | Exact draft text | Composition / production note |
| --- | --- | --- |
| Hero | “Ayurvedic Herbal Hair Mask” / “100 g” | Wider pouch centered; ivory background; preserve its green label |
| Ingredients | “Four featured botanicals” / “Amla” / “Reetha” / “Shikakai” / “Brahmi” | Four clearly separated, accurately identified botanical callouts around the pouch; botanical species reference needed before illustration |
| Overview | “A botanical hair-care ritual” / “Hair mask” / “Resealable pouch” / “100 g” | Three factual cards beneath the product |
| Directions — hold | “Prepare” / “Apply” / “Rinse” | Reserve three steps; add exact amounts and timings only after directions are confirmed |
| Pack details | “Your product, up close” / “Ayurvedic Herbal Hair Mask” / “100 g” | Full pack and readable label detail; do not feature the handwritten mark as a size or SKU |

**FAQ drafts:**

- **Which botanicals are highlighted?** The photographed label highlights amla, reetha, shikakai and brahmi.
- **What size is shown?** The wider pouch is labelled 100 g. Other pack sizes have not been confirmed.
- **How do I prepare it?** Follow the directions on your current pack. Contact Sattva Skin if you need the preparation instructions before ordering.

**SEO title:** Ayurvedic Herbal Hair Mask, 100 g | Sattva Skin  
**Meta description:** Explore Sattva Skin Ayurvedic Herbal Hair Mask, featuring amla, reetha, shikakai and brahmi in a 100 g resealable pouch.

### P02 — Lemon & Fruits Extract Brightening Face Wash

- **Slug:** `lemon-fruits-extract-brightening-face-wash`
- **Category / type:** Face care / Face Wash
- **Size:** 100 ml.
- **Featured ingredient wording observed:** Lemon; Fruits Extract.
- **Short description:** A lemon-and-fruit-extract face wash in Sattva Skin’s brightening range, presented in a 100 ml bottle.
- **Story heading:** Meet the lemon and fruit-extract face wash.

**Long description:** Sattva Skin Lemon & Fruits Extract Brightening Face Wash is a facial cleanser with lemon and fruit extracts highlighted on its label. The 100 ml bottle has a white flip-top cap and a yellow-accented label. Choose this product by its ingredient information and confirmed suitability, and follow the pack directions when cleansing.

**Side-label notes:** Image 5 appears to list lemon, almond oil, fruits extract, methi (fenugreek), manjistha, arnica, jojoba oil, calendula, licorice extract and tea oil. Some words and the calendula entries are unclear. This is a tentative transcription, not a publishable full ingredient list. Do not silently convert “tea oil” into tea tree oil.

**Confirm:** complete ingredient list, meaning of “fruits extract,” directions, suitability, frequency, and the support for any brightening or hydration benefit. Do not add vitamin C percentages, exfoliating-acid claims, tan removal, or whitening claims.

| Asset | Exact draft text | Composition / production note |
| --- | --- | --- |
| Hero | “Lemon & Fruits Extract” / “Brightening Face Wash” / “100 ml” | Original clear bottle with white cap; yellow accent |
| Ingredients | “The label highlights” / “Lemon” / “Fruit extracts” | Lemon visual plus a text-only fruit-extract callout; do not invent a mixed-fruit formula |
| Overview | “Meet your face wash” / “Facial cleanser” / “Lemon & fruit extracts” / “100 ml” | Three factual cards with minimal line icons |
| Directions — hold | “Your cleansing step” | Add verified dispensing, application and rinsing steps; no invented contact time |
| Pack details | “A closer look” / “100 ml” / “Flip-top bottle” | Front view plus actual side-label photograph |

**FAQ drafts:**

- **What is the featured variant?** The front label identifies lemon and fruit extracts.
- **Is this a serum?** No. This product is labelled as a face wash.
- **What is the bottle size?** The photographed bottle is labelled 100 ml.

**SEO title:** Lemon & Fruits Extract Face Wash, 100 ml | Sattva Skin  
**Meta description:** Discover Sattva Skin Lemon & Fruits Extract Brightening Face Wash in a 100 ml bottle. Explore the product and its label-highlighted ingredients.

### P03 — Almond Oil Control Face Wash

- **Slug:** `almond-oil-control-face-wash`
- **Category / type:** Face care / Face Wash
- **Size:** 100 ml.
- **Featured ingredient observed:** Almond; the probable side-label match names almond oil.
- **Short description:** An almond-featured facial cleanser from Sattva Skin’s oil-control range, in a 100 ml flip-top bottle.
- **Story heading:** Almond at the centre of the cleansing story.

**Long description:** Sattva Skin Almond Oil Control Face Wash is identified by its almond imagery and brown-accented label. The 100 ml facial cleanser is part of the brand’s oil-control range. Refer to the complete ingredient list and current pack directions when choosing it for your routine.

**Side-label notes:** Image 4 appears to name tea oil, almond oil, neem, methi (fenugreek), manjistha, arnica, jojoba oil and calendula flower. The curved, blurry label prevents a reliable complete transcription, and the image-to-variant match needs confirmation.

**Confirm:** image 4 belongs to this variant; complete formula; suitability; use directions; any measured oil-control benefits. Do not infer that almond makes the product nut-allergen-free, suitable for sensitive skin, or non-comedogenic.

| Asset | Exact draft text | Composition / production note |
| --- | --- | --- |
| Hero | “Almond” / “Oil Control Face Wash” / “100 ml” | Original clear bottle; warm almond-brown accent |
| Ingredients | “Featured on the label” / “Almond” | Almonds as the only ingredient prop until the side label is confirmed |
| Overview | “Get to know the almond variant” / “Face wash” / “Almond” / “100 ml” | Three factual cards; no sebum charts or numerical results |
| Directions — hold | “Your cleansing step” | Populate only from confirmed directions |
| Pack details | “A closer look” / “100 ml” / “Flip-top bottle” | Front and confirmed matching side view |

**FAQ drafts:**

- **Which variant is this?** This is the Almond Oil Control Face Wash, identified by its brown label accents.
- **Does it contain almond?** Almond is highlighted on the front label. Obtain the complete ingredient list if you need to check ingredient sensitivities.
- **What size is shown?** The photographed bottle is labelled 100 ml.

**SEO title:** Almond Oil Control Face Wash, 100 ml | Sattva Skin  
**Meta description:** Explore Sattva Skin Almond Oil Control Face Wash, the almond-featured facial cleanser in a 100 ml bottle with a white flip-top cap.

### P04 — Neem Acne Control Face Wash

- **Slug:** `neem-acne-control-face-wash`
- **Category / type:** Face care / Face Wash
- **Size:** 100 ml.
- **Featured ingredient observed:** Neem; side label names neem extract.
- **Short description:** A neem-extract facial cleanser in Sattva Skin’s acne-control range, presented in a 100 ml bottle.
- **Story heading:** A cleansing step with neem in focus.

**Long description:** Sattva Skin Neem Acne Control Face Wash features neem extract on its label and comes in a green-accented 100 ml bottle. It is a facial cleansing product. Check the full formula, suitability and directions before adding it to your skincare routine.

**Side-label notes:** Image 9 visibly lists neem extract, calendula flower, almond oil, jojoba oil, methi (fenugreek), manjistha and arnica. Treat these as a partial common-name label transcription, not a verified complete INCI list or ingredient order.

**Confirm:** complete formula; directions; suitability; evidence for acne, pimple, hydration or oil-control statements. Preserve the product name but do not add “treats acne,” “kills acne bacteria,” “prevents breakouts,” or a clearance timeline.

| Asset | Exact draft text | Composition / production note |
| --- | --- | --- |
| Hero | “Neem” / “Acne Control Face Wash” / “100 ml” | Green-accented original bottle with neem-leaf reference imagery |
| Ingredients | “Featured ingredient” / “Neem extract” | One primary botanical callout; optional other label ingredients only after verification |
| Overview | “Neem in focus” / “Facial cleanser” / “Neem extract” / “100 ml” | Product facts; no acne before-and-after or medical illustrations |
| Directions — hold | “Your cleansing step” | Use verified label directions; no promised clearing period |
| Pack details | “A closer look” / “100 ml” / “Flip-top bottle” | Front view plus image 9 as a supporting reference |

**FAQ drafts:**

- **What is the featured ingredient?** Neem extract is named on the side label.
- **What type of product is it?** It is a face wash, as identified on the front label.
- **What is the pack size?** The photographed bottle is labelled 100 ml.

**SEO title:** Neem Acne Control Face Wash, 100 ml | Sattva Skin  
**Meta description:** Explore Sattva Skin Neem Acne Control Face Wash, a neem-extract facial cleanser in a 100 ml bottle. View product and ingredient details.

### P05 — Green Tea Toner

- **Slug:** `green-tea-toner`
- **Category / type:** Face care / Toner
- **Size:** 50 ml, clearest in the group photographs.
- **Featured ingredient observed:** Green tea extract.
- **Short description:** A green-tea-extract toner in a compact 50 ml bottle with a translucent protective cap.
- **Story heading:** Green tea, in a toner format.

**Long description:** Sattva Skin Green Tea Toner features green tea extract and the words “Hydrate · Refresh” on its front label. The photographed 50 ml bottle has a covered dispenser and green label accents. Follow the confirmed application directions for this toner when including it in your routine.

**Observed claim record:** The label includes “100% Organic” and “All Skin Types”; a narrow band includes an excess-oil claim, with other text partially obscured. These are printed claims, not independently verified facts. Do not create an organic certification seal or extend the skin-type statement into sensitive-skin or allergy assurances.

**Confirm:** complete formula; dispenser operation; application method; frequency; suitability; organic claim basis; hydration and oil-control claims. Do not invent spray distance, number of sprays, alcohol-free status or pore-tightening results.

| Asset | Exact draft text | Composition / production note |
| --- | --- | --- |
| Hero | “Green Tea Toner” / “50 ml” | Preserve tall translucent cap and original bottle proportions |
| Ingredients | “Featured ingredient” / “Green tea extract” | Tea-leaf callout; no certification badge |
| Overview | “Meet the toner” / “Toner” / “Green tea extract” / “50 ml” | Three factual cards with tea-green accents |
| Directions — hold | “How to apply your toner” | Illustrate actual application only after dispenser and method are confirmed |
| Pack details | “A closer look” / “50 ml” / “Protective cap” | Cap-on original reference; avoid inventing hidden hardware |

**FAQ drafts:**

- **Which ingredient is highlighted?** Green tea extract is named on the front label.
- **What size is shown?** The photographed toner is labelled 50 ml.
- **How should I apply it?** Follow the current pack directions, or contact Sattva Skin for application details before ordering.

**SEO title:** Green Tea Toner, 50 ml | Sattva Skin  
**Meta description:** Meet Sattva Skin Green Tea Toner, featuring green tea extract in a 50 ml bottle. Explore the product, packaging and ingredient story.

### P06 — Scar Control Serum

- **Slug:** `scar-control-serum`
- **Category / type:** Face care / Serum
- **Size:** 15 ml, supported by the group photographs.
- **Featured ingredients:** Rosehip oil is readable; the narrow line appears to also name witch hazel and liquorice. Confirm these two readings and the brand’s preferred ingredient spelling before artwork production.
- **Short description:** Sattva Skin’s Scar Control Serum in a 15 ml dropper bottle, with rosehip oil highlighted on the label.
- **Story heading:** A closer look at the serum.

**Long description:** Sattva Skin Scar Control Serum comes in a clear 15 ml bottle with a gold-tone dropper collar and white bulb. Rosehip oil is named on the photographed label. Review the complete formula and application directions to understand how this product fits your routine.

**Observed claim record:** The front label says “Helps Fade Scars & Blemishes” and “Hydrates & Evens Skin Tone.” Record these as packaging claims for review. Do not turn them into guaranteed scar removal, healing claims, or numerical results.

**Confirm:** complete formula; witch hazel and liquorice readings; concentrations if intended for publication; application amount; timing; suitability; precautions; compatibility and claim support. A yellow liquid and dropper do not establish a pure oil formula or exact texture.

| Asset | Exact draft text | Composition / production note |
| --- | --- | --- |
| Hero | “Scar Control Serum” / “15 ml” | Preserve clear bottle, gold collar, white bulb and green label |
| Ingredients | “Featured on the label” / “Rosehip oil” | One confirmed ingredient callout; add witch hazel and liquorice only after verification |
| Overview | “Meet the serum” / “Serum” / “Dropper bottle” / “15 ml” | Format facts; no scar illustrations or before-and-after panels |
| Directions — hold | “How to apply your serum” | Add verified amount and order; do not invent “2–3 drops” or morning/evening frequency |
| Pack details | “A closer look” / “15 ml” / “Dropper dispenser” | Product silhouette and readable front label |

**FAQ drafts:**

- **What size is the serum?** The photographed bottle is labelled 15 ml.
- **What dispenser does it use?** The photograph shows a dropper with a white bulb and gold-tone collar.
- **Which ingredient can I identify from the photo?** Rosehip oil is readable on the front label. Ask for the complete ingredient list before ordering if you need more detail.

**SEO title:** Scar Control Serum, 15 ml | Sattva Skin  
**Meta description:** Explore Sattva Skin Scar Control Serum in a 15 ml dropper bottle, with rosehip oil highlighted on its label. View product details.

### P07 — Skin Repair Night Gel

- **Slug:** `skin-repair-night-gel`
- **Category / type:** Face care / Night Gel
- **Size:** 50 g.
- **Featured ingredients observed:** Green tea, watermelon, aloe vera.
- **Short description:** A night gel featuring green tea, watermelon and aloe vera, presented in a 50 g jar.
- **Story heading:** Three featured ingredients for your evening ritual.

**Long description:** Sattva Skin Skin Repair Night Gel highlights green tea, watermelon and aloe vera on its bright green label. The photographed product comes in a white 50 g jar with a screw-top lid. Follow the current product directions for application as part of your evening care.

**Observed claim record:** “Hydrates · Repairs · Revitalizes.” Keep these as label claims pending support. Do not add skin-barrier repair, collagen production, overnight transformation or clinical percentages.

**Confirm:** full formula; application amount; whether it is intended as a leave-on product; frequency; suitability; precautions; actual gel appearance. The closed jar does not show the gel’s colour or texture.

| Asset | Exact draft text | Composition / production note |
| --- | --- | --- |
| Hero | “Skin Repair Night Gel” / “50 g” | White jar with green lid label visible; use images 13 and 17 together |
| Ingredients | “Three featured ingredients” / “Green tea” / “Watermelon” / “Aloe vera” | Three balanced ingredient callouts around the jar |
| Overview | “Meet your night gel” / “Night gel” / “Three featured ingredients” / “50 g” | Evening motif; no invented texture swatch |
| Directions — hold | “Your evening application” | Reserve confirmed steps; do not specify “leave overnight” without directions |
| Pack details | “A closer look” / “50 g” / “Screw-top jar” | Lid view plus jar side view; heading uses “Gel” once |

**FAQ drafts:**

- **Which ingredients are highlighted?** Green tea, watermelon and aloe vera are named on the lid and side label.
- **What is the pack size?** The jar is labelled 50 g.
- **Is it a mask or a gel?** The product is labelled Skin Repair Night Gel. Follow its own directions rather than face-mask instructions.

**SEO title:** Skin Repair Night Gel, 50 g | Sattva Skin  
**Meta description:** Discover Sattva Skin Skin Repair Night Gel, featuring green tea, watermelon and aloe vera in a 50 g jar. Explore product details.

### P08 — French Clay Face Mask

- **Slug:** `french-clay-face-mask`
- **Category / type:** Face care / Face Mask
- **Size:** 50 g.
- **Ingredient identity observed:** French Clay in the product name. No complete ingredient panel is supplied.
- **Short description:** A French Clay Face Mask presented in a 50 g white jar with a teal label.
- **Story heading:** Meet the French Clay Face Mask.

**Long description:** Sattva Skin French Clay Face Mask is identified by its teal lid label and white jar. The photographed pack is labelled 50 g. Check the current formula and preparation directions to confirm how this face mask should be used.

**Observed label wording:** “Goodness of Nature.” This is a brand phrase, not proof of ingredient purity, geographic origin, or certification.

**Confirm:** full ingredient list; clay type; whether the product is a dry powder or ready-to-use mask; preparation requirements; application time; frequency; suitability; precautions. Do not infer green clay, bentonite, kaolin, “100% French clay,” detoxification or pore reduction from the name or powder illustration.

| Asset | Exact draft text | Composition / production note |
| --- | --- | --- |
| Hero | “French Clay Face Mask” / “50 g” | Lid-forward white jar with teal accent; image 15 is the primary label reference |
| Ingredient story | “French Clay Face Mask” / “Explore the product” | Use the actual label detail; hold mineral callouts until clay composition is confirmed |
| Overview | “Meet the face mask” / “Face mask” / “Jar format” / “50 g” | Three factual cards; no powder-versus-paste claim |
| Directions — hold | “How to use your face mask” | Do not show mixing or drying steps before formulation and instructions are known |
| Pack details | “A closer look” / “50 g” / “White jar · Teal label” | Actual lid and jar references; no invented open-container contents |

**FAQ drafts:**

- **What is the product called?** The lid reads French Clay Face Mask.
- **What is the pack size?** The photographed jar is labelled 50 g.
- **Does it need mixing?** Preparation details are not established by the supplied photographs. Contact Sattva Skin for the current directions before ordering.

**SEO title:** French Clay Face Mask, 50 g | Sattva Skin  
**Meta description:** Explore Sattva Skin French Clay Face Mask in a 50 g white jar with a teal label. View the product and enquire about current details.

## 5. Detailed infographic design specification

### Visual system

- Match the existing lip-care artwork: warm ivory `#F7F3EC`, forest-green text `#344B3A`, spacious layouts, fine divider lines, restrained ingredient photography and soft shadows.
- Product accents: hair mask botanical olive `#7D8D43`; lemon yellow `#DDBA39`; almond brown `#98704E`; neem green `#4F793D`; toner tea green `#7C914B`; serum deep teal `#39786C`; night gel leaf green `#71A83A`; French clay muted teal `#76A7A3`. These are proposed design colours, not sampled brand standards.
- Preserve the actual container, cap, proportions, logo, variant, label colours and net quantity. Packaging identity must remain recognizable across all images.
- Set customer-facing headings and ingredient labels as editable type. Generating the scene separately and typesetting the text afterward reduces spelling errors.
- Use ingredient props only when their presence is confirmed. Keep proposed application ingredients separate from formula ingredients.
- Closed containers should stay closed unless a real texture/open-pack reference is supplied. Do not invent gel swatches, foam, powder contents or oil viscosity.
- Do not add invented reviews, badges, results, certifications, dermatologist endorsements, ingredient percentages, discounts or stock messages.

### Deliverable sizes and filenames

| Deliverable | Suggested dimensions | Filename pattern | Purpose |
| --- | --- | --- | --- |
| Product hero | 1600 × 1600 px | `{slug}-hero.webp` | Primary product image |
| Ingredient infographic | 1600 × 1600 px | `{slug}-ingredients.webp` | Featured ingredients and labels |
| Product overview | 1600 × 1600 px | `{slug}-overview.webp` | Product type, ingredient identity, size |
| Directions infographic | 1600 × 1600 px | `{slug}-how-to-use.webp` | Confirmed application steps; currently held |
| Pack-details graphic | 1600 × 1600 px | `{slug}-details.webp` | Packaging and size |
| Detailed infographic | 1600 × 3200 px | `{slug}-complete-guide.webp` | Downloadable product guide |
| Social adaptation | 1080 × 1350 px | `{slug}-social.webp` | Simplified ingredient or overview card |
| Source photograph | Preserve original | `originals/{original-filename}` | Reference and original-photo gallery item |

These are production targets, not existing files. Place future face-care assets under `public/images/face-care/` and hair-care assets under `public/images/hair-care/`. Keep a prompt/reference manifest alongside this brief when production starts.

### Detailed infographic: exact section order

Each product receives its own tall infographic. Populate it from that product’s section above; do not reuse lip-care formula text.

1. **Top 20% — identity:** “SATTVA SKIN”; product-page name; pack size; hero product image. Keep the full title readable.
2. **Next 25% — ingredient story:** the product’s ingredient heading and confirmed callouts. P08 uses the label/product story until composition is supplied. Use the number of callouts the evidence supports, rather than filling empty space with new ingredients.
3. **Next 15% — product overview:** the three factual overview cards from the storyboard. Replace these with specific benefits only when approved evidence and copy are supplied.
4. **Next 25% — directions:** confirmed steps, amounts, timings and frequency. Until directions are available, omit this section and shorten the export; do not export a customer infographic with placeholders.
5. **Final 15% — pack details:** product type, net quantity, confirmed precautions, and “Explore the product” with the verified website address. Do not invent a QR code destination.

Keep roughly 8% outer margins. Limit each callout to a short label plus one concise line. Preview at mobile width; if text becomes too small, split the tall guide into individual panels. Repeat essential information as live text on the product page so customers do not have to zoom into an image.

### Image-production prompt templates

These are prompts for a later production stage, not a record of generated assets. Replace every bracketed field before use and attach the actual mapped reference photograph.

**A. Product hero**

> Create a premium ecommerce product photograph for Sattva Skin using the attached [REFERENCE IMAGE] as the identity reference. Show exactly one [PRODUCT NAME] in its actual [CONTAINER DESCRIPTION]. Preserve container proportions, cap, label artwork, brand spelling, product wording and visible net quantity. Use warm ivory #F7F3EC, soft natural side lighting, a subtle grounded shadow and restrained [ACCENT] details. Center the product with generous breathing room in a square composition. [CONFIRMED INGREDIENT PROPS, OR NO PROPS]. Keep the package closed. Do not invent label text, change the pack size, add certification badges, show unverified contents, or add other products. Leave marketing typography out of the scene; it will be typeset separately.

**B. Ingredient infographic scene**

> Design a spacious square ingredient-story composition around the attached [PRODUCT NAME] reference. Preserve the original product packaging. Use warm ivory and forest green with [ACCENT]. Arrange exactly [COUNT] supporting ingredient visuals: [VERIFIED INGREDIENT NAMES]. Keep the product dominant and leave clear areas for the heading and each callout, with thin leader lines that do not cross the package. Ingredient visuals must match the named ingredients. Do not depict unverified ingredients, formula percentages, efficacy results, preparation additives or invented product texture. Produce the visual scene without text; the exact heading and callouts from the brief will be typeset afterward.

For P08, use a product-and-label composition instead of Template B until the clay formula is confirmed. For hair-mask botanicals, obtain reliable botanical references so similarly named plants are not substituted visually.

**C. Detailed guide layout for a designer or website builder**

> Build an editable 1600 × 3200 product guide for [PRODUCT NAME], with separate sections for identity, confirmed ingredients, product overview, verified directions, and pack details. Use the exact approved text from its storyboard in this brief. Use the supplied product photograph and ingredient assets. Apply the Sattva Skin ivory/forest-green visual system and [ACCENT]. Keep text editable and readable on mobile, use numbered steps only for confirmed directions, and remove any section whose information is unconfirmed. Do not fill gaps with inferred benefits, made-up ingredients, timelines, prices, badges or reviews. Export a WebP for the product page and retain an editable source.

## 6. Website implementation notes

The repository was inspected while preparing this brief. The current catalog is generated from five lip-care entries. The new products should be added alongside those entries.

| Existing file | Required change when implementation begins |
| --- | --- |
| `src/data/catalog.ts` | Add the eight products with these canonical slugs, sizes, draft descriptions after review, actual asset paths and verified ingredients. Keep `price: null` and availability unconfirmed until commercial details are supplied. Do not treat the photographed MRP as a confirmed selling price. |
| `src/data/types.ts` | Extend `productType`, currently restricted to `Lip Balm` and `Lip Scrub`, to include `Face Wash`, `Toner`, `Serum`, `Night Gel`, `Face Mask` and `Hair Mask`. Add optional product-specific story heading, FAQ entries, and gallery labels. |
| `src/app/products/[slug]/page.tsx` | Use product-specific story headings; replace the unconditional lip-formula section and balm/scrub FAQ for non-lip products. Replace “Small pots, simple care” where it does not fit bottles or pouches. Keep pricing enquiries consistent with the existing store. |
| `src/components/product-gallery.tsx` | Replace the fixed three gallery captions with per-image labels, so overview, directions and pack-details assets have correct captions. Lazy-load secondary imagery where appropriate. |
| `src/components/lip-formula.tsx` | Keep the lip-specific formula presentation for lip products; use an appropriate ingredient/guide section for face and hair products. |

Additional implementation requirements:

- Ingredient arrays contain only confirmed featured ingredients. `fullIngredients` must not falsely present a partial photo transcription as a complete formula.
- Display image captions such as “Product,” “Featured ingredients,” “Product overview,” “How to use,” “Pack details,” and “Original photograph.” Omit assets not yet produced or verified.
- Provide an explicit “Download product guide” link when the actual downloadable file exists.
- Update shop filters to expose the new face- and hair-care types. Check existing concern pages before assigning products; a category or product name alone is not proof of suitability.
- Add canonical metadata and image alt text using the proposed names and actual rendered image contents. Use each short description or the supplied meta description; do not put unsupported results into search snippets.
- Keep reviews and discounts absent unless real data is supplied. Preserve the existing pricing-enquiry workflow until prices and availability are known.
- Test one face wash, the hair mask and a jar product at mobile and desktop sizes, then check every slug, gallery caption, guide download and contact action. Ensure existing lip pages retain their correct content.

## 7. Information still needed for final publication

| Information | Current status | Treatment in this brief |
| --- | --- | --- |
| Product names | Readable; lemon wording normalized | Eight names proposed with source wording retained |
| Net quantities | Readable for all eight primary packs | Use the listed size; tall hair-pouch size remains unknown |
| Selling prices and stock | Not supplied | Price enquiry; no invented availability |
| Hair-mask MRP | Small text appears to be ₹150 | Confirm before entering commercial data |
| Complete formulas / INCI | Not supplied as reliable full panels | Featured ingredients only; tentative readings remain internal |
| Usage and precautions | Mostly missing; hair-mask instructions partially readable | Hold final how-to-use artwork and exact directions |
| Suitability and frequency | Not reliably established | Do not invent skin/hair types, AM/PM frequency or application amounts |
| Benefits and certifications | Some claims printed on packs | Record observed claims separately; no added evidence implied |
| Texture references | Containers closed | No invented texture swatches or exposed contents |
| Manufacturer and pack information | Not reliably readable | Obtain current label artwork or clear full-panel photos |
| Bundle status | Group photographs only | Treat all eight as individual products |

The most useful next source material is current front/back label artwork for each product, plus the price/stock sheet and confirmed usage instructions. The names, draft descriptions, photo mapping and design plans in this file are ready for review now.
