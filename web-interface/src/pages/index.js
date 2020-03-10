import React from "react"
import { Link } from "gatsby"

import ModalSignUp from "../components/onboarding/firstStep"
import SEO from "../components/seo"
import Header from "../components/header/index"

const IndexPage = () => (
  <>
    {/* <Header /> */}
    {/* <SEO title="Home" /> */}
    <ModalSignUp / >
  </>
)

export default IndexPage
