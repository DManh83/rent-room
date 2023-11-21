import React, { useEffect, useRef } from 'react'
import Header from './Header'
import { Box, Container, Flex } from '@chakra-ui/react'
import Navbar from './Navbar'

const Layout = (props) => {

    const navRef = useRef()
    useEffect(() => {
        const handleScroll = (e) => {
            // console.log(window.scrollY)
            if (window.scrollY >= 84) {
                navRef.current.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 50;
                `
            } else {
                navRef.current.style.cssText = `
                width: 100%;
                `
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <Flex direction='column' justifyContent='center' >
            <Header />
            <Box ref={navRef} w='full'>
                <Navbar />
            </Box>
            <Container maxW='1100px'>{props.children}</Container>
        </Flex>
    )
}

export default Layout