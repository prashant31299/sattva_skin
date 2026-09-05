"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import { concerns, products } from "@/data/catalog";

import styles from "./skin-quiz.module.css";

type QuestionId =
  | "focus"
  | "afterCleanse"
  | "midday"
  | "newProducts"
  | "pace"
  | "sunProtection";

type QuizOption = {
  value: string;
  label: string;
  note: string;
};

type QuizQuestion = {
  id: QuestionId;
  eyebrow: string;
  question: string;
  context: string;
  options: QuizOption[];
};

const questions: QuizQuestion[] = [
  {
    id: "focus",
    eyebrow: "Your starting point",
    question: "What would you most like your routine to focus on?",
    context: "Choose one for now. You can retake the quiz with a different focus.",
    options: [
      { value: "acne-pimples", label: "Breakout-prone skin", note: "Keep cleansing and focused care simple" },
      { value: "oily-skin", label: "Oily-feeling skin", note: "Balance freshness with comfortable hydration" },
      { value: "dry-skin", label: "Dry-feeling skin", note: "Prioritise comfort and consistent moisture" },
      { value: "dull-skin", label: "Dull-looking skin", note: "Build around consistent basics and one focus" },
      { value: "pigmentation", label: "Uneven-looking tone", note: "Keep daily sun protection central" },
    ],
  },
  {
    id: "afterCleanse",
    eyebrow: "How skin feels",
    question: "How does your face usually feel after cleansing?",
    context: "Think about an ordinary day, before applying the next step.",
    options: [
      { value: "tight", label: "Tight or dry", note: "Comfort feels reduced quite quickly" },
      { value: "comfortable", label: "Mostly comfortable", note: "Neither notably tight nor oily" },
      { value: "oily", label: "Still oily", note: "Freshness does not last for long" },
    ],
  },
  {
    id: "midday",
    eyebrow: "Across the day",
    question: "By the middle of the day, what do you notice most?",
    context: "There is no perfect answer—choose the pattern that feels most familiar.",
    options: [
      { value: "dry", label: "Dryness or tightness", note: "Skin feels like it needs more comfort" },
      { value: "varies", label: "A mix of both", note: "Different areas seem to behave differently" },
      { value: "shiny", label: "Visible shine", note: "Oiliness becomes more noticeable" },
    ],
  },
  {
    id: "newProducts",
    eyebrow: "Introducing change",
    question: "How often does your skin feel unsettled by a new product?",
    context: "This does not assess sensitivity; it only helps shape a slower or simpler start.",
    options: [
      { value: "often", label: "Often", note: "I prefer to be especially cautious" },
      { value: "sometimes", label: "Sometimes", note: "It depends on the product" },
      { value: "rarely", label: "Rarely", note: "New steps usually feel straightforward" },
    ],
  },
  {
    id: "pace",
    eyebrow: "Your real routine",
    question: "What kind of routine can you repeat comfortably?",
    context: "A routine that fits your day is more useful than an ambitious one you avoid.",
    options: [
      { value: "minimal", label: "The essentials", note: "I want as few steps as possible" },
      { value: "focused", label: "One focused extra", note: "I can add a targeted step" },
      { value: "flexible", label: "A little flexibility", note: "I am comfortable adjusting by time of day" },
    ],
  },
  {
    id: "sunProtection",
    eyebrow: "The daytime anchor",
    question: "Where does sunscreen sit in your current routine?",
    context: "Use a broad-spectrum sunscreen that suits you, following its own label directions.",
    options: [
      { value: "daily", label: "Already an everyday step", note: "It is part of most mornings" },
      { value: "sometimes", label: "Some days", note: "I am working on consistency" },
      { value: "not-yet", label: "Not part of it yet", note: "I need to make room for it" },
    ],
  },
];

type AnswerMap = Partial<Record<QuestionId, string>>;

