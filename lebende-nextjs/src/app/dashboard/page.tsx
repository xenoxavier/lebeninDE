'use client';

import Link from "next/link";
import { useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Trophy, Target, Clock, TrendingUp, Calendar, Award } from "lucide-react";
import { BUNDESLAENDER } from "@/data/bundeslaender";
import { CATEGORY_BY_KEY, CATEGORY_KEYS, type CategoryKey } from "@/data/categories";
import { useDashboardStore, type QuizSessionRecord } from "@/lib/stores/dashboardStore";

const dayKey = (input: string | Date): string => {
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return date.toISOString().slice(0, 10);
};

const calculateStudyStreak = (sessions: QuizSessionRecord[]): number => {
  if (!sessions.length) {
    return 0;
  }

  const activityDays = new Set(
    sessions
      .map((session) => dayKey(session.completedAt))
      .filter((key) => key.length > 0),
  );

  if (!activityDays.size) {
    return 0;
  }

  const today = new Date();
  const cursor = new Date(today);

  if (!activityDays.has(dayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!activityDays.has(dayKey(cursor))) {
      return 0;
    }
  }

  let streak = 0;
  while (activityDays.has(dayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};

const aggregateCategoryPerformance = (
  sessions: QuizSessionRecord[],
): Record<CategoryKey, { correct: number; total: number }> => {
  const totals: Record<CategoryKey, { correct: number; total: number }> = {
    "Politik in der Demokratie": { correct: 0, total: 0 },
    "Geschichte und Verantwortung": { correct: 0, total: 0 },
    "Mensch und Gesellschaft": { correct: 0, total: 0 },
  };

  sessions.forEach((session) => {
    Object.entries(session.categoryPerformance).forEach(([key, value]) => {
      if (!value) {
        return;
      }

      const category = key as CategoryKey;
      totals[category].correct += value.correct;
      totals[category].total += value.total;
    });
  });

  return totals;
};

const getBundeslandName = (slug?: string | null): string | null => {
  if (!slug) {
    return null;
  }

  const match = BUNDESLAENDER.find((state) => state.slug === slug);
  return match?.name ?? slug.replace(/-/g, " ");
};

const describeSession = (session: QuizSessionRecord): string => {
  if (session.mode === "bundesland" && session.bundesland) {
    const name = getBundeslandName(session.bundesland);
    return name ? `${name} Quiz` : "Bundesland Quiz";
  }

  if (session.mode === "exam") {
    return "Exam Simulation";
  }

  if (session.categoryFocus) {
    const category = CATEGORY_BY_KEY[session.categoryFocus] ?? {
      title: session.categoryFocus,
    };
    return `${category.title} Practice`;
  }

  return "Practice Session";
};

const formatRelativeTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return "Unknown time";
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

const formatDuration = (seconds: number): string => {
  if (seconds <= 0) {
    return "0m";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const parts: string[] = [];

  if (hours > 0) {
    parts.push(`${hours}h`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }
  if (!parts.length) {
    parts.push(`${Math.max(1, Math.round(seconds % 60))}s`);
  }

  return parts.join(" ");
};

const streakMessage = (streak: number): string => {
  if (streak === 0) {
    return "Start a study session today!";
  }
  if (streak === 1) {
    return "Great start! Come back tomorrow.";
  }
  if (streak < 7) {
    return `${streak} days strong—keep the momentum!`;
  }
  if (streak < 30) {
    return `Amazing ${streak}-day streak!`;
  }
  return `Incredible ${streak}-day streak!`;
};

const scoreColor = (percentage: number): string => {
  if (percentage >= 80) {
    return "text-green-600";
  }
  if (percentage >= 60) {
    return "text-yellow-600";
  }
  return "text-red-600";
};

export default function DashboardPage() {
  const sessions = useDashboardStore((state) => state.sessions);
  const clearSessions = useDashboardStore((state) => state.clearSessions);

  const stats = useMemo(() => {
    const totalSessions = sessions.length;
    let totalQuestions = 0;
    let totalCorrect = 0;
    let durationSeconds = 0;
    const bundeslandVisited = new Set<string>();

    sessions.forEach((session) => {
      totalQuestions += session.totalQuestions;
      totalCorrect += session.correctAnswers;
      durationSeconds += session.durationSeconds;

      if (session.mode === "bundesland" && session.bundesland) {
        bundeslandVisited.add(session.bundesland);
      }
    });

    const successRate =
      totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const streak = calculateStudyStreak(sessions);
    const categoryTotals = aggregateCategoryPerformance(sessions);
    const recentSessions = [...sessions]
      .sort(
        (a, b) =>
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime(),
      )
      .slice(0, 3);

    return {
      totalSessions,
      totalQuestions,
      totalCorrect,
      durationSeconds,
      successRate,
      streak,
      categoryTotals,
      recentSessions,
      visitedBundeslaender: bundeslandVisited.size,
    };
  }, [sessions]);

  const streakLabel = stats.streak === 1 ? "day" : "days";
  const studyTimeLabel = formatDuration(stats.durationSeconds);
  const successCaption =
    stats.totalQuestions > 0
      ? `${stats.totalCorrect}/${stats.totalQuestions} correct overall`
      : "No answers recorded yet";
  const studyTimeCaption =
    stats.durationSeconds > 0 ? "Across all sessions" : "No study time yet";
  const categoryEntries = CATEGORY_KEYS.map((category) => {
    const totals = stats.categoryTotals[category];
    const percentage =
      totals.total > 0 ? Math.round((totals.correct / totals.total) * 100) : 0;

    return {
      category,
      percentage,
      totals,
    };
  });

  const handleResetProgress = useCallback(() => {
    if (!sessions.length) {
      return;
    }

    if (typeof window !== "undefined") {
      const confirmed = window.confirm(
        "This will clear your saved quiz history on this device. Do you want to continue?",
      );
      if (!confirmed) {
        return;
      }
    }

    clearSessions();
  }, [clearSessions, sessions.length]);

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
                  <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-sm text-gray-600">Your Learning Progress</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleResetProgress}
                disabled={sessions.length === 0}
              >
                Reset Progress
              </Button>
              <Button asChild>
                <Link href="/quiz/practice">Take Quiz</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Willkommen zurück! 🎯
            </h2>
            <p className="text-gray-600">
              {stats.totalSessions > 0
                ? `You have completed ${stats.totalSessions} quiz${
                    stats.totalSessions === 1 ? "" : "zes"
                  } so far. Keep building your momentum!`
                : "Start your first quiz to begin tracking your progress."}
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Study Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="text-2xl font-bold">{stats.streak}</span>
                  <span className="text-sm text-gray-500">{streakLabel}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{streakMessage(stats.streak)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Success Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-500" />
                  <span className="text-2xl font-bold">{stats.successRate}%</span>
                </div>
                <Progress value={stats.successRate} className="mt-2" />
                <p className="text-xs text-gray-500 mt-1">{successCaption}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Study Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="text-2xl font-bold">{studyTimeLabel}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{studyTimeCaption}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Quizzes Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  <span className="text-2xl font-bold">{stats.totalSessions}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{stats.totalSessions > 0 ? "Completed quizzes" : "No quizzes completed yet"}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Progress by Category */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Progress by Category
                </CardTitle>
                <CardDescription>
                  Your performance across different knowledge areas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {categoryEntries.map(({ category, percentage, totals }) => (
                  <div key={category}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{category}</span>
                      <span className="text-sm text-gray-500">
                        {percentage}% ({totals.correct}/{totals.total})
                      </span>
                    </div>
                    <Progress value={percentage} />
                  </div>
                ))}
                {stats.totalQuestions === 0 && (
                  <p className="text-sm text-gray-500">
                    Complete a quiz to see category insights.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {stats.recentSessions.length === 0 ? (
                  <p className="text-sm text-gray-500">No activity yet. Complete a quiz to see it here.</p>
                ) : (
                  stats.recentSessions.map((session) => {
                    const percentage = session.totalQuestions > 0
                      ? Math.round((session.correctAnswers / session.totalQuestions) * 100)
                      : 0;

                    return (
                      <div key={session.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{describeSession(session)}</p>
                          <p className="text-xs text-gray-500">{formatRelativeTime(session.completedAt)}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-medium ${scoreColor(percentage)}`}>{percentage}%</p>
                          <p className="text-xs text-gray-500">
                            {session.correctAnswers}/{session.totalQuestions}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Achievements
              </CardTitle>
              <CardDescription>
                Your learning milestones and accomplishments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <Trophy className="w-8 h-8 text-yellow-600" />
                  <div>
                    <p className="font-medium text-sm">Week Warrior</p>
                    <p className="text-xs text-gray-600">{stats.streak >= 7 ? `${stats.streak}-day streak` : `Current streak: ${stats.streak} ${streakLabel}`}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                  <Target className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Sharp Shooter</p>
                    <p className="text-xs text-gray-600">Overall success rate: {stats.successRate}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <Clock className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">Study Master</p>
                    <p className="text-xs text-gray-600">Study time logged: {studyTimeLabel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <Award className="w-8 h-8 text-gray-400" />
                  <div>
                    <p className="font-medium text-sm">Explorer</p>
                    <p className="text-xs text-gray-600">States practiced: {stats.visitedBundeslaender}/16</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
              <CardDescription>
                Jump back into your preparation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button className="h-auto p-4" asChild>
                  <Link href="/quiz/practice" className="flex flex-col items-center gap-2">
                    <TrendingUp className="w-6 h-6" />
                    <div className="text-center">
                      <div className="font-semibold">Continue Practice</div>
                      <div className="text-xs opacity-75">Pick up where you left off</div>
                    </div>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto p-4" asChild>
                  <Link href="/quiz/exam" className="flex flex-col items-center gap-2">
                    <Clock className="w-6 h-6" />
                    <div className="text-center">
                      <div className="font-semibold">Take Exam</div>
                      <div className="text-xs opacity-75">Full simulation test</div>
                    </div>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto p-4">
                  <div className="flex flex-col items-center gap-2">
                    <Target className="w-6 h-6" />
                    <div className="text-center">
                      <div className="font-semibold">Weak Areas</div>
                      <div className="text-xs opacity-75">Focus on Geschichte</div>
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
