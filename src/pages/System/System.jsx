import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Box, Flex } from '@chakra-ui/react'
import { Navbar } from '../../components'
import SideBar from './SideBar'
import { useAuth } from '../../hooks/useReducerContext'
import { path } from '../../ultils/constant'

const System = () => {

    // const { user, isLoggedIn, dispatchUser } = useAuth()
    // useEffect(() => {
    //     setTimeout(() => {
    //         user && dispatchUser('ISLOGGEDIN')
    //     }, 1000)
    // }, [dispatchUser])
    // if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />

    return (
        <Flex
            w='full'
            direction='column'
            alignItems='center'
            h='100vh'
        >
            <Flex
                w='full'
                flex='none'
            >
                <Box flex='auto'>
                    <Navbar />
                </Box>
            </Flex>
            <Flex
                w='full'
                h='100vh'
                flex='auto'
            >
                <SideBar />
                <Box
                    flex='auto'
                    shadow='md'
                    p={4}
                    overflowY='scroll'
                >
                    <Outlet />
                </Box>
            </Flex>
        </Flex>
    )
}

export default System