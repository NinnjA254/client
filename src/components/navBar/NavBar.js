import {NavLink} from 'react-router-dom'
import './NavBar.css'

export default function NavBar(){
    const activeNavLinkClass = ({ isActive }) => {
        return isActive ? "navbar-navlink-active" : "navbar-navlink"
      }
    return(
        <div id = 'nav-bar'>
            <NavLink className = { activeNavLinkClass }to = 'orders'>Orders</NavLink>
            <NavLink className = { activeNavLinkClass }to = 'acquisitions'>Acquisitions</NavLink>
            <NavLink className = { activeNavLinkClass }to = 'inspections'>Inspections</NavLink>
        </div>
    )
}