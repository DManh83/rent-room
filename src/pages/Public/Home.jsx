import React from 'react'
import { Layout } from '../../components'
import { Outlet, useLocation } from 'react-router-dom'
import { Box, Flex } from '@chakra-ui/react'
import { path } from '../../ultils/constant'
import Search from './Search'

const Home = () => {
    const location = useLocation()
    return (
        <Layout>
            {!location.pathname?.includes(path.DETAIL) &&
                !location.pathname?.includes(path.LOGIN) &&
                !location.pathname?.includes(path.REGISTER) &&
                !location.pathname?.includes(path.FORGOTPASSWORD) &&
                !location.pathname?.includes(path.RESETPASSWORD) &&
                <Flex w='full' justifyContent='center' alignItems='center' >
                    <Search />
                </Flex>}
            <Flex mt={3}>
                <Outlet />
            </Flex>
            <Box h='100px'></Box>
        </Layout>
    )
}

export default Home