import type { Metadata } from "next";

import SkinQuiz from "./skin-quiz";

export const metadata: Metadata = {
  title: "Routine quiz",
  description:
    "Answer six simple, non-diagnostic questions for an educational AM and PM skincare starting point.",
};

export default function SkinQuizPage() {
  return <SkinQuiz />;
}
