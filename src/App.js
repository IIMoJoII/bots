import React from "react";
import SignInForm from "./components/SignIn";
import BotsPage from "./components/BotsPage"

import './App.css'
import bcryptjs from "bcryptjs";


function App() {
    const [login, setLogin] = React.useState(null)
    const [password, setPassword] = React.useState(null)

    const setUserData = (callbackLogin, callbackPassword) => {
        bcryptjs.compare('test', callbackLogin, function(err, result) {
            if(result)
                setLogin(true)
        });

        bcryptjs.compare('12345', callbackPassword, function(err, result) {
            if(result)
                setPassword(true)
        });
    }

    const deleteUserData = () => {
        setLogin(false)
        setPassword(false)
    }

  return (
      <>
          <SignInForm setUserData={(callbackLogin, callbackPassword) => setUserData(callbackLogin, callbackPassword)}/>
          {login && password && <BotsPage deleteUserData={deleteUserData}/>}
      </>
  )
}

export default App
