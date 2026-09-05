import type { Concern, Ingredient, Product } from "./types";

type LipProduct = {
  variant: string;
  slug: string;
  type: "Lip Balm" | "Lip Scrub";
  accent: string;
  note: string;
};

const baseIngredients = ["Shea butter", "Coconut oil", "Beeswax"];
const lipRange: LipProduct[] = [
  { variant: "Strawberry", slug: "strawberry-lip-balm", type: "Lip Balm", accent: "#e8b7af", note: "A berry-inspired balm with a smooth, buttery feel." },
  { variant: "Butterscotch", slug: "butterscotch-lip-balm", type: "Lip Balm", accent: "#e8c58c", note: "A warm butterscotch note in a rich, pocket-sized balm." },
  { variant: "Chocolate", slug: "chocolate-lip-balm", type: "Lip Balm", accent: "#c8ad98", note: "A chocolate-inspired balm for a little everyday comfort." },
  { variant: "Strawberry", slug: "strawberry-lip-scrub", type: "Lip Scrub", accent: "#e3a6a0", note: "A strawberry-inspired sugar scrub with a buttery base." },
  { variant: "Red Wine", slug: "red-wine-lip-scrub", type: "Lip Scrub", accent: "#c49aab", note: "A red wine-inspired sugar scrub for your lip-care ritual." },
];

export const products: Product[] = lipRange.map((item) => {
  const isScrub = item.type === "Lip Scrub";
  const base = [...baseIngredients, ...(isScrub ? ["Sugar"] : [])];
  const name = `${item.variant} ${item.type}`;
  const ingredientGraphic = `/images/lip-care/${item.slug}-ingredients.webp`;
  return {
    id: item.slug,
    slug: item.slug,
    name,
    variant: item.variant,
    productType: item.type,
    size: isScrub ? "8 g" : "5 g",
    accent: item.accent,
    shortDescription: item.note,
    description: isScrub
      ? `${name} pairs fine sugar grains with a base of shea butter, coconut oil and beeswax. A textured companion to your everyday balm, with ${item.variant.toLowerCase()} at the heart of the collection's ingredient story.`
      : `${name} brings a ${item.variant.toLowerCase()} note to a simple base of shea butter, coconut oil and beeswax. A smooth, buttery lip-care step in a small pot that goes wherever your day takes you.`,
    price: null,
    images: [
      `/images/lip-care/${item.slug}.webp`,
      ingredientGraphic,
      `/images/lip-care/originals/${item.slug}.jpg`,
    ],
    imageAlts: [
      `${name} in its original Sattva Skin packaging, styled with ${item.variant === "Red Wine" ? "dark grapes" : item.variant.toLowerCase()} and base ingredients on warm ivory stone`,
      `${name} ingredient infographic: ${item.variant} as the signature, shea butter for rich texture, coconut oil for smooth glide, beeswax for structure${isScrub ? ", and sugar for polishing grains" : ""}`,
      `Original photograph of ${name}, ${isScrub ? "8 g" : "5 g"}`,
    ],
    ingredientGraphic,
    concerns: ["dry-lips"],
    skinTypes: ["Lip care"],
    ingredients: [item.variant, ...base],
    fullIngredients: `Base ingredients: ${base.join(", ")}. Featured variant: ${item.variant}. Refer to the product label for the complete ingredient list.`,
    howToUse: isScrub
      ? "Use a small amount with light pressure on damp lips, then gently wipe away and follow with balm. Follow the product label for frequency."
      : "With a clean fingertip, smooth a small amount over lips. Reapply as needed and follow the product label.",
    whoItsFor: isScrub ? "For adding an occasional polishing step to a lip-care routine." : "For an everyday lip-care routine with a smooth, buttery finish.",
    precautions: isScrub
      ? "Do not scrub cracked or irritated lips. Use gentle pressure and stop if irritation occurs. For external use only."
      : "For external use only. Stop use if irritation occurs. Check the label for ingredient sensitivities.",
    category: "Lip care",
    badges: [isScrub ? "Sugar polish" : "Daily comfort"],
    available: false,
  };
});

