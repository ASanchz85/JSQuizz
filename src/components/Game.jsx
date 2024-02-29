import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography
} from '@mui/material'
import { useQuestionsStore } from '../store/questions'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import Footer from './Footer'

const getBackgroundColor = (info, answerIndex) => {
  const { userSelection, correctAnswer } = info

  if (userSelection == null) return 'transparent'

  if (answerIndex !== correctAnswer && userSelection !== answerIndex) {
    return 'transparent'
  }

  if (answerIndex === correctAnswer) return '#4caf50'

  if (userSelection === answerIndex) return '#f44336'

  return 'transparent'
}

const Question = ({ info }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)

  const createHandleClick = (answerIndex) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card
      variant='outlined'
      sx={{ p: 2, textAlign: 'left', bgcolor: '#222', marginTop: 4 }}
    >
      <Typography variant='h5'>{info.question}</Typography>
      <SyntaxHighlighter
        language='javascript'
        style={dark}
      >
        {info.code}
      </SyntaxHighlighter>
      <List
        sx={{ bgcolor: '#333' }}
        disablePadding
      >
        {info.answers.map((answer, index) => (
          <ListItem
            key={index}
            disablePadding
            divider
          >
            <ListItemButton
              onClick={createHandleClick(index)}
              disabled={info.userSelection != null}
              sx={{ backgroundColor: getBackgroundColor(info, index) }}
            >
              <ListItemText primary={answer} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

function Game () {
  const questions = useQuestionsStore((state) => state.questions)
  const currentQuestions = useQuestionsStore((state) => state.currentQuestions)
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion)
  const goPrevQuestion = useQuestionsStore((state) => state.goPrevQuestion)

  const questionInfo = questions[currentQuestions]

  return (
    <>
      <Stack
        direction='row'
        gap={2}
        justifyContent='center'
        alignItems='center'
      >
        <IconButton
          onClick={goPrevQuestion}
          disabled={currentQuestions === 0}
        >
          <ArrowBack />
        </IconButton>
        {currentQuestions + 1} / {questions.length}
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestions === questions.length - 1}
        >
          <ArrowForward />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}

export default Game
