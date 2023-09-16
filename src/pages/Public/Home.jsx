import React from 'react'
import { Layout } from '../../components'
import { Outlet } from 'react-router-dom'
import { Box, Flex } from '@chakra-ui/react'

const Home = () => {
    return (
        <Layout>
            <Flex>
                <Outlet />
            </Flex>
        </Layout>
    )
}

export default Home