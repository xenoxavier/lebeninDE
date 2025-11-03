'use client';

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { QuizCard, type QuizCompletionSummary } from "@/components/quiz/QuizCard";
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import questionsData from "@/data/questions.json";
import type { Question } from "@/types/quiz";
import {
  BUNDESLAENDER,
  BUNDESLAND_QUESTION_LOADERS,
  type BundeslandKey,
  type BundeslandRawQuestion,
} from "@/data/bundeslaender";
import { CATEGORY_BY_SLUG } from "@/data/categories";
import { useDashboardStore } from "@/lib/stores/dashboardStore";

type GeneralRawQuestion = {
  number: number;
  question: string;
  options: string[];
  answer: string;
};

type JumpFeedback = {
  initialIndex?: number;
  message?: string;
  variant?: "success" | "warning" | "error";
  pending?: boolean;
};

const FEEDBACK_STYLES: Record<
  Exclude<JumpFeedback["variant"], undefined>,
  { container: string; icon: string }
> = {
  success: {
    container: "border-green-200 bg-green-50 text-green-800",
    icon: "text-green-500",
  },
  warning: {
    container: "border-amber-200 bg-amber-50 text-amber-800",
    icon: "text-amber-500",
  },
  error: {
    container: "border-red-200 bg-red-50 text-red-800",
    icon: "text-red-500",
  },
};

const POLITICS_KEYWORDS = [
  "wahl",
  "partei",
  "demokr",
  "regierung",
  "parlament",
  "bundestag",
  "bundesrat",
  "politik",
  "verfassung",
  "grundgesetz",
  "meinungsfreiheit",
  "rechtsstaat",
  "gewaltenteilung",
  "bundeskanzler",
  "minister",
  "bundespr",
  "gesetz",
  "wahlrecht",
];

const HISTORY_KEYWORDS = [
  "geschichte",
  "nazi",
  "hitler",
  "holocaust",
  "ddr",
  "brd",
  "wiedervereinigung",
  "mauer",
  "krieg",
  "1933",
  "1945",
  "1949",
  "1990",
  "verantwortung",
  "vergangenheit",
  "nationalsozialismus",
  "weimar",
];

function determineCategory(question: string): Question["category"] {
  const normalized = question.toLowerCase();

  if (POLITICS_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return "Politik in der Demokratie";
  }

  if (HISTORY_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return "Geschichte und Verantwortung";
  }

  return "Mensch und Gesellschaft";
}

function normalizeGeneralQuestions(): Question[] {
  const rawQuestions = (questionsData as { questions?: GeneralRawQuestion[] }).questions ?? [];

  return rawQuestions.map((entry, index) => {
    const normalizedOptions = entry.options.map((option) => option.trim());
    const normalizedAnswer = entry.answer.trim().toLowerCase();
    let correctIndex = normalizedOptions.findIndex(
      (option) => option.toLowerCase() === normalizedAnswer
    );

    if (correctIndex === -1) {
      normalizedOptions.push(entry.answer.trim());
      correctIndex = normalizedOptions.length - 1;
    }

    return {
      id: entry.number ?? index + 1,
      question: entry.question,
      options: normalizedOptions,
      correct: correctIndex >= 0 ? correctIndex : 0,
      category: determineCategory(entry.question),
    };
  });
}

function normalizeBundeslandQuestions(rawQuestions: BundeslandRawQuestion[]): Question[] {
  return rawQuestions.map((entry, index) => {
    const normalizedOptions = entry.options.map((option) => option.trim());
    const validCorrect =
      typeof entry.correct === "number" && entry.correct >= 0 && entry.correct < normalizedOptions.length
        ? entry.correct
        : 0;

    return {
      id: index + 1,
      question: entry.question,
      options: normalizedOptions,
      correct: validCorrect,
      category: determineCategory(entry.question),
      explanation: entry.explanation,
      hasImage: Array.isArray(entry.images) && entry.images.length > 0,
      imageType:
        entry.images && entry.images.length > 0
          ? entry.isImageQuestion
            ? "options"
            : "question"
          : undefined,
      images: entry.images,
    };
  });
}

const generalPracticeQuestions = normalizeGeneralQuestions();

export default function PracticeStartPage() {
  return (
    <Suspense fallback={<PracticeStartPageSkeleton />}>
      <PracticeStartPageContent />
    </Suspense>
  );
}

function PracticeStartPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <Loader2 className="h-5 w-5 animate-spin text-primary" aria-hidden="true" />
          <p className="text-sm text-gray-200">Loading practice session...</p>
        </div>
      </main>
    </div>
  );
}

