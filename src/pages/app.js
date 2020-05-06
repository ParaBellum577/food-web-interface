import React, { useEffect } from "react"
import { Router } from "@reach/router"

import Onboarding from "../components/onboarding/index";
import IndexComponenet from "../components/main/dashboard/index";
import Restaurants from "../components/restaurants/index";
import LoginPage from "../components/main/authentication/index";
import SignUp from "../components/main/authentication/signUp";


const App = () => {
  const isConfirmed = JSON.parse(localStorage.getItem('userConfirmed'));
  console.log("Dashboard -> isConfirmed", isConfirmed)

  useEffect(() => {
    if(!isConfirmed) {
      window.location = '/onboarding/'
    }
  }, [isConfirmed]);

  return (
      <Router>
        <IndexComponenet path="/">
            <Restaurants path="/restaurants"/>    
        </IndexComponenet>
        <Onboarding path="/onboarding" />
        <LoginPage path="/login">
          <SignUp path="/sign-up"/>
        </LoginPage>
      </Router>
  )
}

export default App;