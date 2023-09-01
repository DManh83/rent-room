import React from 'react'
import Navbar from './Header'
import { Container } from '@chakra-ui/react'

const Layout = (props) => {
    return (
        <>
            <Navbar />
            <Container maxW='container.lg'>{props.children}</Container>
        </>
    )
}

export default Layout