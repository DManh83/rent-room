import { Flex } from '@chakra-ui/react'
import React from 'react'
import Search from './Search'

const HomePage = () => {
    return (
        <Flex direction='column' gap={3} w='full' >
            <Search />
            HomePage
        </Flex>
    )
}

export default HomePage