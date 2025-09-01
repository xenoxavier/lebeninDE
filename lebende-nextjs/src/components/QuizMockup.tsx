'use client';

import { Card } from '@/components/ui/card';

export function QuizMockup() {
  return (
    <div className="relative">
      {/* Main Quiz Card */}
      <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-white font-semibold">Question 1 of 33</span>
            </div>
            <div className="text-white text-sm font-medium">15:32</div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="text-gray-900 font-bold text-lg mb-6 leading-tight">
            Wie viele Bundesländer hat die Bundesrepublik Deutschland?
          </h3>
          
          <div className="space-y-3">
            {['14', '15', '16', '17'].map((option, index) => (
              <button
                key={index}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  index === 2
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                    index === 2
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-gray-400 text-gray-500'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className={index === 2 ? 'font-semibold' : ''}>{option}</span>
                </div>
              </button>
            ))}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Progress</span>
              <span>3%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" style={{width: '3%'}}></div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Floating Stats Cards */}
      <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-2 border">
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">85%</div>
          <div className="text-xs text-gray-500">Success Rate</div>
        </div>
      </div>
      
      <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-2 border">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">300+</div>
          <div className="text-xs text-gray-500">Questions</div>
        </div>
      </div>
      
      {/* Achievement Badge */}
      <div className="absolute top-8 -left-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3 shadow-lg">
        <div className="text-white text-lg">🏆</div>
      </div>
    </div>
  );
}