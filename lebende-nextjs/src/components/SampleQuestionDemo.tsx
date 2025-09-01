'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';

const sampleQuestion = {
  question: "Wie viele Bundesländer hat die Bundesrepublik Deutschland?",
  options: ["14", "15", "16", "17"],
  correct: 2,
  explanation: "Deutschland besteht aus 16 Bundesländern: Baden-Württemberg, Bayern, Berlin, Brandenburg, Bremen, Hamburg, Hessen, Mecklenburg-Vorpommern, Niedersachsen, Nordrhein-Westfalen, Rheinland-Pfalz, Saarland, Sachsen, Sachsen-Anhalt, Schleswig-Holstein und Thüringen."
};

export function SampleQuestionDemo() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    setIsAnimating(true);
    
    setTimeout(() => {
      setShowResult(true);
      setIsAnimating(false);
    }, 500);
  };

  const resetQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsAnimating(false);
  };

  const isCorrect = selectedAnswer === sampleQuestion.correct;

  return (
    <Card className="w-full max-w-lg bg-white/95 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-3xl overflow-hidden">
      <CardHeader className="pb-6 px-8 pt-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse shadow-lg"></div>
            <CardTitle className="text-xl font-bold text-gray-900">Sample Question</CardTitle>
          </div>
          <div className="text-sm text-gray-600 bg-gray-100/80 px-3 py-1.5 rounded-full font-medium">
            Demo
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-8 pb-8">
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6 leading-relaxed">
            {sampleQuestion.question}
          </h3>
        </div>

        <div className="space-y-4">
          {sampleQuestion.options.map((option, index) => {
            let buttonClass = "w-full text-left p-5 border-0 rounded-2xl transition-all duration-300 font-semibold text-base shadow-lg ";
            
            if (!showResult) {
              if (selectedAnswer === index) {
                buttonClass += "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl transform scale-[1.02]";
              } else {
                buttonClass += "bg-gray-50/80 hover:bg-gray-100/80 text-gray-700 hover:shadow-xl hover:scale-[1.01]";
              }
            } else {
              if (index === sampleQuestion.correct) {
                buttonClass += "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-xl";
              } else if (index === selectedAnswer && index !== sampleQuestion.correct) {
                buttonClass += "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg";
              } else {
                buttonClass += "bg-gray-50/60 text-gray-400";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult || isAnimating}
                className={buttonClass}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${
                      showResult && index === sampleQuestion.correct
                        ? "bg-white/20 text-white"
                        : showResult && index === selectedAnswer && index !== sampleQuestion.correct
                        ? "bg-white/20 text-white"
                        : selectedAnswer === index
                        ? "bg-white/20 text-white"
                        : "bg-white/60 text-gray-600"
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                  {showResult && (
                    <span>
                      {index === sampleQuestion.correct ? (
                        <CheckCircle2 className="w-6 h-6 text-white drop-shadow-lg" />
                      ) : index === selectedAnswer ? (
                        <XCircle className="w-6 h-6 text-white drop-shadow-lg" />
                      ) : null}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="mt-8 animate-slide-in-up">
            <div className={`p-6 rounded-3xl border-0 shadow-xl ${
              isCorrect 
                ? "bg-gradient-to-br from-green-50 to-green-100/80" 
                : "bg-gradient-to-br from-red-50 to-red-100/80"
            }`}>
              <div className="flex items-center gap-3 mb-4">
                {isCorrect ? (
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
                    <XCircle className="w-6 h-6 text-white" />
                  </div>
                )}
                <h4 className={`font-bold text-lg ${
                  isCorrect ? "text-green-800" : "text-red-800"
                }`}>
                  {isCorrect ? "Richtig! 🎉" : "Leider falsch"}
                </h4>
              </div>
              <p className={`text-base leading-relaxed ${
                isCorrect ? "text-green-700" : "text-red-700"
              }`}>
                {sampleQuestion.explanation}
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <Button 
                onClick={resetQuestion}
                variant="outline" 
                size="lg" 
                className="flex items-center gap-2 rounded-2xl border-2 hover:scale-105 transition-all duration-300 font-semibold"
              >
                <RotateCcw className="w-5 h-5" />
                Try Again
              </Button>
              <Button 
                size="lg" 
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
                asChild
              >
                <a href="/quiz/practice">
                  <ArrowRight className="w-5 h-5" />
                  Start Full Quiz
                </a>
              </Button>
            </div>
          </div>
        )}

        {!showResult && selectedAnswer === null && (
          <div className="text-center py-2">
            <p className="text-sm text-gray-500">
              👆 Click an answer to see how it works
            </p>
          </div>
        )}

        {isAnimating && (
          <div className="text-center py-2">
            <div className="inline-flex items-center gap-2 text-sm text-gray-600">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              Checking answer...
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}