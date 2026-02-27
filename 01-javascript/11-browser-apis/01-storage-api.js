// LocalStorage persists even after browser restart.
localStorage.setItem('theme', 'dark')
console.log('Saved theme:', localStorage.getItem('theme'))

// SessionStorage persists only for current tab session.
sessionStorage.setItem('activePage', 'dashboard')
console.log('Session page:', sessionStorage.getItem('activePage'))