export default function SkinQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const questionHeadingRef = useRef<HTMLLegendElement>(null);
  const resultsHeadingRef = useRef<HTMLHeadingElement>(null);
  const hasMountedRef = useRef(false);

  const selectedConcern = useMemo(
    () =>
      concerns.find((concern) => concern.slug === answers.focus) ?? concerns[0],
    [answers.focus],
  );

  const matchingProducts = useMemo(
    () =>
      products.filter((product) =>
        selectedConcern.products.includes(product.slug),
      ),
    [selectedConcern],
  );

  const answerPattern = useMemo(() => getAnswerPattern(answers), [answers]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const focusFrame = window.requestAnimationFrame(() => {
      if (step >= questions.length) {
        resultsHeadingRef.current?.focus();
      } else {
        questionHeadingRef.current?.focus();
      }
    });

    return () => window.cancelAnimationFrame(focusFrame);
  }, [step]);

  if (step >= questions.length) {
    return (
      <div className={styles.resultsPage}>
        <header className={styles.resultsHero}>
          <div className={styles.resultsTopline}>
            <span>Your routine starting point</span>
            <span>Complete / 06</span>
          </div>
          <p className={styles.eyebrow}>Based on your six answers</p>
          <h1 ref={resultsHeadingRef} tabIndex={-1}>
            {selectedConcern.name}, kept simple.
          </h1>
          <p className={styles.resultsLede}>
            Your answers reflect a <strong>{answerPattern.toLowerCase()}</strong>{" "}
            pattern. This is a practical starting point—not a skin-type diagnosis.
          </p>
        </header>

        <section className={styles.routines} aria-labelledby="routine-title">
          <div className={styles.routineIntro}>
            <p className={styles.eyebrow}>Your edit</p>
            <h2 id="routine-title">AM, PM, repeat gently.</h2>
            <p>{getGuidanceNote(answers)}</p>
          </div>
          <div className={styles.routineColumns}>
            <RoutineList label="Morning / AM" steps={selectedConcern.morning} />
            <RoutineList label="Evening / PM" steps={selectedConcern.evening} />
          </div>
        </section>

        <section className={styles.matches} aria-labelledby="matches-title">
          <header>
            <p className={styles.eyebrow}>From the preview catalog</p>
            <h2 id="matches-title">Relevant places to explore</h2>
          </header>

          <div className={styles.resultLinks}>
            <article className={styles.concernCard}>
              <span>Concern guide</span>
              <h3>{selectedConcern.title}</h3>
              <p>{selectedConcern.description}</p>
              <Link href={`/pages/${selectedConcern.slug}`}>
                Explore the full routine <span aria-hidden="true">→</span>
              </Link>
            </article>

            {matchingProducts.map((product) => (
              <article className={styles.productCard} key={product.slug}>
                <div>
                  <span>{product.category}</span>
                  <span>{product.available ? "Available" : "Preview"}</span>
                </div>
                <h3>{product.name}</h3>
                <p>{product.shortDescription}</p>
                <Link href={`/products/${product.slug}`}>
                  View product context <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <aside className={styles.resultNote} aria-labelledby="quiz-note">
          <div>
            <p className={styles.eyebrow}>Keep in mind</p>
            <h2 id="quiz-note">Your skin is more than six answers.</h2>
          </div>
          <div>
            <p>
              This quiz is educational and non-diagnostic. Patch test new
              products, follow final label directions, and introduce one change at
              a time. Persistent, painful, sudden or worrying concerns deserve
              advice from a qualified professional.
            </p>
            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setStep(0);
              }}
            >
              Retake the quiz
            </button>
          </div>
        </aside>
      </div>
    );
  }

  const currentQuestion = questions[step];
  const selectedAnswer = answers[currentQuestion.id];
  const progress = ((step + 1) / questions.length) * 100;

  function chooseAnswer(value: string) {
    setAnswers((current) => ({ ...current, [currentQuestion.id]: value }));
  }

  function nextStep() {
    if (!selectedAnswer) return;
    setStep((current) => Math.min(current + 1, questions.length));
  }

  function previousStep() {
    setStep((current) => Math.max(current - 1, 0));
  }

  return (
    <div className={styles.quizPage}>
      <div className={styles.quizShell}>
        <header className={styles.quizHeader}>
          <Link href="/">Sattva Skin</Link>
          <span>Routine quiz / Non-diagnostic</span>
        </header>

        <div
          className={styles.progress}
          role="progressbar"
          aria-label="Quiz progress"
          aria-valuemin={1}
          aria-valuemax={questions.length}
          aria-valuenow={step + 1}
          aria-valuetext={`Step ${step + 1} of ${questions.length}`}
        >
          <span style={{ width: `${progress}%` }} />
        </div>

        <section className={styles.questionPanel}>
          <div className={styles.stepMeta} aria-live="polite">
            <span>0{step + 1}</span>
            <span>of 0{questions.length}</span>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              nextStep();
            }}
          >
            <fieldset>
              <legend ref={questionHeadingRef} tabIndex={-1}>
                <span className={styles.eyebrow}>{currentQuestion.eyebrow}</span>
                {currentQuestion.question}
              </legend>
              <p className={styles.context}>{currentQuestion.context}</p>

              <div className={styles.options}>
                {currentQuestion.options.map((option, index) => (
                  <label className={styles.option} key={option.value}>
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      value={option.value}
                      checked={selectedAnswer === option.value}
                      onChange={() => chooseAnswer(option.value)}
                    />
                    <span className={styles.optionNumber}>0{index + 1}</span>
                    <span className={styles.optionCopy}>
                      <strong>{option.label}</strong>
                      <small>{option.note}</small>
                    </span>
                    <span className={styles.optionCheck} aria-hidden="true" />
                  </label>
                ))}
              </div>
            </fieldset>

            <div className={styles.controls}>
              <button
                className={styles.backButton}
                type="button"
                onClick={previousStep}
                disabled={step === 0}
              >
                Back
              </button>
              <button
                className={styles.nextButton}
                type="submit"
                disabled={!selectedAnswer}
              >
                {step === questions.length - 1 ? "See my routine" : "Next question"}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </section>

        <p className={styles.quizDisclaimer}>
          Educational guidance only. This quiz does not diagnose a skin type or
          condition.
        </p>
      </div>
    </div>
  );
}

