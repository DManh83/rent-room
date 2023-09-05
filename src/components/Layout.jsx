import React from 'react'
import Header from './Header'
import { Container } from '@chakra-ui/react'
import Navbar from './Navbar'

const Layout = (props) => {
    return (
        <>
            <Header />
            <Navbar />
            <Container maxW='container.lg'>{props.children}</Container>
        </>
    )
}

export default Layout