import React from 'react'

import Header from "../containers/header.container";
import Footer from "./footer.component";

const Layout: React.FC = ({ children }) => {
    return (
    <>
        <Header />
        { children }
        <Footer />
    </>
    )
}

export default Layout
