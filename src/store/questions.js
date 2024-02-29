import { create } from 'zustand'

export const useQuestionsStore = create((set, get) => {
  return {
    questions: [],
    currentQuestions: 0,

    fetchQuestions: async (limit) => {
      const response = await fetch('http://localhost:5173/data.json')
      const data = await response.json()
      const questions = data.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions })
    },

    selectAnswer: (questionId, answerIndex) => {
      const { questions } = get()
      const newQuestions = structuredClone(questions)
      const questionIndex = newQuestions.findIndex((q) => q.id === questionId)
      const questionInfo = newQuestions[questionIndex]
      const isCorrectAnswer = questionInfo.correctAnswer === answerIndex

      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectAnswer,
        userSelection: answerIndex
      }

      set({ questions: newQuestions })
    },

    goNextQuestion: () => {
      const { currentQuestions, questions } = get()
      const nextQuestion = currentQuestions + 1

      if (currentQuestions + 1 < questions.length) {
        set({ currentQuestions: nextQuestion })
      }
    },

    goPrevQuestion: () => {
      const { currentQuestions } = get()
      const nextQuestion = currentQuestions - 1

      if (currentQuestions >= 0) {
        set({ currentQuestions: nextQuestion })
      }
    }
  }
})
