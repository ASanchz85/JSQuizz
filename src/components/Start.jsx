import { Button } from '@mui/material'
import { useQuestionsStore } from '../store/questions'

function Start () {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(10)
  }

  return (
    <Button
      onClick={handleClick}
      variant='contained'
      color='primary'
      sx={{ marginTop: 4 }}
    >
      Start
    </Button>
  )
}

export default Start
