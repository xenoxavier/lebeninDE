'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Trophy, Target, Clock, TrendingUp, Calendar, Award, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface StatProps {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
  progress?: number;
}

function AnimatedStat({ icon: Icon, value, label, color, progress }: StatProps) {
  const [displayValue, setDisplayValue] = useState('0');
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    // Animate the number
    const target = parseInt(value) || 95; // fallback for percentages
    let current = 0;
    const increment = target / 30;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current).toString() + (value.includes('%') ? '%' : ''));
      }
    }, 50);

    // Animate progress bar
    if (progress) {
      setTimeout(() => setCurrentProgress(progress), 200);
    }

    return () => clearInterval(timer);
  }, [value, progress]);

  return (
    <div className={`p-4 rounded-2xl bg-gradient-to-br ${color} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center justify-between mb-2">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{displayValue}</div>
        </div>
      </div>
      <p className="text-white/80 text-sm font-medium">{label}</p>
      {progress && (
        <div className="mt-2">
          <Progress value={currentProgress} className="h-2 bg-white/20" />
        </div>
      )}
    </div>
  );
}

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: Trophy,
      value: '7',
      label: 'Study Streak',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Target,
      value: '85%',
      label: 'Success Rate',
      color: 'from-green-500 to-emerald-500',
      progress: 85,
    },
    {
      icon: Clock,
      value: '24h',
      label: 'Study Time',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Award,
      value: '12',
      label: 'Achievements',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const categoryData = [
    { name: 'Politik in der Demokratie', progress: 85, color: 'text-blue-600' },
    { name: 'Geschichte und Verantwortung', progress: 78, color: 'text-green-600' },
    { name: 'Mensch und Gesellschaft', progress: 92, color: 'text-purple-600' },
  ];

  const recentActivity = [
    { type: 'Practice Quiz', score: '85%', time: 'Today', correct: '17/20' },
    { type: 'Bayern Quiz', score: '90%', time: 'Yesterday', correct: '9/10' },
    { type: 'Exam Simulation', score: '76%', time: '2 days ago', correct: '25/33' },
  ];

  if (!mounted) return null;

  return (
    <Card className="w-full max-w-4xl bg-white/95 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-3xl overflow-hidden">
      <CardHeader className="pb-6 px-8 pt-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse shadow-lg"></div>
            <CardTitle className="text-2xl font-bold text-gray-900">Your Dashboard</CardTitle>
          </div>
          <div className="text-sm text-gray-600 bg-gray-100/80 px-3 py-1.5 rounded-full font-medium">
            Live Preview
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex gap-2 mt-4">
          {['Overview', 'Progress', 'Activity'].map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                activeTab === index
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="px-8 pb-8">
        {/* Overview Tab */}
        {activeTab === 0 && (
          <div className="space-y-6 animate-slide-in-up">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <AnimatedStat key={index} {...stat} />
              ))}
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-2">🎯</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">You're doing great!</h3>
              <p className="text-gray-600">Keep up the excellent progress</p>
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 1 && (
          <div className="space-y-6 animate-slide-in-up">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Progress by Category</h3>
            {categoryData.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">{category.name}</span>
                  <span className={`text-sm font-bold ${category.color}`}>{category.progress}%</span>
                </div>
                <Progress value={category.progress} className="h-3" />
              </div>
            ))}
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl border border-blue-200/50">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <h4 className="font-bold text-gray-800">AI Recommendation</h4>
              </div>
              <p className="text-gray-700">Focus on "Geschichte und Verantwortung" to improve your overall score!</p>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 2 && (
          <div className="space-y-4 animate-slide-in-up">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-semibold text-gray-800">{activity.type}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{activity.score}</p>
                  <p className="text-sm text-gray-500">{activity.correct}</p>
                </div>
              </div>
            ))}
            
            <div className="text-center mt-6">
              <Calendar className="w-12 h-12 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Track your daily progress and build streaks!</p>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <Button 
            size="lg" 
            className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
            asChild
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Open Full Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}