import { useCallback, useState } from 'react'

function UseCallbackExample() {
  const [todos, setTodos] = useState([])

  // Memoize handler so identity remains stable between renders.
  const addTodo = useCallback(() => {
    setTodos((items) => [...items, `Task ${items.length + 1}`])
  }, [])

  return (
    <section>
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </section>
  )
}

export default UseCallbackExample
