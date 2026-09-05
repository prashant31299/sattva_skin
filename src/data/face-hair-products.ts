import type { Product } from "./types";

type RangeEntry = Pick<Product, "slug" | "name" | "category" | "productType" | "size" | "variant" | "accent" | "shortDescription" | "description" | "storyHeading"> & {
  packaging: string;
  highlights: string[];
  detailPhoto?: boolean;
};

const range: RangeEntry[] = [
  {
    slug: "neem-acne-control-face-wash", name: "Neem Acne Control Face Wash", category: "Face care", productType: "Face Wash", size: "100 ml", variant: "Neem", accent: "#b8c9a1",
    shortDescription: "A neem-extract facial cleanser in a 100 ml flip-top bottle.",
    description: "Neem takes the lead in this Sattva Skin face wash. Recognisable by its green label, the 100 ml bottle brings a botanical ingredient story to your cleansing step. Explore the featured ingredient and original packaging below.",
    storyHeading: "A cleansing step. Neem in focus.", packaging: "Flip-top bottle", highlights: ["Neem extract"], detailPhoto: true,
  },
  {
    slug: "lemon-fruits-extract-brightening-face-wash", name: "Lemon & Fruits Extract Brightening Face Wash", category: "Face care", productType: "Face Wash", size: "100 ml", variant: "Lemon", accent: "#ead68b",
    shortDescription: "A lemon-and-fruit-extract facial cleanser from our brightening range.",
    description: "Lemon and fruit extracts are at the heart of this face wash’s label story. Presented in a yellow-accented 100 ml bottle with a white flip-top cap, it is a facial cleanser from the Sattva Skin brightening range.",
    storyHeading: "A little citrus in your cleansing story.", packaging: "Flip-top bottle", highlights: ["Lemon", "Fruit extracts"], detailPhoto: true,
  },
  {
    slug: "almond-oil-control-face-wash", name: "Almond Oil Control Face Wash", category: "Face care", productType: "Face Wash", size: "100 ml", variant: "Almond", accent: "#d3b596",
    shortDescription: "An almond-featured facial cleanser from our oil-control range.",
    description: "Meet the almond variant of Sattva Skin face wash. Its warm brown label and almond imagery distinguish this 100 ml facial cleanser, presented in a clear bottle with a white flip-top cap.",
    storyHeading: "Almond at the centre of the story.", packaging: "Flip-top bottle", highlights: ["Almond"],
  },
  {
    slug: "green-tea-toner", name: "Green Tea Toner", category: "Face care", productType: "Toner", size: "50 ml", variant: "Green Tea", accent: "#c4cea5",
    shortDescription: "A green-tea-extract toner in a compact 50 ml bottle.",
    description: "Green tea extract is the featured ingredient in this Sattva Skin toner. A tall translucent cap covers the dispenser of its compact 50 ml bottle, finished with the collection’s familiar green accents.",
    storyHeading: "Green tea. A different format.", packaging: "Bottle with protective cap", highlights: ["Green tea extract"],
  },
  {
    slug: "scar-control-serum", name: "Scar Control Serum", category: "Face care", productType: "Serum", size: "15 ml", variant: "Rosehip", accent: "#a4c3b8",
    shortDescription: "A 15 ml serum with rosehip oil highlighted on the label.",
    description: "Sattva Skin Scar Control Serum comes in a small clear bottle with a gold-tone collar and white dropper bulb. Rosehip oil is highlighted on the label. Discover the product format and original packaging in its product guide.",
    storyHeading: "A closer look at your serum.", packaging: "Dropper bottle", highlights: ["Rosehip oil"],
  },
  {
    slug: "skin-repair-night-gel", name: "Skin Repair Night Gel", category: "Face care", productType: "Night Gel", size: "50 g", variant: "Watermelon & Aloe", accent: "#c0d59b",
    shortDescription: "A night gel featuring green tea, watermelon and aloe vera.",
    description: "Three featured ingredients come together in the label story of Sattva Skin Skin Repair Night Gel: green tea, watermelon and aloe vera. The 50 g product is presented in a white screw-top jar with a bright green label.",
    storyHeading: "Three ingredients. An evening story.", packaging: "Screw-top jar", highlights: ["Green tea", "Watermelon", "Aloe vera"], detailPhoto: true,
  },
  {
    slug: "french-clay-face-mask", name: "French Clay Face Mask", category: "Face care", productType: "Face Mask", size: "50 g", variant: "French Clay", accent: "#b1d0cd",
    shortDescription: "Meet the French Clay Face Mask, presented in a 50 g jar.",
    description: "A teal lid label and a simple white jar identify Sattva Skin French Clay Face Mask. This 50 g product is part of our face-care collection. Explore its packaging below, and contact us for the complete formula and preparation details.",
    storyHeading: "The French Clay edit.", packaging: "White jar with teal label", highlights: [],
  },
  {
    slug: "ayurvedic-herbal-hair-mask", name: "Ayurvedic Herbal Hair Mask", category: "Hair care", productType: "Hair Mask", size: "100 g", variant: "Amla & Botanicals", accent: "#c8cf97",
    shortDescription: "A botanical hair mask featuring amla, reetha, shikakai and brahmi.",
    description: "Amla, reetha, shikakai and brahmi shape the ingredient story of Sattva Skin Ayurvedic Herbal Hair Mask. The 100 g pack comes in a kraft-style resealable pouch. Follow your current pack’s directions for preparation, application and rinsing.",
    storyHeading: "Four botanicals. One hair-care ritual.", packaging: "Resealable pouch", highlights: ["Amla", "Reetha", "Shikakai", "Brahmi"], detailPhoto: true,
  },
];

