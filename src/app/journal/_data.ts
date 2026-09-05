export type JournalSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
};

export type JournalArticle = {
  slug: string;
  category: string;
  title: string;
  dek: string;
  readTime: string;
  publishedLabel: string;
  image: string;
  imagePosition: string;
  sections: JournalSection[];
};

export const journalArticles: JournalArticle[] = [
  {
    slug: "short-routine-starting-point",
    category: "Routine basics",
    title: "Why a short routine can be a strong starting point",
    dek: "A practical case for beginning with the basics, paying attention, and adding only what earns a place.",
    readTime: "4 min read",
    publishedLabel: "Educational sample",
    image: "/images/routine-lineup.webp",
    imagePosition: "center",
    sections: [
      {
        heading: "Start with the jobs, not the trends",
        paragraphs: [
          "A routine does not need many products to be thoughtful. Start by asking what each step is meant to do: cleanse without unnecessary friction, support comfortable hydration, and protect skin from the sun during the day.",
          "Those basics also create a useful baseline. When fewer things change at once, it is easier to notice how your skin feels and whether a new step is genuinely useful.",
        ],
      },
      {
        heading: "Consistency makes a routine legible",
        paragraphs: [
          "The most elaborate routine is not automatically the most effective one. A smaller routine that fits your morning and evening is often easier to repeat and evaluate.",
        ],
        points: [
          "Use products according to their final label directions.",
          "Introduce one new formula at a time.",
          "Keep daytime sun protection central to the routine.",
        ],
      },
      {
        heading: "Know when skincare is not the answer",
        paragraphs: [
          "Skincare can support an everyday routine, but it cannot diagnose a condition. Sudden, persistent, painful or worrying changes deserve advice from a qualified healthcare professional.",
        ],
      },
    ],
  },
  {
    slug: "introduce-one-product-at-a-time",
    category: "Mindful care",
    title: "How to introduce one product at a time",
    dek: "A measured approach can make a new routine easier to understand—and easier to leave alone when it is working.",
    readTime: "5 min read",
    publishedLabel: "Educational sample",
    image: "/images/sattva-hero.webp",
    imagePosition: "58% center",
    sections: [
      {
        heading: "Keep the rest of the routine familiar",
        paragraphs: [
          "When several products arrive together, the temptation is to start everything at once. A slower approach gives each formula a clearer context. Keep your established basics steady and change one thing at a time.",
          "Before first use, read the complete label and follow its directions. Patch testing can be a useful precaution, particularly when your skin is easily unsettled.",
        ],
      },
      {
        heading: "Pay attention without over-reading",
        paragraphs: [
          "Notice comfort, dryness, visible irritation and whether the step fits naturally into your day. You do not need to inspect your skin every hour. The aim is simply to avoid making multiple changes before you understand the first one.",
        ],
        points: [
          "Write down the date you begin a new product.",
          "Use the amount and frequency stated on the label.",
          "Stop use if irritation occurs.",
        ],
      },
      {
        heading: "Escalate concerns appropriately",
        paragraphs: [
          "If a response feels severe, persistent or concerning, stop experimenting and seek advice from a qualified professional. A quiz, article or product page is not a substitute for individual medical guidance.",
        ],
      },
    ],
  },
  {
    slug: "reading-skincare-labels",
    category: "Ingredient literacy",
    title: "Reading skincare labels with a calmer eye",
    dek: "Ingredient names are useful, but the complete formula and clear directions tell a more meaningful story.",
    readTime: "6 min read",
    publishedLabel: "Educational sample",
    image: "/images/neem-editorial.webp",
    imagePosition: "center",
    sections: [
      {
        heading: "Look beyond the headline ingredient",
        paragraphs: [
          "A botanical or active on the front of a pack may be a helpful orientation point, but it cannot describe the product on its own. The complete ingredient list, format and directions offer more context than one familiar name.",
          "The same ingredient can appear in very different formulas. That is why an ingredient story should not be read as a guaranteed result.",
        ],
      },
      {
        heading: "Read directions and precautions together",
        paragraphs: [
          "How often a product is intended to be used, where it belongs in a routine and any stated precautions are part of the product information—not fine print to skip.",
        ],
        points: [
          "Check whether the product is meant to be rinsed off or left on.",
          "Follow stated frequency and storage guidance.",
          "Do not rely on a marketing summary in place of the final label.",
        ],
      },
      {
        heading: "Treat online explainers as education",
        paragraphs: [
          "Articles can help you ask better questions, but they cannot assess your skin or provide personalised medical advice. Use reliable label information and speak with a qualified professional when a concern is persistent or worrying.",
        ],
      },
    ],
  },
];

export const getJournalArticle = (slug: string) =>
  journalArticles.find((article) => article.slug === slug);
