import React from 'react'
import Header from './Header'
import { Box, Container, Flex } from '@chakra-ui/react'
import Navbar from './Navbar'
import Search from '../pages/Public/Search'

const Layout = (props) => {
    return (
        <Flex direction='column' justifyContent='center' >
            <Header />
            <Navbar />
            <Container maxW='1100px'>{props.children}</Container>
        </Flex>
    )
}

export default Layout