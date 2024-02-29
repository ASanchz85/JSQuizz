import { useQuestionsStore } from '../store/questions'

export function useQuestionsData () {
  const questions = useQuestionsStore((state) => state.questions)

  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach((question) => {
    if (question.userSelection != null) {
      if (question.isCorrectAnswer) {
        correct++
      } else {
        incorrect++
      }
    } else {
      unanswered++
    }
  })

  return { correct, incorrect, unanswered }
}
