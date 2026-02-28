import { useReducer } from 'react'
import { initialCartState, cartReducer } from './reducer/cartReducer'

function App() {
  // useReducer is useful when state transitions are complex.
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  return (
    <main>
      <h1>State Patterns</h1>
      <button
        onClick={() => dispatch({ type: 'add', payload: { id: Date.now(), name: 'Book' } })}
      >
        Add Item
      </button>
      <p>Items in cart: {state.items.length}</p>
    </main>
  )
}

export default App
