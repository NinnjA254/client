import {NavLink} from 'react-router-dom'
import './NavBar.css'
import {ReactComponent as OrdersIcon} from '../../assets/orders-icon.svg'
import { ReactComponent as AcquisitionsIcon} from '../../assets/acquisitions-icon.svg'
import {ReactComponent as InspectionsIcon} from '../../assets/inspections-icon.svg'

export default function NavBar(){
    const activeNavLinkClass = ({ isActive }) => {
        return isActive ? "navbar-navlink-active" : "navbar-navlink"
      }
    return(
        <div id = 'nav-bar'>
            <NavLink className = { activeNavLinkClass }to = 'orders' id = 'navbar-top-link'>
                <OrdersIcon/>
                Orders
            </NavLink>
            <NavLink className = { activeNavLinkClass }to = 'acquisitions'>
                <AcquisitionsIcon/>
                Acquisitions
            </NavLink>
            <NavLink className = { activeNavLinkClass }to = 'inspections'>
                <InspectionsIcon/>
                Inspections
            </NavLink>
        </div>
    )
}