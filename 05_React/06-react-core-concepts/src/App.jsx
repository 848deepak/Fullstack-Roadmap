import Counter from './components/Counter'
import UserCard from './components/UserCard'

function App() {
  // Compose UI using smaller reusable components.
  return (
    <main>
      <h1>React Core Concepts</h1>
      <UserCard name="Deepak" role="Frontend Learner" />
      <Counter />
    </main>
  )
}

export default App
