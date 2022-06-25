import {BrowserRouter, Outlet,Route,Routes} from 'react-router-dom'
import NavBar from '../navBar/NavBar';
import Inspections from '../inspections/Inspections'
import Acquisitions from '../acquisitions/Acquisitions'
import Orders from '../orders/Orders';
import './Main.css';

export default function Main(){
  const routes = (
    <Routes>
      <Route path = 'orders' element = {<Orders />}/>
      <Route path = 'acquisitions' element = {<Acquisitions />}/>
      <Route path = 'inspections' element = {<Inspections />}/>
    </Routes>
  )
    
  return(
    <div id = 'main'>
      <BrowserRouter>
        <div id = 'main-header'>
          <div id = 'main-title'>
            <p>KOMAZA Management System</p>
          </div>
          <NavBar/>
        </div>
        {routes}
        <Outlet/>
        
      </BrowserRouter>
    </div>
  )
}