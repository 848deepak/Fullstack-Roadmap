import { createContext, useContext, useState } from 'react'

const TabsContext = createContext(null)

function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState('home')
  return <TabsContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabsContext.Provider>
}

function TabButton({ id, label }) {
  const { setActiveTab } = useContext(TabsContext)
  return <button onClick={() => setActiveTab(id)}>{label}</button>
}

function TabPanel({ id, children }) {
  const { activeTab } = useContext(TabsContext)
  return activeTab === id ? <div>{children}</div> : null
}

Tabs.Button = TabButton
Tabs.Panel = TabPanel

export default Tabs
