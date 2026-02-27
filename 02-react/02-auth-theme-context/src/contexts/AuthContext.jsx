import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEYS = {
  user: "exp2_user",
  theme: "exp2_theme"
};

const getInitialUser = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.user);
  return stored ? JSON.parse(stored) : null;
};

const getInitialTheme = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.theme);
  return stored || "light";
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getInitialUser());
  const [theme, setTheme] = useState(() => getInitialTheme());

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.user);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const login = (name, password) => {
    const trimmedName = name.trim();
    const trimmedPassword = password.trim();
    if (!trimmedName || !trimmedPassword) return false;
    setUser({ name: trimmedName, loggedInAt: new Date().toISOString() });
    return true;
  };

  const logout = () => setUser(null);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      theme,
      login,
      logout,
      toggleTheme
    }),
    [user, theme]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
