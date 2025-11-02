'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CategoryKey } from '@/data/categories';

export type QuizMode = 'practice' | 'exam' | 'bundesland' | 'category';

export type CategoryPerformance = Partial<
  Record<CategoryKey, { correct: number; total: number }>
>;

export type QuizSessionRecord = {
  id: string;
  mode: QuizMode;
  bundesland?: string;
  categoryFocus?: CategoryKey;
  startedAt: string;
  completedAt: string;
  durationSeconds: number;
  totalQuestions: number;
  correctAnswers: number;
  categoryPerformance: CategoryPerformance;
};

type DashboardStoreState = {
  sessions: QuizSessionRecord[];
  addSession: (session: Omit<QuizSessionRecord, 'id'> & { id?: string }) => void;
  clearSessions: () => void;
};

const createSessionId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const useDashboardStore = create<DashboardStoreState>()(
  persist(
    (set) => ({
      sessions: [],
      addSession: (session) =>
        set((state) => ({
          sessions: [...state.sessions, { ...session, id: session.id ?? createSessionId() }],
        })),
      clearSessions: () => set({ sessions: [] }),
    }),
    {
      name: 'leben-dashboard-progress',
      version: 1,
    },
  ),
);
