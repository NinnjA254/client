import React, { Component, useEffect,useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { checkLogin } from './api/checkLogin';
import './App.css';
import Login from './components/login/Login';
import Main from './components/main.js/Main';
import useLocalStorage from './hooks/useLocalStorage.js';

function App() {
  
  //const [isLoggedIn, setIsLoggedIn] = useLocalStorage(null, 'isLoggedIn');
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    checkLogin().then((loginStatus) => {
      if(loginStatus){
        setIsLoggedIn(true)
      }
      if(!loginStatus){
        setIsLoggedIn(false);
      }
    })
  }, [isLoggedIn]);

  function chooseComponent(){
    if(isLoggedIn === null) return <div></div>
    else if(isLoggedIn) return <Main/>
    return <Login setIsLoggedIn={setIsLoggedIn}/>
  }
  return (
    <div className="App">
        {chooseComponent()}
		</div>
  );
}

export default App;
