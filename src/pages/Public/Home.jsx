import React from 'react'
import { Layout } from '../../components'
import { Outlet, useLocation } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'
import { path } from '../../ultils/constant'
import Search from './Search'

const Home = () => {
    const location = useLocation()
    return (
        <Layout>
            {!location.pathname?.includes(path.DETAIL) &&
                <Flex w='full' justifyContent='center' alignItems='center' >
                    <Search />
                </Flex>}
            <Flex mt={3}>
                <Outlet />
            </Flex>
        </Layout>
    )
}

export default Home