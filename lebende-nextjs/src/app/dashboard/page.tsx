import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Trophy, Target, Clock, TrendingUp, Calendar, Award } from "lucide-react";

export default function DashboardPage() {
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
            <Button asChild>
              <Link href="/quiz/practice">Take Quiz</Link>
            </Button>
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
              Track your German citizenship test preparation progress and achievements.
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
                  <span className="text-2xl font-bold">7</span>
                  <span className="text-sm text-gray-500">days</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Keep going! 🔥</p>
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
                  <span className="text-2xl font-bold">82%</span>
                </div>
                <Progress value={82} className="mt-2" />
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
                  <span className="text-2xl font-bold">24h</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">This month</p>
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
                  <span className="text-2xl font-bold">45</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">All time</p>
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
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Politik in der Demokratie</span>
                    <span className="text-sm text-gray-500">85%</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Geschichte und Verantwortung</span>
                    <span className="text-sm text-gray-500">78%</span>
                  </div>
                  <Progress value={78} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Mensch und Gesellschaft</span>
                    <span className="text-sm text-gray-500">92%</span>
                  </div>
                  <Progress value={92} />
                </div>
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
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Practice Quiz</p>
                    <p className="text-xs text-gray-500">Today, 14:30</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">85%</p>
                    <p className="text-xs text-gray-500">17/20</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Bayern Quiz</p>
                    <p className="text-xs text-gray-500">Yesterday, 16:45</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">90%</p>
                    <p className="text-xs text-gray-500">9/10</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Exam Simulation</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-yellow-600">76%</p>
                    <p className="text-xs text-gray-500">25/33</p>
                  </div>
                </div>
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
                    <p className="text-xs text-gray-600">7-day streak</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                  <Target className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Sharp Shooter</p>
                    <p className="text-xs text-gray-600">80%+ success</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <Clock className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">Study Master</p>
                    <p className="text-xs text-gray-600">20+ hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <Award className="w-8 h-8 text-gray-400" />
                  <div>
                    <p className="font-medium text-sm">Explorer</p>
                    <p className="text-xs text-gray-600">All states: 12/16</p>
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