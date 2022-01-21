import {NavLink} from 'react-router-dom'

function NavBar() {
  return (
  <div>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/matches">Matches</NavLink>
      <NavLink to="/profile">Profile</NavLink>
  </div>
  )
}

export default NavBar;
