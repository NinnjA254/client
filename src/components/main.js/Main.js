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
        <NavBar/>
        <div id = 'main-header-and-body-container'>
          <div id = 'main-header'>
            {/*add logo here*/}
            <h3>KOMAZA Management System</h3>
          </div>
          {routes}
          <Outlet/>
        </div>
        
        
      </BrowserRouter>
    </div>
  )
}