function PracticeStartPageContent() {
  const searchParams = useSearchParams();
  const stateParam = searchParams.get("state");
  const questionParam = searchParams.get("question");
  const categoryParam = searchParams.get("category");

  const selectedState = useMemo(() => {
    if (!stateParam) {
      return null;
    }

    const slug = stateParam.toLowerCase();
    return BUNDESLAENDER.find((state) => state.slug === slug) ?? null;
  }, [stateParam]);

  const selectedCategory = useMemo(() => {
    if (!categoryParam) {
      return null;
    }

    const slug = categoryParam.toLowerCase();
    return CATEGORY_BY_SLUG[slug] ?? null;
  }, [categoryParam]);

  const questionNumber = useMemo(() => {
    if (!questionParam) {
      return null;
    }

    const parsed = Number.parseInt(questionParam, 10);
    if (!Number.isFinite(parsed)) {
      return null;
    }

    return parsed;
  }, [questionParam]);


  const [bundeslandQuestions, setBundeslandQuestions] = useState<Question[] | null>(null);
  const [isBundeslandLoading, setBundeslandLoading] = useState(false);
  const [bundeslandError, setBundeslandError] = useState<string | null>(null);
  const [restartToken, setRestartToken] = useState(0);

  const addSession = useDashboardStore((state) => state.addSession);

  const categoryQuestions = useMemo(() => {
    if (!selectedCategory) {
      return generalPracticeQuestions;
    }

    return generalPracticeQuestions.filter(
      (question) => question.category === selectedCategory.key,
    );
  }, [selectedCategory]);

  const singleQuestionFeedback = useMemo<JumpFeedback>(() => {
    if (!questionParam) {
      return {};
    }

    if (selectedState) {
      // State quizzes are short; ignore jump parameters entirely.
      return {};
    }

    if (questionNumber === null || Number.isNaN(questionNumber)) {
      return {
        variant: "error",
        message: "Enter a valid question number using digits only.",
      };
    }

    const pool = selectedCategory ? categoryQuestions : generalPracticeQuestions;
    const index = pool.findIndex((question) => Number(question.id) === questionNumber);

    if (index === -1) {
      if (questionNumber < 1 || questionNumber > 300) {
        return {
          variant: "error",
          message: "Official question numbers range from 1 to 300.",
        };
      }
      return {
        variant: "warning",
        message: selectedCategory
          ? `Question #${questionNumber} is not part of ${selectedCategory.title}. Showing the first question in this category instead.`
          : `Question #${questionNumber} could not be found. Showing the first question instead.`,
      };
    }

    return {
      initialIndex: index,
      variant: "success",
      message: `Jumped to official question #${questionNumber}.`,
    };
  }, [questionParam, questionNumber, selectedState, selectedCategory, categoryQuestions]);

  useEffect(() => {
    if (!selectedState) {
      setBundeslandQuestions(null);
      setBundeslandError(null);
      setBundeslandLoading(false);
      return;
    }

    const slug = selectedState.slug as BundeslandKey;
    const loader = BUNDESLAND_QUESTION_LOADERS[slug];
    let canceled = false;

    setBundeslandQuestions(null);
    setBundeslandError(null);
    setBundeslandLoading(true);

    loader()
      .then((data) => {
        if (canceled) {
          return;
        }

        setBundeslandQuestions(normalizeBundeslandQuestions(data));
      })
      .catch((error) => {
        console.error(`Failed to load questions for ${slug}`, error);
        if (canceled) {
          return;
        }

        setBundeslandError(`Unable to load questions for ${selectedState.name}. Please try again.`);
      })
      .finally(() => {
        if (!canceled) {
          setBundeslandLoading(false);
        }
      });

    return () => {
      canceled = true;
    };
  }, [selectedState, restartToken]);

  const questionFeedback = singleQuestionFeedback;

  const feedbackStyle = questionFeedback.variant
    ? FEEDBACK_STYLES[questionFeedback.variant]
    : null;

  const quizTitle = selectedState
    ? `${selectedState.name} Practice Quiz`
    : selectedCategory
      ? `${selectedCategory.title} Practice`
      : "General Practice Quiz";

  const quizSubtitle = selectedState
    ? `Practice the state-specific questions for ${selectedState.name}.`
    : selectedCategory
      ? `Focus on the "${selectedCategory.title}" knowledge area.`
      : "Practice with official German citizenship test questions";

  const quizQuestions = selectedState
    ? bundeslandQuestions ?? []
    : selectedCategory
      ? categoryQuestions
      : generalPracticeQuestions;

  const initialQuestionIndex = questionFeedback.initialIndex ?? 0;

  const quizSessionKey = selectedState
    ? `state-${selectedState.slug}`
    : selectedCategory
      ? `category-${selectedCategory.slug}`
      : "general";

  const canRenderQuizCard = selectedState
    ? !isBundeslandLoading && !bundeslandError && bundeslandQuestions !== null
    : selectedCategory
      ? categoryQuestions.length > 0
      : true;

  const handleQuizComplete = useCallback(
    (summary: QuizCompletionSummary) => {
      const mode = selectedState ? "bundesland" : selectedCategory ? "category" : "practice";
      const durationSeconds = Math.max(1, Math.round(summary.durationMs / 1000));

      addSession({
        mode,
        bundesland: selectedState?.slug,
        categoryFocus: selectedCategory?.key,
        startedAt: summary.startedAt,
        completedAt: summary.completedAt,
        durationSeconds,
        totalQuestions: summary.totalQuestions,
        correctAnswers: summary.correctAnswers,
        categoryPerformance: summary.categoryPerformance,
      });
    },
    [addSession, selectedCategory, selectedState],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/quiz/practice">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 text-sm font-semibold text-slate-900 shadow-sm">
                  DE
                </span>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Practice Quiz</h1>
                  <p className="text-sm text-gray-600">Leben in Deutschland</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6">
        {questionFeedback.message && !questionFeedback.pending && (
          <div
            className={`max-w-2xl mx-auto flex items-start gap-3 rounded-lg border p-4 transition-colors ${
              feedbackStyle?.container ?? "border-gray-200 bg-white text-gray-700"
            }`}
          >
            {questionFeedback.variant === "success" ? (
              <CheckCircle2
                className={`h-5 w-5 ${feedbackStyle?.icon ?? "text-green-500"}`}
                aria-hidden="true"
              />
            ) : (
              <AlertCircle
                className={`h-5 w-5 ${feedbackStyle?.icon ?? "text-gray-500"}`}
                aria-hidden="true"
              />
            )}
            <div>
              <p className="font-medium">
                {questionFeedback.variant === "success"
                  ? "Jump successful"
                  : questionFeedback.variant === "warning"
                    ? "Question unavailable in this mode"
                    : "Invalid question number"}
              </p>
              <p className="text-sm">{questionFeedback.message}</p>
            </div>
          </div>
        )}

        {selectedState && isBundeslandLoading && (
          <div className="max-w-2xl mx-auto flex items-center gap-3 rounded-lg border border-gray-200 bg-white/80 p-4">
            <Loader2 className="h-5 w-5 animate-spin text-primary" aria-hidden="true" />
            <div>
              <p className="font-medium text-gray-900">
                Loading questions for {selectedState.name}...
              </p>
              <p className="text-sm text-gray-600">Please wait a moment.</p>
            </div>
          </div>
        )}

        {selectedState && bundeslandError && (
          <div className="max-w-2xl mx-auto flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
            <div>
              <p className="font-medium">Unable to load questions</p>
              <p className="text-sm">{bundeslandError}</p>
            </div>
          </div>
        )}

        {!selectedState && selectedCategory && categoryQuestions.length === 0 && (
          <div className="max-w-2xl mx-auto flex items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
            <AlertCircle className="h-5 w-5 text-yellow-500" aria-hidden="true" />
            <div>
              <p className="font-medium">No questions available</p>
              <p className="text-sm">
                We couldn&apos;t find any questions for {selectedCategory.title}. Try another
                category or start a general practice session.
              </p>
            </div>
          </div>
        )}

        {canRenderQuizCard && (
          <QuizCard
            key={`${quizSessionKey}-${restartToken}`}
            questions={quizQuestions}
            title={quizTitle}
            subtitle={quizSubtitle}
            initialQuestionIndex={initialQuestionIndex}
            onRestart={() => setRestartToken((prev) => prev + 1)}
            onComplete={handleQuizComplete}
          />
        )}

        {!selectedState && (
          <div className="max-w-2xl mx-auto rounded-lg border border-gray-200 bg-white/90 p-4 shadow-sm">
            <div className="mb-3">
              <p className="text-sm font-semibold text-gray-800">
                Jump to another official question
              </p>
              <p className="text-xs text-gray-500">
                Enter a number between 1 and 300. This works at any time.
              </p>
            </div>
            <form
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
              onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const value = (formData.get("jump") as string | null)?.trim() ?? "";
                if (!value) {
                  return;
                }

                const parsed = Number.parseInt(value, 10);
                if (!Number.isInteger(parsed) || parsed < 1 || parsed > 300) {
                  alert("Please enter a valid question number between 1 and 300.");
                  return;
                }

                window.location.href = `?question=${parsed}`;
                (event.currentTarget as HTMLFormElement).reset();
              }}
            >
              <Input
                name="jump"
                type="number"
                min={1}
                max={300}
                placeholder="e.g. 125"
                className="flex-1"
              />
              <Button type="submit">Jump Now</Button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
