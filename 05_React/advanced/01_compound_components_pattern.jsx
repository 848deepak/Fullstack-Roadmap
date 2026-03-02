import { createContext, useContext, useMemo, useState } from 'react';

const TabsContext = createContext(null);

// Beginner: compound components share state via context.
// Advanced: API mirrors design-system patterns and keeps consumer JSX declarative.
export function Tabs({ defaultValue, children }) {
  const [active, setActive] = useState(defaultValue);
  const value = useMemo(() => ({ active, setActive }), [active]);
  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

export function TabList({ children }) {
  return <div role="tablist">{children}</div>;
}

export function Tab({ value, children }) {
  const { active, setActive } = useContext(TabsContext);
  return (
    <button role="tab" aria-selected={active === value} onClick={() => setActive(value)}>
      {children}
    </button>
  );
}

export function TabPanel({ value, children }) {
  const { active } = useContext(TabsContext);
  if (active !== value) return null;
  return <section role="tabpanel">{children}</section>;
}
