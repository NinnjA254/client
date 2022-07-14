import React, { useEffect,useState } from 'react';

import { checkLogin } from './api/checkLogin';
import './App.css';
import './variables.css';
import Login from './components/login/Login';
import Main from './components/main.js/Main';
import useLocalStorage from './hooks/useLocalStorage.js';

function App() {
  
  //const [isLoggedIn, setIsLoggedIn] = useLocalStorage(null, 'isLoggedIn');
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    checkLogin().then((response) => {
      if(response.status === 200){
        setIsLoggedIn(true)
      }
      if(response.status !== 200){
        setIsLoggedIn(false);
      }
    })
  }, [isLoggedIn]);

  function chooseComponent(){
    if(isLoggedIn === null) return <div>{/* handle loading time */}</div>
    if(isLoggedIn) return <Main/>
    return <Login setIsLoggedIn={setIsLoggedIn}/>
  }
  return (
    <div className="App">
        {chooseComponent()}
		</div>
  );
}

export default App;
