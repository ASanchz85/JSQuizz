import { useQuestionsData } from '../hooks/useQuestionsData'

function Footer () {
  const { correct, incorrect, unanswered } = useQuestionsData()

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✅ ${correct} - ❌ ${incorrect} - ❓ ${unanswered}`}</strong>
    </footer>
  )
}

export default Footer
