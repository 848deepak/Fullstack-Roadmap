import { createContext, useContext } from 'react'

const ThemeContext = createContext('light')

function ThemeLabel() {
  const theme = useContext(ThemeContext)
  return <p>Current theme: {theme}</p>
}

function UseContextExample() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemeLabel />
    </ThemeContext.Provider>
  )
}

export default UseContextExample
