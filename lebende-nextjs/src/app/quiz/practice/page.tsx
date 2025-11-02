'use client';

import { useCallback, useMemo, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ArrowLeft, BookOpen, Brain, Sparkles } from "lucide-react";
import { BUNDESLAENDER } from "@/data/bundeslaender";
import { CATEGORY_CONFIG, CATEGORY_BY_KEY, type CategoryKey } from "@/data/categories";
import { useDashboardStore } from "@/lib/stores/dashboardStore";

type CategoryInsight = {
  key: CategoryKey;
  total: number;
  correct: number;
  focusedSessions: number;
  lastStudied: string | null;
  accuracy: number | null;
};

const formatRelativeTime = (timestamp: string | null): string => {
  if (!timestamp) {
    return "Not studied yet";
  }

  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return "Not studied yet";
  }

  const diffMs = Date.now() - date.getTime();
  if (diffMs < 0) {
    return "Just now";
  }
  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 1) {
    return "Just now";
  }
  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  }
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  }
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  }
  return date.toLocaleDateString();
};

export default function PracticePage() {
  const sessions = useDashboardStore((state) => state.sessions);
  const router = useRouter();
  const [jumpValue, setJumpValue] = useState("");
  const [jumpError, setJumpError] = useState<string | null>(null);

  const categoryInsights = useMemo<CategoryInsight[]>(() => {
    const base = new Map<CategoryInsight["key"], CategoryInsight>();
    CATEGORY_CONFIG.forEach((config) => {
      base.set(config.key, {
        key: config.key,
        total: 0,
        correct: 0,
        focusedSessions: 0,
        lastStudied: null,
        accuracy: null,
      });
    });

    sessions.forEach((session) => {
      Object.entries(session.categoryPerformance).forEach(([key, value]) => {
        if (!value) {
          return;
        }
        const categoryKey = key as CategoryInsight["key"];
        const insight = base.get(categoryKey);
        if (!insight) {
          return;
        }

        insight.total += value.total;
        insight.correct += value.correct;
        if (value.total > 0) {
          if (
            !insight.lastStudied ||
            new Date(session.completedAt).getTime() >
              new Date(insight.lastStudied).getTime()
          ) {
            insight.lastStudied = session.completedAt;
          }
        }
      });

      if (session.categoryFocus) {
        const focusInsight = base.get(session.categoryFocus as CategoryInsight["key"]);
        if (focusInsight) {
          focusInsight.focusedSessions += 1;
          if (
            !focusInsight.lastStudied ||
            new Date(session.completedAt).getTime() >
              new Date(focusInsight.lastStudied).getTime()
          ) {
            focusInsight.lastStudied = session.completedAt;
          }
        }
      }
    });

    CATEGORY_CONFIG.forEach((config) => {
      const insight = base.get(config.key);
      if (!insight) {
        return;
      }
      insight.accuracy =
        insight.total > 0 ? Math.round((insight.correct / insight.total) * 100) : null;
    });

    return CATEGORY_CONFIG.map((config) => base.get(config.key)!);
  }, [sessions]);

  const recommendedInsight = useMemo(() => {
    return categoryInsights.reduce((best, current) => {
      if (!best) {
        return current;
      }

      const bestScore = best.accuracy ?? -1;
      const currentScore = current.accuracy ?? -1;

      if (currentScore < bestScore) {
        return current;
      }

      if (currentScore === bestScore && current.total > best.total) {
        return current;
      }

      return best;
    }, categoryInsights[0]);
  }, [categoryInsights]);

  const recommendedConfig = recommendedInsight
    ? CATEGORY_BY_KEY[recommendedInsight.key]
    : CATEGORY_CONFIG[0];

  const recommendationMessage = useMemo(() => {
    if (!recommendedInsight) {
      return "Start anywhere to unlock personalised guidance.";
    }

    if (recommendedInsight.accuracy === null) {
      return "You haven't explored this category yet. Begin here to build a solid foundation.";
    }

    if (recommendedInsight.accuracy < 70) {
      return `You're at ${recommendedInsight.accuracy}% accuracy. A focused session can boost your confidence quickly.`;
    }

    return `Great work! Keep refining ${recommendedConfig.title} to push beyond ${recommendedInsight.accuracy}% accuracy.`;
  }, [recommendedConfig.title, recommendedInsight]);

  const handleJumpSubmit = useCallback(() => {
    const trimmed = jumpValue.trim();
    const numeric = Number(trimmed);

    if (!trimmed || !Number.isInteger(numeric)) {
      setJumpError("Enter a valid question number between 1 and 300.");
      return;
    }

    if (numeric < 1 || numeric > 300) {
      setJumpError("Official question numbers range from 1 to 300.");
      return;
    }

    setJumpError(null);
    router.push(`/quiz/practice/start?question=${numeric}`);
  }, [jumpValue, router]);

  const handleJumpKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleJumpSubmit();
      }
    },
    [handleJumpSubmit],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="text-2xl">🇩🇪</div>
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

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Practice Mode
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Practice with official German citizenship test questions at your own pace. 
              No time limit - focus on learning and understanding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  General Practice
                </CardTitle>
                <CardDescription>
                  Practice with questions from all categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total Questions:</span>
                    <span className="font-semibold">300+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Time Limit:</span>
                    <span className="font-semibold">None</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Review Answers:</span>
                    <span className="font-semibold text-green-600">Yes</span>
                  </div>
                </div>
                <Button className="w-full mt-4" asChild>
                  <Link href="/quiz/practice/start">
                    Start General Practice
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Smart Focus
                </CardTitle>
                <CardDescription>
                  Personalised suggestions based on your recent quiz history
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div
                  className={`rounded-lg border border-primary/20 bg-gradient-to-r ${recommendedConfig.accent} p-4 shadow-sm`}
                >
                  <div className="flex items-start gap-3">
                    <Brain className="h-7 w-7 text-primary" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500">
                        Recommended Next Step
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {recommendedConfig.title}
                      </h3>
                      <p className="text-sm text-gray-700">{recommendedConfig.description}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">{recommendationMessage}</p>
                  <Button className="mt-4 w-full" asChild>
                    <Link href={`/quiz/practice/start?category=${recommendedConfig.slug}`}>
                      Start Focused Practice
                    </Link>
                  </Button>
                </div>

                <div className="space-y-3">
                  {categoryInsights.map((insight) => {
                    const config = CATEGORY_BY_KEY[insight.key];
                    const isRecommended = insight.key === recommendedConfig.key;
                    return (
                      <div
                        key={insight.key}
                        className={`rounded-lg border p-3 transition-shadow ${
                          isRecommended
                            ? "border-primary/40 shadow-sm shadow-primary/10"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                          <span>{config.title}</span>
                          <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                            {insight.accuracy !== null ? `${insight.accuracy}%` : "New"}
                          </span>
                        </div>
                        <Progress value={insight.accuracy ?? 0} className="mt-2 h-2" />
                        <div className="mt-2 flex flex-wrap items-center justify-between text-xs text-gray-500">
                          <span>
                            {insight.total > 0
                              ? `${insight.correct}/${insight.total} correct`
                              : "No attempts yet"}
                          </span>
                          <span>{formatRelativeTime(insight.lastStudied)}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <Button
                            size="sm"
                            variant={isRecommended ? "default" : "outline"}
                            className="text-xs"
                            asChild
                          >
                            <Link href={`/quiz/practice/start?category=${config.slug}`}>
                              Practice {config.title.split(" ")[0]}
                            </Link>
                          </Button>
                          <span className="text-xs text-gray-500">
                            {insight.focusedSessions} focus session
                            {insight.focusedSessions === 1 ? "" : "s"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Jump to Official Question
              </CardTitle>
              <CardDescription>
                Enter a question number (1-300) to open that item immediately.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div className="flex-1">
                  <Input
                    type="number"
                    min={1}
                    max={300}
                    value={jumpValue}
                    onChange={(event) => {
                      setJumpValue(event.target.value);
                      if (jumpError) {
                        setJumpError(null);
                      }
                    }}
                    onKeyDown={handleJumpKeyDown}
                    placeholder="e.g. 125"
                    aria-label="Official question number"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Matches the numbering used in the official 300-question catalogue.
                  </p>
                  {jumpError && (
                    <p className="mt-2 text-xs font-medium text-red-600">{jumpError}</p>
                  )}
                </div>
                <Button
                  className="sm:w-auto"
                  onClick={handleJumpSubmit}
                  disabled={jumpValue.trim().length === 0}
                >
                  Jump to Question
                </Button>
              </div>

            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Bundesland-Specific Questions</CardTitle>
              <CardDescription>
                Practice questions specific to your German state
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {BUNDESLAENDER.map((state) => (
                  <Button
                    key={state.slug}
                    variant="outline"
                    size="sm"
                    className="text-xs p-2 h-auto"
                    asChild
                  >
                    <Link href={"/quiz/practice/start?state=" + state.slug}>
                      {state.name}
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              🔒 All your progress is saved locally and never shared
            </p>
            <Button variant="ghost" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
