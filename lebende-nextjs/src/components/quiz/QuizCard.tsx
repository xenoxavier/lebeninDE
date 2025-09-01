'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Question } from '@/types/quiz';

interface QuizCardProps {
  questions: Question[];
  title: string;
  subtitle?: string;
}

export function QuizCard({ questions, title, subtitle }: QuizCardProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const current = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || null);
      setShowResult(false);
    }
  };

  const correctAnswers = answers.filter((answer, index) => 
    answer === questions[index]?.correct
  ).length;

  const scorePercentage = Math.round((correctAnswers / questions.length) * 100);

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
            <Button onClick={() => {
              setCurrentQuestion(0);
              setSelectedAnswer(null);
              setAnswers([]);
              setShowResult(false);
              setQuizCompleted(false);
            }}>
              Try Again
            </Button>
            <Button variant="outline">
              Back to Dashboard
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
          <h3 className="text-lg font-semibold mb-4">
            {current?.question}
          </h3>
          <div className="space-y-3">
            {current?.options.map((option, index) => {
              let buttonClass = "w-full text-left p-4 border rounded-lg transition-colors ";
              
              if (!showResult) {
                buttonClass += selectedAnswer === index 
                  ? "border-primary bg-primary/10" 
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50";
              } else {
                if (index === current.correct) {
                  buttonClass += "border-green-500 bg-green-50 text-green-700";
                } else if (index === selectedAnswer && index !== current.correct) {
                  buttonClass += "border-red-500 bg-red-50 text-red-700";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                  className={buttonClass}
                >
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