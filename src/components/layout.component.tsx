import React from 'react'

import Header from "./header.component";
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
