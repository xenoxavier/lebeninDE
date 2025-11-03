'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Question } from '@/types/quiz';

type CategoryKey = Question['category'];

export type QuizCompletionSummary = {
  totalQuestions: number;
  correctAnswers: number;
  startedAt: string;
  completedAt: string;
  durationMs: number;
  categoryPerformance: Partial<Record<CategoryKey, { correct: number; total: number }>>;
};

interface QuizCardProps {
  questions: Question[];
  title: string;
  subtitle?: string;
  initialQuestionIndex?: number;
  onRestart?: () => void;
  onComplete?: (summary: QuizCompletionSummary) => void;
}

export function QuizCard({
  questions,
  title,
  subtitle,
  initialQuestionIndex,
  onRestart,
  onComplete,
}: QuizCardProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | undefined)[]>(() =>
    Array(questions.length).fill(undefined),
  );
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const startedAtRef = useRef<string>(new Date().toISOString());
  const completionRaisedRef = useRef(false);
  const initialIndexRef = useRef(0);

  const current = questions[currentQuestion];
  const progress = questions.length
    ? ((currentQuestion + 1) / questions.length) * 100
    : 0;

  useEffect(() => {
    const boundedInitial = initialQuestionIndex !== undefined
      ? Math.min(Math.max(initialQuestionIndex, 0), Math.max(questions.length - 1, 0))
      : 0;

    setAnswers(Array(questions.length).fill(undefined));
    setCurrentQuestion(questions.length ? boundedInitial : 0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
    initialIndexRef.current = boundedInitial;
    startTimeRef.current = Date.now();
    startedAtRef.current = new Date().toISOString();
    completionRaisedRef.current = false;
  }, [questions, initialQuestionIndex]);

  useEffect(() => {
    const savedAnswer = answers[currentQuestion];

    if (savedAnswer !== undefined) {
      setSelectedAnswer(savedAnswer);
      setShowResult(true);
    } else {
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }, [answers, currentQuestion]);

  const handleAnswerSelect = (answerIndex: number) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestion] = answerIndex;
      return updated;
    });
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      if (!completionRaisedRef.current) {
        const finalAnswers = answers.map((value, index) =>
          index === currentQuestion ? selectedAnswer ?? value : value,
        );
        const totalCorrect = finalAnswers.reduce<number>((count, answerIndex, idx) => {
          if (answerIndex === undefined || !questions[idx]) {
            return count;
          }
          return answerIndex === questions[idx].correct ? count + 1 : count;
        }, 0);
        const categoryPerformance = questions.reduce<
          Partial<Record<CategoryKey, { correct: number; total: number }>>
        >((acc, question, idx) => {
          const answerIndex = finalAnswers[idx];
          const existing = acc[question.category] ?? { correct: 0, total: 0 };
          existing.total += 1;
          if (answerIndex === question.correct) {
            existing.correct += 1;
          }
          acc[question.category] = existing;
          return acc;
        }, {});

        const completedAt = new Date();
        setAnswers(finalAnswers);
        onComplete?.({
          totalQuestions: questions.length,
          correctAnswers: totalCorrect,
          startedAt: startedAtRef.current,
          completedAt: completedAt.toISOString(),
          durationMs: Math.max(0, completedAt.getTime() - startTimeRef.current),
          categoryPerformance,
        });
        completionRaisedRef.current = true;
      }
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const correctAnswers = answers.reduce<number>((count, answer, index) => {
    if (answer === undefined || !questions[index]) {
      return count;
    }

    return answer === questions[index].correct ? count + 1 : count;
  }, 0);

  const scorePercentage = questions.length
    ? Math.round((correctAnswers / questions.length) * 100)
    : 0;

  if (!questions.length) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">No questions available</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-gray-600">
          Add questions to start a practice session.
        </CardContent>
      </Card>
    );
  }

  if (quizCompleted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Quiz Completed! 🎉</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl">
            {scorePercentage >= 80 ? '🎯' : scorePercentage >= 60 ? '👍' : '📚'}
          </div>
          <div>
            <div className="text-4xl font-bold text-primary">
              {scorePercentage}%
            </div>
            <div className="text-gray-600">
              {correctAnswers} of {questions.length} correct
            </div>
          </div>
          <Progress value={scorePercentage} className="h-3" />
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => {
                const restartIndex = initialIndexRef.current;
                setCurrentQuestion(questions.length ? restartIndex : 0);
                setSelectedAnswer(null);
                setAnswers(Array(questions.length).fill(undefined));
                setShowResult(false);
                setQuizCompleted(false);
                startTimeRef.current = Date.now();
                startedAtRef.current = new Date().toISOString();
                completionRaisedRef.current = false;
                onRestart?.();
              }}
            >
              Try Again
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
          <div className="text-sm text-gray-500">
            {currentQuestion + 1} / {questions.length}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          {typeof current?.id !== "undefined" && (
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
              Official Question #{current.id}
            </div>
          )}
          <h3 className="text-lg font-semibold mb-4">
            {current?.question}
          </h3>
          <div
            className={
              current?.imageType === "options"
                ? "grid grid-cols-2 gap-3 sm:grid-cols-4"
                : "space-y-3"
            }
          >
            {current?.options.map((option, index) => {
              const hasOptionImage =
                current?.imageType === "options" && current?.images?.[index];

              let buttonClass = hasOptionImage
                ? "relative flex flex-col items-center gap-3 rounded-lg border p-4 text-center transition-colors"
                : "w-full text-left p-4 border rounded-lg transition-colors";

              if (!showResult) {
                buttonClass +=
                  selectedAnswer === index
                    ? " border-primary bg-primary/10"
                    : " border-gray-200 hover:border-gray-300 hover:bg-gray-50";
              } else if (index === current.correct) {
                buttonClass += " border-green-500 bg-green-50 text-green-700";
              } else if (index === selectedAnswer && index !== current.correct) {
                buttonClass += " border-red-500 bg-red-50 text-red-700";
              } else {
                buttonClass += " border-gray-200 bg-gray-50";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                >
                  {hasOptionImage ? (
                    <>
                      <div className="relative h-24 w-full overflow-hidden rounded-md border border-gray-200 bg-white">
                        <Image
                          src={current!.images![index]}
                          alt={option}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-contain"
                          priority={currentQuestion === initialIndexRef.current}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {option}
                      </span>
                      {showResult && (
                        <span className="absolute right-3 top-3">
                          {index === current.correct ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : index === selectedAnswer ? (
                            <XCircle className="w-5 h-5 text-red-600" />
                          ) : null}
                        </span>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && (
                        <span>
                          {index === current.correct ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : index === selectedAnswer ? (
                            <XCircle className="w-5 h-5 text-red-600" />
                          ) : null}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {showResult && current?.explanation && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
            <p className="text-blue-800">{current.explanation}</p>
          </div>
        )}

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button 
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="flex items-center gap-2"
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
