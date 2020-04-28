import React from "react"
import { Router } from "@reach/router"

import Onboarding from "../components/onboarding/index";
import IndexComponenet from "../components/main/dashboard/index";
import Restaurants from "../components/restaurants/index";

const App = () => {
  return (
    <>
      <Router >
        <IndexComponenet path="/dashboard">
            <Restaurants path="/restaurants"/>    
        </IndexComponenet>
        <Onboarding path="/onboarding" />
      </Router>
    </>
  )
}

export default App