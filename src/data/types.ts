export type ProductCategory = "Face care" | "Hair care" | "Lip care";

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number | null;
  compareAtPrice?: number | null;
  images: string[];
  imagePosition?: string;
  rating?: number;
  reviewCount?: number;
  concerns: string[];
  skinTypes: string[];
  ingredients: string[];
  fullIngredients: string;
  howToUse: string;
  whoItsFor: string;
  precautions?: string;
  category: ProductCategory;
  productType?: "Lip Balm" | "Lip Scrub" | "Face Wash" | "Toner" | "Serum" | "Night Gel" | "Face Mask" | "Hair Mask";
  storyHeading?: string;
  galleryLabels?: string[];
  faqs?: { question: string; answer: string }[];
  guide?: {
    packaging: string;
    heading: string;
    highlights: { name: string; detail: string }[];
  };
  variant?: string;
  size?: string;
  accent?: string;
  ingredientGraphic?: string;
  imageAlts?: string[];
  badges?: string[];
  available: boolean;
};

export type Concern = {
  slug: string;
  name: string;
  title: string;
  description: string;
  note: string;
  accent: string;
  products: string[];
  morning: string[];
  evening: string[];
  faqs: { question: string; answer: string }[];
};

export type Ingredient = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  usedFor: string[];
  tone: string;
};
