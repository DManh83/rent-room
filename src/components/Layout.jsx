import React from 'react'
import Header from './Header'
import { Box, Container, Flex } from '@chakra-ui/react'
import Navbar from './Navbar'
import Search from '../pages/Public/Search'

const Layout = (props) => {
    return (
        <>
            <Header />
            <Navbar />
            <Flex w='full' justifyContent='center' alignItems='center' >
                <Search />
            </Flex>
            <Container maxW='container.lg'>{props.children}</Container>
        </>
    )
}

export default Layout