export interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation?: string
  category: 'Politik in der Demokratie' | 'Geschichte und Verantwortung' | 'Mensch und Gesellschaft'
  difficulty?: 'easy' | 'medium' | 'hard'
  hasImage?: boolean
  imageType?: 'options' | 'question'
  imagePath?: string
  images?: string[]
}

export interface QuizConfig {
  id: string
  title: string
  subtitle: string
  icon: string
  type: 'practice' | 'exam' | 'bundesland'
  bundesland?: string
  timeLimit?: number // in minutes
  questionCount: number
  passingScore: number
  questions: Question[]
}

export interface QuizResult {
  id: string
  quizId: string
  quizType: 'practice' | 'exam' | 'bundesland'
  bundesland?: string
  date: string
  score: number
  correctAnswers: number
  totalQuestions: number
  timeSpent: number // in seconds
  passed: boolean
  categoryStats: CategoryStats
  answers: UserAnswer[]
}

export interface CategoryStats {
  'Politik in der Demokratie': { correct: number; total: number }
  'Geschichte und Verantwortung': { correct: number; total: number }
  'Mensch und Gesellschaft': { correct: number; total: number }
}

export interface UserAnswer {
  questionId: number
  selectedAnswer: number
  correctAnswer: number
  isCorrect: boolean
  timeSpent: number
}

export interface UserProfile {
  id: string
  displayName: string
  email?: string
  avatar?: string
  studyGoals: string[]
  preferredLanguage: 'de' | 'en'
  created: string
  version: string
}

export interface StudyStreak {
  current: number
  best: number
  lastActivity: string
  activities: ActivityDay[]
}

export interface ActivityDay {
  date: string
  hasActivity: boolean
  sessionCount: number
  totalScore: number
}

export interface DashboardStats {
  totalSessions: number
  studyTimeHours: number
  successRate: number
  averageScore: number
  completedQuizzes: number
  streak: StudyStreak
  categoryPerformance: CategoryStats
  recentActivity: QuizResult[]
  achievements: Achievement[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
  earnedDate?: string
  progress: number
  maxProgress: number
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
}

export interface QuizSession {
  currentQuestion: number
  answers: UserAnswer[]
  startTime: number
  timeRemaining?: number
  isActive: boolean
  isPaused: boolean
}