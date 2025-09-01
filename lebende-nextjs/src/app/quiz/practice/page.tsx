import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function PracticePage() {
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
                  <BookOpen className="w-5 h-5 text-primary" />
                  Category Practice
                </CardTitle>
                <CardDescription>
                  Focus on specific knowledge areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="text-sm">
                    <span className="font-medium">Politik in der Demokratie</span>
                    <div className="text-xs text-gray-500">Political system and democracy</div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Geschichte und Verantwortung</span>
                    <div className="text-xs text-gray-500">History and responsibility</div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Mensch und Gesellschaft</span>
                    <div className="text-xs text-gray-500">Society and community</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Choose Category
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Bundesland-Specific Questions</CardTitle>
              <CardDescription>
                Practice questions specific to your German state
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  'Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg',
                  'Bremen', 'Hamburg', 'Hessen', 'Mecklenburg-Vorpommern',
                  'Niedersachsen', 'Nordrhein-Westfalen', 'Rheinland-Pfalz', 'Saarland',
                  'Sachsen', 'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen'
                ].map((state) => (
                  <Button
                    key={state}
                    variant="outline"
                    size="sm"
                    className="text-xs p-2 h-auto"
                  >
                    {state}
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