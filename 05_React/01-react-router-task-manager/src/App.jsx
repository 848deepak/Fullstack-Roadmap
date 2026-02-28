import { memo, useCallback, useEffect, useId, useMemo, useState } from 'react'
import {
  BrowserRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import './App.css'

const TaskItem = memo(function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <label className="task-checkbox-wrap">
        <input
          className="task-checkbox"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark ${task.title} as ${task.completed ? 'pending' : 'completed'}`}
        />
        <span className={task.completed ? 'task-title completed' : 'task-title'}>
          {task.title}
        </span>
      </label>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.title}`}
      >
        Delete
      </button>
    </li>
  )
})

function TaskManager() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks')
    return stored ? JSON.parse(stored) : []
  })
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')
  const taskInputId = useId()

  const saveTasks = useCallback((updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    setTasks(updatedTasks)
  }, [])

  const handleAddTask = useCallback(
    (event) => {
      event.preventDefault()
      const title = newTask.trim()
      if (!title) {
        return
      }

      const updatedTasks = [
        {
          id: Date.now(),
          title,
          completed: false,
        },
        ...tasks,
      ]

      saveTasks(updatedTasks)
      setNewTask('')
    },
    [newTask, saveTasks, tasks],
  )

  const handleToggleTask = useCallback(
    (id) => {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      )
      saveTasks(updatedTasks)
    },
    [saveTasks, tasks],
  )

  const handleDeleteTask = useCallback(
    (id) => {
      const updatedTasks = tasks.filter((task) => task.id !== id)
      saveTasks(updatedTasks)
    },
    [saveTasks, tasks],
  )

  const filteredTasks = useMemo(() => {
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed)
    }
    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed)
    }
    return tasks
  }, [filter, tasks])

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks],
  )

  return (
    <section className="card" aria-labelledby="task-manager-title">
      <h2 id="task-manager-title">Task Manager</h2>
      <p className="muted">Manage daily tasks with local autosave.</p>

      <form className="task-form" onSubmit={handleAddTask}>
        <label htmlFor={taskInputId} className="sr-only">
          New task
        </label>
        <input
          id={taskInputId}
          className="input"
          type="text"
          placeholder="Enter a task"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          maxLength={80}
        />
        <button className="btn" type="submit">
          Add Task
        </button>
      </form>

      <div className="task-summary" aria-live="polite">
        <span>Total: {tasks.length}</span>
        <span>Completed: {completedCount}</span>
        <span>Pending: {tasks.length - completedCount}</span>
      </div>

      <div className="filters" role="group" aria-label="Filter tasks">
        <button
          type="button"
          className={filter === 'all' ? 'btn active' : 'btn'}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          type="button"
          className={filter === 'pending' ? 'btn active' : 'btn'}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          type="button"
          className={filter === 'completed' ? 'btn active' : 'btn'}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="empty">No tasks found for this filter.</p>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

function HomePage() {
  return (
    <main className="page" id="main-content">
      <h1>Home</h1>
      <p className="lead">Welcome to the React Router task manager web app.</p>
      <TaskManager />
    </main>
  )
}

function DateTimeCard() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const currentDate = useMemo(
    () =>
      now.toLocaleDateString('en-IN', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    [now],
  )

  const currentTime = useMemo(
    () =>
      now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    [now],
  )

  return (
    <section className="card" aria-live="polite">
      <h2>Date & Time</h2>
      <p className="muted">Date: {currentDate}</p>
      <p className="muted">Time: {currentTime}</p>
    </section>
  )
}

function AboutPage() {
  return (
    <main className="page" id="main-content">
      <h1>About</h1>
      <section className="card">
        <h2>About Us</h2>
        <p>
          My name is Deepak. I am a third year student at Chandigarh University,
          and this app demonstrates React Router navigation with a clean, fast,
          and accessible UI.
        </p>
      </section>
      <DateTimeCard />
    </main>
  )
}

function ContactPage() {
  return (
    <main className="page" id="main-content">
      <h1>Contact Us</h1>
      <section className="card">
        <h2>Send Message</h2>
        <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input id="name" className="input" type="text" placeholder="Your Name" required />

          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input id="email" className="input" type="email" placeholder="Your Email" required />

          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <input
            id="message"
            className="input"
            type="text"
            placeholder="Your Message"
            required
          />

          <button className="btn" type="submit">
            Send
          </button>
        </form>
      </section>
    </main>
  )
}

function AppLayout() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="site-header">
        <nav className="nav" aria-label="Primary">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} end>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Contact Us
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