export const faceHairProducts: Product[] = range.map((item) => {
  const folder = item.category === "Hair care" ? "hair-care" : "face-care";
  const root = `/images/${folder}/${item.slug}`;
  const labelNote = item.highlights.length
    ? `Featured on the label: ${item.highlights.join(", ")}. These are ingredient highlights, not the complete formula. Contact us for the complete ingredient list.`
    : "Contact us for the complete ingredient list and preparation details for this face mask.";
  return {
    id: item.slug, slug: item.slug, name: item.name, category: item.category, productType: item.productType,
    size: item.size, variant: item.variant, accent: item.accent,
    shortDescription: item.shortDescription, description: item.description, storyHeading: item.storyHeading,
    price: null, available: false, concerns: [], skinTypes: [],
    ingredients: item.highlights, fullIngredients: labelNote, howToUse: "", whoItsFor: "",
    images: [`${root}-hero.webp`, `${root}-complete-guide.png`, `${root}-original.jpg`, ...(item.detailPhoto ? [`${root}-detail.jpg`] : [])],
    imageAlts: [`Styled product image of ${item.name}, ${item.size}, on an ivory background`, `Product infographic for ${item.name}: ${item.highlights.length ? item.highlights.join(", ") : "product identity"}, ${item.size}, ${item.packaging.toLowerCase()}`, `Original photograph of ${item.name}, ${item.size}`, ...(item.detailPhoto ? [`Packaging detail of ${item.name}`] : [])],
    galleryLabels: ["Styled product", "Product guide", "Original photograph", ...(item.detailPhoto ? ["Pack details"] : [])],
    guide: {
      packaging: item.packaging,
      heading: item.highlights.length ? "The ingredient story." : "The product, up close.",
      highlights: item.highlights.map((name) => ({ name, detail: "Featured on the product label" })),
    },
    faqs: [
      { question: "What size is this product?", answer: `${item.name} is shown in a ${item.size} pack.` },
      { question: item.highlights.length ? "Which ingredients are highlighted?" : "Where can I find the formula?", answer: labelNote },
      { question: "How should I use it?", answer: "Follow the directions on your current pack. Contact us for application details and ingredient information before ordering." },
    ],
  };
});
