# CRA Router Multi-Page App

A Create React App project with React Router that implements:

- 5 pages: Login, Register, Home, Contact, About
- Reusable component architecture
- React Testing Library coverage for all components/pages

## Requirement Mapping

### 1) Pages (5)
- `src/pages/LoginPage.jsx`
- `src/pages/RegisterPage.jsx`
- `src/pages/HomePage.jsx`
- `src/pages/ContactPage.jsx`
- `src/pages/AboutPage.jsx`

### 2) Home Page (5 reusable components)
- `HeroBanner`
- `FeatureCard`
- `StatsPanel`
- `NewsletterSignup`
- `QuickLinks`

### 3) Contact Page (3 input field components)
- `NameInput`
- `EmailInput`
- `MessageInput`

### 4) About Page (4 components)
- `MissionSection`
- `TeamList`
- `Timeline`
- `ValuesGrid`

### 5) Testing (15+ components)
This project includes RTL tests for all created components/pages:
- Layout: 1 test file
- Home components: 5 test files
- Contact components: 3 test files
- About components: 4 test files
- Pages: 5 test files
- App routing: 1 test file

Total: **19 tested units**.

## Run Locally

```bash
npm install
npm start
```

## Run Tests

```bash
npm test
```

## Analysis Guide

### A) React Developer Tools (Component Structure)
1. Run app with `npm start`.
2. Open browser and React Developer Tools.
3. Navigate to each route (`/login`, `/register`, `/home`, `/contact`, `/about`).
4. Verify component tree:
   - Home shows five reusable home components under `HomePage`.
   - Contact shows three input components under `ContactPage`.
   - About shows four about components under `AboutPage`.

### B) Network Panel (API/Data Flow)
1. Open browser DevTools → Network tab.
2. Go to `/home`.
3. Observe request to `/mock-data/home.json`.
4. Confirm response data drives the Hero subtitle text.

This demonstrates data flow from fetched JSON into React component state and UI rendering.