function RoutineList({ label, steps }: { label: string; steps: string[] }) {
  return (
    <article>
      <h3>{label}</h3>
      <ol>
        {steps.map((routineStep, index) => (
          <li key={routineStep}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{routineStep}</strong>
          </li>
        ))}
      </ol>
    </article>
  );
}

function getAnswerPattern(answers: AnswerMap) {
  let dryScore = 0;
  let oilScore = 0;

  if (answers.afterCleanse === "tight") dryScore += 2;
  if (answers.afterCleanse === "oily") oilScore += 2;
  if (answers.midday === "dry") dryScore += 2;
  if (answers.midday === "shiny") oilScore += 2;
  if (answers.midday === "varies") {
    dryScore += 1;
    oilScore += 1;
  }

  if (dryScore > oilScore) return "Dry-feeling answer";
  if (oilScore > dryScore) return "Oil-leaning answer";
  return "Balanced or mixed answer";
}

function getGuidanceNote(answers: AnswerMap) {
  if (answers.newProducts === "often") {
    return "Keep the first version especially short. Patch test and introduce one product at a time so each change is easier to understand.";
  }

  if (answers.pace === "minimal") {
    return "Treat the focused step as optional at first. Establish cleansing, comfortable moisture and daytime sun protection before adding more.";
  }

  if (answers.sunProtection !== "daily") {
    return "Make daytime sun protection the habit to establish first, using a broad-spectrum sunscreen that suits you and following its label.";
  }

  return "Keep the basics steady and introduce any focused step gradually. More steps are useful only when each one has a clear role.";
}