export const concerns: Concern[] = [
  {
    slug: "acne-pimples",
    name: "Acne & pimples",
    title: "Build a simpler routine for breakout-prone skin.",
    description: "Everyday cleansing, light hydration and focused care—without the noise.",
    note: "Breakout-prone",
    accent: "#F3B082",
    products: [],
    morning: ["Gentle cleanser", "Light moisturizer", "Broad-spectrum sunscreen"],
    evening: ["Gentle cleanser", "Focused care", "Moisturizer"],
    faqs: [
      { question: "Should a routine feel complicated?", answer: "No. Start with a few consistent steps and introduce new products gradually." },
      { question: "Can skincare diagnose acne?", answer: "No. Persistent, painful or sudden concerns should be discussed with a qualified professional." },
    ],
  },
  {
    slug: "oily-skin",
    name: "Oily skin",
    title: "Fresh care without the stripped feeling.",
    description: "Build a balanced routine around cleansing, hydration and daily sun protection.",
    note: "Balance",
    accent: "#CBD3BA",
    products: [],
    morning: ["Gentle cleanser", "Light moisturizer", "Broad-spectrum sunscreen"],
    evening: ["Gentle cleanser", "Focused care", "Moisturizer"],
    faqs: [{ question: "Does oily skin need moisturizer?", answer: "A lightweight moisturizer can still be a useful part of a balanced routine." }],
  },
  {
    slug: "dry-skin",
    name: "Dry skin",
    title: "Bring comfort back to dry-feeling skin.",
    description: "A gentle routine built around less friction and more consistent hydration.",
    note: "Comfort",
    accent: "#E8CCB3",
    products: [],
    morning: ["Gentle cleanse", "Moisturizer", "Broad-spectrum sunscreen"],
    evening: ["Gentle cleanse", "Hydrating step", "Moisturizer"],
    faqs: [{ question: "Where should I start?", answer: "Keep cleansing gentle and moisturize consistently before adding extra steps." }],
  },
  {
    slug: "dull-skin",
    name: "Dull skin",
    title: "A clear routine for brighter-looking skin.",
    description: "Consistent basics and one focused step can be easier to sustain.",
    note: "Glow",
    accent: "#F4C56F",
    products: [],
    morning: ["Gentle cleanser", "Focused serum", "Sunscreen"],
    evening: ["Gentle cleanser", "Focused serum", "Moisturizer"],
    faqs: [{ question: "How quickly should I add products?", answer: "Introduce one product at a time so you can understand how your skin responds." }],
  },
  {
    slug: "pigmentation",
    name: "Pigmentation",
    title: "Focused care, realistic expectations.",
    description: "Build a consistent routine and keep daily sun protection at the centre.",
    note: "Even tone",
    accent: "#D6B39D",
    products: [],
    morning: ["Gentle cleanser", "Focused serum", "Broad-spectrum sunscreen"],
    evening: ["Gentle cleanser", "Focused serum", "Moisturizer"],
    faqs: [{ question: "Is sunscreen important?", answer: "Daily sun protection is an important part of routines focused on uneven tone." }],
  },
  {
    slug: "hair-fall",
    name: "Hair fall",
    title: "A calmer way to think about hair care.",
    description: "Start with scalp-friendly basics while the final Sattva hair range is prepared.",
    note: "Scalp care",
    accent: "#A8B59B",
    products: [],
    morning: ["Gentle handling", "Protect lengths"],
    evening: ["Scalp care as directed", "Minimise friction"],
    faqs: [{ question: "When should I seek help?", answer: "Sudden or persistent hair loss should be discussed with a qualified professional." }],
  },
  {
    slug: "dry-lips",
    name: "Dry lips",
    title: "Simple comfort for dry-feeling lips.",
    description: "Explore buttery balms and sugar scrubs, made for a simple lip-care ritual.",
    note: "Lip comfort",
    accent: "#E8B7AF",
    products: products.map((product) => product.slug),
    morning: ["Gentle care", "Protective balm"],
    evening: ["Comforting balm"],
    faqs: [{ question: "How often can I apply balm?", answer: "Apply a small amount as needed, following the directions on your product label." }],
  },
];

export const ingredients: Ingredient[] = [
  { slug: "shea-butter", name: "Shea butter", eyebrow: "The base / 01", description: "The rich, buttery part of the base shared by our lip balms and lip scrubs.", usedFor: ["Rich texture", "Lip care"], tone: "#b3a27e" },
  { slug: "coconut-oil", name: "Coconut oil", eyebrow: "The base / 02", description: "The oil in our lip-care base, bringing a smooth glide to both formats.", usedFor: ["Smooth glide", "Lip care"], tone: "#8a967c" },
  { slug: "beeswax", name: "Beeswax", eyebrow: "The base / 03", description: "The wax that gives the balm and scrub base its structure. Beeswax is an animal-derived ingredient.", usedFor: ["Formula structure", "Lip care"], tone: "#bd9657" },
  { slug: "sugar", name: "Sugar", eyebrow: "The scrub / 04", description: "Fine polishing grains in our lip scrubs. Sugar distinguishes the scrub base from the smooth balm base.", usedFor: ["Polishing texture", "Lip scrub"], tone: "#aa8d82" },
  { slug: "strawberry", name: "Strawberry", eyebrow: "Signature / Berry", description: "The berry-inspired signature of our Strawberry lip-care collection.", usedFor: ["Lip balm", "Lip scrub"], tone: "#b76a65" },
  { slug: "butterscotch", name: "Butterscotch", eyebrow: "Signature / Caramel", description: "The warm, caramel-inspired signature of our Butterscotch Lip Balm.", usedFor: ["Lip balm"], tone: "#b7863e" },
  { slug: "chocolate", name: "Chocolate", eyebrow: "Signature / Cocoa", description: "The cocoa-inspired signature of our Chocolate Lip Balm.", usedFor: ["Lip balm"], tone: "#745544" },
  { slug: "red-wine", name: "Red Wine", eyebrow: "Signature / Grape", description: "The grape-inspired signature of our Red Wine Lip Scrub.", usedFor: ["Lip scrub"], tone: "#854957" },
  { slug: "neem", name: "Neem", eyebrow: "Botanical 01", description: "A familiar botanical selected for focused cleansing and care concepts.", usedFor: ["Cleansing", "Focused care"], tone: "#344B3A" },
  { slug: "aloe-vera", name: "Aloe vera", eyebrow: "Botanical 02", description: "Chosen for lightweight, comfortable-feeling hydration concepts.", usedFor: ["Hydration", "Comfort"], tone: "#A4B398" },
  { slug: "turmeric", name: "Turmeric", eyebrow: "Botanical 03", description: "A culturally familiar ingredient explored through a modern formulation lens.", usedFor: ["Glow routines", "Focused care"], tone: "#D6913D" },
  { slug: "rose", name: "Rose", eyebrow: "Botanical 04", description: "Used as part of soft, sensorial everyday care concepts.", usedFor: ["Comfort", "Daily care"], tone: "#D7AAA3" },
  { slug: "amla", name: "Amla", eyebrow: "Botanical 05", description: "A botanical considered for the future Sattva hair-care range.", usedFor: ["Hair routines"], tone: "#7D8D69" },
];

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
export const getConcern = (slug: string) => concerns.find((concern) => concern.slug === slug);
export const getIngredient = (slug: string) => ingredients.find((ingredient) => ingredient.slug === slug);
