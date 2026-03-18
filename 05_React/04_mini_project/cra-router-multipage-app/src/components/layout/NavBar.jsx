import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar" aria-label="Main Navigation">
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  );
}

export default NavBar;
