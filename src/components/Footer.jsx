import { Button } from '@mui/material'
import { useQuestionsData } from '../hooks/useQuestionsData'

function Footer () {
  const { correct, incorrect, unanswered } = useQuestionsData()
  const reset = useQuestionsData((state) => state.reset)

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✅ ${correct} - ❌ ${incorrect} - ❓ ${unanswered}`}</strong>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => reset()}>Reset</Button>
      </div>
    </footer>
  )
}

export default Footer
