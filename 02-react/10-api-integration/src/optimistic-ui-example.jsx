import { useState } from 'react'

function OptimisticTodo() {
  const [todos, setTodos] = useState([])

  const addTodo = async (title) => {
    const optimisticTodo = { id: Date.now(), title, optimistic: true }
    setTodos((current) => [optimisticTodo, ...current])

    try {
      // Simulate API success
      await new Promise((resolve) => setTimeout(resolve, 300))
      setTodos((current) => current.map((todo) =>
        todo.id === optimisticTodo.id ? { ...todo, optimistic: false } : todo,
      ))
    } catch {
      setTodos((current) => current.filter((todo) => todo.id !== optimisticTodo.id))
    }
  }

  return (
    <section>
      <button onClick={() => addTodo('Learn optimistic UI')}>Add Optimistic Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title} {todo.optimistic ? '(saving...)' : ''}</li>
        ))}
      </ul>
    </section>
  )
}

export default OptimisticTodo
