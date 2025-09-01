'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QuizCard } from "@/components/quiz/QuizCard";
import { ArrowLeft } from "lucide-react";
import { sampleQuestions } from "@/lib/sampleQuestions";

export default function PracticeStartPage() {
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
        <QuizCard
          questions={sampleQuestions}
          title="General Practice Quiz"
          subtitle="Practice with official German citizenship test questions"
        />
      </main>
    </div>
  );
}